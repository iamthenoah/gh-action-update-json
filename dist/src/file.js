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
exports.updateJson = void 0;
const action_1 = require("./action");
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const readJson = (0, util_1.promisify)(fs_1.default.readFile);
const writeJson = (0, util_1.promisify)(fs_1.default.writeFile);
const updateJson = ({ file, key, value }) => {
    (0, action_1.doAction)('Updating JSON file', (core) => __awaiter(void 0, void 0, void 0, function* () {
        core.info(`> Updating ${file} with '${key}=${value}'`);
        const data = yield readJson(file, 'utf8');
        const json = JSON.parse(data);
        const keys = key.split('.');
        let current = json;
        for (let i = 0; i < keys.length - 1; i++) {
            const k = keys[i];
            if (!(k in current)) {
                current[k] = {};
            }
            current = current[k];
        }
        current[keys[keys.length - 1]] = value;
        yield writeJson(file, JSON.stringify(json, null, 2));
    }));
};
exports.updateJson = updateJson;
