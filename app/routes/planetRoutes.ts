import express from 'express';
import { getGuidesOfPlanetsByUserId } from '../controllers/planetController';
import protect from '../middleware/authMiddleware';

const router = express.Router();
// by user id
router.get('/byUser', protect, getGuidesOfPlanetsByUserId);

module.exports = router;