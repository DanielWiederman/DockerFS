import { Router } from 'express';
import { testDb } from '../controllers/dbController.js';

const router = Router();

router.get('/db-test', testDb);

export default router;
