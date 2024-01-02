import { Request, Response } from "express";
import { ResponseError, ResponseSuccess } from "../utility/HttpResponse";
import { validateRequest } from "../utility/requestValidation";
import { RegionCreateRequest } from "../requests/RegionCreateRequest";
import { RegionService } from "@Services/RegionService";
import { RegionUpdateRequest } from "../requests/RegionUpdateRequest";
import { ApiError } from "../utility/errorHandler";


export class RegionController {
    regionService: RegionService;

    constructor() {
        this.regionService = new RegionService();
    }

    createRegion = async (_req: Request, res: Response) => {
        try {
            await validateRequest(RegionCreateRequest, _req, res);
            const result = await this.regionService.createRegion(_req.body);
            return ResponseSuccess(res, 201, 'Region Created', result);
        } catch (error: any) {
            console.log(error);
            return ResponseError(res, error.statusCode, error.message);
        }
    }

    getAllRegion = async (_req: Request, res: Response) => {
        try {
            const result = await this.regionService.getAllRegion();
            return ResponseSuccess(res, 200, 'Regions Fetched', result);;
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    }

    getRegionById =async (_req: Request, res: Response) => {
        try {
            const result = await this.regionService.getRegionById(+_req.params.id);
            return ResponseSuccess(res, 200, 'Regions Fetched', result);;
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    }

    updateRegionById =async (_req: Request, res: Response) => {
        try {
            _req.body = {
                id: +_req.params.id,
                ..._req.body
            }

            await validateRequest(RegionUpdateRequest, _req, res);
            const result = await this.regionService.updateRegionById(+_req.params.id, _req.body);
            return ResponseSuccess(res, 200, 'Region Updated', result);
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    }

    deleteRegionById =async (_req: Request, res: Response) => {
        try {
            if( !_req.params.id ) {
                throw new ApiError('PARAMS_MISSED', 400, 'Region id is required.')
            }

            const result = await this.regionService.deleteRegionById(+_req.params.id);
            return ResponseSuccess(res, 200, 'Region Deleted', result);
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    }
}