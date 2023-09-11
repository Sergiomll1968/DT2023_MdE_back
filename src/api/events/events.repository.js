import eventsModel from './events.model.js';

export async function getAll() {
  const events = await eventsModel
    .find({ deleted: false })
    .lean();
  return events;
}

export async function create({ eventData }) {
  const newevent = await eventsModel
    .create(eventData);
  return newevent;
}

export async function update({ id, propsToUpdate }) {
  const updatedProps = await eventsModel
    .findByIdAndUpdate({ _id: id }, propsToUpdate, { new: true });
  return updatedProps;
}

export async function archive({ id }) {
  const eventToArchive = await eventsModel
    .findByIdAndUpdate(id, { deleted: true });
  return eventToArchive;
}
