import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';

describe('tests', () => {
  const MATCHES_TS_FILE = /\.tsx?/;
  const MATCHES_SRC_IMPORT = /from\s?'\.\.\/src(.*?)'/g;
  const MATCHES_EXCLUSIONS = /src\/constants/;

  it('should only import from src directory', () => {
    const files = fs.readdirSync(__dirname);

    files.forEach(filePath => {
      const resolvedPath = path.resolve(__dirname, filePath);
      const isDirectory = fs.lstatSync(resolvedPath).isDirectory();
      const extension = path.extname(filePath);

      if (!isDirectory && MATCHES_TS_FILE.test(extension)) {
        const fileName = path.basename(filePath);
        const contents = fs.readFileSync(resolvedPath, 'utf8');

        let result = MATCHES_SRC_IMPORT.exec(contents);

        while (result) {
          if (result && result[1] && !MATCHES_EXCLUSIONS.test(result[0])) {
            throw new Error(
              `Test "${fileName}" did not import from '../src', instead imported ${
                result[0]
              }`
            );
          }

          result = MATCHES_SRC_IMPORT.exec(contents);
        }
      }
    });
  });
});

describe('all files', () => {
  const MATCHES_NODE_MODULES_IMPORT = /from\s?'.*?\/node_modules\/.*?'/;

  it('should not import node_modules relatively', () => {
    const cwd = path.join(__dirname, '../');
    const pattern = './{src,tests,examples}/**/*.ts?(x)';

    const files = glob.sync(pattern, { cwd });

    files.forEach(filePath => {
      const resolvedPath = path.resolve(cwd, filePath);
      const isDirectory = fs.lstatSync(resolvedPath).isDirectory();

      if (!isDirectory) {
        const contents = fs.readFileSync(resolvedPath, 'utf8');
        const match = MATCHES_NODE_MODULES_IMPORT.exec(contents);

        if (match) {
          throw new Error(
            `${filePath} imported node_modules relatively ${match[0]}`
          );
        }
      }
    });
  });
});
