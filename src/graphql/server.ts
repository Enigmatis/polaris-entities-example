import {
    LoggerConfig,
    MiddlewaresConfig,
    POLARIS_TYPES,
    polarisContainer,
    PolarisServerConfig,
} from '@enigmatis/polaris';
import * as Koa from 'koa';
import { getLoggerConfiguration, getMiddlewareConfiguration, getPolarisServerConfig } from '../utills/config';

export const init = async (app: Koa) => {
    polarisContainer.bind<LoggerConfig>(POLARIS_TYPES.LoggerConfig)
        .toConstantValue({ loggerConfiguration: getLoggerConfiguration() });
    polarisContainer
        .bind<PolarisServerConfig>(POLARIS_TYPES.PolarisServerConfig)
        .toConstantValue(getPolarisServerConfig());
    polarisContainer
        .bind<MiddlewaresConfig>(POLARIS_TYPES.MiddlewaresConfig)
        .toConstantValue(getMiddlewareConfiguration());
    // const mergedContainer = Container.merge(polarisContainer, schemaContainer);
    // const server: GraphQLServer = mergedContainer.get<GraphQLServer>(POLARIS_TYPES.GraphQLServer);
};
