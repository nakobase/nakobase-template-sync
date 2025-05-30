import { saveFileToLocal } from '../../fileHandler.js';
import { handleTemplateSync, TemplateFile } from './templateUtils.js';

export const syncGithubTemplates = async () => {
  const fileHandlers: Record<string, (file: TemplateFile) => void> = {
    'pull_request_template.md': (file) => {
      saveFileToLocal({
        destPath: `./.github/${file.name}`,
        fileData: file.content,
      });
    },
    'bug_report.md': (file) => {
      saveFileToLocal({
        destPath: `./.github/ISSUE_TEMPLATE/${file.name}`,
        fileData: file.content,
      });
    },
    'feature_request.md': (file) => {
      saveFileToLocal({
        destPath: `./.github/ISSUE_TEMPLATE/${file.name}`,
        fileData: file.content,
      });
    },
  };

  await handleTemplateSync('templates/github', fileHandlers);
};
