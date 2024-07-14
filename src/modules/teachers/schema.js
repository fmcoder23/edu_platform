const {gql} = require('apollo-server')

module.exports = gql`
    type Teacher {
        id: ID!
        fullname: String!
        course_id: String!
    }
    type Query {
        getTeachers: [Teacher!]!
    }
    type Mutation {
        createTeacher(fullname: String!, course_id: String!): Teacher
        updateTeacher(id: ID!, fullname: String!, course_id: String!): Teacher
        deleteTeacher(id: ID!): Teacher
    }
`