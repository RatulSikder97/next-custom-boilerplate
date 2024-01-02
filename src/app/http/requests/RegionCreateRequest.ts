import { IRegion } from '@Interfaces/entities/IRegion';
import Joi from 'joi';

export const RegionCreateRequest = Joi.object<IRegion>({
    name: Joi.string().required(),
    region_code: Joi.string().required(),
});
