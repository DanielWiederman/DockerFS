import { Router } from 'express';
import { testMongoDb, testPostgresDb } from '../controllers/dbController.js';


const router = Router();

router.get('/db-postgres-test', testPostgresDb);
router.get('/db-mongodb-test',testMongoDb)

export default router;
