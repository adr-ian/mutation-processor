module.exports = {
  SUB_DOCUMENT: {
    _id: 1,
    name: "Johnny Content Creator",
    posts: [
      {
        _id: 2,
        value: "one",
        mentions: [],
      },
      {
        _id: 3,
        value: "two",
        mentions: [
          {
            _id: 5,
            text: "apple",
          },
          {
            _id: 6,
            text: "orange",
          },
        ],
      },
      {
        _id: 4,
        value: "three",
        mentions: [],
      },
    ],
  },
  MUTATIONS: {
    UPDATE: [
      {
        //INPUT: Update value field of post with _id of 2
        input: { posts: [{ _id: 2, value: "too" }] },
        //OUTPUT: Update value field of post at index 0
        output: { $update: { "posts.0.value": "too" } },
      },
      {
        //INPUT: Update text field in mention with _id of 5, for post with _id of 3
        input: { posts: [{ _id: 3, mentions: [{ _id: 5, text: "pear" }] }] },
        //OUTPUT: Update text field in mention at index 1, for post at index 0
        output: { $update: { "posts.1.mentions.0.text": "pear" } },
      },
    ],
    APPEND: [
      {
        //INPUT: Add post; notice that there is no _id because the post doesn't exist yet
        input: { posts: [{ value: "four" }] },
        //OUTPUT: Add post
        output: { $add: { posts: [{ value: "four" }] } },
      },
      {
        //INPUT: Add mention to post with _id of 3
        input: { posts: [{ _id: 3, mentions: [{ text: "banana" }] }] },
        //OUTPUT: Add mention for post at index 2
        output: { $add: { "posts.1.mentions": [{ text: "banana" }] } },
      },
    ],
    REMOVE: [
      {
        //INPUT: Remove post with _id of 2
        input: { posts: [{ _id: 2, _delete: true }] },
        //OUTPUT: Remove post at index 0
        output: { $remove: { "posts.0": true } },
      },
      {
        //INPUT: Remove mention with _id of 6, for post with _id of 3
        input: { posts: [{ _id: 3, mentions: [{ _id: 6, _delete: true }] }] },
        //OUTPUT: Remove mention at index 1, for post at index 1
        output: { $remove: { "posts.1.mentions.1": true } },
      },
    ],
    MULTI_OPERATION: [
      {
        //INPUT:
        input: {
          posts: [
            { _id: 2, value: "too" },
            { value: "four" },
            { _id: 4, _delete: true },
          ],
        },
        //OUTPUT:
        output: {
          $update: { "posts.0.value": "too" },
          $add: { posts: [{ value: "four" }] },
          $remove: { "posts.2": true }, // was wrong on the docs: $remove: { 'posts.1': true }
        },
      },
    ],
    DO_NOT_NEED: [
      {
        //INPUT that does not need to be supported:
        input: {
          posts: [
            { _id: 2, value: "too" },
            { _id: 2, _delete: true },
          ],
        },
        output: {},
      },
    ],
  },
};
