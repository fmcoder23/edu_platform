const {mergeTypeDefs, mergeResolvers} = require('@graphql-tools/merge')

const Users = require('./users');
const Courses = require('./courses');
const Teachers = require('./teachers');
const Lessons = require('./lessons');
const Comments = require('./comments');

const typeDefs = mergeTypeDefs([Users.typeDefs, Courses.typeDefs, Teachers.typeDefs, Lessons.typeDefs, Comments.typeDefs])
const resolvers = mergeResolvers([Users.resolvers, Courses.resolvers, Users.resolvers, Teachers.resolvers, Lessons.resolvers, Comments.resolvers])

module.exports = {
    typeDefs,
    resolvers,
}