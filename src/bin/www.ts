#!/usr/bin/env node

/**
 * Module dependencies.
 */
import * as http from 'http';

import { config } from 'dotenv';

config();

import { app, init } from '../app';
import { baseLogger } from '../utills/base-logger';

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');

/**
 * Create HTTP servererver.
 */

const server = http.createServer(app.callback());

server.on('error', onError);
server.on('listening', onListening);
/**
 * Listen on provided port, on all network interfaces.
 */

init().then(() => {
    baseLogger.info('Polaris Server has started');
    server.listen(port);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: any): number | boolean {
    const portValue = parseInt(val, 10);

    if (isNaN(portValue)) {
        // named pipe
        return val;
    }

    if (portValue >= 0) {
        // port number
        return portValue;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any): void {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            baseLogger.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            baseLogger.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    baseLogger.info(`listening on ${bind}`);
}
