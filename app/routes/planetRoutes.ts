import express from 'express';
import { getGuidesOfPlanets } from '../controllers/planetController';

const router = express.Router();

router.get('/', getGuidesOfPlanets);

module.exports = router;