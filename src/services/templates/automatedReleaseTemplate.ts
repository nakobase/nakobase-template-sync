import { saveFileToLocal } from '../../fileHandler.js';
import { handleTemplateSync, TemplateFile } from './templateUtils.js';

export const syncAutomatedReleaseTemplate = async () => {
  const fileHandlers: Record<string, (file: TemplateFile) => void> = {
    '.releaserc.yml': (file) => {
      saveFileToLocal({
        destPath: `./${file.name}`,
        fileData: file.content,
      });
    },
    '.pr-release-template': (file) => {
      saveFileToLocal({
        destPath: `./${file.name}`,
        fileData: file.content,
      });
    },
    'create-release-pr.yml': (file) => {
      saveFileToLocal({
        destPath: `./.github/workflows/${file.name}`,
        fileData: file.content,
      });
    },
    'release.yml': (file) => {
      saveFileToLocal({
        destPath: `./.github/workflows/${file.name}`,
        fileData: file.content,
      });
    },
  };

  await handleTemplateSync('templates/automated-release', fileHandlers);
};
