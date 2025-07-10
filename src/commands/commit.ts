import git from "../utils/simplegit.ts";
import ora from "ora";
import chalk from "chalk";
import emojis from "../utils/emojiMap.ts";

const commit = async (type: string, message: string, push: boolean) => {
    const spinner = ora(chalk.blue("Committing changes...")).start();

    try {
        // Prepare the commit message with emoji
        const emoji = emojis[type] || "";
        const commitMessage = `${emoji} ${type}: ${message}`;

        // Add all changes to staging
        await git.add(".");

        // Commit the changes
        await git.commit(commitMessage);

        if (push) {
            git
                .push("origin", "main")
                .then(() => {
                    spinner.succeed(
                        chalk.green("✔ Changes pushed to remote repository!"),
                    );
                })
                .catch((error) => {
                    spinner.fail(
                        chalk.red("✖ Failed to push changes to remote repository."),
                    );
                    console.error(error);
                });
        } else {
            spinner.succeed(chalk.green("Changes committed successfully!"));
        }
    } catch (error) {
        spinner.fail(chalk.red("Failed to commit changes."));
        console.error(error);
    }
};

export default commit;
