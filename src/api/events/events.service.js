import * as eventsRepo from './events.repository.js';

export async function getAll() {
  const events = await eventsRepo.getAll();
  return events;
}

export async function create({ eventData }) {
  const events = await eventsRepo.create({ eventData });
  return events;
}

export async function update({ id, propsToUpdate }) {
  const updatedProps = await eventsRepo.update({ id, propsToUpdate });
  return updatedProps;
}

export async function archive({ id }) {
  const eventToArchive = await eventsRepo.archive({ id });
  return eventToArchive;
}
