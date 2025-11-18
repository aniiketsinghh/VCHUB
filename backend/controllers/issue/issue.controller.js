import Issue from "../../models/issue.model.js";

// CREATE ISSUE
export const createIssue = async (req, res) => {
  try {
    const { title, description, status, repository } = req.body;

    if (!title || !repository) {
      return res.status(400).json({ message: "Title and Repository are required" });
    }

    const newIssue = await Issue.create({
      title,
      description,
      status: status || "open",
      repository,
    });

    return res.status(201).json({
      message: "Issue created successfully",
      issue: newIssue,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// UPDATE ISSUE
export const updateIssue = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedIssue = await Issue.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedIssue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    return res.status(200).json({
      message: "Issue updated successfully",
      issue: updatedIssue,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// DELETE ISSUE
export const deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Issue.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Issue not found" });
    }

    return res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// GET ALL ISSUES
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("repository");

    return res.status(200).json({
      count: issues.length,
      issues,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// GET ISSUE BY ID
export const getIssueById = async (req, res) => {
  try {
    const { id } = req.params;

    const issue = await Issue.findById(id).populate("repository");

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    return res.status(200).json(issue);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
