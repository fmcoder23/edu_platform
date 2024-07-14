const bcrypt = require('bcrypt');
const { AuthenticationError, ApolloError } = require('apollo-server');
const prisma = require('../../utils/connection');
const { createToken, checkToken } = require('../../utils/jwt');

module.exports = {
    Query: {
        getUsers: async (_, {}, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Permission denied')
                }
                const userData = checkToken(token);
                if (!userData.isAdmin) {
                    throw new AuthenticationError('Permission denied')
                }
                const users = await prisma.users.findMany({select: {
                    id: true,
                    fullname: true,
                    email: true,
                    isAdmin: true,
                    course_comments: true,
                    lesson_comments: true
                }});
                return users;
            } catch (error) {
                throw new ApolloError(error.message);
            }
        }
    },
    Mutation: {
        register: async (_, { fullname, email, password }) => {
            try {
                const userExists = await prisma.users.findUnique({ where: { email } });
                if (userExists) {
                    throw new AuthenticationError('User already exists');
                }

                const hashedPassword = await bcrypt.hash(password, 12);
                const newUser = await prisma.users.create({
                    data: {
                        fullname,
                        email,
                        password: hashedPassword
                    }
                });
                const token = createToken({ id: newUser.id, isAdmin: newUser.isAdmin })

                return {user: newUser, token};
            } catch (error) {
                throw new ApolloError(error.message);
            }
        },
        login: async (_, { email, password }) => {
            try {
                const findUser = await prisma.users.findUnique({ where: { email } });
                if (!findUser) {
                    throw new AuthenticationError('Incorrect email or password');
                }
                const isMatch = await bcrypt.compare(password, findUser.password);
                if (!isMatch) {
                    throw new AuthenticationError('Incorrect email or password');
                }
                const token = createToken({ id: findUser.id, isAdmin: findUser.isAdmin });
                return {user: findUser, token};
            } catch (error) {
                throw new ApolloError(error.message);
            }
        }
    }
};
