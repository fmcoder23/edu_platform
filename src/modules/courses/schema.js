const {gql} = require('apollo-server')
const {typeDefs: Teacher} = require('../teachers')
const {typeDefs: Lesson} = require('../lessons')
const {typeDefs: CourseComment} = require('../comments')

module.exports = gql`
    ${Teacher}
    ${Lesson}
    ${CourseComment}

    type Course {
        id: ID!
        title: String!
        description: String!
        teachers: [Teacher]
        lessons: [Lesson]
        comments: [CourseComment]
    }
    type Query {
        getCourses: [Course!]!
    }
    type Mutation {
        createCourse(title: String!, description: String!): Course
        updateCourse(id: ID!, title: String!, description: String!): Course
        deleteCourse(id: ID!): Course
    }
`