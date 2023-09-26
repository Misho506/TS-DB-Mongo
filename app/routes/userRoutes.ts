import express from 'express';
import { registerUser, getMe, getAllUsers } from '../controllers/userController';

// const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/', registerUser);
// router.post('/login', loginUser);
router.get('/me', getMe);

router.get('/all', getAllUsers)

module.exports = router;