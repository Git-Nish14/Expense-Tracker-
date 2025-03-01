import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import { createSchema } from "./graphql/schema";
import dotenv from "dotenv";
import "reflect-metadata";
import jwt from "jsonwebtoken";

dotenv.config();

const startServer = async () => {
  try {
    const app = express(); // Express instance
    const httpServer = createServer(app); // HTTP server

    const schema = await createSchema();

    const server = new ApolloServer({
      schema,
      introspection: true, // Enable introspection
      context: ({ req }) => {
        const authHeader = req.headers.authorization || "";
        let userId: string | null = null;

        if (authHeader.startsWith("Bearer ")) {
          const token = authHeader.split(" ")[1];

          try {
            if (!process.env.JWT_SECRET) {
              throw new Error("JWT_SECRET is not defined");
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            userId = (decodedToken as { userId: string }).userId;
          } catch (err: any) {
            console.error("JWT verification failed:", err.message);
          }
        }

        return { req, userId }; // Only `req` and `userId`, no socket.io
      },
    });

    await server.start();
    server.applyMiddleware({ app });

    const port = process.env.PORT || 4000;
    httpServer.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
