import Repo from "../../models/repo.model.js";

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
    const repos = await Repo.find().sort({ createdAt: -1 });
    res.status(200).json({ repos });
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
