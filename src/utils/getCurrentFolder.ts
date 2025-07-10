import path from "path";
import process from "process";

/**
 * Get the current working directory.
 * @returns {string} The current working directory.
 */
const getCurrentFolder = (): string => {
  // Use process.cwd() to get the current working directory
  const currentFolder = process.cwd();

  // Normalize the path to ensure it is in a consistent format
  return path.basename(currentFolder);
};

export default getCurrentFolder;
