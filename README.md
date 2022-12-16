# Learning project: Difference generator

## Hexlet tests, automatic tests and linter status:
[![Actions Status](https://github.com/256sha9gag/fullstack-javascript-project-46/workflows/hexlet-check/badge.svg)](https://github.com/256sha9gag/fullstack-javascript-project-46/actions)
[![Node CI](https://github.com/256sha9gag/fullstack-javascript-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/256sha9gag/fullstack-javascript-project-46/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/c550919c90aee56c6b95/maintainability)](https://codeclimate.com/github/256sha9gag/fullstack-javascript-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c550919c90aee56c6b95/test_coverage)](https://codeclimate.com/github/256sha9gag/fullstack-javascript-project-46/test_coverage)

## Description:
A difference generator is a program that determines the difference between two data structures.

### Utility features:
 - Support for different input formats: ```yaml```, ```json```, ```ini``` .
 - Generation a report in the form of ```plain text```, ```stylish```, ```json``` .

### Example of usage
```bash
# plain format
gendiff --format plain path/to/file.yml another/path/file.json

Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed

# stylish format
gendiff filepath1.json filepath2.json

{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}

```