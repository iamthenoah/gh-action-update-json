import * as core from '@actions/core'
import * as YAML from 'js-yaml'

export type Inputs = {
	files: string[]
	key: string
	value: string
	branch: string | ''
	message: string | 'Updated %f with `%k:%v`.'
	name: string | 'Github Workflow'
	email: string | 'noreply@github-workflow.com'
}

export type Key = keyof Inputs

export type Value<K extends Key> = Inputs[K]

export const hasValue = <K extends Key>(input: K): boolean => {
	return core.getInput(input).length != 0
}

export const getValue = <K extends Key, V = Value<K>>(input: K): V => {
	const data = core.getInput(input)
	const yaml = YAML.load(data)

	if (yaml && Array.isArray(yaml) && yaml.every(e => typeof e === 'string')) {
		return yaml as V
	}
	return data as V
}
