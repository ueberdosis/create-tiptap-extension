import { exec } from "child_process"

export const initializeGit = async (dir: string) => {
  // check if git is installed
  try {
    const gitExists = await new Promise((resolve, reject) => {
      exec("git --version", (error, stdout, stderr) => {
        if (error) {
          reject(error)
        } else {
          resolve(true)
        }
      })

      console.log(gitExists)
    })
  } catch (e) {
    console.error(e)
    return
  }
}