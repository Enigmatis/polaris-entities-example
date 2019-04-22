import { PolarisContext } from '@enigmatis/polaris';
import { Polygon, polygonModelPerReality } from '../../dal/models/polygon';

const POLYGON_UPDATED_EVENT_NAME = 'POLYGON_UPDATED';

const getAllPolygons = async (parent: object | null, query: object, context: PolarisContext) => {
    return polygonModelPerReality(context).find();
};

const createPolygon = async (
    parent: object | null,
    { polygon }: { polygon: Polygon },
    context: PolarisContext,
) => {
    return polygonModelPerReality(context).create(polygon);
};

const updatePolygon = async (
    parent: object | null,
    { id, polygon }: { id: string, polygon: Polygon },
    context: PolarisContext,
) => {
    return polygonModelPerReality(context).findByIdAndUpdate(id, polygon, { new: true });
};

const deletePolygon = async (
    parent: object | null,
    { id }: { id: string },
    context: PolarisContext,
) => {
    return polygonModelPerReality(context).findByIdAndDelete(id);
};

export const polygonsChanged = (
    root: any,
    { realityId }: { realityId: number },
    { pubSub }: PolarisContext,
) => {
    polygonModelPerReality({ headers: { realityId } })
        .watch({ fullDocument: 'updateLookup' })
        .on('change', async (change) => {
            await pubSub!.publish(POLYGON_UPDATED_EVENT_NAME, { polygonsChanged: change.fullDocument });
        });
    return pubSub!.asyncIterator([POLYGON_UPDATED_EVENT_NAME]);
};

export const polygonResolver = {
        Polygon: {
            id: ({ _id }: { _id: string }) => _id.toString(),
        },
        Query: {
            polygons: getAllPolygons,
        },
        Mutation: {
            createPolygon,
            updatePolygon,
            deletePolygon,
        },
        Subscription: {
            polygonsChanged: {
                subscribe: polygonsChanged,
            },
        },
    }
;
