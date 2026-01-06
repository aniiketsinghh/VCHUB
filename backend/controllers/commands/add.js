import fs from 'fs/promises';
import path from 'path';

export const addController = async (userFilePath) => {
  const mainDir = path.resolve(process.cwd(), '.VCHUB');
  const stagesDir = path.join(mainDir, 'staging');
  try {
    await fs.mkdir(stagesDir, { recursive: true });

    const userFileName = path.basename(userFilePath);
    await fs.copyFile(userFileName, path.join(stagesDir, userFilePath));

    console.log(` File ${userFileName} added to staging area successfully.`);
  } catch (err) {
    console.error('Error in addController:', err.message);
  }
};
