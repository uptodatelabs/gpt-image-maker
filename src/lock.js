'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const LOCK_PATH = path.join(os.tmpdir(), 'gpt-image-maker.lock');

function isProcessAlive(pid) {
    try {
        process.kill(pid, 0);
        return true;
    } catch (err) {
        return err.code === 'EPERM';
    }
}

function acquireLock() {
    try {
        const raw = fs.readFileSync(LOCK_PATH, 'utf8');
        const lock = JSON.parse(raw);
        if (lock && lock.pid && isProcessAlive(lock.pid)) {
            return { ok: false, url: lock.url || null, port: lock.port || null };
        }
    } catch {
        // no lock file or stale/corrupt lock -> proceed
    }
    return { ok: true };
}

function writeLock(port, url) {
    try {
        fs.writeFileSync(
            LOCK_PATH,
            JSON.stringify({ pid: process.pid, port, url, startedAt: Date.now() }),
            'utf8'
        );
    } catch {
        // non-fatal: lock is best-effort
    }
}

function releaseLock() {
    try {
        const raw = fs.readFileSync(LOCK_PATH, 'utf8');
        const lock = JSON.parse(raw);
        if (lock && lock.pid === process.pid) {
            fs.unlinkSync(LOCK_PATH);
        }
    } catch {
        // nothing to release
    }
}

module.exports = { acquireLock, writeLock, releaseLock, LOCK_PATH };