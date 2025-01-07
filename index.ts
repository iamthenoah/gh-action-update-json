import * as core from '@actions/core'
import { updateJson } from './src/file'
import { commitChanges } from './src/commit'
import path from 'path'

const file = core.getInput('file')
const key = core.getInput('key')
const value = core.getInput('value')
const branch = core.getInput('branch')
const message = core.getInput('message')
const name = core.getInput('name')
const email = core.getInput('email')

updateJson({ file, key, value })

if (branch) {
	const commit = message.replace('%f', path.basename(file)).replace('%k', key).replace('%v', value)
	commitChanges(branch, commit, [file], { name, email })
}
