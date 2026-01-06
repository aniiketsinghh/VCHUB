import mongoose from 'mongoose';

const RepoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    content: [{ type: String }],
    visibility: { type: String, default: 'public' },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    issues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue',
      },
    ],

    stars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const Repo = mongoose.model('Repo', RepoSchema);

export default Repo;
