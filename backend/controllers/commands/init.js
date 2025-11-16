import fs from 'fs/promises';
import path from 'path';

export const initController = async() => {
    const mainDir =path.resolve(process.cwd(), '.VCHUB');
    const nestedDir = path.join(mainDir, 'commits');

    try{
       await fs.mkdir(mainDir, {recursive: true})
       await fs.mkdir(nestedDir, {recursive: true})
       await fs.writeFile(
            path.join(mainDir, 'config.json'),
            JSON.stringify({})// add bucket here later
        );
        console.log("repo initialized successfully.");
    }
        catch(err){
        console.error("Error in initController:", err.message);
    }
}