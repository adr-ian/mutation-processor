const { runTestSuite } = require("./_testRunner");
const { generateUpdateStatement } = require("../generateUpdateStatement");
const {
  SUB_DOCUMENT,
  MUTATIONS,
} = require("./_generateUpdateStatement_custom");

runTestSuite(generateUpdateStatement)(SUB_DOCUMENT)(MUTATIONS);
