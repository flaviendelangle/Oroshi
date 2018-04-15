export const server = {
  port: 8000,
}

export const prisma = {
  typeDefs: './server/database/prisma.graphql',
  endpoint: 'https://eu1.prisma.sh/public-horselantern-290/blogr/dev',
  secret: 'mysecret123',
  debug: true,
}
