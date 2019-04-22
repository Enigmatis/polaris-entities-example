import uuid = require('uuid/v4');

export const getCurrId = (prefix?: string) => `RMH-${prefix ? `${prefix.toUpperCase()}-` : ''}${uuid()}`;
