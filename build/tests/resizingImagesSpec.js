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
// importing packages to deal with image sizing
const sharp_1 = __importDefault(require("sharp"));
const resizedFolderCreation_1 = __importDefault(require("../resizedFolderCreation"));
const resizingImages_1 = __importDefault(require("../resizingImages"));
// assign parameters for testing image
const width = 390;
const height = 390;
const imageName = 'fjord';
const folderPath = 'src/assets/images/Resizedimages/';
// tests
describe('Test Resize Image Process', () => {
    it('check if Image with correct height and related folder created', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, resizedFolderCreation_1.default)(folderPath).then(() => {
            (0, resizingImages_1.default)(width, height, imageName);
        }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                const metadata = (0, sharp_1.default)(`src/assets/images/Resizedimages/${imageName}-${width}x${height}.jpg`).metadata();
                expect((yield (metadata)).height).toBe(height);
            }), 1001);
        }));
    }));
    it('check if Image with correct width ', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, resizedFolderCreation_1.default)(folderPath).then(() => {
            (0, resizingImages_1.default)(width, height, imageName);
        }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
                const metadata = (0, sharp_1.default)(`src/assets/images/Resizedimages/${imageName}-${width}x${height}.jpg`).metadata();
                expect((yield (metadata)).width).toBe(width);
            }), 1001);
        }));
    }));
});
