import { getValue, hasValue } from './src/input'
import { updateJson } from './src/file'
import { commitChanges } from './src/commit'
import path from 'path'

const files = getValue('files')
const key = getValue('key')
const value = getValue('value')

const main = async () => {
	for (const file of files) {
		await updateJson({ file, key, value })
	}

	if (hasValue('branch')) {
		const branch = getValue('branch')
		const message = getValue('message')
		const name = getValue('name')
		const email = getValue('email')

		const names = files.map(f => path.basename(f)).join(', ')
		const commit = message.replace('%f', names).replace('%k', key).replace('%v', value)

		await commitChanges(branch, commit, files, { name, email })
	}
}

main()
