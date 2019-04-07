import { PolarisLogger } from '@enigmatis/polaris-logs';
import { getLoggerConfiguration, getPolarisServerConfig } from './config';

export const baseLogger = new PolarisLogger(
    getPolarisServerConfig().applicationLogProperties,
    getLoggerConfiguration(),
);
