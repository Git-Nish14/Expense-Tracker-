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
    const app = express();
    const httpServer = createServer(app);
    const schema = await createSchema();

    const server = new ApolloServer({
      schema,
      introspection: true,
      context: ({ req }) => {
        const authHeader = req.headers.authorization || "";
        let userId: string | null = null;

        console.log("🔹 Received Authorization Header:", authHeader);

        if (authHeader) {
          const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

          try {
            if (!process.env.JWT_SECRET) {
              throw new Error("JWT_SECRET is not defined");
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            userId = (decodedToken as { userId: string }).userId;
            console.log("✅ Decoded userId:", userId);
          } catch (err: any) {
            console.error("❌ JWT verification failed:", err.message);
          }
        }

        return { req, userId };
      },
    });

    await server.start();
    server.applyMiddleware({ app });

    const port = process.env.PORT || 4000;
    httpServer.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
};

startServer();
