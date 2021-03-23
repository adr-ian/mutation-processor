const test = require("tape");

const R = require("ramda");

const testExecute = (subDocument) => (fn) => ({ description, input, output }) =>
  test(description, (t) => {
    t.plan(1);
    t.deepEqual(fn(subDocument, input), output);
    t.end();
  });

const runTestSuite = (f) => (subDocument) =>
  R.pipe(
    R.dissoc("DO_NOT_NEED"),
    R.toPairs,
    R.map(([testType, testCases]) =>
      //prettier-ignore
      R.map(
        R.pipe(
          R.assoc('description', `${testType} test case`),
          testExecute(subDocument)(f)
        )
      )(testCases)
    )
  );

/*
type TEST_SUITES = {
  [TEST_SUITE_LABEL]: [
    { input, output }
  ]
}
*/

// runTestSuite :: Function -> Object -> TEST_SUITES
// runTestSuite(FUNCTION)(SUB_DOCUMENT)(TEST_SUITES)

module.exports = {
  runTestSuite,
};
