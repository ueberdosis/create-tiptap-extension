import path from 'path'
import fs from 'fs'
import fsExtra from 'fs-extra'
import { fileURLToPath } from 'url';

const { copySync } = fsExtra

const templatesDir = path.resolve(
  fileURLToPath(import.meta.url),
  "../../../templates"
);

export const copyProjectTemplate = async (projectPath: string, template: string) => {
  const templatePath = `${templatesDir}/${template}`;
  const templateExists = fs.existsSync(templatePath)

  if (!templateExists) {
    console.error(`Template ${template} does not exist`)
    process.exit(1)
  }

  copySync(templatePath, projectPath, { overwrite: true })

  return projectPath
}