import { Router, IRequest as IttyRequest } from 'itty-router';
import mongoose from 'mongoose';
import express from 'express';
import sanitizeHtml from 'sanitize-html';
import middleware from './middleware/index.middleware';
import Print from './utils/print';
import connectDB from './config/database.config';

// Define environment interface
interface Env {
  DATABASE_HOST: string;
  DB_NAME: string;
  JWT_SECRET: string;
  ADMIN_PASSWORD: string;
  EMAIL_USER: string;
  EMAIL_PASS: string;
  API_KEY: string;
  JWT_TOKEN_EXPIRE: string;
  ADMIN_PATH: string;
  DEBUG_MODE: string;
  CORS_ORIGIN: string;
}

// Initialize router
const router = Router();

// Apply Express middleware (json parsing and custom middleware)
const expressApp = express();
expressApp.use(express.json());
middleware(expressApp); // Apply your existing middleware
const expressMiddleware = expressApp.handle.bind(expressApp);

// Middleware to mimic Express res.locals and apply Express middleware
router.all('*', async (request: IttyRequest, env: Env) => {
  request.locals = { sanitizeHtml }; // Attach sanitizeHtml
  await expressMiddleware(request as any, {}, () => {}); // Apply Express middleware
});

// Health check (replaces "Server is listening")
router.get('/api/health', () => {
  Print.info('Health check requested');
  return new Response(JSON.stringify({ status: 'Worker is running' }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': env.CORS_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    status: 200,
  });
});

// Database health check (replaces "Connected to mongoDB")
router.get('/api/db-health', async ({ env }) => {
  try {
    await connectDB(env);
    await mongoose.connection.db.admin().ping();
    await mongoose.disconnect();
    return new Response(JSON.stringify({ status: 'Database connected' }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': env.CORS_ORIGIN,
      },
      status: 200,
    });
  } catch (error) {
    Print.error('MongoDB connection error: ' + error.message);
    return new Response(JSON.stringify({ status: 'Database connection failed', error: error.message }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': env.CORS_ORIGIN,
      },
      status: 500,
    });
  }
});

// Handle CORS preflight
router.options('*', ({ env }) => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': env.CORS_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
    status: 204,
  });
});

// Example route (port your routes from index.middleware.ts)
router.get('/api/rooms', async ({ env }) => {
  try {
    await connectDB(env);
    const rooms = await mongoose.model('Room').find();
    await mongoose.disconnect();
    return new Response(JSON.stringify(rooms), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': env.CORS_ORIGIN,
      },
      status: 200,
    });
  } catch (error) {
    Print.error('Error fetching rooms: ' + error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': env.CORS_ORIGIN,
      },
      status: 500,
    });
  }
});

// Catch-all for unhandled routes
router.all('*', ({ env }) => {
  return new Response('Not found', {
    headers: { 'Access-Control-Allow-Origin': env.CORS_ORIGIN },
    status: 404,
  });
});

export default {
  fetch: async (request: Request, env: Env) => {
    Print.info(`Request received: ${request.url}`);
    return router.handle(request, env);
  },
};
