import { doAction } from './action'
import { simpleGit } from 'simple-git'

const git = simpleGit({ baseDir: process.cwd() })

export type GitCredentials = {
	name: string
	email: string
}

export const commitChanges = (branch: string, message: string, files: string[], credentials: GitCredentials) => {
	doAction('Commiting files', async core => {
		core.info('> Setting up git profile')
		await git.addConfig('user.name', credentials.name)
		await git.addConfig('user.email', credentials.email)
		await git.fetch()

		core.info('> Adding files to git')
		core.startGroup('Files:')
		for (const file of files) {
			await git.add(file)
			core.info(file)
		}
		core.endGroup()

		core.info('> Committing changes')
		await git.commit(message, files)

		core.info(`> Checking out ${branch} branch`)
		await git.checkout(branch)

		core.info(`> Pushing to branch ${branch}`)
		await git.push('origin', branch)
	})
}
