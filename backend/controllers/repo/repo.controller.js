import Repo from "../../models/repo.model.js";

const tryCatch = (fn) => async (req, res) => {
    try {
        await fn(req, res);
    } catch (err) {
        console.error("Controller Error:", err);
        res.status(500).json({ error: err.message });
    }
};


export const CreateRepo = tryCatch(async (req, res) => {
    const { name, description, visibility, owner, content, issues } = req.body;

    if (!name) return res.status(400).json({ error: "Repo name is required" });
    if (!owner) return res.status(400).json({ error: "Owner is required" });

    const repo = new Repo({
        name,
        description,
        visibility: visibility || "public",
        owner,
        content: content || [],
        issues: issues || []
    });

    await repo.save();

    res.status(201).json({
        message: "Repository created successfully",
        repo
    });
});


export const GetAllRepos = tryCatch(async (req, res) => {
    const repos = await Repo.find({}).sort({ createdAt: -1 });
    res.status(200).json({ repos });
});


export const GetRepoById = tryCatch(async (req, res) => {
    const { id } = req.params;

    const repo = await Repo.findById(id);

    if (!repo) return res.status(404).json({ error: "Repo not found" });

    res.status(200).json({ repo });
});

// ---------------------------
// ✅ Get Repo By Name
// ---------------------------
export const GetRepoByName = tryCatch(async (req, res) => {
    const { name } = req.params;

    const repo = await Repo.findOne({ name });

    if (!repo) return res.status(404).json({ error: "Repo not found" });

    res.status(200).json({ repo });
});

// ---------------------------
// ✅ Get All Repos for Current User
// ---------------------------
export const GetReposForCurrentUser = tryCatch(async (req, res) => {
    const { userID } = req.params;

    const repos = await Repo.find({ owner: userID });

    res.status(200).json({ repos });
});

export const ToggleRepoStarById = tryCatch(async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body; // user stealing the repo

    if (!userId)
        return res.status(400).json({ error: "userId required to star/unstar repo" });

    const repo = await Repo.findById(id);

    if (!repo) return res.status(404).json({ error: "Repo not found" });

    const alreadyStarred = repo.stars.includes(userId);

    if (alreadyStarred) {
        // Remove star
        repo.stars = repo.stars.filter(uid => uid.toString() !== userId);
    } else {
        // Add star
        repo.stars.push(userId);
    }

    await repo.save();

    res.status(200).json({
        message: alreadyStarred ? "Star removed" : "Star added",
        totalStars: repo.stars.length,
        repo
    });
});


export const UpdateRepoById = tryCatch(async (req, res) => {
    const { id } = req.params;

    const updatedRepo = await Repo.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
    );

    if (!updatedRepo) return res.status(404).json({ error: "Repo not found" });

    res.status(200).json({
        message: "Repository updated successfully",
        repo: updatedRepo
    });
});


// Delete Repo

export const DeleteRepoById = tryCatch(async (req, res) => {
    const { id } = req.params;

    const deletedRepo = await Repo.findByIdAndDelete(id);

    if (!deletedRepo) return res.status(404).json({ error: "Repo not found" });

    res.status(200).json({
        message: "Repository deleted successfully",
        repo: deletedRepo
    });
});
