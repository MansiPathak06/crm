"use client";

import { useState, useRef, useMemo } from "react";

// ─────────────────────────────────────────
// Mock Data
// ─────────────────────────────────────────
const MOCK_FILES = [
  { id: 1, name: "foundation_inspection.jpg", type: "image", category: "Site Progress Photos", project: "Skyline Tower Phase 2", size: "2.4 MB", date: "2024-01-15", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
  { id: 2, name: "site_overview_feb.jpg", type: "image", category: "Site Progress Photos", project: "Green Valley Residency", size: "3.1 MB", date: "2024-02-10", url: "https://images.unsplash.com/photo-1590644365607-5a4e3e5cf082?w=400&q=80" },
  { id: 3, name: "progress_report_q1.pdf", type: "document", category: "Documents/Reports", project: "Metro Rail Depot", size: "1.2 MB", date: "2024-03-01", url: null },
  { id: 4, name: "bridge_construction.jpg", type: "image", category: "Site Progress Photos", project: "Riverside Bridge Project", size: "4.5 MB", date: "2024-01-20", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80" },
  { id: 5, name: "site_walkthrough.mp4", type: "video", category: "Videos", project: "Skyline Tower Phase 2", size: "85.2 MB", date: "2024-02-05", url: null },
  { id: 6, name: "mall_exterior.jpg", type: "image", category: "Site Progress Photos", project: "Central Mall Expansion", size: "2.8 MB", date: "2024-02-20", url: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=400&q=80" },
  { id: 7, name: "safety_audit_report.pdf", type: "document", category: "Documents/Reports", project: "NH-48 Highway Widening", size: "0.8 MB", date: "2024-01-28", url: null },
  { id: 8, name: "techpark_drone.mp4", type: "video", category: "Videos", project: "Techpark Phase 3", size: "120.5 MB", date: "2024-03-10", url: null },
  { id: 9, name: "heritage_wall.jpg", type: "image", category: "Site Progress Photos", project: "Old Town Heritage Restoration", size: "5.2 MB", date: "2024-02-14", url: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80" },
  { id: 10, name: "solar_installation.jpg", type: "image", category: "Site Progress Photos", project: "Solar Farm Grid", size: "3.7 MB", date: "2022-08-10", url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80" },
  { id: 11, name: "budget_report_2024.pdf", type: "document", category: "Documents/Reports", project: "Metro Rail Depot", size: "2.1 MB", date: "2024-03-15", url: null },
  { id: 12, name: "lakeview_progress.jpg", type: "image", category: "Site Progress Photos", project: "Lakeview Villas", size: "1.9 MB", date: "2023-05-20", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80" },
];

const PROJECTS = [
  "All Projects",
  "Skyline Tower Phase 2",
  "Green Valley Residency",
  "Riverside Bridge Project",
  "Metro Rail Depot",
  "Corporate Hub Annex",
  "Central Mall Expansion",
  "NH-48 Highway Widening",
  "Lakeview Villas",
  "Techpark Phase 3",
  "Old Town Heritage Restoration",
  "Solar Farm Grid",
];

const CATEGORIES = ["All", "Site Progress Photos", "Videos", "Documents/Reports"];

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────
const FILE_ICONS = {
  image: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-emerald-500">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-blue-500">
      <rect x="2" y="5" width="15" height="14" rx="2" />
      <path d="M17 9l5-3v12l-5-3V9z" strokeLinejoin="round" />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-rose-500">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" />
    </svg>
  ),
};

const TYPE_BADGE = {
  image: "bg-emerald-100 text-emerald-700",
  video: "bg-blue-100 text-blue-700",
  document: "bg-rose-100 text-rose-700",
};

// ─────────────────────────────────────────
// Preview Modal
// ─────────────────────────────────────────
function PreviewModal({ file, onClose }) {
  if (!file) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-base truncate max-w-sm">{file.name}</h2>
            <p className="text-emerald-100 text-xs mt-0.5">{file.project} · {file.size}</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-xl transition">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex items-center justify-center min-h-[300px] bg-gray-50">
          {file.type === "image" && file.url ? (
            <img src={file.url} alt={file.name} className="max-h-[400px] rounded-xl object-contain shadow-md" />
          ) : file.type === "video" ? (
            <div className="text-center space-y-3">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-blue-500">
                  <polygon points="5,3 19,12 5,21" fill="currentColor" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">Video preview not available</p>
              <p className="text-gray-400 text-xs">{file.name}</p>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                {FILE_ICONS.document}
              </div>
              <p className="text-gray-500 text-sm">Document preview not available</p>
              <p className="text-gray-400 text-xs">{file.name}</p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="px-6 py-4 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Category</p>
            <p className="text-sm font-semibold text-gray-700 mt-0.5">{file.category}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Size</p>
            <p className="text-sm font-semibold text-gray-700 mt-0.5">{file.size}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">Uploaded</p>
            <p className="text-sm font-semibold text-gray-700 mt-0.5">{new Date(file.date).toLocaleDateString("en-IN")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Upload Zone
// ─────────────────────────────────────────
function UploadZone({ onUpload }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState("Site Progress Photos");
  const [project, setProject] = useState("Skyline Tower Phase 2");

  const handleFiles = (files) => {
    if (!files.length) return;
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          // Create mock uploaded files
          const newFiles = Array.from(files).map((file, i) => ({
            id: Date.now() + i,
            name: file.name,
            type: file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : "document",
            category,
            project,
            size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
            date: new Date().toISOString().split("T")[0],
            url: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
          }));
          onUpload(newFiles);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
      <h3 className="font-bold text-gray-900">Upload Files</h3>

      {/* Category & Project selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
            {["Site Progress Photos", "Videos", "Documents/Reports"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Project</label>
          <select value={project} onChange={(e) => setProject(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
            {PROJECTS.filter((p) => p !== "All Projects").map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 ${
          dragging ? "border-emerald-400 bg-emerald-50 scale-[1.01]" : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-emerald-600">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" />
            <path d="M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-gray-700">Drag & drop files here</p>
        <p className="text-xs text-gray-400 mt-1">or <span className="text-emerald-600 font-semibold">browse</span> to upload</p>
        <p className="text-xs text-gray-300 mt-2">Images, Videos, PDFs supported</p>
      </div>

      {/* Progress Bar */}
      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500 font-medium">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// File Card
// ─────────────────────────────────────────
function FileCard({ file, onPreview, onDelete }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
      {/* Thumbnail */}
      <div className="relative h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
        {file.type === "image" && file.url ? (
          <img src={file.url} alt={file.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="flex flex-col items-center gap-2">
            {FILE_ICONS[file.type]}
            <span className="text-xs text-gray-400">{file.type.toUpperCase()}</span>
          </div>
        )}

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onPreview(file)}
            className="p-2 bg-white rounded-xl shadow-md hover:bg-emerald-50 transition"
            title="Preview"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-emerald-600">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(file.id)}
            className="p-2 bg-white rounded-xl shadow-md hover:bg-rose-50 transition"
            title="Delete"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-rose-500">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Type Badge */}
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${TYPE_BADGE[file.type]}`}>
            {file.type}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 space-y-1">
        <p className="text-sm font-semibold text-gray-900 truncate">{file.name}</p>
        <p className="text-xs text-gray-400 truncate">{file.project}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-gray-400">{file.size}</span>
          <span className="text-xs text-gray-400">{new Date(file.date).toLocaleDateString("en-IN")}</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────
export default function SiteUploads() {
  const [files, setFiles] = useState(MOCK_FILES);
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("All Projects");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [previewFile, setPreviewFile] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleUpload = (newFiles) => {
    setFiles((prev) => [...newFiles, ...prev]);
    showToast(`${newFiles.length} file(s) uploaded successfully!`);
  };

  const handleDelete = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    showToast("File deleted!", "info");
  };

  // Filtered files
  const filtered = useMemo(() => {
    return files.filter((f) => {
      const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.project.toLowerCase().includes(search.toLowerCase());
      const matchProject = projectFilter === "All Projects" || f.project === projectFilter;
      const matchCategory = categoryFilter === "All" || f.category === categoryFilter;
      return matchSearch && matchProject && matchCategory;
    });
  }, [files, search, projectFilter, categoryFilter]);

  // Stats
  const stats = {
    total: files.length,
    images: files.filter((f) => f.type === "image").length,
    videos: files.filter((f) => f.type === "video").length,
    documents: files.filter((f) => f.type === "document").length,
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-lg text-sm font-semibold text-white flex items-center gap-2 transition-all duration-300 ${
          toast.type === "success" ? "bg-emerald-500" : "bg-blue-500"
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Files", value: stats.total, bg: "bg-blue-50", color: "text-blue-700", icon: "📁" },
          { label: "Images", value: stats.images, bg: "bg-emerald-50", color: "text-emerald-700", icon: "🖼️" },
          { label: "Videos", value: stats.videos, bg: "bg-indigo-50", color: "text-indigo-700", icon: "🎥" },
          { label: "Documents", value: stats.documents, bg: "bg-rose-50", color: "text-rose-700", icon: "📄" },
        ].map((card) => (
          <div key={card.label} className={`${card.bg} rounded-2xl p-5 shadow-sm border border-white/60`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">{card.label}</span>
              <span className="text-xl">{card.icon}</span>
            </div>
            <p className={`text-4xl font-black ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Upload Zone */}
      <UploadZone onUpload={handleUpload} />

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Search files or projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
            />
          </div>

          {/* Project Filter */}
          <select value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
            {PROJECTS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>

          {/* Category Filter */}
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          <div className="text-sm text-gray-400 font-medium self-center shrink-0">
            {filtered.length} file{filtered.length !== 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              onPreview={setPreviewFile}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 text-center text-gray-400">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 mx-auto mb-3 opacity-40">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" strokeLinecap="round" />
          </svg>
          <p className="font-medium">No files found</p>
          <p className="text-sm mt-1">Try changing your filters or upload new files</p>
        </div>
      )}

      {/* Preview Modal */}
      <PreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />
    </div>
  );
}