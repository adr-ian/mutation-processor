R = require("ramda");

const findIndexByIdInSubdocumentArray = (key) => (id) =>
  R.pipe(
    R.path(R.split(".", key)),
    R.findIndex(R.propEq("_id", id)),
    R.ifElse(
      R.lt(-1),
      R.identity,
      R.always(
        Error(`Element with id=${id} not found on subdocument array "${key}"`)
      )
    )
  );

const isSDA = R.is(Array);
const reservedKeys = ["_id", "_delete"];
const extractMutation = (key) => R.pipe(R.prop(key), R.head);

const getTargetKey = R.pipe(
  R.keys,
  R.reject(R.includes(R.__, reservedKeys)),
  R.head
);

//prettier-ignore
const generateUpdateStatement = (document, inputMutation) => {

  const processMutation = accumulatedPath => mutation => {
    const { _id, _delete } = mutation
    let operation = '$add'
    if(_id) {
      operation = '$update'
    }
    if(_delete) {
      operation = '$remove'
    }

    const createPathValue = operation => targetKey => mutation =>
      operation === `$add` ?
        [{ [targetKey]: mutation[targetKey]}]
        : operation === `$remove` ?
          true
          : mutation[targetKey]

    const targetKey = getTargetKey(mutation)

    let path = accumulatedPath;
    if(_id) {
      const index = findIndexByIdInSubdocumentArray(accumulatedPath)(_id)(document)
      path = `${accumulatedPath}.${index}${targetKey ? `.${targetKey}` : ''}` // condtional for remove. targetKey is undefined in this case
    }

    if(!isSDA(mutation[targetKey])) {
      return { [operation]: {
        [path]: createPathValue(operation)(targetKey)(mutation) }
     }
    }
    return processMutation(path)(extractMutation(targetKey)(mutation))
  }

  const targetKey = getTargetKey(inputMutation)
  return R.pipe(
    R.prop(targetKey),
    R.map(processMutation(targetKey)),
    R.mergeAll,
  )(inputMutation)
}

module.exports = {
  generateUpdateStatement,
};
