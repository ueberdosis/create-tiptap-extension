#!/usr/bin/env node

import chalk from 'chalk'
import minimist from 'minimist'
import prompts from 'prompts'
import { defaultDir, defaultName, defaultPackage } from './constants.js'
import { createProjectDir } from './lib/createProjectDir.js'

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
          { title: 'Extension without TypeScript', value: 'js' },
          { title: 'Extension with TypeScript', value: 'ts' },
        ],
        initial: 0,
        onState: (state: any) => {
          template = state.value || 'js'
        },
      },
    ])

    const { projectDir, projectName, projectPackage, projectTemplate } = result

    console.log(chalk.green('Creating project...'))

    const relativeDirPath = createProjectDir(projectDir)

    if (!relativeDirPath) {
      console.log(chalk.red('Error creating project directory. Aborting.'))
      return
    }

    // copyProjectTemplate(relativeDirPath, projectTemplate)
    // updatePackageJson(projectDir, projectName, projectPackage)
    // updateReadme(projectDir, projectName)
  } catch (e: any) {
    console.log(e)
    return
  }
}

init().catch(err => {
  console.error(err)
})