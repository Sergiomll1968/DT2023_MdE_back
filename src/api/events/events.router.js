import Router from 'express';
import * as eventsController from './events.controller.js';
import admin from '../../middlewares/admin.middleware.js';

const router = Router();

router.get('/all', eventsController.getAll);

router.post('/', admin, eventsController.create);

router.patch('/archive/:id', admin, eventsController.archive);
router.patch('/:id', admin, eventsController.update);

export default router;
