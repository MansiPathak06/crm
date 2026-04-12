const pool = require("../config/db");

// GET /api/employees
const getAllEmployees = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM employees ORDER BY created_at DESC"
    );
    // Map snake_case DB columns to camelCase for frontend
    const employees = result.rows.map(mapToFrontend);
    res.json(employees);
  } catch (err) {
    console.error("getAllEmployees error:", err);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

// GET /api/employees/:id
const getEmployeeById = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM employees WHERE id = $1",
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Employee not found" });
    res.json(mapToFrontend(result.rows[0]));
  } catch (err) {
    console.error("getEmployeeById error:", err);
    res.status(500).json({ error: "Failed to fetch employee" });
  }
};

// POST /api/employees
const createEmployee = async (req, res) => {
  const { name, email, phone, role, department, project, status, joinDate, salary } = req.body;

  // Validation
  if (!name || !email || !phone || !role || !department || !joinDate || !salary) {
    return res.status(400).json({ error: "All required fields must be provided" });
  }

  const avatar = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  try {
    const result = await pool.query(
      `INSERT INTO employees (name, email, phone, role, department, project, status, join_date, salary, avatar)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [name, email, phone, role, department, project || "All Projects", status || "Active", joinDate, salary, avatar]
    );
    res.status(201).json(mapToFrontend(result.rows[0]));
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Email already exists" });
    }
    console.error("createEmployee error:", err);
    res.status(500).json({ error: "Failed to create employee" });
  }
};

// PUT /api/employees/:id
const updateEmployee = async (req, res) => {
  const { name, email, phone, role, department, project, status, joinDate, salary } = req.body;

  if (!name || !email || !phone || !role || !department || !joinDate || !salary) {
    return res.status(400).json({ error: "All required fields must be provided" });
  }

  const avatar = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  try {
    const result = await pool.query(
      `UPDATE employees
       SET name=$1, email=$2, phone=$3, role=$4, department=$5,
           project=$6, status=$7, join_date=$8, salary=$9, avatar=$10
       WHERE id=$11
       RETURNING *`,
      [name, email, phone, role, department, project || "All Projects", status || "Active", joinDate, salary, avatar, req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Employee not found" });
    res.json(mapToFrontend(result.rows[0]));
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Email already exists" });
    }
    console.error("updateEmployee error:", err);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

// DELETE /api/employees/:id
const deleteEmployee = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM employees WHERE id = $1 RETURNING id",
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Employee not found" });
    res.json({ message: "Employee deleted successfully", id: result.rows[0].id });
  } catch (err) {
    console.error("deleteEmployee error:", err);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

// Helper: map DB row → frontend shape
function mapToFrontend(row) {
  return {
    id:         row.id,
    name:       row.name,
    email:      row.email,
    phone:      row.phone,
    role:       row.role,
    department: row.department,
    project:    row.project,
    status:     row.status,
    joinDate:   row.join_date ? row.join_date.toISOString().split("T")[0] : "",
    salary:     Number(row.salary),
    avatar:     row.avatar,
  };
}

module.exports = { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee };