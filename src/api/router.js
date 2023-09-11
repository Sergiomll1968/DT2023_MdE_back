import Router from 'express';

import bookingsRouter from './bookings/bookings.router.js';
import eventCategoriesRouter from './eventCategories/eventCategories.router.js';
import eventsRouter from './events/events.router.js';
import sitesRouter from './sites/sites.router.js';
import usersRouter from './users/users.router.js';

import * as authController from './auth/auth.controller.js';

const router = Router();

router.use('/bookings', bookingsRouter);
router.use('/eventCategories', eventCategoriesRouter);
router.use('/events', eventsRouter);
router.use('/sites', sitesRouter);
router.use('/users', usersRouter);

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/confirm/:emailtoken', authController.confirm);

router.get('/test', (req, res) => {
  res.send('Desafio tripulaciones!');
});

export default router;
