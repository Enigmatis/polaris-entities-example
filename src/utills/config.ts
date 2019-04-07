import * as applicationLogProperties from '../../configurations/application-log-properties.json';
import * as logConfig from '../../configurations/log-config.json';
import * as middlewareConfig from '../../configurations/middlewares-config.json';
import * as polarisConfig from '../../configurations/polaris-config.json';

import {
    MiddlewaresConfig,
    MiddlewaresConfiguration,
    PolarisProperties,
    PolarisServerConfig,
} from '@enigmatis/polaris';
import { LoggerConfiguration } from '@enigmatis/polaris-logs';

export const getPolarisProperties: () => PolarisProperties = () =>
    polarisConfig as PolarisProperties;

export const getLoggerConfiguration: () => LoggerConfiguration = () => logConfig as LoggerConfiguration;

export const getMiddlewareConfiguration: () => MiddlewaresConfig = () => ({
    middlewaresConfiguration: middlewareConfig as MiddlewaresConfiguration,
});

export const getPolarisServerConfig: () => PolarisServerConfig = () => ({
    polarisProperties: polarisConfig,
    applicationLogProperties,
});
