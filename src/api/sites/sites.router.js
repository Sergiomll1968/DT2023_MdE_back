import Router from 'express';
import * as sitesController from './sites.controller.js';
import admin from '../../middlewares/admin.middleware.js';

const router = Router();

router.get('/all', sitesController.getAll);

router.post('/', admin, sitesController.create);

router.patch('/archive/:id', admin, sitesController.archive);
router.patch('/:id', admin, sitesController.update);

export default router;
