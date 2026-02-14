import os from 'os';

export function getSystemContext() {
    return {
        platform: os.platform(), // 'linux', 'darwin', or 'win32'
        shell: process.env.SHELL || 'cmd.exe',
        arch: os.arch(),
    };
}