import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/', async function (req, res) {
  try {
    const card = new ScoreCard(req.body);
    await card.save();
    res.send(card);
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

router.delete('/', async function () {
  try {
    await ScoreCard.collection.drop();
    return res.json({ message: 'Score card collection dropped.' });
  } catch (e) {
    return res.json({ message: 'Nothing to drop.' });
  }
});

router.get('/', async function (req, res) {
  const { type, queryString } = req.query;

  try {
    switch (type) {
      case 'name': {
        const scoreCard = await ScoreCard.findOne({ name: queryString });
        return res.send(scoreCard);
      }
      case 'subject': {
        const scoreCard = await ScoreCard.findOne({ subject: queryString });
        return res.send(scoreCard);
      }
      default: {
        return res.json({ message: 'No records found.' });
      }
    }
  } catch (e) {
    return res.json({ message: 'Something went wrong.' });
  }
});

export default router;
