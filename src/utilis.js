import chalk from 'chalk';
import boxen from 'boxen';

export function formatResponse(response) {
    // 1. Better Regex to catch code even if the AI forgets the "bash" tag
    const codeBlockRegex = /```(?:[\w-]+)?\n([\s\S]*?)\n```/;
    const match = response.match(codeBlockRegex);
    
    let command = "";
    let explanation = response;

    if (match) {
        command = match[1].trim();
        // Remove the code block from the explanation so it's not duplicated
        explanation = response.replace(match[0], '').trim();
    } else {
        // Fallback: If AI didn't use code blocks, try to find single backticks
        const singleTickRegex = /`([^`]+)`/;
        const tickMatch = response.match(singleTickRegex);
        if (tickMatch) {
            command = tickMatch[1].trim();
        }
    }

    // 2. High-Visibility Box
    const boxedExplanation = boxen(explanation, {
        padding: 1,
        margin: { top: 1, bottom: 0 },
        borderStyle: 'round',
        borderColor: 'magenta', // Magenta stands out on Manjaro/Zsh
        title: '🎓 Mentor',
        titleAlignment: 'center'
    });

    // 3. High-Contrast Command (Using Cyan/Black for maximum visibility)
    const label = chalk.bold.yellow('👉 Run this:');
    const styledCommand = command 
        ? chalk.bgCyan.black.bold(`  ${command}  `) 
        : chalk.red("Could not extract command. See explanation above.");

    return `\n${boxedExplanation}\n\n${label}\n${styledCommand}\n`;
}