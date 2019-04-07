import { getModelCreator, SchemaCreator } from '@enigmatis/mongo-driver';
import { Schema } from 'mongoose';
import { BorderStyle } from '../enums';
import { modelNames } from '../model-names';
import { ExampleEntitiesBase, ExampleEntitiesBaseSchema } from './example-entities-base';
import { Mission } from './mission';

export interface Polygon extends ExampleEntitiesBase {
    positions: [[number]];
    height: number;
    comment?: string;
    aids: string[];
    classification: Mission[];
    entityVersion: number;
    expirationDate?: Date;
    internalMargins?: number;
    externalMargins?: number;
    fillColor?: string;
    entityColor?: string;
    borderStyle: BorderStyle;
    borderWidth?: number;
}

export const polygonSchemaCreator: SchemaCreator = ((refNameCreator) => new Schema<Polygon>({
    ...ExampleEntitiesBaseSchema,
    positions: {
        type: [[Number]],
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    comment: String,
    aids: {
        type: [String],
        default: [],
        required: true,
    },
    classification: [{
        type: Schema.Types.ObjectId,
        ref: refNameCreator(modelNames.MISSION),
    }],
    entityVersion: {
        type: Number,
        required: true,
        default: 1,
    },
    expirationDate: Date,
    internalMargins: Number,
    externalMargins: Number,
    fillColor: String,
    entityColor: String,
    borderStyle: {
        type: Number,
        required: false,
    },
    borderWidth: Number,
}));

export const polygonModelPerReality = getModelCreator<Polygon>(modelNames.POLYGON, polygonSchemaCreator);
