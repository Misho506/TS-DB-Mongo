import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
require('dotenv').config();

const authMiddleware = (context: any) => {

  console.log(context, "-----22222222222222222222222--------");
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Check if the token exists in the header
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        // Verify the token
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]'");
  }
  throw new Error('Authorization header must be provided');
};
export default authMiddleware;