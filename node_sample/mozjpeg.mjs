import fs from 'fs';
import sharp from 'sharp';
import encode from '@wasm-codecs/mozjpeg';

(async () => {
  // read input image and convert it to a raw buffer using sharp
  const {
    data,
    info: { width, height, channels },
  } = await sharp('in.jpg')
    .raw()
    .toBuffer({ resolveWithObject: true });
  console.log(width, height, channels);

  // encode the image using @wasm-codecs/mozjpeg
  const output = await encode(data, { width, height, channels });

  // save the image to the file system
  fs.writeFileSync('out.jpg', output);
})();