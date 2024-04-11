import express from 'express';
import StatisticController from '../controllers/StatisticController';

const router = express.Router();
router.route('/').get(StatisticController.getStatisticConditionValue);

export default router;
