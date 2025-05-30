import { saveFileToLocal } from '../../fileHandler.js';
import { handleTemplateSync, TemplateFile } from './templateUtils.js';

export const syncCommitlintTemplate = async () => {
  const fileHandlers: Record<string, (file: TemplateFile) => void> = {
    'commitlint.config.js': (file) => {
      saveFileToLocal({
        destPath: `./${file.name}`,
        fileData: file.content,
      });
    },
  };

  await handleTemplateSync('templates/lint/commitlint', fileHandlers);
};
