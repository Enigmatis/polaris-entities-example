import { getModelCreator, SchemaCreator } from '@enigmatis/mongo-driver';
import { Schema } from 'mongoose';
import { modelNames } from '../model-names';
import { Folder } from './folder';
import { RomachEntitiesBase, RomachEntitiesBaseSchema } from './romach-entities-base';

export interface Category extends RomachEntitiesBase {
    folders: Folder[];
}

const categorySchema: SchemaCreator = (getRefName) => new Schema<Category>({
    ...RomachEntitiesBaseSchema,
    folders: [{
        type: Schema.Types.ObjectId,
        ref: getRefName(modelNames.FOLDER),
    }],
});

export const categorySchemaModelPerReality = getModelCreator<Category>(modelNames.CATEGORY, categorySchema);
