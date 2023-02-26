import fs from 'fs'
import path from 'path'

export const updatePackageJson = async (projectPath: string, projectName: string, projectPackage: string) => {
  const packageJsonPath = `${projectPath}/package.json`
  const jsonContent = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

  jsonContent.name = projectPackage

  const packageJsonString = JSON.stringify(jsonContent, null, 2)

  await fs.writeFileSync(packageJsonPath, packageJsonString)

  return projectPath
}