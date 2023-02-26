import chalk from "chalk"

export const showCLIOutput = (outputPath: string) => {
  console.log('\n')
  console.log(chalk.bgGreen('Your Tiptap extension has been created.'))
  console.log(`cd ${outputPath}`)
  console.log(`npm install\n\n`)
}