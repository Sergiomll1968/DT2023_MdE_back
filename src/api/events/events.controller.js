import * as eventsEvent from './events.service.js';

export async function getAll(req, res) {
  const events = await eventsEvent.getAll();
  res.json(events);
}

export async function create(req, res) {
  const eventData = req.body;
  const events = await eventsEvent.create({ eventData });
  res.json(events);
}

export async function update(req, res) {
  const { id } = req.params;
  const propsToUpdate = req.body;
  const updatedProps = await eventsEvent.update({ id, propsToUpdate });
  res.json(updatedProps);
}

export async function archive(req, res) {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    res.json('Empty required params');
  }
  const eventToArchive = await eventsEvent.archive({ id });
  res.json(eventToArchive);
}
