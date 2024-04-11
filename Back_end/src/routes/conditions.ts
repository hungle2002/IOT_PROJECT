import express from 'express';
import ConditionController from '../controllers/ConditionController';

const router = express.Router();
router.route('/').get(ConditionController.getAllConditionInfo);
// router.route('/value').get(ConditionController.getAllConditionValue);
// router.route('/:key/value').get(ConditionController.getOneConditionInfo);

export default router;
