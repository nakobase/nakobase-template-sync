import { fetchFilesFromRepo } from '../../api.js';
import { saveFileToLocal } from '../../fileHandler.js';

export interface TemplateFile {
  name: string;
  content: string;
}

export const handleTemplateSync = async (
  templatePath: string,
  fileHandlers: Record<string, (file: TemplateFile) => void>
) => {
  try {
    const files = await fetchFilesFromRepo({
      filePath: templatePath,
    });

    if (!files) {
      console.error('Failed to download the files from GitHub.');
      return;
    }

    files.forEach((file) => {
      const handler = fileHandlers[file.name];
      if (handler) {
        handler(file);
      } else if (file.name !== 'README.md') {
        console.log(`Unknown file: ${file.name}`);
      }
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
