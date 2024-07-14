const prisma = require('../../utils/connection');
const {ApolloError} = require('apollo-server');
const { checkToken } = require('../../utils/jwt');


module.exports = {
    Query: {
        getTeachers: async () => {
            try {
                return await prisma.teachers.findMany();
            } catch (error) {
                throw new ApolloError(error.message)
            }
        }
    },
    Mutation: {
        createTeacher: async(_, {fullname, course_id}, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Permission denied')
                }
                const userData = checkToken(token);
                if (!userData.isAdmin) {
                    throw new AuthenticationError('Permission denied')
                }
                const teacherExists = await prisma.teachers.findFirst({where: {fullname}})
                if (teacherExists) {
                    throw new ApolloError('Teacher already exists')
                }
                return await prisma.teachers.create({data: {fullname, course_id}})
            } catch (error) {
                throw new ApolloError(error.message)
            }
        },
        updateTeacher: async (_, {id, fullname, course_id}, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Permission denied')
                }
                const userData = checkToken(token);
                if (!userData.isAdmin) {
                    throw new AuthenticationError('Permission denied')
                }
                const teacherExists = await prisma.teachers.findFirst({where: {id}})
                if (!teacherExists) {
                    throw new ApolloError('Teacher not found')
                }
                return await prisma.teachers.update({where: {id}, data: {fullname, course_id}})
            } catch (error) {
                throw new ApolloError(error.message)
            }
        },
        deleteTeacher: async (_, {id}, {token}) => {
            try {
                if (!token) {
                    throw new AuthenticationError('Permission denied')
                }
                const userData = checkToken(token);
                if (!userData.isAdmin) {
                    throw new AuthenticationError('Permission denied')
                }
                const teacherExists = await prisma.teachers.findFirst({where: {id}})
                if (!teacherExists) {
                    throw new ApolloError('Teacher not found')
                }
                return await prisma.teachers.delete({where: {id}})
            } catch (error) {
                throw new ApolloError(error.message)
            }
        }
    }
}
