// importing packages to deal with image sizing
import sharp from 'sharp';
import checkExistance from '../resizedFolderCreation';
import resizeImage from '../resizingImages';
// assign parameters for testing image
const width = 390;
const height = 390 ;
const imageName ='fjord';
const folderPath ='src/assets/images/Resizedimages/';
// tests
describe('Test Resize Image Process', () => {
    it('check if Image with correct height and related folder created',async () => {
        checkExistance(folderPath).then(()=>{
            resizeImage(width,height,imageName);
          }).then(async ()=>{
            setTimeout(async () => {
              const metadata = sharp(`src/assets/images/Resizedimages/${imageName}-${width}x${height}.jpg`).metadata();
              expect((await (metadata)).height).toBe(height);
            }, 1001)
            
            
          }) 
    })
    it('check if Image with correct width ',async () => {
        checkExistance(folderPath).then(()=>{
            resizeImage(width,height,imageName);
          }).then(async ()=>{
            setTimeout(async () => {
              const metadata = sharp(`src/assets/images/Resizedimages/${imageName}-${width}x${height}.jpg`).metadata();
              expect((await (metadata)).width).toBe(width);
            }, 1001)
            
          }) 
    })
});