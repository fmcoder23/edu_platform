const prisma = require('../../utils/connection')
const {AuthenticationError, ApolloError} = require('apollo-server')
const { checkToken } = require('../../utils/jwt');

module.exports = {
    Query: {
        getCourses: async() => {
            try {
                return await prisma.courses.findMany({
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        teachers: true,
                        lessons: true,
                        comments: true
                    }
                });
            } catch (error) {
                throw new ApolloError(error.message)
            }
        }
    },
    Mutation: {
        createCourse: async(_, {title, description}, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Permission denied')
                }
                const userData = checkToken(token);
                if (!userData.isAdmin) {
                    throw new AuthenticationError('Permission denied')
                }
                const courseExists = await prisma.courses.findFirst({where: {title}})
                if (courseExists) {
                    throw new AuthenticationError('Course already exists')
                }
                return await prisma.courses.create({data: {title, description}})
            } catch (error) {
                throw new ApolloError(error.message)
            }
        },
        updateCourse: async (_, {id, title, description}, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Permission denied')
                }
                const userData = checkToken(token);
                if (!userData.isAdmin) {
                    throw new AuthenticationError('Permission denied')
                }
                const courseExists = await prisma.courses.findFirst({where: {id}})
                if (!courseExists) {
                    throw new AuthenticationError('Course not found')
                }
                return await prisma.courses.update({where: {id}, data: {title, description}})
            } catch (error) {
                throw new ApolloError(error.message)
            }
        },
        deleteCourse: async (_, {id}, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Permission denied')
                }
                const userData = checkToken(token);
                if (!userData.isAdmin) {
                    throw new AuthenticationError('Permission denied')
                }
                const courseExists = await prisma.courses.findFirst({where: {id}})
                if (!courseExists) {
                    throw new AuthenticationError('Course not found')
                }
                return await prisma.courses.delete({where: {id}})
            } catch (error) {
                throw new ApolloError(error.message)
            }
        }
    }
}