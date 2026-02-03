#!/usr/bin/env node

import {
  syncAutomatedReleaseTemplate,
  syncCommitlintTemplate,
  syncGithubTemplates,
} from './templateService.js';
import { promptForAction, promptForOverwrite } from './prompt.js';

const main = async () => {
  const action = await promptForAction();
  const args = process.argv.slice(2);
  const hasOverwriteFlag = args.includes('--overwrite');
  const hasNoOverwriteFlag = args.includes('--no-overwrite');

  switch (action) {
    case 'automated-release':
      await syncAutomatedReleaseTemplate(
        hasNoOverwriteFlag ? false : hasOverwriteFlag ? true : await promptForOverwrite()
      );
      break;
    case 'github-templates':
      await syncGithubTemplates(
        hasNoOverwriteFlag ? false : hasOverwriteFlag ? true : await promptForOverwrite()
      );
      break;
    case 'commitlint':
      await syncCommitlintTemplate(
        hasNoOverwriteFlag ? false : hasOverwriteFlag ? true : await promptForOverwrite()
      );
      break;
    case 'cancel':
      console.log('Bye!');
      process.exit(0);
  }
};

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`An error occurred: ${message}`);
  process.exit(1);
});
