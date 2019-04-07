import { getModelCreator, SchemaCreator } from '@enigmatis/mongo-driver';
import { Schema } from 'mongoose';
import { modelNames } from '../model-names';
import { ExampleEntitiesBase, ExampleEntitiesBaseSchema } from './example-entities-base';
import { Folder } from './folder';

export interface Mission extends ExampleEntitiesBase {
    id: string;
    folder: Folder;
    refs: Folder[];
    allowedUsers: string[];
    expirationDate: Date;
}

const missionSchema: SchemaCreator = (getRefName) => new Schema<Mission>({
    ...ExampleEntitiesBaseSchema,
    id: {
        type: String,
        required: true,
    },
    folder: {
        type: Schema.Types.ObjectId,
        ref: getRefName(modelNames.FOLDER),
        required: true,
    },
    refs: [{
        type: Schema.Types.ObjectId,
        ref: getRefName(modelNames.FOLDER),
        required: true,
    }],
    allowedUsers: [String],
    expirationDate: Date,
});

export const folderModelPerReality = getModelCreator<Mission>(modelNames.MISSION, missionSchema);
