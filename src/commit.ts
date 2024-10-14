import { doAction } from './action'
import { simpleGit } from 'simple-git'

const git = simpleGit({ baseDir: process.cwd() })

export type GitCredentials = {
	name: string
	email: string
}

export const commitChanges = async (branch: string, message: string, files: string[], credentials: GitCredentials) => {
	await doAction('Commiting files', async core => {
		core.info('> Setting up git profile...')
		await git.addConfig('user.name', credentials.name)
		await git.addConfig('user.email', credentials.email)
		await git.addConfig('author.name', credentials.name)
		await git.addConfig('author.email', credentials.email)

		core.info('> Adding files to git...')
		files.forEach(file => core.info('- ' + file))

		core.info(`> Pushing to branch '${branch}'...`)
		await git.commit(message, files)
		await git.push('origin', branch)
	})
}
