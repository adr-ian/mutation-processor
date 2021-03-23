const { runTestSuite } = require("./_testRunner");
const { generateUpdateStatement } = require("../generateUpdateStatement");
const {
  SUB_DOCUMENT,
  MUTATIONS,
} = require("./_generateUpdateStatement_sample");

runTestSuite(generateUpdateStatement)(SUB_DOCUMENT)(MUTATIONS);
