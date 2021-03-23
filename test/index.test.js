const test = require('tape')

test('This is my first test #yolo', (t) => {
  t.plan(3)
  t.equal(3, 3)
  t.deepEqual([1, 2, 3], [1, 2, 3])
  t.pass('We good')
  t.end()
})
