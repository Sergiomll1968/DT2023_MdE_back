import eventCategoryModel from './eventCategories.model.js';

export async function getAll() {
  const eventCategories = await eventCategoryModel
    .find({
      deleted: false,
      confirmed: true,
    })
    .lean();

  return eventCategories;
}

export async function getById({ id }) {
  const eventCategory = await eventCategoryModel
    .findById(id)
    .lean();

  return eventCategory;
}

export async function create({
  eventCategoryName, password, phone, mail, rol,
}) {
  const newEventCategory = await eventCategoryModel.create({
    eventCategoryName, password, phone, mail, rol,
  });
  return newEventCategory;
}

export async function getByEmail({ mail }) {
  const eventCategory = await eventCategoryModel
    .findOne({ mail });
  return eventCategory;
}

export async function patchId({ id, newProps }) {
  const query = { _id: id };
  const updatedeventCategory = await eventCategoryModel.findOneAndUpdate(query, newProps, { new: true })
    .lean();
  return updatedeventCategory;
}

export async function updateByEmail({ email, hashedPassword }) {
  const query = { mail: email };
  const newProps = { password: hashedPassword };
  const updatedeventCategory = await eventCategoryModel.findOneAndUpdate(query, newProps, { new: true })
    .lean();
  return updatedeventCategory;
}

export async function getByEventCategoryName({ eventCategoryName }) {
  const eventCategory = await eventCategoryModel
    .findOne({ eventCategoryName })
    .lean();
  return eventCategory;
}

export async function confirm({ eventCategoryName }) {
  const eventCategoryConfirmed = await eventCategoryModel.updateOne(
    { eventCategoryName },
    {
      confirmed: true,
    },
  );
  return eventCategoryConfirmed;
}
