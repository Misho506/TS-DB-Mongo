import express from 'express';
import { getGuidesOfPlanets } from '../controllers/planetController';
import protect from '../middleware/authMiddleware';

const router = express.Router();
// by user id
router.get('/', protect, getGuidesOfPlanets);

module.exports = router;