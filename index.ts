import * as core from '@actions/core'
import { updateJson } from './src/file'
import { git, commit } from './src/git'
import path from 'path'

const main = async () => {
	const file = core.getInput('file', { required: true })
	const key = core.getInput('key', { required: true })
	const value = core.getInput('value', { required: true })

	await updateJson({ file, key, value })

	if (core.getInput('commit')) {
		const branch = core.getInput('branch') || (await git.branch()).current
		const message = core.getInput('message')
		const name = core.getInput('name')
		const email = core.getInput('email')

		const msg = message.replace('%f', path.basename(file)).replace('%k', key).replace('%v', value)
		await commit(branch, msg, [file], { name, email })
	}
}

main()
