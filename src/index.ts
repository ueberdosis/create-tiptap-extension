#!/usr/bin/env node

import chalk from 'chalk'
import minimist from 'minimist'
import prompts from 'prompts'
import { defaultDir, defaultName, defaultPackage } from './constants.js'
import { copyProjectTemplate } from './lib/copyProjectTemplate.js'
import { createProjectDir } from './lib/createProjectDir.js'
import { initializeGit } from './lib/initalizeGit.js'
import { renameGitignore } from './lib/renameGitignore.js'
import { showCLIOutput } from './lib/showCLIOutput.js'
import { updatePackageJson } from './lib/updatePackageJson.js'
import { updateReadme } from './lib/updateReadme.js'

async function init() {
  const argv = minimist(process.argv.slice(2))
  const { dir, name, pkg } = argv
  
  let outDir = dir
  let outName = name
  let outPkg = pkg
  let template = 'js'

  try {
    const result = await prompts([
      {
        type: dir ? null : 'text',
        name: 'projectDir',
        message: 'Project directory',
        initial: defaultDir,
        onState: (state: any) => {
          outDir = state.value || defaultDir
        },
      },
      {
        type: name ? null : 'text',
        name: 'projectName',
        message: 'Project name',
        initial: defaultName,
        onState: (state: any) => {
          outName = state.value || defaultName
        },
      },
      {
        type: pkg ? null : 'text',
        name: 'projectPackage',
        message: 'Project package',
        initial: defaultPackage,
        onState: (state: any) => {
          outPkg = state.value || defaultPackage
        },
      },
      {
        type: 'select',
        name: 'projectTemplate',
        message: 'Project template',
        choices: [
          { title: 'With Javascript', value: 'extension-js' },
          { title: 'With Typescript', value: 'extension-ts' },
        ],
        initial: 0,
        onState: (state) => {
          template = state.value || 'js'
        },
      },
    ])

    const { projectDir, projectName, projectPackage, projectTemplate } = result

    console.log('\n\nCreating project directory...')

    const relativeDirPath = await createProjectDir(projectDir)

    console.log(chalk.green('Created project directory.'))

    console.log('\n\nCopying project template...')

    await copyProjectTemplate(relativeDirPath, projectTemplate)

    console.log(chalk.green('Copied project template.'))

    console.log('\n\nUpdating package.json...')

    updatePackageJson(relativeDirPath, projectName, projectPackage)

    console.log(chalk.green('Updated package.json.'))

    console.log('\n\nUpdating README.md...')
    
    updateReadme(relativeDirPath, projectName, projectPackage)

    console.log(chalk.green('Updated README.md.'))

    console.log('\n\nRenaming .gitignore...')

    renameGitignore(relativeDirPath)

    console.log(chalk.green('Renamed .gitignore.'))

    const { shouldInitializeGit } = await prompts({
      type: 'confirm',
      name: 'shouldInitializeGit',
      message: 'Initialize git repository?',
      initial: true,
    })

    if (shouldInitializeGit) {
      console.log('\n\nInitializing git repository...')
      await initializeGit(relativeDirPath)
      console.log(chalk.green('Initialized git repository.'))
    }

    showCLIOutput(relativeDirPath)
  } catch (e: any) {
    console.log(e)
    return
  }
}

init().catch(err => {
  console.error(err)
})