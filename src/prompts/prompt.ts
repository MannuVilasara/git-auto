import inquirer from "inquirer";
import commit from "../commands/commit.ts";
import git from "../utils/simplegit.ts";
import chalk from "chalk";


const prompt = async () => {
    // Check if the current directory is a git repository
    try {
        await git.status();
    } catch (error) {
        console.log(chalk.red("Error: Not a git repository."));
        const { init } = await inquirer.prompt({
            type: 'confirm',
            name: 'init',
            message: 'Do you want to initialize a new git repository?',
            default: true,
        });
        if (init) {
            await git.init();
            console.log(chalk.green("Initialized a new git repository."));
        }
    }
    const { type, message, push } = await inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: 'Select commit type:',
            choices: [
                { name: '✨ feat: A new feature', value: 'feat' },
                { name: '🐛 fix: A bug fix', value: 'fix' },
                { name: '📚 docs: Documentation only', value: 'docs' },
                { name: '💄 style: Formatting only', value: 'style' },
                { name: '🎉 init: Initial commit', value: 'init' },
            ],
        },
        {
            type: 'input',
            name: 'message',
            message: 'Describe your commit:',
        },
        {
            type: 'confirm',
            name: 'push',
            message: 'Do you want to push the changes to remote?',
            default: false,
        }
    ]);
    await commit(type, message, push);
}

export default prompt;