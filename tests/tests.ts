import * as fs from 'fs';
import * as path from 'path';

describe('tests', () => {
  const MATCHES_TS_FILE = /\.tsx?/;
  const MATCHES_SRC_IMPORT = /from\s?'\.\.\/src(.*?)'/;

  it('should only import from src directory', () => {
    const files = fs.readdirSync(__dirname);

    files.forEach(filePath => {
      const resolvedPath = path.resolve(__dirname, filePath);
      const isDirectory = fs.lstatSync(resolvedPath).isDirectory();
      const extension = path.extname(filePath);

      if (!isDirectory && MATCHES_TS_FILE.test(extension)) {
        const fileName = path.basename(filePath);
        const contents = fs.readFileSync(resolvedPath, 'utf8');

        const result = MATCHES_SRC_IMPORT.exec(contents);

        if (result && result[1]) {
          throw new Error(
            `Test "${fileName}" did not import from '../src', instead imported ${
              result[0]
            }`
          );
        }
      }
    });
  });
});
