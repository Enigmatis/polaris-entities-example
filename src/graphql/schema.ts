import { makeExecutablePolarisSchema } from '@enigmatis/polaris';
import { GraphQLSchema } from 'graphql';
import { mergeResolvers } from 'merge-graphql-schemas';
import * as path from 'path';
import { getAllInFolder } from '../utills/exports-from-folder';

export const getSchema: () => Promise<GraphQLSchema> = async () => {
    return makeExecutablePolarisSchema({
        typeDefs: await getAllInFolder(getAbsolutePath('./schemas')),
        resolvers: mergeResolvers(await getAllInFolder(getAbsolutePath('./resolvers'))),
        allowUndefinedInResolve: true,
        resolverValidationOptions: {
            requireResolversForResolveType: false,
        },
    });
};

const getAbsolutePath = (relative: string) => path.resolve(__dirname, relative);
