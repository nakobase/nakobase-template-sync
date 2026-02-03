import { saveFileToLocal } from '../../fileHandler.js';
import { handleTemplateSync, TemplateFile } from './templateUtils.js';

export const syncAutomatedReleaseTemplate = async (overwrite: boolean) => {
  const fileHandlers: Record<string, (file: TemplateFile) => void> = {
    '.releaserc.yml': (file) => {
      saveFileToLocal({
        destPath: `./${file.name}`,
        fileData: file.content,
        overwrite,
      });
    },
    '.pr-release-template': (file) => {
      saveFileToLocal({
        destPath: `./${file.name}`,
        fileData: file.content,
        overwrite,
      });
    },
    'create-release-pr.yml': (file) => {
      saveFileToLocal({
        destPath: `./.github/workflows/${file.name}`,
        fileData: file.content,
        overwrite,
      });
    },
    'release.yml': (file) => {
      saveFileToLocal({
        destPath: `./.github/workflows/${file.name}`,
        fileData: file.content,
        overwrite,
      });
    },
  };

  await handleTemplateSync('templates/automated-release', fileHandlers);
};
