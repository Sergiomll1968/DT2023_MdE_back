import sitesModel from './sites.model.js';

export async function getAll() {
  const sites = await sitesModel
    .find({ deleted: false })
    .lean();
  return sites;
}
export async function create({ siteData }) {
  const newSite = await sitesModel
    .create(siteData);
  return newSite;
}

export async function update({ id, propsToUpdate }) {
  const updatedProps = await sitesModel
    .findByIdAndUpdate({ _id: id }, propsToUpdate, { new: true });
  return updatedProps;
}

export async function archive({ id }) {
  const siteToArchive = await sitesModel
    .findByIdAndUpdate(id, { deleted: true });
  return siteToArchive;
}
