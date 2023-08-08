const listHelper = require('../utils/list_helper')

const blogs = []

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

