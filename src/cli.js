#!/usr/bin/env node
import chalk from 'chalk';
import path from 'path';
import { spawn } from 'child_process';
import readline from 'readline/promises';
import { fileURLToPath } from 'url';
import notifier from 'node-notifier';
import { getSystemContext } from './context.js';
import { askMentor } from './ai.js';
import { formatResponse, parseMentorResponse } from '../src/utilis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getShellForPlatform() {
    if (process.platform === 'win32') {
        return { shell: 'powershell.exe', args: ['-Command'] };
    }

    return { shell: '/bin/sh', args: ['-c'] };
}

function getNotificationIconPath(exitCode) {
    const fileName = exitCode === 0 ? 'success.svg' : 'error.svg';
    return path.resolve(__dirname, '../assets/icons', fileName);
}

function notifyIfLongRunning(cmd, exitCode, durationMs) {
    if (durationMs <= 10000) {
        return;
    }

    const seconds = (durationMs / 1000).toFixed(1);

    notifier.notify({
        title: 'TMM: Task Complete',
        message: `${cmd} Finished in ${seconds} seconds.`,
        icon: getNotificationIconPath(exitCode)
    });
}

async function executeCommand(cmd) {
    const { shell, args } = getShellForPlatform();
    const startTime = Date.now();

    return new Promise((resolve, reject) => {
        const child = spawn(shell, [...args, cmd], { stdio: 'inherit' });

        child.on('error', (error) => reject(error));
        child.on('close', (code) => {
            const durationMs = Date.now() - startTime;
            notifyIfLongRunning(cmd, code ?? 1, durationMs);
            resolve({ code: code ?? 1, durationMs });
        });
    });
}

async function askToRunCommand(command) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {
        const answer = await rl.question('🚀 Run this command now? (y/n) ');
        return answer.trim().toLowerCase() === 'y';
    } finally {
        rl.close();
    }
}

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
        const { command } = parseMentorResponse(response);
        //formatter
        console.log(formatResponse(response));

        if (!command) {
            return;
        }

        const shouldRun = await askToRunCommand(command);

        if (!shouldRun) {
            console.log(chalk.gray('Skipped command execution.'));
            return;
        }

        const { code, durationMs } = await executeCommand(command);
        const seconds = (durationMs / 1000).toFixed(1);

        if (code === 0) {
            console.log(chalk.green(`✅ Command finished in ${seconds}s.`));
            return;
        }

        console.log(chalk.red(`❌ Command exited with code ${code} in ${seconds}s.`));
    } catch (error) {
        console.log(chalk.red("❌ Mentor is currently offline."));
    }
}

main();