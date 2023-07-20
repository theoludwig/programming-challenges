import test from 'node:test'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'

import sinon from 'sinon'

import { Challenge } from '../Challenge.js'
import { GitAffected } from '../GitAffected.js'
import { Solution } from '../Solution.js'
import { parseCommandOutput } from '../../utils/parseCommandOutput.js'

const gitAffected = new GitAffected()

await test('services/GitAffected', async (t) => {
  t.afterEach(() => {
    sinon.restore()
  })

  t.beforeEach(() => {
    sinon.stub(crypto, 'randomUUID').value(() => {
      return 'uuid'
    })
  })

  await t.test('parseCommandOutput', async (t) => {
    await t.test('returns the right output array', async () => {
      assert.deepStrictEqual(parseCommandOutput('1.txt\n 2.txt '), [
        '1.txt',
        '2.txt'
      ])
    })
  })

  await t.test('getAffectedSolutionsFromFiles', async (t) => {
    await t.test('returns the affected solutions', async () => {
      const files = [
        'challenges/hello-world/solutions/javascript/function/solution.js',
        'challenges/is-palindrome/solutions/c/function/input.c'
      ]
      const solutions = await gitAffected.getAffectedSolutionsFromFiles(files)
      assert.deepStrictEqual(solutions, [
        new Solution({
          challenge: new Challenge({ name: 'hello-world' }),
          name: 'function',
          programmingLanguageName: 'javascript'
        }),
        new Solution({
          challenge: new Challenge({ name: 'is-palindrome' }),
          name: 'function',
          programmingLanguageName: 'c'
        })
      ])
    })

    await t.test(
      'returns the affected solutions from Dockerfile changes',
      async () => {
        const files = ['templates/docker/javascript/Dockerfile']
        const solutions = await gitAffected.getAffectedSolutionsFromFiles(files)
        assert.deepStrictEqual(
          solutions[0],
          new Solution({
            challenge: new Challenge({ name: 'camel-case' }),
            name: 'function',
            programmingLanguageName: 'javascript'
          })
        )
        assert.deepStrictEqual(
          solutions[1],
          new Solution({
            challenge: new Challenge({ name: 'first-non-repeating-character' }),
            name: 'function',
            programmingLanguageName: 'javascript'
          })
        )
      }
    )

    await t.test(
      'returns the affected solutions from Docker template changes',
      async () => {
        const files = ['templates/docker/javascript/package.json']
        const solutions = await gitAffected.getAffectedSolutionsFromFiles(files)
        assert.deepStrictEqual(
          solutions[0],
          new Solution({
            challenge: new Challenge({ name: 'camel-case' }),
            name: 'function',
            programmingLanguageName: 'javascript'
          })
        )
        assert.deepStrictEqual(
          solutions[1],
          new Solution({
            challenge: new Challenge({ name: 'first-non-repeating-character' }),
            name: 'function',
            programmingLanguageName: 'javascript'
          })
        )
      }
    )

    await t.test(
      'returns the affected solutions from input/output files',
      async () => {
        const files = ['challenges/hello-world/test/1/input.txt']
        const solutions = await gitAffected.getAffectedSolutionsFromFiles(files)
        assert.deepStrictEqual(
          solutions[0],
          new Solution({
            challenge: new Challenge({ name: 'hello-world' }),
            name: 'function',
            programmingLanguageName: 'c'
          })
        )
        assert.deepStrictEqual(
          solutions[1],
          new Solution({
            challenge: new Challenge({ name: 'hello-world' }),
            name: 'function',
            programmingLanguageName: 'cpp'
          })
        )
        assert.deepStrictEqual(
          solutions[2],
          new Solution({
            challenge: new Challenge({ name: 'hello-world' }),
            name: 'function',
            programmingLanguageName: 'cs'
          })
        )
        assert.deepStrictEqual(
          solutions[3],
          new Solution({
            challenge: new Challenge({ name: 'hello-world' }),
            name: 'function',
            programmingLanguageName: 'dart'
          })
        )
      }
    )
  })
})
