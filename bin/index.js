#!/usr/bin/env node

import prompt from "../src/prompts/prompt.ts"; // use .js extension for ESM

process.on("SIGINT", () => {
  // This will catch Ctrl+C if it happens outside the prompt
  console.log("\n🛑 Prompt cancelled. Exiting...");
  process.exit(0);
});

try {
  await prompt();
} catch (err) {
  if (err?.constructor?.name === "ExitPromptError") {
    console.log("\n👋 You cancelled the prompt. Goodbye.");
    process.exit(0);
  } else {
    console.error("❌ Unexpected error:", err);
    process.exit(1);
  }
}
