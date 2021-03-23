module.exports = {
  SUB_DOCUMENT: {
    _id: 1,
    name: "Johnny Content Creator",
    things: [
      {
        _id: 2,
        someOtherKey: "one",
        levelOne: [],
      },
      {
        _id: 7,
        someOtherKey: "two",
        levelOne: [
          {
            _id: 1,
            text: "apple",
            levelTwo: [
              {
                _id: 5,
                yetAnotherKey: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  MUTATIONS: {
    UPDATE: [
      {
        input: { things: [{ _id: 7, someOtherKey: "a" }] },
        output: { $update: { "things.1.someOtherKey": "a" } },
      },
      {
        input: {
          things: [
            {
              _id: 7,
              levelOne: [
                { _id: 1, levelTwo: [{ _id: 5, yetAnotherKey: true }] },
              ],
            },
          ],
        },
        output: {
          $update: { "things.1.levelOne.0.levelTwo.0.yetAnotherKey": true },
        },
      },
    ],
  },
};
