import * as sitesService from './sites.service.js';

export async function getAll(req, res) {
  const sites = await sitesService.getAll();
  res.json(sites);
}

export async function create(req, res) {
  const siteData = req.body;
  const sites = await sitesService.create({ siteData });
  res.json(sites);
}

export async function update(req, res) {
  const { id } = req.params;
  const propsToUpdate = req.body;
  const updatedProps = await sitesService.update({ id, propsToUpdate });
  res.json(updatedProps);
}

export async function archive(req, res) {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    res.json('Empty required params');
  }
  const siteToArchive = await sitesService.archive({ id });
  res.json(siteToArchive);
}
