import { Challenge } from '../Challenge.js'
import { GitAffected } from '../GitAffected.js'
import { Solution } from '../Solution.js'

const gitAffected = new GitAffected({ isContinuousIntegration: false })

describe('services/GitAffected - parseGitOutput', () => {
  it('returns the right output array', () => {
    expect(gitAffected.parseGitOutput('1.txt\n 2.txt ')).toEqual(['1.txt', '2.txt'])
  })
})

describe('services/GitAffected - getAffectedSolutionsFromFiles', () => {
  it('returns the affected solutions', async () => {
    const files = [
      'challenges/hello-world/solutions/javascript/function/solution.js',
      'challenges/is-palindrome/solutions/c/function/input.c'
    ]
    const solutions = await gitAffected.getAffectedSolutionsFromFiles(files)
    expect(solutions).toEqual([
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

  it('returns the affected solutions from Dockerfile changes', async () => {
    const files = ['templates/docker/javascript/Dockerfile']
    const solutions = await gitAffected.getAffectedSolutionsFromFiles(files)
    expect(solutions[0]).toEqual(
      new Solution({
        challenge: new Challenge({ name: 'camel-case' }),
        name: 'function',
        programmingLanguageName: 'javascript'
      })
    )
    expect(solutions[1]).toEqual(
      new Solution({
        challenge: new Challenge({ name: 'first-non-repeating-character' }),
        name: 'function',
        programmingLanguageName: 'javascript'
      })
    )
  })

  it('returns the affected solutions from Docker template changes', async () => {
    const files = ['templates/docker/javascript/package.json']
    const solutions = await gitAffected.getAffectedSolutionsFromFiles(files)
    expect(solutions[0]).toEqual(
      new Solution({
        challenge: new Challenge({ name: 'camel-case' }),
        name: 'function',
        programmingLanguageName: 'javascript'
      })
    )
    expect(solutions[1]).toEqual(
      new Solution({
        challenge: new Challenge({ name: 'first-non-repeating-character' }),
        name: 'function',
        programmingLanguageName: 'javascript'
      })
    )
  })

  it('returns the affected solutions from input/output files', async () => {
    const files = ['challenges/hello-world/test/1/input.txt']
    const solutions = await gitAffected.getAffectedSolutionsFromFiles(files)
    expect(solutions[0]).toEqual(
      new Solution({
        challenge: new Challenge({ name: 'hello-world' }),
        name: 'function',
        programmingLanguageName: 'c'
      })
    )
    expect(solutions[1]).toEqual(
      new Solution({
        challenge: new Challenge({ name: 'hello-world' }),
        name: 'function',
        programmingLanguageName: 'cpp'
      })
    )
    expect(solutions[2]).toEqual(
      new Solution({
        challenge: new Challenge({ name: 'hello-world' }),
        name: 'function',
        programmingLanguageName: 'cs'
      })
    )
    expect(solutions[3]).toEqual(
      new Solution({
        challenge: new Challenge({ name: 'hello-world' }),
        name: 'function',
        programmingLanguageName: 'dart'
      })
    )
  })
})
