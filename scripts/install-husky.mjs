#!/usr/bin/env node
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const shouldSkip = () => {
  if (process.env.HUSKY === '0') {
    console.log('[husky] Skipping installation because HUSKY=0.');
    return true;
  }

  if (process.env.HUSKY_SKIP_INSTALL === '1' || process.env.HUSKY_SKIP_INSTALL === 'true') {
    console.log('[husky] Skipping installation because HUSKY_SKIP_INSTALL is set.');
    return true;
  }

  if (process.env.SKIP_HUSKY_INSTALL === '1' || process.env.SKIP_HUSKY_INSTALL === 'true') {
    console.log('[husky] Skipping installation because SKIP_HUSKY_INSTALL is set.');
    return true;
  }

  const isCI =
    typeof process.env.CI === 'string' && process.env.CI !== '0' && process.env.CI !== 'false';
  if (isCI) {
    console.log('[husky] Skipping installation in CI environment.');
    return true;
  }

  return false;
};

if (shouldSkip()) {
  process.exit(0);
}

const gitDir = path.resolve(process.cwd(), '.git');
if (!existsSync(gitDir)) {
  console.log('[husky] Skipping installation because .git directory was not found.');
  process.exit(0);
}

const commands = [
  {
    command: 'npm',
    args: ['exec', '--', 'husky'],
    env: { ...process.env, npm_config_yes: process.env.npm_config_yes ?? 'true' },
  },
  {
    command: 'npx',
    args: ['--yes', 'husky'],
    env: process.env,
  },
];

let ran = false;
for (const { command, args, env } of commands) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    env,
  });

  ran = true;

  if (result.error) {
    if (result.error.code === 'ENOENT') {
      continue;
    }

    console.error('[husky] Failed to execute husky install:', result.error.message);
    process.exit(result.status ?? 1);
  }

  if (typeof result.status === 'number' && result.status === 0) {
    console.log('[husky] Husky hooks installed successfully.');
    process.exit(0);
  }
}

if (!ran) {
  console.error('[husky] Unable to run husky installation command.');
  process.exit(1);
}

console.warn(
  '[husky] Husky installation skipped because the CLI could not be executed successfully.'
);
process.exit(0);
