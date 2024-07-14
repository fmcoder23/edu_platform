const {gql} = require('apollo-server')

module.exports = gql`
    type CourseComment {
        id: ID!
        comment: String!
        course_id: String!
        user_id: String!
    }
    type LessonComment {
        id: ID!
        comment: String!
        lesson_id: String!
        user_id: String!
    }
    type Query {
        getCourseComments: [CourseComment!]!
        getLessonComments: [LessonComment!]!
    }
    type Mutation {
        createCourseComment(comment: String!, course_id: String!, user_id: String): CourseComment
        updateCourseComment(id: ID!, comment: String!, course_id: String!, user_id: String): CourseComment
        deleteCourseComment(id: ID!): CourseComment

        createLessonComment(comment: String!, lesson_id: String!, user_id: String): LessonComment
        updateLessonComment(id: ID!, comment: String!, lesson_id: String!, user_id: String): LessonComment
        deleteLessonComment(id: ID!): LessonComment
    }
`