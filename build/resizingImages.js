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
// imprting package to dealing with images
const sharp_1 = __importDefault(require("sharp"));
function resizeImage(_width, _height, imageName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, sharp_1.default)(`src/assets/images/${imageName}.jpg`)
                .resize({
                width: _width,
                height: _height,
            })
                .toFile(`src/assets/images/Resizedimages/${imageName}-${_width}x${_height}.jpg`);
        }
        catch (error) {
            console.log(error);
        }
    });
}
//export the module to extnal usage
exports.default = resizeImage;
