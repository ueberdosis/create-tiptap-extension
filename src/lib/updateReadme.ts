import fs from "fs"
import path from "path"

export const updateReadme = async (relativeDirPath: string, projectName: string, projectPackage: string) => {
  const readmePath = path.resolve(process.cwd(), `${relativeDirPath}/README.md`)
  const readmeContent = fs.readFileSync(readmePath, 'utf8')

  const newReadmeContent = readmeContent.replace(/{{NAME}}/g, projectName).replace(/{{PKG}}/g, projectPackage)

  fs.writeFileSync(readmePath, newReadmeContent)

  return relativeDirPath
}