const { generateUpdateStatement } = require("./generateUpdateStatement");
const {
  SUB_DOCUMENT,
  MUTATIONS,
} = require("./test/_generateUpdateStatement_sample");

// sample run on first update sample:
generateUpdateStatement(SUB_DOCUMENT, MUTATIONS.UPDATE[0].input);
