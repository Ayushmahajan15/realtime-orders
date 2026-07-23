const prisma = require("../config/prisma");

async function findUserByEmail(email) {
    return await prisma.user.findUnique({
        where: {
            email
        }
    });
}

async function createUser(userData) {
    return await prisma.user.create({
        data: userData
    });
}

module.exports = {
    findUserByEmail,
    createUser
};