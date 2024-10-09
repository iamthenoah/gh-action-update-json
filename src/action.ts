import * as core from '@actions/core'

export type Action = (logger: typeof core) => Promise<void>

export const doAction = async (text: string, action: Action) => {
	try {
		core.startGroup(text)
		await action(core)
		core.info('Done.')
		core.endGroup()
	} catch (error) {
		core.setFailed(error as any)
	}
}
