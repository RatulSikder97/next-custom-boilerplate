import express from 'express';
import { RegionController } from '../app/http/controllers/RegionController';
const regionRoutes = express.Router();

const regionController = new RegionController();

regionRoutes.get('/:id', regionController.getRegionById);
regionRoutes.get('/', regionController.getAllRegion);
regionRoutes.post('/', regionController.createRegion);
regionRoutes.put('/:id', regionController.updateRegionById);
regionRoutes.delete('/:id', regionController.deleteRegionById);

export default regionRoutes;