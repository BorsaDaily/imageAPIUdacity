// importing package for dealing with file system
import { constants, promises as fs } from 'fs';
async function checkExistance(folderPath: string): Promise<void> {
  try {
    //check if the folder exist and accessable
    await fs.access(folderPath, constants.R_OK);
  } catch {
    // create a folder if not exist
    fs.mkdir('src/assets/images/Resizedimages/');
  }
}
//export the module to extnal usage
export default checkExistance;
