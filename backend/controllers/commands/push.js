import fs from 'fs/promises';
import path from 'path';
import {s3, BUCKET_NAME } from '../../aws-config/aws.config.js';


export const pushController = async()=>{
    const mainDir = path.resolve(process.cwd(), '.VCHUB');
    const commitsDir = path.join(mainDir, 'commits');

    try{
        const commitFolders = await fs.readdir(commitsDir);
        for(const commitFolder of commitFolders){
            const commitPath = path.join(commitsDir, commitFolder);
            const files = await fs.readdir(commitPath);
            for(const file of files){
                const filePath = path.join(commitPath, file);
                const fileContent = await fs.readFile(filePath);
                    const params = {
                        Bucket: BUCKET_NAME,
                        Key: `/commits/${commitFolder}/${file}`,
                        Body: fileContent,
                    };
                    await s3.upload(params).promise();
            }
        }
        console.log("All commits pushed to S3 successfully.");

    }catch(err){
        console.error("Error in pushController:", err.message);
    }
}
