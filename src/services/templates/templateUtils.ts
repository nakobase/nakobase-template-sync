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
  const files = await fetchFilesFromRepo({
    filePath: templatePath,
  });

  files.forEach((file) => {
    const handler = fileHandlers[file.name];
    if (handler) {
      handler(file);
    } else if (file.name !== 'README.md') {
      console.log(`Unknown file: ${file.name}`);
    }
  });
};
