# mutation-processor
Application that receives a document and an array of mutations and outputs the path and operation

# How to run

## Application entrypoint
```sh
$ yarn start
```
This will run the `index.js` file, which is just a sample use of the `generateUpdateStatement` function applied on a provided sample input.

e.g:
```js
generateUpdateStatement(SUB_DOCUMENT, MUTATIONS.UPDATE[0].input)
```
In this case, it will run the first mutation update sample on the `_generateUpdateStatement_sample` file.

## Tests
```sh
$ yarn test
```

This will run the test framework [Tape](https://github.com/substack/tape) on all `.test.js`, via the test runner function on `./test/_testRunner`

To create a new test, one must:
1. create a test file on `/test` folder.
2. add a sample document and expected outputs for input scenarios, in a sample file, following the structure:
```js
{
  SUB_DOCUMENT: {},
  MUTATIONS: {
    TEST_TYPE1: [
      {input, output}
    ],
    TEST_TYPE2: [
      {input, output}
    ]
  }
}
```
3. copy the test boilerplate file `./test/generateUpdateStatement_sample.test.js`

```js
const { runTestSuite } = require("./_testRunner");
const { generateUpdateStatement } = require("../generateUpdateStatement");
const {
  SUB_DOCUMENT,
  MUTATIONS,
} = require("./_generateUpdateStatement_sample");

runTestSuite(generateUpdateStatement)(SUB_DOCUMENT)(MUTATIONS);
```

and change `"./_generateUpdateStatement_sample"` with the file created in 2

4. run `yarn test`

# To do

Test runner function could be improved to simplify the steps 1,2,3 and 4 by, for example, traversing the files and importing them dynamically, so one would just
execute step 2.
