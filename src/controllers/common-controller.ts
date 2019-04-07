import * as fs from 'fs';
import { Context } from 'koa';
import * as path from 'path';
import { baseLogger } from '../utills/base-logger';

export const healthController = async (ctx: Context) => ctx.ok('OK');

export const versionController = async (ctx: Context) => {
    return new Promise((resolve) => {
        const pjs = require('./../../package');
        fs.stat(path.resolve(__dirname, './../../', 'package.json'), (err, stat) => {
            if (err) {
                baseLogger.error('unable to find package json because', { throwable: err });
                ctx.internalServerError(
                    process.env.NODE_ENV === 'develop' ? err.message : 'internal server error',
                );
            } else {
                ctx.ok({ version: pjs.version, date: stat.mtime });
            }
            resolve();
        });
    });
};
