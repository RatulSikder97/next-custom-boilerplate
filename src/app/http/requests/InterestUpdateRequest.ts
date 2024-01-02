import { IInterest } from '@/app/interfaces/entities/IInterest';
import Joi from 'joi';

export const InterestUpdateRequest = Joi.object<IInterest>({
    id: Joi.number().required(),
    name: Joi.string().optional(),
});
