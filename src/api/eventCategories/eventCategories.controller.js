import * as eventCategoriesService from './eventCategories.service.js';

export async function getAll(req, res) {
  const eventCategories = await eventCategoriesService.getAll();
  res.json(eventCategories);
}

export async function getById(req, res) {
  const { id } = req.params;
  const eventCategoriesById = await eventCategoriesService.getById({ id });
  res.json(eventCategoriesById);
}

export async function patchId(req, res) {
  const { id } = req.params;
  const newProps = req.body;
  if (newProps.password) {
    res.startus(401);
    res.json('This property cant be updeted');
  }
  const eventCategoriesUpdated = await eventCategoriesService.patchId({ id, newProps });
  res.json(eventCategoriesUpdated);
}

export async function changePasswordRequest(req, res) {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    res.json({ message: 'Empty email' });
    return;
  }

  try {
    await eventCategoriesService.changePasswordRequest({ email });
  } catch (error) {
    const myError = JSON.parse(error.message);
    res.status(myError.status);
    res.json(myError.message);
    return;
  }
  res.status(200);
  res.json(`Email sent to ${email}`);
}

export async function changePassword(req, res) {
  const { token } = req.params;
  const { password, repeatedPassword } = req.body;

  if (!token || !password || !repeatedPassword) {
    res.status(405);
    res.json({ message: 'Authentication failed' });
    return;
  }

  if (password !== repeatedPassword) {
    res.status(405);
    res.json({ message: 'Authentication failed' });
    return;
  }

  let email;
  try {
    email = await eventCategoriesService.changePassword({ token });
  } catch (error) {
    const myError = JSON.parse(error.message);
    res.status(myError.status);
    res.json(myError.message);
    return;
  }

  let updatedEventCategories;
  try {
    updatedEventCategories = await eventCategoriesService.updateByEmail({ email, password });
  } catch (error) {
    const myError = JSON.parse(error.message);
    res.status(myError.status);
    res.json(myError.message);
    return;
  }
  res.json(updatedEventCategories);
}

export async function getEventCategoriesByToken(req, res) {
  const eventCategories = { ...req.eventCategories };
  delete eventCategories.password;
  res.json(eventCategories);
}
