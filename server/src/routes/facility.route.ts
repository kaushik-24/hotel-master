import { Router } from 'express';
import { FacilityController } from '../controllers/facility.controller';

const router = Router();

router.post('/', FacilityController.createFacility);
router.get('/', FacilityController.getAllFacilities);
router.get('/:id', FacilityController.getFacilityById);
router.put('/:id', FacilityController.updateFacility);
router.delete('/:id', FacilityController.deleteFacility);

export default router;
