import path from 'path'
import fs from 'fs'

import prompts from 'prompts'
import chalk from 'chalk'

export const createProjectDir = async (dir: string) => {
  // get relative path
  const relativePath = path.relative(process.cwd(), dir)

  // check if the directory already exists
  const exists = fs.existsSync(relativePath)

  if (exists) {
    // if the directory exists, ask the user if they want to overwrite it
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `The directory ${relativePath} already exists. Do you want to overwrite it?`,
      initial: false,
    })

    if (!overwrite) {
      console.log(chalk.red('Directory already exists. Aborting.'))
      return false
    }

    // if the user wants to overwrite the directory, delete it
    await fs.rmdir(relativePath, { recursive: true }, (err) => {
      if (err) {
        throw err
      }
    })
  }

  // create the directory
  await fs.mkdir(relativePath, { recursive: true }, (err) => {
    if (err) {
      throw err
    }
  })

  return relativePath
}