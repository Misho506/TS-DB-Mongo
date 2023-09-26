import mongoose from 'mongoose';

const planetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  orderFromSun: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true
  },
  hasRings: {
    type: String,
    required: [true, 'Please add a password']
  },
  mainAtmosphere: {
    type: Array<String> || null,
    required: [true, 'Please add a hobbie']
  },
  surfaceTemperatureCelsius: {
    type: {
      min: Number || null,
      max: Number || null,
      mean: Number,
    },
    required: [false],
  }
}, {
  timestamps: true
});
// timestamps is to have created and updated date into the schema

export default mongoose.model('PLANETS', planetSchema);
// mongoose.model('<name of collection>', schema);
// <name of collection> ignore case, can be upper or Lower case.