// Importing npm required packages
import express, { Request, Response } from 'express';
import cors from 'cors';
import checkExistance from './resizedFolderCreation';
import resizeImage from './resizingImages';
import path from 'path';
import { constants, promises as fs } from 'fs';
// make instance from express package
const app = express();
// make instance from middlewares
app.use(cors());
app.use(express.json());
const port = 3000;
app.listen(port);
// Get Request for home Page
app.get('/', async (req: Request, res: Response) => {
  // resized image folder location
  const folderPath = 'src/assets/images/Resizedimages/';
  // declaring the required parameters
  const widthString = req.query.width as string;
  const heightString = req.query.height as string;
  const imageName = req.query.name as string;
  const width: number = parseInt(widthString);
  const height: number = parseInt(heightString);
  // Sending Comment if the required parameters is Empty

  if (
    widthString === undefined ||
    heightString === undefined ||
    width === undefined ||
    height === undefined ||
    isNaN(width) ||
    isNaN(height) ||
    width <= 0 ||
    height <= 0 ||
    imageName === undefined
  ) {
    return res.send('Please Enter a valid paramreters');
  } else if ((width as number, height as number)) {
    try {
      // check the inserted image name available
      await fs
        .access(`src/assets/images/${imageName}.jpg`, constants.R_OK)
        .then(async () => {
          // check the existance of the resized image folder and create one if not exist
          await checkExistance(folderPath);
        })
        .then(async () => {
          const filepath = `${folderPath}${imageName}-${width}x${height}.jpg`;
          // create resized image
          try {
            //check if the image exist and accessable
            await fs.access(filepath, constants.R_OK);
            // sending the image to the user
            setTimeout(() => {
              res.sendFile(path.resolve(filepath));
            }, 1000);
          } catch {
            // create a image
            await resizeImage(width, height, imageName);
          }
          return filepath;
        })
        .then((filepath) => {
          // return the final output to the user
          async function imageSending(filepath: string): Promise<void> {
            try {
              //Calling handler after delay to ensure image creation
              setTimeout(() => {
                res.sendFile(path.resolve(filepath));
              }, 1000);
            } catch (err) {
              // handling Error if the image not created
              res.send(err);
            }
          }
          // calling function to send the image to the user
          imageSending(filepath);
        });
    } catch {
      res.send('Please Enter a valid image name');
    }
  }
});
// exporting the app for End Point testing
export default app;
