import { Request } from "express"; // Import proper type for Socket.io

export interface MyContext {
  // Use correct type for Socket.io
  req: Request;
  userId?: string | null; // Make it optional to handle unauthenticated cases
}
