import Repo from "../../models/repo.model.js";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
const s3 = new S3Client({ region: "ap-south-1" });

const tryCatch = (fn) => async (req, res) => {
    try { await fn(req, res); }
    catch (err) {
        console.error("Controller Error:", err);
        res.status(500).json({ error: err.message });
    }
};

// ---------------------------
// CREATE REPO
// ---------------------------
export const CreateRepo = tryCatch(async (req, res) => {
    const { name, description, visibility, content } = req.body;

    if (!name) return res.status(400).json({ error: "Repository name required" });

    const owner = req.user._id;

    // Prevent same user from creating same repo twice
    const existing = await Repo.findOne({ name, owner });
    if (existing)
        return res.status(400).json({ error: "Repo already exists" });

    const repo = new Repo({
        name,
        description,
        visibility: visibility || "public",
        owner,
        content: content || [],
        issues: [],
        stars: []
    });

    await repo.save();

    res.status(201).json({
        message: "Repository created successfully",
        repo
    });
});

// ---------------------------
// ANYONE CAN SEE PUBLIC REPOS
// ---------------------------
export const GetAllRepos = tryCatch(async (req, res) => {
    const repos = await Repo.find().sort({ createdAt: -1 }).lean();
    const userId = req.user?._id?.toString();

    const finalRepos = repos.map(repo => ({
        ...repo,
        isStarred: userId ? repo.stars.some(id => id.toString() === userId) : false
    }));

    res.status(200).json({ repos: finalRepos });
});


// ---------------------------
// GET REPO BY ID
// ---------------------------
export const GetRepoById = tryCatch(async (req, res) => {
    const { id } = req.params;

    const repo = await Repo.findById(id);
    if (!repo) return res.status(404).json({ error: "Repo not found" });

    res.status(200).json({ repo });
});

// ---------------------------
// GET REPO BY NAME
// ---------------------------
export const GetRepoByName = tryCatch(async (req, res) => {
    const { name } = req.params;

    const repo = await Repo.findOne({ name });
    if (!repo) return res.status(404).json({ error: "Repo not found" });

    res.status(200).json({ repo });
});

// ---------------------------
// GET CURRENT USER REPOS
// ---------------------------
export const GetReposForCurrentUser = tryCatch(async (req, res) => {
    const repos = await Repo.find({ owner: req.user._id });

    res.status(200).json({ repos });
});

// ---------------------------
// STAR OR UNSTAR REPO
// ---------------------------
export const ToggleRepoStarById = tryCatch(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const repo = await Repo.findById(id);
    if (!repo) return res.status(404).json({ error: "Repo not found" });

    const already = repo.stars.includes(userId);

    if (already) {
        repo.stars = repo.stars.filter(uid => uid.toString() !== userId.toString());
    } else {
        repo.stars.push(userId);
    }

    await repo.save();

    res.status(200).json({
        message: already ? "Star removed" : "Star added",
        totalStars: repo.stars.length,
        repo
    });
});

// ---------------------------
// GET ALL STARRED REPOS FOR CURRENT USER
// ---------------------------
export const GetStarredReposForCurrentUser = tryCatch(async (req, res) => {
    const userId = req.user._id.toString();

    // Find repos starred by this user
    const repos = await Repo.find({ stars: userId })
        .sort({ createdAt: -1 })
        .lean();

    // FORCE isStarred = true for UI consistency
    const finalRepos = repos.map(repo => ({
        ...repo,
        isStarred: true
    }));

    res.status(200).json({
        message: "Starred repos fetched successfully",
        total: finalRepos.length,
        repos: finalRepos
    });
});



// ---------------------------
// UPDATE REPO — OWNER ONLY
// ---------------------------
export const UpdateRepoById = tryCatch(async (req, res) => {
    const { id } = req.params;

    const repo = await Repo.findById(id);
    if (!repo) return res.status(404).json({ error: "Repo not found" });

    if (repo.owner.toString() !== req.user._id.toString())
        return res.status(403).json({ error: "You cannot edit this repo" });

    Object.assign(repo, req.body);
    await repo.save();

    res.status(200).json({ message: "Repo updated", repo });
});

// ---------------------------
// DELETE REPO — OWNER ONLY
// ---------------------------
export const DeleteRepoById = tryCatch(async (req, res) => {
    const { id } = req.params;

    const repo = await Repo.findById(id);
    if (!repo) return res.status(404).json({ error: "Repo not found" });

    if (repo.owner.toString() !== req.user._id.toString())
        return res.status(403).json({ error: "You cannot delete this repo" });

    await repo.deleteOne();

    res.status(200).json({ message: "Repo deleted", repo });
});

export const GetRepo = tryCatch(async (req, res) => {
    const { reponame } = req.params;

    const command = new ListObjectsV2Command({
        Bucket: process.env.S3_BUCKET,
        Prefix: `${reponame}/`,
    });

    const data = await s3.send(command);

    if (!data.Contents || data.Contents.length === 0) {
        return res.status(404).json({ error: "No files found in S3" });
    }

    const keys = data.Contents.map(obj => obj.Key);

    // Build folder-tree
    const tree = buildTreeFromKeys(keys);

    res.status(200).json({ tree });
});


function buildTreeFromKeys(keys) {
  const tree = {};

  keys.forEach(key => {
    const parts = key.split("/");
    parts.shift(); // remove repoName

    let current = tree;

    parts.forEach((part, idx) => {
      if (!current[part]) {
        current[part] = idx === parts.length - 1 ? "file" : {};
      }
      if (typeof current[part] === "object") {
        current = current[part];
      }
    });
  });

  return tree;
}

