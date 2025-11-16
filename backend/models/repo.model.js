import mongoose from "mongoose";

const RepoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String
    },
    content:[
        {
            type: String
        }
    ],
    visibility:{
        type: String,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    issues:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Issue'
        }
    ]

},{timestamps: true}
);

const Repository = mongoose.model('Repository', RepoSchema);

export default Repository;