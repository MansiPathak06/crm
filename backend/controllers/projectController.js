const pool = require("../config/db");

// Helper: map DB row → frontend shape
function mapProject(row) {
  const formatDate = (d) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric"
    });
  };

  return {
    id:        row.id,
    name:      row.name,
    location:  row.location,
    status:    row.status,
    budget:    `₹${Number(row.budget).toLocaleString("en-IN")}`,
    budgetRaw: Number(row.budget),
    startDate: formatDate(row.start_date),
    endDate:   formatDate(row.end_date),
    startDateRaw: row.start_date ? row.start_date.toISOString().split("T")[0] : "",
    endDateRaw:   row.end_date   ? row.end_date.toISOString().split("T")[0]   : "",
    progress:  row.progress,
  };
}

// GET /api/projects
const getAllProjects = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects ORDER BY created_at DESC");
    res.json(result.rows.map(mapProject));
  } catch (err) {
    console.error("getAllProjects:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// GET /api/projects/:id
const getProjectById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects WHERE id = $1", [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: "Project not found" });
    res.json(mapProject(result.rows[0]));
  } catch (err) {
    console.error("getProjectById:", err);
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

// POST /api/projects
const createProject = async (req, res) => {
  const { name, location, status = "Ongoing", budget, startDate, endDate, progress = 0 } = req.body;

  if (!name?.trim() || !location?.trim() || !budget || !startDate || !endDate) {
    return res.status(400).json({ error: "Name, location, budget, startDate and endDate are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO projects (name, location, status, budget, start_date, end_date, progress)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [name, location, status, Number(budget), startDate, endDate, Number(progress) || 0]
    );
    res.status(201).json(mapProject(result.rows[0]));
  } catch (err) {
    console.error("createProject:", err);
    res.status(500).json({ error: "Failed to create project" });
  }
};

// PUT /api/projects/:id
const updateProject = async (req, res) => {
  const { name, location, status, budget, startDate, endDate, progress } = req.body;

  if (!name?.trim() || !location?.trim() || !budget || !startDate || !endDate) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      `UPDATE projects
       SET name=$1, location=$2, status=$3, budget=$4, start_date=$5, end_date=$6, progress=$7
       WHERE id=$8
       RETURNING *`,
      [name, location, status, Number(budget), startDate, endDate, Number(progress) || 0, req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: "Project not found" });
    res.json(mapProject(result.rows[0]));
  } catch (err) {
    console.error("updateProject:", err);
    res.status(500).json({ error: "Failed to update project" });
  }
};

// DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM projects WHERE id=$1 RETURNING id", [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: "Project not found" });
    res.json({ message: "Project deleted", id: result.rows[0].id });
  } catch (err) {
    console.error("deleteProject:", err);
    res.status(500).json({ error: "Failed to delete project" });
  }
};

module.exports = { getAllProjects, getProjectById, createProject, updateProject, deleteProject };