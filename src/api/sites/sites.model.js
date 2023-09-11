import { Schema, model } from 'mongoose';

const siteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  minutes: {
    type: Number,
    required: true,
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const siteModel = model('Site', siteSchema);

export default siteModel;
