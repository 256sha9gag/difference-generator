import * as path from 'path';
import getObjs from '../src/getobjs.js';
import {expect, test} from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'node:fs';

test ('getobjs', () => {
    const trueResult = '{\n- "follow": false\n "host": hexlet.io\n- "proxy": 123.234.53.22\n- "timeout": 50\n+ "timeout": 20\n+ "verbose": true\n}';
    const obj1 = {
        host: "hexlet.io",
        timeout: 50,
        proxy: "123.234.53.22",
        follow: false
    };

    const obj2 = {
        timeout: 20,
        verbose: true,
        host: "hexlet.io"
    };

    const trueObj = [obj1, obj2];

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
    const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

    expect(trueObj).toBe(getObjs(readFile('file1.json'), readFile('file2.json')));
})