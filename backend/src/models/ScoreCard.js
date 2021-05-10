import { model, Schema } from 'mongoose';

const scoreCardSchema = new Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  score: { type: Number, required: true },
});

export default model('ScoreCard', scoreCardSchema);
