"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityController = void 0;
const facility_services_1 = require("../services/facility.services");
class FacilityController {
    static async createFacility(req, res) {
        try {
            const facility = req.body;
            if (!facility.name) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            const newFacility = await facility_services_1.FacilityService.createFacility(facility);
            res.status(201).json(newFacility);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getAllFacilities(req, res) {
        try {
            const facilities = await facility_services_1.FacilityService.getAllFacilities();
            res.json(facilities);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async getFacilityById(req, res) {
        try {
            const facility = await facility_services_1.FacilityService.getFacilityById(req.params.id);
            if (!facility) {
                return res.status(404).json({ message: 'Facility not found' });
            }
            res.json(facility);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async updateFacility(req, res) {
        try {
            const facility = await facility_services_1.FacilityService.updateFacility(req.params.id, req.body);
            if (!facility) {
                return res.status(404).json({ message: 'Facility not found' });
            }
            res.json(facility);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async deleteFacility(req, res) {
        try {
            const facility = await facility_services_1.FacilityService.deleteFacility(req.params.id);
            if (!facility) {
                return res.status(404).json({ message: 'Facility not found' });
            }
            res.json({ message: 'Facility deleted' });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.FacilityController = FacilityController;
