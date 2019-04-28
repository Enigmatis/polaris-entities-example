import { makeExecutablePolarisSchema } from '@enigmatis/polaris';
import { GraphQLSchema } from 'graphql';
import { mergeResolvers } from 'merge-graphql-schemas';
import * as path from 'path';
import { getAllFromFolder } from '../utills/exports-from-folder';

export const getSchema: () => Promise<GraphQLSchema> = async () => {
    return makeExecutablePolarisSchema({
        typeDefs: await getAllFromFolder(getAbsolutePath('./schemas')),
        resolvers: mergeResolvers(await getAllFromFolder(getAbsolutePath('./resolvers'))),
        allowUndefinedInResolve: true,
        resolverValidationOptions: {
            requireResolversForResolveType: false,
        },
    });
};

const getAbsolutePath = (relative: string) => path.resolve(__dirname, relative);
