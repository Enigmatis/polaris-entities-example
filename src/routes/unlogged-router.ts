import Router = require('koa-router');
import { healthController, versionController } from '../controllers/common-controller';

export const commonRouter = new Router();
commonRouter.get('/v', versionController);
commonRouter.get('health', healthController);
