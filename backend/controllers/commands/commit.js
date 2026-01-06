import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

export const commitController = async (message) => {
  const mainDir = path.resolve(process.cwd(), '.VCHUB');
  const commitsDir = path.join(mainDir, 'commits');
  const stagingDir = path.join(mainDir, 'staging');

  try {
    const commitId = uuidv4();
    const commitPath = path.join(commitsDir, commitId);

    // Create commit directory
    fs.mkdir(commitPath, { recursive: true });

    // Copy files from staging to commit directory
    const copyFiles = await fs.readdir(stagingDir);
    for (const file of copyFiles) {
      await fs.copyFile(path.join(stagingDir, file), path.join(commitPath, file));
    }

    fs.writeFile(
      path.join(commitPath, 'config.json'),
      JSON.stringify({ message: message, date: new Date().toISOString() })
    );

    // Clear staging directory
    await fs.rm(stagingDir, { recursive: true });
    console.log(`File with commitId: ${commitId} has been created.`);
  } catch (err) {
    console.error('Error in commitController:', err.message);
  }

  console.log(`Committed with message: ${message}`);
};
