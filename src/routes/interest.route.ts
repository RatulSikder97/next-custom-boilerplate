import { InterestController } from '@Controllers/InterestController';
import express from 'express';

const interestRoutes = express.Router();

const interestController = new InterestController();

interestRoutes.get('/:id', interestController.getInterestById);
interestRoutes.get('/', interestController.getAllInterest);
interestRoutes.post('/', interestController.createInterest);
interestRoutes.put('/:id', interestController.updateInterestById);
interestRoutes.delete('/:id', interestController.deleteInterestById);

export default interestRoutes;