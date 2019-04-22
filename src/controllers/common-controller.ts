import * as fs from 'fs';
import { Context } from 'koa';
import * as path from 'path';
import { baseLogger } from '../utills/base-logger';

export const healthController = async (ctx: Context) => ctx.ok('OK');

export const versionController = async (ctx: Context) => {
    return new Promise((resolve) => {
        const packageJson = require('./../../package');
        fs.stat(path.resolve(__dirname, './../../', 'package.json'), (err, stat) => {
            if (err) {
                baseLogger.error('unable to find package json due to:', { throwable: err });
                ctx.internalServerError(
                    process.env.NODE_ENV === 'develop' ? err.message : 'internal polarisServer error',
                );
            } else {
                ctx.ok({ version: packageJson.version, date: stat.mtime });
            }
            resolve();
        });
    });
};
