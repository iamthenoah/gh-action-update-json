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
		await git.addConfig('user.name', credentials.name).addConfig('user.email', credentials.email)

		core.info(`> Checking out ${branch} branch`)
		await git.fetch().checkout(branch)

		core.info('> Adding files to git')
		core.startGroup('Files:')
		for (const file of files) {
			core.info(file)
		}
		core.endGroup()

		core.info('> Committing changes')
		await git.add(files).commit(message, files)

		core.info(`> Pushing to branch ${branch}`)
		await git.push('origin', branch, { '--set-upstream': null })
	})
}
