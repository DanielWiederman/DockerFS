import { Router } from 'express';
import { testCache } from '../controllers/cacheController.js';

const router = Router();

router.get('/cache-test', testCache);

export default router;
