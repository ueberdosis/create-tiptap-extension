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
    })

    if (!gitExists) {
      return
    }

    // initialize git
    await new Promise((resolve, reject) => {
      exec("git init", { cwd: dir }, (error) => {
        if (error) {
          reject(error)
        } else {
          resolve(true)
        }
      })
    })
  } catch (e) {
    console.error(e)
    return
  }
}