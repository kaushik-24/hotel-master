import { Request, Response } from 'express';
import { FacilityService } from '../services/facility.services';
import { Facility } from '../interface/facility.interface';

export class FacilityController {
  static async createFacility(req: Request, res: Response) {
    try {
      const facility: Facility = req.body;
      if (!facility.name ) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      const newFacility = await FacilityService.createFacility(facility);
      res.status(201).json(newFacility);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllFacilities(req: Request, res: Response) {
    try {
      const facilities = await FacilityService.getAllFacilities();
      res.json(facilities);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getFacilityById(req: Request, res: Response) {
    try {
      const facility = await FacilityService.getFacilityById(req.params.id);
      if (!facility) {
        return res.status(404).json({ message: 'Facility not found' });
      }
      res.json(facility);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateFacility(req: Request, res: Response) {
    try {
      const facility = await FacilityService.updateFacility(req.params.id, req.body);
      if (!facility) {
        return res.status(404).json({ message: 'Facility not found' });
      }
      res.json(facility);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteFacility(req: Request, res: Response) {
    try {
      const facility = await FacilityService.deleteFacility(req.params.id);
      if (!facility) {
        return res.status(404).json({ message: 'Facility not found' });
      }
      res.json({ message: 'Facility deleted' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
