const {gql} = require('apollo-server')
const {typeDefs: CourseComment} = require('../comments')
const {typeDefs: LessonComment} = require('../comments')

module.exports = gql`
    ${CourseComment}
    ${LessonComment}
    type User {
        id: ID!
        fullname: String!
        email: String!
        password: String!
        isAdmin: Boolean!
        course_comments: [CourseComment]
        lesson_comments: [LessonComment]
    }
    type AuthPayload {
        user: User!
        token: String!
    }
    type Query {
        getUsers: [User!]!
    }
    type Mutation {
        register(fullname: String! email: String! password: String!): AuthPayload
        login(email: String! password: String!): AuthPayload
    }
`