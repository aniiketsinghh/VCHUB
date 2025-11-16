import mongoose from 'mongoose';

const IssueSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },

    description:{
        type: String,
    },
    status:{
        type: String,
        enum: ['open', 'closed'],
    },
    repository:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Repository',
        required: true
    }

},{timestamps: true}
);

const Issue = mongoose.model('Issue', IssueSchema);

export default Issue;