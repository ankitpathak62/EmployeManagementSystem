require('dotenv').config();

const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./graphql/schema/employee');
const resolvers = require('./graphql/resolvers/employeeResolver');
const { connectDB } = require('./config/db');

let server;

(async function bootstrap() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Create Apollo Server with CSRF protection disabled for production
    server = new ApolloServer({
      typeDefs,
      resolvers,
      csrfPrevention: false, // Disable CSRF protection
      formatError: (formattedError, error) => {
        console.error('GraphQL Error:', {
          message: formattedError.message,
          code: formattedError.extensions?.code,
          stacktrace: error.stack
        });

        return {
          message: formattedError.message,
          code: formattedError.extensions?.code || 'INTERNAL_SERVER_ERROR',
          path: formattedError.path
        };
      },
      introspection: true, // Enable GraphQL playground in production
      playground: true,
    });

    // Start server
    const { url } = await startStandaloneServer(server, {
      listen: { port: Number(process.env.PORT) || 4000 },
      context: async ({ req, res }) => {
        return { req, res };
      }
    });

    console.log(`🚀 GraphQL server ready at ${url}`);
    console.log(`📡 CORS enabled for all origins`);
    
  } catch (err) {
    console.error('❌ Fatal startup error:', err);
    process.exit(1);
  }
})();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  if (server) {
    await server.stop();
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  if (server) {
    await server.stop();
  }
  process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
