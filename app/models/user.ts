
import mongoose, { Schema } from 'mongoose';

// This could be on the Types folder for typeScript
export interface User {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<User>('User', UserSchema);