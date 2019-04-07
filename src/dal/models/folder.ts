import { getModelCreator, SchemaCreator } from '@enigmatis/mongo-driver';
import { Schema } from 'mongoose';
import { modelNames } from '../model-names';
import { Ellipse } from './ellipse';
import { Mission } from './mission';
import { Polygon } from './polygon';
import { RomachEntitiesBase, RomachEntitiesBaseSchema } from './romach-entities-base';

export interface Folder extends RomachEntitiesBase {
    owner: string;
    entities: {
        polygons: Polygon[],
        ellipses: Ellipse[],
    };
    classification: Mission[];
    editPassword?: string;
    viewPassword?: string;
    expirationDate?: Date;
}

const folderSchema: SchemaCreator = (getRefName) => new Schema<Folder>({
    ...RomachEntitiesBaseSchema,
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
        ellipses: [{
            type: Schema.Types.ObjectId,
            ref: getRefName(modelNames.ELLIPSE),
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
