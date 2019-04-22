import { RepositoryModel } from '@enigmatis/mongo-driver';
import { getCurrId } from '../../utills/correlation-id-generator';

export interface ExampleEntitiesBase extends RepositoryModel {
    entityName: string;
    correlationId: string;
    name: string;
    entityVersion: number;
}

export const ExampleEntitiesBaseSchema = {
    entityName: {
        type: String,
        required: true,
    },
    correlationId: {
        type: String,
        required: true,
        default: getCurrId(),
    },
    name: {
        type: String,
        required: true,
    },
    entityVersion: {
        type: Number,
        required: true,
        default: 1,
    },
};
