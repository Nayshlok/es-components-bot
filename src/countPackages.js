const request = require('request-promise-native')

async function countInRepo(target) {
  const branch = target.ref
  const template = target.repo.contents_url
  const contentsUrl = `${template.replace('{+path}', 'packages')}?ref=${branch}`

  const contents = await request(contentsUrl, {json: true})

  return contents.length
}

async function countPackages (context) {
  const { head, body } = context.payload.pull_request
  return await countInRepo(head);
}

module.exports = countPackages