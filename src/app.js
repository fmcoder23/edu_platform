const {ApolloServer} = require('apollo-server')
const { config } = require('../config')
const {typeDefs, resolvers} = require('./modules');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        return {
            token: req.headers?.token
        }
    }
})

server.listen(config.port, console.log(`Server running on port ${config.port}`));