import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';
import connectDb from './DB connection/db.js';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import repoRoutes from './routes/repo.route.js';
import issueRoutes from './routes/issue.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();


// yargs imports
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';

//Controllers
import {initController} from './controllers/commands/init.js';
import {addController} from './controllers/commands/add.js';
import {commitController} from './controllers/commands/commit.js';
import {pushController} from './controllers/commands/push.js';
import {pullController} from './controllers/commands/pull.js';

//server function
 const serverFunction = ()=>{
    const app = express();
    const PORT = process.env.PORT || 5000;
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
            }));
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use(cookieParser());

    app.use('/api/user', userRoutes);
    app.use('/api/repo', repoRoutes);
    app.use('/api/issue', issueRoutes);

    // const httpServer = http.createServer(app);
    // // const io= new Server (httpServer,{
    // //     cors:{
    // //         origin: 'http://localhost:5173',
            
    // //     }
    // // })

    // let user="test";
    // io.on("connection",(socket)=>{
    //     socket.on("",(userID)=>{
    //         user=userID;
    //     })
    // })

    // const db = mongoose.connection;
    // db.once('open',async()=>{
    //         console.log('CRUD opeartions called');
    // });
    connectDb().then(()=>{
          app.listen(PORT ,()=>{
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

    


   