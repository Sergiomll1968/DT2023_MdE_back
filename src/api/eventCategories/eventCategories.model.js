import { Schema, model } from 'mongoose';

const eventCategorySchema = new Schema({
  username: { type: String, required: [true, 'El nombre es obligatorio'] },
  phone: { type: String, required: false },
  mail: { type: String, required: true },
  points: { type: Number, required: false, default: 0 },
  password: { type: String, required: true },
  deleted: { type: Boolean, required: false, default: false },
  rol: { type: String, required: true, enum: ['admin', 'client'] },
  confirmed: { type: Boolean, required: false, default: false },
});

const eventCategoryModel = model('eventCategories', eventCategorySchema);

export default eventCategoryModel;
