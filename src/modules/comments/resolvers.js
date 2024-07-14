const { ApolloError, AuthenticationError } = require('apollo-server')
const prisma = require('../../utils/connection');
const { checkToken } = require('../../utils/jwt');

module.exports = {
    Query: {
        getCourseComments: async (_, {}, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Unauthorized access')
                }
                const userData = checkToken(token);
                if (!userData) {
                    throw new AuthenticationError('Unauthorized access')
                }
                const comments = await prisma.courseComments.findMany({where: {
                    user_id: userData.id
                }});
                return comments;
            } catch (error) {
                throw new ApolloError(error.message)
            }
        },
        getLessonComments: async (_, {}, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Unauthorized access')
                }
                const userData = checkToken(token);
                if (!userData) {
                    throw new AuthenticationError('Unauthorized access')
                }
                const comments = await prisma.lessonComments.findMany({where: {
                    user_id: userData.id
                }});
                return comments;
            } catch (error) {
                throw new ApolloError(error.message)
            }
        }
    },
    Mutation: {
        createCourseComment: async (_, { comment, course_id }, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Unauthorized access')
                }
                const userData = checkToken(token);
                if (!userData) {
                    throw new AuthenticationError('Unauthorized access')
                }
                return await prisma.courseComments.create({
                    data: {
                        comment,
                        user_id: userData.id,
                        course_id
                    }
                });
            } catch (error) {
                throw new ApolloError(error.message)
            }
        },
        updateCourseComment: async (_, { id, comment, course_id }, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Unauthorized access')
                }
                const userData = checkToken(token);
                if (!userData) {
                    throw new AuthenticationError('Unauthorized access')
                }
                const updatedComment = await prisma.courseComments.update({
                    where: { id },
                    data: { comment, user_id: userData.id, course_id }
                });
                return updatedComment;
            } catch (error) {
                throw new ApolloError(error.message)
            }
        },
        deleteCourseComment: async (_, { id }, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Unauthorized access')
                }
                const userData = checkToken(token);
                if (!userData) {
                    throw new AuthenticationError('Unauthorized access')
                }
                const deletedComment = await prisma.courseComments.delete({ where: { id } });
                return deletedComment;
            } catch (error) {
                throw new ApolloError(error.message)
            }
        },

        createLessonComment: async (_, { comment, lesson_id }, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Unauthorized access')
                }
                const userData = checkToken(token);
                if (!userData) {
                    throw new AuthenticationError('Unauthorized access')
                }
                return await prisma.lessonComments.create({
                    data: {
                        comment,
                        user_id: userData.id,
                        lesson_id
                    }
                });
            } catch (error) {
                throw new ApolloError(error.message)
            }
        },
        updateLessonComment: async (_, { id, comment, lesson_id }, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Unauthorized access')
                }
                const userData = checkToken(token);
                if (!userData) {
                    throw new AuthenticationError('Unauthorized access')
                }
                const updatedComment = await prisma.lessonComments.update({
                    where: { id },
                    data: { comment, user_id: userData.id, lesson_id }
                });
                return updatedComment;
            } catch (error) {
                throw new ApolloError(error.message)
            }
        },
        deleteLessonComment: async (_, { id }, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Unauthorized access')
                }
                const userData = checkToken(token);
                if (!userData) {
                    throw new AuthenticationError('Unauthorized access')
                }
                const deletedComment = await prisma.lessonComments.delete({ where: { id } });
                return deletedComment;
            } catch (error) {
                throw new ApolloError(error.message)
            }
        }
    }
}