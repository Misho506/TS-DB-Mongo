import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
  hobbies: {
    type: Array<String>,
    required: [true, 'Please add a hobbie']
  }
}, {
  timestamps: true
});
// timestamps is to have created and updated date into the schema

export default mongoose.model('User', userSchema);
