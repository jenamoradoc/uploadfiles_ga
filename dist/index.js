"use strict";
//index
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const Loki = require("lokijs");
const utils_1 = require("./utils");
//setup db
const DB_NAME = 'dbjson';
const COLLECTION_NAME = 'images';
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/` }); // configuracion de multer
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });
//setup app
const app = express();
app.use(cors());
app.post('/profile', upload.single('avatar'), (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const col = yield utils_1.loadCollection(COLLECTION_NAME, db);
        const data = col.insert(req.file);
        db.saveDatabase();
        res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
    }
    catch (err) {
        res.sendStatus(400);
    }
}));
//port
app.listen(3000, function () {
    console.log('listening on port 3000!');
});
//# sourceMappingURL=index.js.map