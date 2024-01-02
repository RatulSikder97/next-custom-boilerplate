import { Request } from "express";

export interface IBaseRequest extends Request {
    user: any,
    validate(): boolean
}