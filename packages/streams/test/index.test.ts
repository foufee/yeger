import { describe, expect, it } from 'vitest'

import { Stream } from '~/index'
import { TestUtils } from '~test/test-utils'

describe('streams', () => {
  it('works with complex chains', () => {
    const res = Stream.from([null, 0, 1, 2, undefined, 3, 4, 5, 6, 7, 8, 9])
      .filterNonNull()
      .limit(6)
      .filter((x) => x % 2 !== 0)
      .map((x) => x * 2)
      .map((x) => `${x}.0`)
      .toArray()
    expect(res).toEqual(['2.0', '6.0', '10.0'])
  })

  it('can sum', () => {
    let count = 0
    let forOfResult = 0
    for (const item of TestUtils.source) {
      if (item % 2 === 0) {
        continue
      }
      count++
      forOfResult += TestUtils.fibonacci(
        Number.parseInt(`${item * 2}.5`, 10) % 20
      )
      if (count === TestUtils.limit) {
        break
      }
    }

    const streamResult = TestUtils.testStream.sum()
    expect(streamResult).toEqual(forOfResult)
  })

  it('can sum non-numbers', () => {
    const streamResult = Stream.from(['hello', 'world', '!'])
      .limit(2)
      .sum((x) => x.length)
    expect(streamResult).toEqual(10)
  })

  it('can iterate objects', () => {
    const streamResult = Stream.fromObject({ hello: 'world', 5: true })
      .map(([key, value]) => `${key} ${value}`)
      .toArray()
    expect(streamResult).toEqual(['5 true', 'hello world'])
  })

  it('can create a map with a mapper', () => {
    const streamResult = Stream.from([1, 2]).toMap((x) => x.toString())
    expect(streamResult).toEqual(
      new Map([
        ['1', 1],
        ['2', 2],
      ])
    )
  })

  it('can flatmap', () => {
    const streamResult = Stream.from([1, 2, 3])
      .flatMap((x) => [x, x])
      .toArray()
    expect(streamResult).toEqual([1, 1, 2, 2, 3, 3])
  })
})
