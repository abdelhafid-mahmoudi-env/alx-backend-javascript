# 0x03. ES6 Data Manipulation

## Overview

This project focuses on ES6 data manipulation techniques in JavaScript. You will learn how to work with arrays and various data structures such as Typed Arrays, Sets, Maps, and WeakMaps. By the end of this project, you should be able to efficiently manipulate and manage data using these structures.

## Resources

Read or watch the following resources to help you complete the project:

- [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Typed Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)
- [Set Data Structure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [Map Data Structure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

## Learning Objectives

At the end of this project, you are expected to be able to explain to anyone, without the help of Google:

- How to use `map`, `filter`, and `reduce` on arrays
- Typed arrays
- The `Set`, `Map`, and `WeakMap` data structures

## Requirements

- All your files will be executed on Ubuntu 18.04 LTS using NodeJS 12.11.x
- Allowed editors: `vi`, `vim`, `emacs`, `Visual Studio Code`
- All your files should end with a new line
- A `README.md` file, at the root of the folder of the project, is mandatory
- Your code should use the `.js` extension
- Your code will be tested using Jest and the command `npm run test`
- Your code will be verified against lint using ESLint
- Your code needs to pass all the tests and lint. You can verify the entire project running `npm run full-test`
- All of your functions must be exported

## Setup

### Install NodeJS 12.11.x

In your home directory, run the following commands:

```bash
curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs -y
nodejs -v
# Should output: v12.11.1
npm -v
# Should output: 6.11.3
