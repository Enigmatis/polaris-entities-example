import {
    LoggerConfig,
    MiddlewaresConfig,
    POLARIS_TYPES,
    polarisContainer,
    PolarisGraphQLServer,
    PolarisServerConfig,
} from '@enigmatis/polaris';
import * as Koa from 'koa';
import { getLoggerConfiguration, getMiddlewareConfiguration, getPolarisServerConfig } from '../utills/config';
import { getSchema } from './schema';

export const init = async () => {
    polarisContainer.bind<LoggerConfig>(POLARIS_TYPES.LoggerConfig)
        .toConstantValue({ loggerConfiguration: getLoggerConfiguration() });
    polarisContainer
        .bind<PolarisServerConfig>(POLARIS_TYPES.PolarisServerConfig)
        .toConstantValue(getPolarisServerConfig());
    polarisContainer
        .bind<MiddlewaresConfig>(POLARIS_TYPES.MiddlewaresConfig)
        .toConstantValue(getMiddlewareConfiguration());
    polarisContainer.bind(POLARIS_TYPES.GraphQLSchema).toConstantValue(await getSchema());
};

export const start = async (app: Koa) => {
    const server: PolarisGraphQLServer = polarisContainer.get<PolarisGraphQLServer>(POLARIS_TYPES.GraphQLServer);
    server.start(app);
};
