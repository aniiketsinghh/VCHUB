import fs from 'fs/promises';
import path from 'path';
import { s3, BUCKET_NAME } from '../../aws-config/aws.config.js';

export const pullController = async () => {
  const mainDir = path.resolve(process.cwd(), '.VCHUB');
  const commitsDir = path.join(mainDir, 'commits');

  try {
    const data = await s3
      .listObjectsV2({
        Bucket: BUCKET_NAME,
        Prefix: 'commits/',
      })
      .promise();

    const objects = data.Contents;
    for (const object of objects) {
      const key = object.Key;
      const comitFolder = path.join(commitsDir, path.dirname(key).split('/').pop());

      await fs.mkdir(comitFolder, { recursive: true });

      const params = {
        Bucket: BUCKET_NAME,
        Key: key,
      };
      const fileData = await s3.getObject(params).promise();
      await fs.writeFile(path.join(mainDir, key), fileData.Body);
    }
    console.log('All commits pulled from S3 successfully.');
  } catch (err) {
    console.error('Error in pullController:', err.message);
  }
};
