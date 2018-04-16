import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from 'prisma-binding'

import resolvers from './resolvers'
import typeDefs from './types'
import * as config from './config'


const server = new GraphQLServer({
  typeDefs,
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
