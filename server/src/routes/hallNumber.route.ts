import { Router } from "express";
import HallNumberController from "../controllers/hallNumber.controller";

const router = Router();
// GET /api/hallNumbers - Get all hallNumbers
router.get('/', HallNumberController.getAllHallNumbers);

// GET /api/hallNumbers/:id - Get a hallNumber by ID
router.get('/:id', HallNumberController.getHallNumberById);

// POST /api/hallNumbers - Create a new hallNumber
router.post('/', HallNumberController.createHallNumber);

// PUT /api/hallNumbers/:id - Edit an existing hallNumber
router.put('/:id', HallNumberController.editHallNumber);

// DELETE /api/hallNumbers/:id - Delete a hallNumber
router.delete('/:id', HallNumberController.deleteHallNumber);

export default router;
