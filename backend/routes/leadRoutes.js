const express = require("express");
const router  = express.Router();
const {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  updateLeadStatus,
  deleteLead,
} = require("../controllers/leadController");

router.get("/",              getAllLeads);
router.get("/:id",           getLeadById);
router.post("/",             createLead);
router.put("/:id",           updateLead);
router.patch("/:id/status",  updateLeadStatus);   // Kanban drag-drop
router.delete("/:id",        deleteLead);

module.exports = router;