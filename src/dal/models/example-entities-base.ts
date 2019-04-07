import { RepositoryModel } from '@enigmatis/mongo-driver';

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
        default: 'folder',
    },
    correlationId: {
        type: String,
        required: true,
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
