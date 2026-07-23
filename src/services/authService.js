const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    findUserByEmail,
    createUser
} = require("../repositories/authRepository");

async function register(userData) {

    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        throw new Error("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await createUser({
        ...userData,
        password: hashedPassword
    });

    return {
        id: user.id,
        name: user.name,
        email: user.email
    };

}

async function login(email, password) {

    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        throw new Error("Invalid email or password.");
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };

}

module.exports = {
    register,
    login
};