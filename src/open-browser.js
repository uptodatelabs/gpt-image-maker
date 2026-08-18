'use strict';

const { spawn } = require('node:child_process');

const OPENERS = {
  win32: ['cmd', ['/c', 'start', '', '']],
  darwin: ['open', ['']],
  linux: ['xdg-open', ['']],
};

function openBrowser(url) {
  const platform = process.platform;
  if (!OPENERS[platform]) return;

  const [cmd, args] = OPENERS[platform];
  const child = spawn(cmd, [...args.slice(0, -1), url], {
    stdio: 'ignore',
    detached: true,
    windowsHide: true,
  });
  child.unref();
}

module.exports = { openBrowser };