import { model, Schema } from 'mongoose';

const profileSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  id: { type: String, required: true },
});

export default model('Profile', profileSchema);
