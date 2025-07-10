# Git Auto 🚀

A command-line tool that streamlines your Git workflow by providing interactive prompts for adding and committing files with beautifully formatted commit messages and emojis.

## Features ✨

- 🎯 **Interactive prompts** for commit type and message
- 🎨 **Emoji-enhanced commits** for better visual organization
- 📦 **Auto-staging** of all changes
- 🌐 **Optional push** to remote repository
- 🆕 **Git repository initialization** if not already initialized
- ⚙️ **Configurable** GitHub username for remote setup
- 🎭 **Beautiful CLI** with colors and spinners

## Installation

### Prerequisites

- Node.js (version 14 or higher)
- Git

### Global Installation

```bash
npm install -g git-auto
```

### Local Installation

```bash
git clone https://github.com/MannuVilasara/git-auto.git
cd git-auto
npm install
npm link
```

## Configuration

Create a configuration file at `~/.config/git-auto/config.json`:

```json
{
  "username": "your-github-username"
}
```

This configuration is used when initializing new repositories to automatically set up the remote origin.

## Usage

Simply run the command in any directory:

```bash
git-auto
```

### What happens when you run git-auto

1. **Repository Check**: Verifies if the current directory is a Git repository
2. **Initialization**: Offers to initialize a new repository if none exists
3. **Status Check**: Checks for uncommitted changes
4. **Interactive Prompts**: Guides you through the commit process
5. **Commit & Push**: Commits changes and optionally pushes to remote

### Commit Types

Choose from predefined commit types with corresponding emojis:

| Type    | Emoji | Description                           |
| ------- | ----- | ------------------------------------- |
| `feat`  | ✨    | A new feature                         |
| `fix`   | 🐛    | A bug fix                             |
| `docs`  | 📚    | Documentation only changes            |
| `style` | 💄    | Formatting, missing semi colons, etc. |
| `init`  | 🎉    | Initial commit                        |

## Example Workflow

```bash
$ git-auto

? Select commit type: ✨ feat: A new feature
? Describe your commit: add user authentication system
? Do you want to push the changes to remote? Yes

✔ Changes pushed to remote repository!
```

This creates a commit with the message: `✨ feat: add user authentication system`

## Project Structure

```text
git-auto/
├── bin/
│   └── index.js          # CLI entry point
├── src/
│   ├── commands/
│   │   └── commit.ts     # Commit functionality
│   ├── prompts/
│   │   └── prompt.ts     # Interactive prompts
│   └── utils/
│       ├── emojiMap.ts   # Emoji mappings
│       ├── getConfig.ts  # Configuration loader
│       ├── getCurrentFolder.ts # Current directory utilities
│       └── simplegit.ts  # Git operations wrapper
└── package.json
```

## Development

### Setup

```bash
git clone https://github.com/MannuVilasara/git-auto.git
cd git-auto
npm install
npm link
```

This will:

1. Clone the repository
2. Install dependencies
3. Create a global symlink to test the tool locally

## Dependencies

- **chalk**: Terminal styling
- **inquirer**: Interactive command line prompts
- **ora**: Terminal spinners
- **simple-git**: Git command wrapper
- **fs**: File system operations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using git-auto! 😉
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**MannuVilasara** - [GitHub](https://github.com/MannuVilasara)

## Support

If you encounter any issues or have suggestions, please [open an issue](https://github.com/MannuVilasara/git-auto/issues) on GitHub.

---

Made with ❤️ by [MannuVilasara](https://github.com/MannuVilasara)
