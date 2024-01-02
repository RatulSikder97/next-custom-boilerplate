import { IInterest } from '@/app/interfaces/entities/IInterest';
import Joi from 'joi';

export const InterestCreateRequest = Joi.object<IInterest>({
    name: Joi.string().required(),
});
