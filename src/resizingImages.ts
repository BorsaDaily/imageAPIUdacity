// imprting package to dealing with images
import sharp from 'sharp';
async function resizeImage(
  _width: number,
  _height: number,
  imageName: string
): Promise<void> {
  try {
    await sharp(`src/assets/images/${imageName}.jpg`)
      .resize({
        width: _width,
        height: _height,
      })
      .toFile(
        `src/assets/images/Resizedimages/${imageName}-${_width}x${_height}.jpg`
      );
  } catch (error) {
    console.log(error);
  }
}
//export the module to extnal usage
export default resizeImage;
