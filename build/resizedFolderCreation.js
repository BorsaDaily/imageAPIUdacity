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
Object.defineProperty(exports, "__esModule", { value: true });
// importing package for dealing with file system
const fs_1 = require("fs");
function checkExistance(folderPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //check if the folder exist and accessable
            yield fs_1.promises.access(folderPath, fs_1.constants.R_OK);
        }
        catch (_a) {
            // create a folder if not exist
            fs_1.promises.mkdir('src/assets/images/Resizedimages/');
        }
    });
}
//export the module to extnal usage
exports.default = checkExistance;
