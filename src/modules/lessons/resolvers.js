const prisma = require('../../utils/connection');
const {ApolloError, AuthenticationError} = require('apollo-server');
const { checkToken } = require('../../utils/jwt');

module.exports = {
    Query: {
        getLessons: async(_, {}, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Unauthorized access')
                }
                const isToken = checkToken(token);
                if (!isToken) {
                    throw new AuthenticationError('Unauthorized access')
                }
                return await prisma.lessons.findMany();
            } catch (error) {
                throw new ApolloError(error.message)
            }
        }
    },
    Mutation: {
        createLesson: async(_, {title, course_id}, {token}) => {
            try { 
                if (!token) {
                    throw new AuthenticationError('Permission denied')
                }
                const userData = checkToken(token);
                if (!userData.isAdmin) {
                    throw new AuthenticationError('Permission denied')
                }
                return await prisma.lessons.create({data: {title, course_id}})
            } catch (error) {
                throw new ApolloError(error.message)
            }
        },
        updateLesson: async(_, {id, title, course_id}, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Permission denied')
                }
                const userData = checkToken(token);
                if (!userData.isAdmin) {
                    throw new AuthenticationError('Permission denied')
                }
                const lesson = await prisma.lessons.findFirst({where: {id}})
                if (!lesson) {
                    throw new ApolloError('Lesson not found')
                }
                return await prisma.lessons.update({where: {id}, data: {title, course_id}})
            } catch (error) {
                throw new ApolloError(error.message)
            }
        },
        deleteLesson: async(_, {id}, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Permission denied')
                }
                const userData = checkToken(token);
                if (!userData.isAdmin) {
                    throw new AuthenticationError('Permission denied')
                }
                const lesson = await prisma.lessons.findFirst({where: {id}})
                if (!lesson) {
                    throw new ApolloError('Lesson not found')
                }
                return await prisma.lessons.delete({where: {id}})
            } catch (error) {
                throw new ApolloError(error.message)
            }
        } 
    }
}