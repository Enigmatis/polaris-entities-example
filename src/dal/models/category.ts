import { getModelCreator, SchemaCreator } from '@enigmatis/mongo-driver';
import { Schema } from 'mongoose';
import { modelNames } from '../model-names';
import { ExampleEntitiesBase, ExampleEntitiesBaseSchema } from './example-entities-base';
import { Folder } from './folder';

export interface Category extends ExampleEntitiesBase {
    folders: Folder[];
}

const categorySchema: SchemaCreator = (getRefName) => new Schema<Category>({
    ...ExampleEntitiesBaseSchema,
    folders: [{
        type: Schema.Types.ObjectId,
        ref: getRefName(modelNames.FOLDER),
    }],
});

export const categorySchemaModelPerReality = getModelCreator<Category>(modelNames.CATEGORY, categorySchema);
