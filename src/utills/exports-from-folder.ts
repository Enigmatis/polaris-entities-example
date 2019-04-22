import { readdir } from 'fs';
import { join } from 'path';
import * as utills from 'util';

const promiseReadDir = utills.promisify(readdir);
const flatArr = (arr: any[] = []) => [].concat(...arr);

export const getAllInFolder = async (path: string) => {
    const filePaths = await promiseReadDir(path);
    return flatArr(filePaths.map((filePath) => Object.values(require(join(path, filePath)))));
};
