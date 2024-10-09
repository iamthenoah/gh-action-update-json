import { doAction } from './action'
import { simpleGit } from 'simple-git'

const git = simpleGit({ baseDir: process.cwd() })

export type GitCredentials = {
	name: string
	email: string
}

export const commitChanges = (branch: string, message: string, files: string[], credentials: GitCredentials) => {
	doAction('Commiting files', async core => {
		core.info('> Setting up git profile...')
		await git.addConfig('user.name', credentials.name).addConfig('user.email', credentials.email)
		await git.addConfig('author.name', credentials.name).addConfig('author.email', credentials.email)

		core.info('> Adding files to git...')
		core.startGroup('Files:')
		files.forEach(file => core.info(file))
		core.endGroup()

		core.info(`> Pushing to ${branch ? 'branch ' + branch : 'origin'}...`)
		await git.commit(message, files).push('origin', branch)
	})
}
