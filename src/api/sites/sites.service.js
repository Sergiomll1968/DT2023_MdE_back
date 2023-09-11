import * as sitesRepo from './sites.repository.js';

export async function getAll() {
  const sites = await sitesRepo.getAll();
  return sites;
}

export async function create({ siteData }) {
  const sites = await sitesRepo.create({ siteData });
  return sites;
}

export async function update({ id, propsToUpdate }) {
  const updatedProps = await sitesRepo.update({ id, propsToUpdate });
  return updatedProps;
}

export async function archive({ id }) {
  const siteToArchive = await sitesRepo.archive({ id });
  return siteToArchive;
}
