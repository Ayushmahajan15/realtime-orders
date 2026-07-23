const {
    register,
    login
} = require("../services/authService");

const {
    registerSchema,
    loginSchema
} = require("../validators/authValidator");

async function registerUser(req, res) {

    try {

        const validatedData = registerSchema.parse(req.body);

        const user = await register(validatedData);

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            data: user
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

}

async function loginUser(req, res) {

    try {

        const validatedData = loginSchema.parse(req.body);

        const result = await login(
            validatedData.email,
            validatedData.password
        );

        res.status(200).json({
            success: true,
            message: "Login successful.",
            data: result
        });

    } catch (error) {

        res.status(401).json({
            success: false,
            message: error.message
        });

    }

}

module.exports = {
    registerUser,
    loginUser
};