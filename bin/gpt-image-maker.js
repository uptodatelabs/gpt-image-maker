#!/usr/bin/env node
'use strict';

const { startServer } = require('../src/server');

function parseArgs(argv) {
  const opts = { port: 3000, host: '127.0.0.1', open: true };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const next = () => argv[++i];
    switch (arg) {
      case '--port':
      case '-p':
        opts.port = parseInt(next(), 10);
        if (Number.isNaN(opts.port)) opts.port = 3000;
        break;
      case '--host':
      case '-h':
        opts.host = next();
        break;
      case '--no-open':
        opts.open = false;
        break;
      case '--help':
        printHelp();
        process.exit(0);
        break;
      default:
        if (arg.startsWith('--port=')) opts.port = parseInt(arg.split('=')[1], 10) || 3000;
        else if (arg.startsWith('--host=')) opts.host = arg.split('=')[1];
        else printHelp();
    }
  }
  return opts;
}

function printHelp() {
  console.log(`
  gpt-image-maker - AI Image Generator (Puter.js powered)

  Usage:
    gpt-image-maker [options]

  Options:
    -p, --port <n>     Port to listen on (default: 3000)
    -h, --host <addr>  Host to bind (default: 127.0.0.1)
        --no-open      Do not open the browser automatically
        --help         Show this help
`);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  try {
    await startServer(opts);
  } catch (err) {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${opts.port} is already in use. Try: gpt-image-maker --port 3001`);
    } else {
      console.error('Failed to start server:', err.message);
    }
    process.exit(1);
  }
}

main();