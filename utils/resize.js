'use strict'

const sharp = require('sharp')

const makeThumbnail = async (file, thumbname) => {
  // TODO: use sharp to create a png thumbnail of
  const thumbnail = await sharp(file).resize(160, 160).toFile(thumbname)

  return thumbnail
}

module.exports = {
  makeThumbnail,
}
