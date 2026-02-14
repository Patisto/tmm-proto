#!/usr/bin/env node
import chalk from 'chalk';
import { getSystemContext } from './context.js';
import { askMentor } from './ai.js';
import { formatResponse } from '../src/utilis.js';
async function main() {
    const question = process.argv.slice(2).join(' ');

    if (!question) {
        console.log(chalk.yellow("Usage: tmm 'your question here'"));
        return;
    }

    const context = getSystemContext();
    console.log(chalk.blue(`🔍 System: ${context.platform} | Thinking...`));

    try {
        const response = await askMentor(question, context);
        //formatter
        console.log(formatResponse(response));
    } catch (error) {
        console.log(chalk.red("❌ Mentor is currently offline."));
    }
}

main();