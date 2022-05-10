"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing npm required packages
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const resizedFolderCreation_1 = __importDefault(require("./resizedFolderCreation"));
const resizingImages_1 = __importDefault(require("./resizingImages"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
// make instance from express package
const app = (0, express_1.default)();
// make instance from middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = 3000;
app.listen(port);
// Get Request for home Page
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // resized image folder location
    const folderPath = 'src/assets/images/Resizedimages/';
    // declaring the required parameters
    const widthString = req.query.width;
    const heightString = req.query.height;
    const imageName = req.query.name;
    const width = parseInt(widthString);
    const height = parseInt(heightString);
    // Sending Comment if the required parameters is Empty
    if (widthString === undefined ||
        heightString === undefined ||
        width === undefined ||
        height === undefined ||
        isNaN(width) ||
        isNaN(height) ||
        width <= 0 ||
        height <= 0 ||
        imageName === undefined) {
        return res.send('Please Enter a valid paramreters');
    }
    else if ((width, height)) {
        try {
            // check the inserted image name available
            yield fs_1.promises
                .access(`src/assets/images/${imageName}.jpg`, fs_1.constants.R_OK)
                .then(() => __awaiter(void 0, void 0, void 0, function* () {
                // check the existance of the resized image folder and create one if not exist
                yield (0, resizedFolderCreation_1.default)(folderPath);
            }))
                .then(() => __awaiter(void 0, void 0, void 0, function* () {
                const filepath = `${folderPath}${imageName}-${width}x${height}.jpg`;
                // create resized image
                try {
                    //check if the image exist and accessable
                    yield fs_1.promises.access(filepath, fs_1.constants.R_OK);
                    // sending the image to the user
                    setTimeout(() => {
                        res.sendFile(path_1.default.resolve(filepath));
                    }, 1000);
                }
                catch (_b) {
                    // create a image
                    yield (0, resizingImages_1.default)(width, height, imageName);
                }
                return filepath;
            }))
                .then((filepath) => {
                // return the final output to the user
                function imageSending(filepath) {
                    return __awaiter(this, void 0, void 0, function* () {
                        try {
                            //Calling handler after delay to ensure image creation
                            setTimeout(() => {
                                res.sendFile(path_1.default.resolve(filepath));
                            }, 1000);
                        }
                        catch (err) {
                            // handling Error if the image not created
                            res.send(err);
                        }
                    });
                }
                // calling function to send the image to the user
                imageSending(filepath);
            });
        }
        catch (_a) {
            res.send('Please Enter a valid image name');
        }
    }
}));
// exporting the app for End Point testing
exports.default = app;
