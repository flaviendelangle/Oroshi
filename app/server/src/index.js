import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from 'prisma-binding'

import resolvers from './resolvers'
import * as config from './config'


const server = new GraphQLServer({
  typeDefs: config.prisma.typeDefs,
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma(config.prisma),
  }),
})


server.start(config.server, ({ port }) => {
  // eslint-disable-next-line no-console
  console.log(`The server is running on http://localhost:${port}`)
})
