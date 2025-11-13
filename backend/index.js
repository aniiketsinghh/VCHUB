import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {initController} from './controllers/init.js';
import {addController} from './controllers/add.js';
import {commitController} from './controllers/commit.js';
import {pushController} from './controllers/push.js';
import {pullController} from './controllers/pull.js';
import {revertController} from './controllers/revert.js';

yargs(hideBin(process.argv))
    //init
    .command("init", "Initialize the application", {}, initController) 

    //add
    .command("add <filename>", "Add new file", (yargs)=>{yargs.positional('filename', {type: 'string', describe: 'Name of the file to add'})},addController)

    //commit
    .command("commit -m <message>", "Commit changes", (yargs)=>{yargs.positional('message', {type: 'string', describe: 'Commit message'})},commitController)

    //push
    .command("push", "Push changes to remote", {}, pushController)

    //pull
    .command("pull", "Pull changes from remote", {}, pullController)

    //revert
    .command("revert <commitId>", "Revert to a specific commit", (yargs)=>{yargs.positional('commitId', {type: 'string', describe: 'ID of the commit to revert to'})},revertController)
    .demandCommand(1, "You need to specify at least one command")
    .help()
    .argv;
