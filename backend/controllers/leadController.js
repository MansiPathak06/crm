const pool = require("../config/db");

// Helper: map DB row → frontend shape
function mapLead(row) {
  return {
    id:       row.id,
    name:     row.name,
    email:    row.email,
    phone:    row.phone,
    company:  row.company,
    source:   row.source,
    status:   row.status,
    assigned: row.assigned,
    notes:    row.notes,
    value:    Number(row.value),
    date:     row.date ? row.date.toISOString().split("T")[0] : "",
  };
}

// GET /api/leads
const getAllLeads = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM leads ORDER BY created_at DESC");
    res.json(result.rows.map(mapLead));
  } catch (err) {
    console.error("getAllLeads:", err);
    res.status(500).json({ error: "Failed to fetch leads" });
  }
};

// GET /api/leads/:id
const getLeadById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM leads WHERE id = $1", [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: "Lead not found" });
    res.json(mapLead(result.rows[0]));
  } catch (err) {
    console.error("getLeadById:", err);
    res.status(500).json({ error: "Failed to fetch lead" });
  }
};

// POST /api/leads
const createLead = async (req, res) => {
  const { name, email, phone = "", company, source = "Website", status = "New", assigned = "Aarav Shah", notes = "", value = 0 } = req.body;

  if (!name?.trim() || !email?.trim() || !company?.trim()) {
    return res.status(400).json({ error: "Name, email and company are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO leads (name, email, phone, company, source, status, assigned, notes, value, date)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,CURRENT_DATE)
       RETURNING *`,
      [name, email, phone, company, source, status, assigned, notes, Number(value) || 0]
    );
    res.status(201).json(mapLead(result.rows[0]));
  } catch (err) {
    console.error("createLead:", err);
    res.status(500).json({ error: "Failed to create lead" });
  }
};

// PUT /api/leads/:id
const updateLead = async (req, res) => {
  const { name, email, phone = "", company, source, status, assigned, notes = "", value = 0 } = req.body;

  if (!name?.trim() || !email?.trim() || !company?.trim()) {
    return res.status(400).json({ error: "Name, email and company are required" });
  }

  try {
    const result = await pool.query(
      `UPDATE leads
       SET name=$1, email=$2, phone=$3, company=$4, source=$5,
           status=$6, assigned=$7, notes=$8, value=$9
       WHERE id=$10
       RETURNING *`,
      [name, email, phone, company, source, status, assigned, notes, Number(value) || 0, req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: "Lead not found" });
    res.json(mapLead(result.rows[0]));
  } catch (err) {
    console.error("updateLead:", err);
    res.status(500).json({ error: "Failed to update lead" });
  }
};

// PATCH /api/leads/:id/status  (used by Kanban drag-drop)
const updateLeadStatus = async (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: "Status is required" });

  try {
    const result = await pool.query(
      "UPDATE leads SET status=$1 WHERE id=$2 RETURNING *",
      [status, req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: "Lead not found" });
    res.json(mapLead(result.rows[0]));
  } catch (err) {
    console.error("updateLeadStatus:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};

// DELETE /api/leads/:id
const deleteLead = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM leads WHERE id=$1 RETURNING id", [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: "Lead not found" });
    res.json({ message: "Lead deleted", id: result.rows[0].id });
  } catch (err) {
    console.error("deleteLead:", err);
    res.status(500).json({ error: "Failed to delete lead" });
  }
};

module.exports = { getAllLeads, getLeadById, createLead, updateLead, updateLeadStatus, deleteLead };