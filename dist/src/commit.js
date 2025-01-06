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
exports.commitChanges = void 0;
const action_1 = require("./action");
const simple_git_1 = require("simple-git");
const git = (0, simple_git_1.simpleGit)({ baseDir: process.cwd() });
const commitChanges = (branch, message, files, credentials) => {
    (0, action_1.doAction)('Commiting files', (core) => __awaiter(void 0, void 0, void 0, function* () {
        core.info('> Setting up git profile...');
        yield git.addConfig('user.name', credentials.name);
        yield git.addConfig('user.email', credentials.email);
        core.info('> Adding files to git...');
        core.startGroup('Files:');
        for (const file of files) {
            yield git.add(file);
            core.info(file);
        }
        core.endGroup();
        core.info('> Committing changes...');
        yield git.commit(message, files);
        core.info(`> Checking out ${branch} branch...`);
        yield git.checkout(branch);
        core.info(`> Pushing to branch ${branch}...`);
        yield git.push('origin', branch);
    }));
};
exports.commitChanges = commitChanges;
