import Router from 'express';
import * as eventCategoriesController from './eventCategories.controller.js';
import admin from '../../middlewares/admin.middleware.js';

const router = Router();

router.get('/all', admin, eventCategoriesController.getAll);
router.get('/getEventCategoryNamebytoken', eventCategoriesController.getEventCategoryNamebytoken);

router.get(
  '/:id',
  (req, res, next) => admin(req, res, next, { allowOwnUser: true, collection: 'eventCategories' }),
  eventCategoriesController.getById,
);

router.post('/changepasswordrequest', eventCategoriesController.changePasswordRequest);
router.post('/changepassword/:token', eventCategoriesController.changePassword);

router.patch(
  '/:id',
  (req, res, next) => admin(req, res, next, { allowOwnUser: true, collection: 'eventCategories' }),
  eventCategoriesController.patchId,
);

export default router;
