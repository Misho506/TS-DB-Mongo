
import mongoose, { Document, Schema } from 'mongoose';

// This could be on the Types folder for typeScript
export interface IBook extends Document {
  title: string;
  author: string;
}

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
});

export default mongoose.model<IBook>('Book', BookSchema);