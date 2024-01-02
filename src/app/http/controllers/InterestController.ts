import { Request, Response } from "express";
import { ResponseError, ResponseSuccess } from "../utility/HttpResponse";
import { validateRequest } from "../utility/requestValidation";
import { ApiError } from "../utility/errorHandler";
import { InterestService } from "@/app/services/InterestService";
import { InterestCreateRequest } from "../requests/InterestCreateRequest";
import { InterestUpdateRequest } from "../requests/InterestUpdateRequest";


export class InterestController {
    interestService: InterestService;

    constructor() {
        this.interestService = new InterestService();
    }

    createInterest = async (_req: Request, res: Response) => {
        try {
            await validateRequest(InterestCreateRequest, _req, res);
            const result = await this.interestService.createInterest(_req.body);
            return ResponseSuccess(res, 201, 'Interest Type Created', result);
        } catch (error: any) {
            console.log(error);
            return ResponseError(res, error.statusCode, error.message);
        }
    }

    getAllInterest = async (_req: Request, res: Response) => {
        try {
            const result = await this.interestService.getAllInterest();
            return ResponseSuccess(res, 200, 'Interest Type Fetched', result);;
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    }

    getInterestById =async (_req: Request, res: Response) => {
        try {
            const result = await this.interestService.getInterestById(+_req.params.id);
            return ResponseSuccess(res, 200, 'Interest Type Fetched', result);;
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    }

    updateInterestById =async (_req: Request, res: Response) => {
        try {
            _req.body = {
                id: +_req.params.id,
                ..._req.body
            }

            await validateRequest(InterestUpdateRequest, _req, res);
            const result = await this.interestService.updateInterestById(+_req.params.id, _req.body);
            return ResponseSuccess(res, 200, 'Interest Type Updated', result);
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    }

    deleteInterestById =async (_req: Request, res: Response) => {
        try {
            if( !_req.params.id ) {
                throw new ApiError('PARAMS_MISSED', 400, 'Interest Type id is required.')
            }

            const result = await this.interestService.deleteInterestById(+_req.params.id);
            return ResponseSuccess(res, 200, 'Interest Type Deleted', result);
        } catch (error: any) {
            return ResponseError(res, error.statusCode, error.message);
        }
    }
}