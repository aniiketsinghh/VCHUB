import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';
import connectDb from './DB connection/db.js';
import mongoose from 'mongoose';

dotenv.config();


// yargs imports
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';

//Controllers
import {initController} from './controllers/init.js';
import {addController} from './controllers/add.js';
import {commitController} from './controllers/commit.js';
import {pushController} from './controllers/push.js';
import {pullController} from './controllers/pull.js';

//server function
 const serverFunction = ()=>{
    const app = express();
    const PORT = process.env.PORT || 5000;
    app.use(cors(
        {
        origin: '*',
        credentials: true,
        }
    ));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    const httpServer = http.createServer(app);
    const io= new Server (httpServer,{
        cors:{
            origin: '*',
            methods: ['GET', 'POST']
        }
    })
    let user="test";
    io.on("connection",(socket)=>{
        socket.on("",(userID)=>{
            user=userID;
        })
    })

    const db = mongoose.connection;
    db.once('open',async()=>{
            console.log('CRUD opeartions called');
    });
    connectDb().then(()=>{
          httpServer.listen(PORT ,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
    });
    }

//all commands using yargs
yargs(hideBin(process.argv))

    //server
    .command("start", "Start the server", {}, serverFunction)
    //init
    .command("init", "Initialize the application", {}, initController) 

    //add
    .command("add <filename>", "Add new file", (yargs)=>{yargs.positional('filename', {type: 'string', describe: 'Name of the file to add'})},(argv)=>{addController(argv.filename)})

    //commit
    .command("commit <message>", "Commit changes", (yargs)=>{yargs.positional('message', {type: 'string', describe: 'Commit message'})},
    (argv)=>{commitController(argv.message)})

    //push
    .command("push", "Push changes to remote", {}, pushController)

    //pull
    .command("pull", "Pull changes from remote", {}, pullController)

    //revert
    .demandCommand(1, "You need to specify at least one command")
    .help()
    .argv;

    


   