import { getModelCreator, SchemaCreator } from '@enigmatis/mongo-driver';
import { Schema } from 'mongoose';
import { modelNames } from '../model-names';
import { ExampleEntitiesBase, ExampleEntitiesBaseSchema } from './example-entities-base';
import { Mission } from './mission';
import { Point } from './point';
import { Polygon } from './polygon';

export interface Folder extends ExampleEntitiesBase {
    owner: string;
    entities: {
        polygons: Polygon[],
        points: Point[],
    };
    classification: Mission[];
    editPassword?: string;
    viewPassword?: string;
    expirationDate?: Date;
}

const folderSchema: SchemaCreator = (getRefName) => new Schema<Folder>({
    ...ExampleEntitiesBaseSchema,
    owner: {
        type: String,
        required: true,
    },
    entities: {
        polygons: [{
            type: Schema.Types.ObjectId,
            ref: getRefName(modelNames.POLYGON),
            default: [],
        }],
        points: [{
            type: Schema.Types.ObjectId,
            ref: getRefName(modelNames.POINT),
            default: [],
        }],
    },
    classification: {
        type: Schema.Types.ObjectId,
        ref: getRefName(modelNames.MISSION),
    },
    editPassword: String,
    viewPassword: String,
    expirationDate: Date,
});

export const folderModelPerReality = getModelCreator<Folder>(modelNames.FOLDER, folderSchema);
