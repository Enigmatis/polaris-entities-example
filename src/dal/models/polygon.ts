import { getModelCreator, SchemaCreator } from '@enigmatis/mongo-driver';
import { Schema } from 'mongoose';
import { getCurrId } from '../../utills/correlation-id-generator';
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

export const polygonSchemaCreator: SchemaCreator = ((refNameCreator) => {
    const schema = new Schema<Polygon>({
        ...ExampleEntitiesBaseSchema,
        entityName: {
            type: String,
            required: true,
            default: 'polygon',
        },
        correlationId: {
            type: String,
            required: true,
            default: () => getCurrId('polygon'),
        },
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
    });
    schema.pre('save', function(this: any, next: any) {
        // temporary solution, until we get mongoDB 4 or delete required dataVersion property in polaris
        this.dataVersion = 15;
        next();
    });
    return schema;
});

export const polygonModelPerReality = getModelCreator<Polygon>(modelNames.POLYGON, polygonSchemaCreator);
