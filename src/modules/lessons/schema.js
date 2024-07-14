const {gql} = require('apollo-server')

module.exports = gql`
    type Lesson {
        id: ID!
        title: String!
        course_id: String!
    }
    type Query {
        getLessons: [Lesson!]!
    }
    type Mutation {
        createLesson(title: String!, course_id: String!): Lesson
        updateLesson(id: ID!, title: String!, course_id: String!): Lesson
        deleteLesson(id: ID!): Lesson
    }
`