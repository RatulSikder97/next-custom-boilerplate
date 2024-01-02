import express from 'express';
import userRoutes from './region.route';
import interestRoutes from './interest.route';


const routes = express.Router();


routes.use('/region/', userRoutes);
routes.use('/interest/', interestRoutes);

export default routes;