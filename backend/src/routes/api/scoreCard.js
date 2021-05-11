import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    const { name, subject, score } = req.body;
    const existing = await ScoreCard.findOne({ name, subject });

    if (existing) {
      existing.score = score;
      await existing.save();
      res.send({
        card: existing,
        message: `Updating (${name}, ${subject}, ${score})`,
      });
      return;
    }

    const card = new ScoreCard(req.body);
    await card.save();
    res.send({ card, message: `Adding (${name}, ${subject}, ${score})` });
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

router.delete('/clear-db', async function (_, res) {
  try {
    await ScoreCard.collection.drop();
    return res.json({ message: 'Database cleared.' });
  } catch (e) {
    return res.json({ message: 'Nothing to drop.' });
  }
});

router.get('/query-cards', async function (req, res) {
  const { type, queryString } = req.query;

  try {
    const scoreCards =
      type === 'name'
        ? await ScoreCard.find({ name: queryString })
        : await ScoreCard.find({ subject: queryString });
    if (scoreCards.length === 0)
      res.send({
        message: `${
          type === 'name' ? 'Name' : 'Subject'
        } (${queryString}) not found!`,
      });
    else
      res.send({
        messages: scoreCards.map(
          (m) =>
            `Found card with ${type}: (${m.name}, ${m.subject}, ${m.score})`,
        ),
      });
  } catch (e) {
    return res.json({ message: 'Something went wrong.' });
  }
});

export default router;
