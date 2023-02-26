import fs from 'fs'
import path from 'path'

export const renameGitignore = (projectPath: string) => {
  const resolvedPath = path.resolve(process.cwd(), projectPath)

  console.log('Renaming .gitignore...', resolvedPath)
  fs.renameSync( `${resolvedPath}/_gitignore`, `${resolvedPath}/.gitignore`)

  return projectPath
}