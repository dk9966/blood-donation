import { Router } from 'express';
import Profile from '../../models/Profile';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    const { name, email, id } = req.body;
    const existing = await Profile.findOne({ name, email, id});

    if (existing) { 
      existing.name = name;
      existing.email = email;
      existing.id = id;
      await existing.save();
      res.send({
        profile: existing,
        message: `Updated (${name}, ${email}, ${id})`,
      });
      return;
    }

    const profile = new Profile(req.body);
    await profile.save();
    res.send({ profile, message: `Added (${name}, ${email}, ${id})` });
  } catch (e) {
    res.json({ message: 'Adding failed.' });
  }
});

router.delete('/clear-db', async function (_, res) {
  try {
    await Profile.collection.drop();
    return res.json({ message: 'Database cleared.' });
  } catch (e) {
    return res.json({ message: 'Nothing to drop.' });
  }
});

router.get('/query-cards', async function (req, res) {
  const { type, queryString } = req.query;

  try {
    const profiles =
      type === 'name' ? await Profile.find({ name: queryString })
        : type === 'email' ? Profile.find({ email: queryString })
        : await Profile.find({ id: queryString });
    if (profiles.length === 0)
      res.send({
        message: `${
          type === 'name' ? 'Name' 
          : type === 'email' ? 'Email' 
          : 'ID'
        } (${queryString}) not found!`,
      });
    else
      res.send({
        messages: profiles.map(
          (m) =>
            `Found card with ${type}: (${m.name}, ${m.email}, ${m.id})`,
        ),
      });
  } catch (e) {
    return res.json({ message: 'Fetching failed.' });
  }
});

export default router;
