import { doAction } from './action'
import { promisify } from 'util'
import fs from 'fs'

const readJson = promisify(fs.readFile)
const writeJson = promisify(fs.writeFile)

export type JsonData = {
	file: string
	key: string
	value: string
}

export const updateJson = async ({ file, key, value }: JsonData) => {
	await doAction('Updating JSON file', async core => {
		core.info(`> Updating ${file}...`)
		const data = await readJson(file, 'utf8')
		const json = JSON.parse(data)
		const keys = key.split('.')
		let current = json

		for (let i = 0; i < keys.length - 1; i++) {
			const k = keys[i]

			if (!(k in current)) {
				current[k] = {}
			}
			current = current[k]
		}
		current[keys[keys.length - 1]] = value
		await writeJson(file, JSON.stringify(json, null, 2))
	})
}
