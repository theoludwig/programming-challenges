import tap from 'tap'

import { Challenge } from '../Challenge.js'
import { GitAffected } from '../GitAffected.js'
import { Solution } from '../Solution.js'

const gitAffected = new GitAffected({ isContinuousIntegration: false })

await tap.test('services/GitAffected', async (t) => {
  await t.test('parseGitOutput', async (t) => {
    await t.test('returns the right output array', async (t) => {
      t.same(gitAffected.parseGitOutput('1.txt\n 2.txt '), ['1.txt', '2.txt'])
    })
  })

  await t.test('getAffectedSolutionsFromFiles', async (t) => {
    await t.test('returns the affected solutions', async (t) => {
      const files = [
        'challenges/hello-world/solutions/javascript/function/solution.js',
        'challenges/is-palindrome/solutions/c/function/input.c'
      ]
      const solutions = await gitAffected.getAffectedSolutionsFromFiles(files)
      t.same(solutions, [
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
      async (t) => {
        const files = ['templates/docker/javascript/Dockerfile']
        const solutions = await gitAffected.getAffectedSolutionsFromFiles(files)
        t.same(
          solutions[0],
          new Solution({
            challenge: new Challenge({ name: 'camel-case' }),
            name: 'function',
            programmingLanguageName: 'javascript'
          })
        )
        t.same(
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
      async (t) => {
        const files = ['templates/docker/javascript/package.json']
        const solutions = await gitAffected.getAffectedSolutionsFromFiles(files)
        t.same(
          solutions[0],
          new Solution({
            challenge: new Challenge({ name: 'camel-case' }),
            name: 'function',
            programmingLanguageName: 'javascript'
          })
        )
        t.same(
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
      async (t) => {
        const files = ['challenges/hello-world/test/1/input.txt']
        const solutions = await gitAffected.getAffectedSolutionsFromFiles(files)
        t.same(
          solutions[0],
          new Solution({
            challenge: new Challenge({ name: 'hello-world' }),
            name: 'function',
            programmingLanguageName: 'c'
          })
        )
        t.same(
          solutions[1],
          new Solution({
            challenge: new Challenge({ name: 'hello-world' }),
            name: 'function',
            programmingLanguageName: 'cpp'
          })
        )
        t.same(
          solutions[2],
          new Solution({
            challenge: new Challenge({ name: 'hello-world' }),
            name: 'function',
            programmingLanguageName: 'cs'
          })
        )
        t.same(
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
