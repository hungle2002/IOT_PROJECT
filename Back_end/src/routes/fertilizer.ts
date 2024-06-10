import express from 'express';
import FertilizerController from '../controllers/FertilizerController';

const router = express.Router();
router
  .route('/')
  .get(FertilizerController.getAllFertilizerSchedule)
  .post(FertilizerController.createFertilizerSchedule);

router.route('/active').get(FertilizerController.getActiveFertilizer);

export default router;
