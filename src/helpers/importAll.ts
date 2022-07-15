import path from "node:path";
import fs from "node:fs/promises";

async function importAll<T>(
  dirPath: string,
  mapFile?: (filename: string, file: any) => T
) {
  const filenames = await fs.readdir(dirPath);

  const promises = filenames.map((file) => import(path.resolve(dirPath, file)));

  const files = await Promise.all<T>(promises);

  return files.reduce((obj, file, index) => {
    const filename = filenames[index];
    obj[filename] = mapFile ? mapFile(filename, file) : files;
    return obj;
  }, {}) as Record<string, any>;
}

export default importAll;
