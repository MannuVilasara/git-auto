import inquirer from "inquirer";
import commit from "../commands/commit.ts";
import git from "../utils/simplegit.ts";
import chalk from "chalk";
import getConfig from "../utils/getConfig.ts";
import getCurrentFolder from "../utils/getCurrentFolder.ts";

const configFilePath = '~/.config/git-auto/config.json';
const config = getConfig(configFilePath);

const repo = getCurrentFolder();

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
            try {
                await git.addRemote('origin', `git@github.com:${config.username}/${repo}.git`);
            } catch (error) {
                console.log(chalk.red("Error: Failed to add remote repository. check config file at ~/.config/git-auto/config.json"));
                console.log("example config file:");
                console.log(`{
                    "username": "your-github-username",
                }`);

            }
            console.log(chalk.green("Initialized a new git repository."));

        }
    }
    try {
        const status = await git.status();
        if (status.isClean()) {
            console.log(chalk.green("✔ No changes to commit."));
            return;
        }
    } catch (error) {
        console.log(chalk.red("Error: Failed to check git status."));
        return;
    }
    try {
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
    } catch (error) {
        if (error?.constructor?.name === "ExitPromptError") {
            console.log(chalk.yellow("\n👋 Prompt was cancelled by user."));
            process.exit(0); // clean exit without throwing to main
        } else {
            console.log(chalk.red("Error: Failed to commit changes."));
            console.error(error);
            process.exit(1); // failed due to real error
        }
    }
}

export default prompt;