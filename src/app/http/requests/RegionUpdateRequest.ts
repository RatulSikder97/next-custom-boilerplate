import { IRegion } from '@Interfaces/entities/IRegion';
import Joi from 'joi';

export const RegionUpdateRequest = Joi.object<IRegion>({
    id: Joi.number().required(),
    name: Joi.string().optional(),
    region_code: Joi.string().optional(),
});
