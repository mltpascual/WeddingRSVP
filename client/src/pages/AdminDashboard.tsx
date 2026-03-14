import { useFirebaseAuth } from "@/lib/useFirebaseAuth";
import {
  listRsvps,
  getRsvpStats,
  updateRsvp,
  deleteRsvp,
  type RsvpDoc,
  type RsvpStats,
} from "@/lib/rsvpService";
import {
  Users,
  CheckCircle,
  XCircle,
  MessageSquare,
  ArrowLeft,
  LogOut,
  Loader2,
  Mail,
  Eye,
  EyeOff,
  Calendar,
  Search,
  Download,
  Pencil,
  Trash2,
  X,
  Save,
} from "lucide-react";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, loading: authLoading, isAuthenticated, login, logout, error: authError } = useFirebaseAuth();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAttending, setFilterAttending] = useState<"all" | "yes" | "no">("all");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // Data state
  const [rsvps, setRsvps] = useState<RsvpDoc[]>([]);
  const [stats, setStats] = useState<RsvpStats | null>(null);
  const [dataLoading, setDataLoading] = useState(false);

  // Edit state
  const [editingRsvp, setEditingRsvp] = useState<RsvpDoc | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", attending: "yes" as "yes" | "no", message: "" });

  // Delete confirmation state
  const [deletingRsvp, setDeletingRsvp] = useState<RsvpDoc | null>(null);

  // Saving/deleting state
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch data when authenticated
  const fetchData = useCallback(async () => {
    setDataLoading(true);
    try {
      const [rsvpList, rsvpStats] = await Promise.all([listRsvps(), getRsvpStats()]);
      setRsvps(rsvpList);
      setStats(rsvpStats);
    } catch (err: any) {
      console.error("Failed to fetch RSVP data:", err);
      toast.error("Failed to load RSVP data. Check Firebase configuration.");
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error("Please enter email and password.");
      return;
    }
    setLoginLoading(true);
    try {
      await login(loginEmail, loginPassword);
      toast.success("Logged in successfully!");
    } catch (err: any) {
      toast.error(err.message || "Login failed.");
    } finally {
      setLoginLoading(false);
    }
  };

  const openEditModal = useCallback((rsvp: RsvpDoc) => {
    setEditingRsvp(rsvp);
    setEditForm({
      name: rsvp.name,
      email: rsvp.email || "",
      attending: rsvp.attending,
      message: rsvp.message || "",
    });
  }, []);

  const handleSaveEdit = useCallback(async () => {
    if (!editingRsvp) return;
    if (!editForm.name.trim()) {
      toast.error("Name is required");
      return;
    }
    setIsSaving(true);
    try {
      await updateRsvp({
        id: editingRsvp.id,
        name: editForm.name.trim(),
        email: editForm.email.trim() || null,
        attending: editForm.attending,
        message: editForm.message.trim() || null,
      });
      setEditingRsvp(null);
      toast.success("RSVP updated successfully");
      await fetchData();
    } catch (err: any) {
      toast.error(`Failed to update: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  }, [editingRsvp, editForm, fetchData]);

  const handleDelete = useCallback(async () => {
    if (!deletingRsvp) return;
    setIsDeleting(true);
    try {
      await deleteRsvp(deletingRsvp.id);
      setDeletingRsvp(null);
      toast.success("RSVP deleted successfully");
      await fetchData();
    } catch (err: any) {
      toast.error(`Failed to delete: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  }, [deletingRsvp, fetchData]);

  // Filter and search logic
  const filteredRsvps = useMemo(() => {
    if (!rsvps) return [];
    return rsvps.filter((rsvp) => {
      const matchesSearch =
        !searchQuery ||
        rsvp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (rsvp.email && rsvp.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (rsvp.message && rsvp.message.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFilter = filterAttending === "all" || rsvp.attending === filterAttending;
      return matchesSearch && matchesFilter;
    });
  }, [rsvps, searchQuery, filterAttending]);

  // Guest messages (only those with messages)
  const guestMessages = useMemo(() => {
    if (!rsvps) return [];
    return rsvps.filter((r) => r.message && r.message.trim().length > 0);
  }, [rsvps]);

  // Export CSV
  const handleExportCSV = () => {
    if (!rsvps) return;
    const headers = ["Name", "Email", "Attending", "Message", "Submitted"];
    const rows = rsvps.map((r) => [
      r.name,
      r.email || "",
      r.attending === "yes" ? "Yes" : "No",
      (r.message || "").replace(/"/g, '""'),
      new Date(r.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rsvp-responses.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Auth loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "oklch(0.97 0.015 60)" }}>
        <Loader2 className="animate-spin" size={32} style={{ color: "oklch(0.50 0.1 20)" }} />
      </div>
    );
  }

  // Not authenticated — show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "oklch(0.97 0.015 60)" }}>
        <div className="w-full max-w-sm p-8">
          <div className="text-center mb-8">
            <p className="font-script text-3xl mb-2" style={{ color: "oklch(0.50 0.1 20)" }}>
              Admin Dashboard
            </p>
            <p className="font-body text-sm" style={{ color: "oklch(0.35 0.03 40)" }}>
              Sign in with your admin account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                className="block font-display text-[10px] tracking-[0.2em] uppercase mb-2"
                style={{ color: "oklch(0.35 0.03 40)" }}
              >
                Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 text-sm font-body focus:outline-none transition-all duration-200"
                style={{
                  background: "oklch(0.96 0.015 60)",
                  border: "1px solid oklch(0.88 0.02 55)",
                  color: "oklch(0.20 0.03 40)",
                }}
                required
                disabled={loginLoading}
              />
            </div>
            <div>
              <label
                className="block font-display text-[10px] tracking-[0.2em] uppercase mb-2"
                style={{ color: "oklch(0.35 0.03 40)" }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-11 text-sm font-body focus:outline-none transition-all duration-200"
                  style={{
                    background: "oklch(0.96 0.015 60)",
                    border: "1px solid oklch(0.88 0.02 55)",
                    color: "oklch(0.20 0.03 40)",
                  }}
                  required
                  disabled={loginLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-200"
                  style={{ color: "oklch(0.50 0.03 40)" }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {authError && (
              <p className="text-xs font-body text-center" style={{ color: "oklch(0.50 0.15 25)" }}>
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 font-display text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: "oklch(0.50 0.1 20)", color: "oklch(0.98 0.005 55)" }}
            >
              {loginLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="font-display text-xs tracking-[0.15em] uppercase transition-colors duration-200"
              style={{ color: "oklch(0.50 0.03 40)" }}
            >
              &larr; Back to Wedding Site
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isLoading = dataLoading;

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.97 0.015 60)" }}>
      {/* ===== EDIT MODAL ===== */}
      {editingRsvp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div
            className="w-full max-w-md rounded-sm p-6 relative"
            style={{ background: "oklch(0.98 0.01 55)", border: "1px solid oklch(0.88 0.03 65)" }}
          >
            <button
              onClick={() => setEditingRsvp(null)}
              className="absolute top-4 right-4 p-1 transition-colors duration-200"
              style={{ color: "oklch(0.35 0.03 40)" }}
            >
              <X size={18} />
            </button>
            <h3 className="font-display text-lg font-light tracking-wide mb-5" style={{ color: "oklch(0.25 0.04 40)" }}>
              Edit RSVP
            </h3>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block font-display text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "oklch(0.35 0.03 40)" }}>
                  Guest Name *
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-3 py-2 text-sm font-body focus:outline-none"
                  style={{ background: "oklch(0.96 0.015 60)", border: "1px solid oklch(0.88 0.02 55)", color: "oklch(0.20 0.03 40)" }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-display text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "oklch(0.35 0.03 40)" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full px-3 py-2 text-sm font-body focus:outline-none"
                  style={{ background: "oklch(0.96 0.015 60)", border: "1px solid oklch(0.88 0.02 55)", color: "oklch(0.20 0.03 40)" }}
                  placeholder="guest@email.com"
                />
              </div>

              {/* Attending */}
              <div>
                <label className="block font-display text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "oklch(0.35 0.03 40)" }}>
                  Status
                </label>
                <div className="flex gap-2">
                  {(["yes", "no"] as const).map((val) => (
                    <button
                      key={val}
                      onClick={() => setEditForm((f) => ({ ...f, attending: val }))}
                      className="flex-1 py-2 font-display text-[10px] tracking-[0.15em] uppercase transition-all duration-200"
                      style={{
                        background: editForm.attending === val
                          ? val === "yes" ? "oklch(0.48 0.15 150)" : "oklch(0.55 0.15 25)"
                          : "transparent",
                        color: editForm.attending === val ? "white" : "oklch(0.35 0.03 40)",
                        border: `1px solid ${editForm.attending === val
                          ? val === "yes" ? "oklch(0.48 0.15 150)" : "oklch(0.55 0.15 25)"
                          : "oklch(0.88 0.02 55)"}`,
                      }}
                    >
                      {val === "yes" ? "Attending" : "Declined"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-display text-[10px] tracking-[0.2em] uppercase mb-1.5" style={{ color: "oklch(0.35 0.03 40)" }}>
                  Message
                </label>
                <textarea
                  value={editForm.message}
                  onChange={(e) => setEditForm((f) => ({ ...f, message: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 text-sm font-body focus:outline-none resize-none"
                  style={{ background: "oklch(0.96 0.015 60)", border: "1px solid oklch(0.88 0.02 55)", color: "oklch(0.20 0.03 40)" }}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingRsvp(null)}
                className="flex-1 py-2.5 font-display text-[10px] tracking-[0.15em] uppercase transition-all duration-200"
                style={{ border: "1px solid oklch(0.88 0.02 55)", color: "oklch(0.35 0.03 40)" }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isSaving}
                className="flex-1 py-2.5 font-display text-[10px] tracking-[0.15em] uppercase transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                style={{ background: "oklch(0.50 0.1 20)", color: "oklch(0.98 0.005 55)" }}
              >
                {isSaving ? <Loader2 className="animate-spin" size={14} /> : <Save size={14} />}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRMATION ===== */}
      {deletingRsvp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div
            className="w-full max-w-sm rounded-sm p-6 text-center"
            style={{ background: "oklch(0.98 0.01 55)", border: "1px solid oklch(0.88 0.03 65)" }}
          >
            <div className="mx-auto mb-4 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "oklch(0.55 0.15 25 / 0.1)" }}>
              <Trash2 size={20} style={{ color: "oklch(0.55 0.15 25)" }} />
            </div>
            <h3 className="font-display text-lg font-light tracking-wide mb-2" style={{ color: "oklch(0.25 0.04 40)" }}>
              Delete RSVP?
            </h3>
            <p className="font-body text-xs mb-1" style={{ color: "oklch(0.35 0.03 40)" }}>
              Are you sure you want to delete the RSVP from
            </p>
            <p className="font-display text-sm font-medium mb-5" style={{ color: "oklch(0.50 0.1 20)" }}>
              {deletingRsvp.name}
            </p>
            <p className="font-body text-[10px] mb-5" style={{ color: "oklch(0.45 0.02 40)" }}>
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingRsvp(null)}
                className="flex-1 py-2.5 font-display text-[10px] tracking-[0.15em] uppercase transition-all duration-200"
                style={{ border: "1px solid oklch(0.88 0.02 55)", color: "oklch(0.35 0.03 40)" }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-2.5 font-display text-[10px] tracking-[0.15em] uppercase transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                style={{ background: "oklch(0.55 0.15 25)", color: "white" }}
              >
                {isDeleting ? <Loader2 className="animate-spin" size={14} /> : <Trash2 size={14} />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ background: "oklch(0.95 0.025 65)", borderColor: "oklch(0.88 0.03 65)" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 font-display text-xs tracking-[0.15em] uppercase transition-colors duration-200"
              style={{ color: "oklch(0.35 0.03 40)" }}
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Site</span>
            </button>
            <div className="h-5 w-px" style={{ background: "oklch(0.85 0.02 55)" }} />
            <h1 className="font-display text-lg md:text-xl font-light tracking-wide" style={{ color: "oklch(0.25 0.04 40)" }}>
              RSVP Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:block font-body text-xs" style={{ color: "oklch(0.35 0.03 40)" }}>
              {user?.email || "Admin"}
            </span>
            <button
              onClick={() => logout()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-display text-[10px] tracking-[0.15em] uppercase transition-all duration-200"
              style={{
                border: "1px solid oklch(0.85 0.02 55)",
                color: "oklch(0.35 0.03 40)",
              }}
            >
              <LogOut size={12} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Stats Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total RSVPs",
              value: stats?.total ?? 0,
              icon: Users,
              color: "oklch(0.50 0.1 20)",
              bg: "oklch(0.50 0.1 20 / 0.08)",
            },
            {
              label: "Attending",
              value: stats?.attending ?? 0,
              icon: CheckCircle,
              color: "oklch(0.40 0.15 150)",
              bg: "oklch(0.40 0.15 150 / 0.08)",
            },
            {
              label: "Declining",
              value: stats?.declining ?? 0,
              icon: XCircle,
              color: "oklch(0.50 0.15 25)",
              bg: "oklch(0.50 0.15 25 / 0.08)",
            },
            {
              label: "Messages",
              value: guestMessages.length,
              icon: MessageSquare,
              color: "oklch(0.55 0.1 85)",
              bg: "oklch(0.55 0.1 85 / 0.08)",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 md:p-6 rounded-sm transition-all duration-300 hover:shadow-md"
              style={{
                background: "oklch(0.98 0.01 55)",
                border: "1px solid oklch(0.90 0.02 55)",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-sm" style={{ background: stat.bg }}>
                  <stat.icon size={18} style={{ color: stat.color }} />
                </div>
              </div>
              <p
                className="font-display text-3xl md:text-4xl font-light"
                style={{ color: stat.color }}
              >
                {isLoading ? <Loader2 className="animate-spin" size={24} /> : stat.value}
              </p>
              <p
                className="font-display text-[10px] tracking-[0.2em] uppercase mt-1"
                style={{ color: "oklch(0.35 0.03 40)" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        {/* Attendance Rate Bar */}
        {stats && stats.total > 0 && (
          <section
            className="p-5 rounded-sm"
            style={{
              background: "oklch(0.98 0.01 55)",
              border: "1px solid oklch(0.90 0.02 55)",
            }}
          >
            <p
              className="font-display text-[10px] tracking-[0.2em] uppercase mb-3"
              style={{ color: "oklch(0.35 0.03 40)" }}
            >
              Attendance Rate
            </p>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "oklch(0.93 0.02 55)" }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.round((stats.attending / stats.total) * 100)}%`,
                    background: "linear-gradient(90deg, oklch(0.40 0.15 150), oklch(0.48 0.12 150))",
                  }}
                />
              </div>
              <span className="font-display text-sm font-medium" style={{ color: "oklch(0.35 0.15 150)" }}>
                {Math.round((stats.attending / stats.total) * 100)}%
              </span>
            </div>
          </section>
        )}

        {/* Responses Table */}
        <section
          className="rounded-sm overflow-hidden"
          style={{
            background: "oklch(0.98 0.01 55)",
            border: "1px solid oklch(0.90 0.02 55)",
          }}
        >
          {/* Table Header */}
          <div className="p-5 border-b" style={{ borderColor: "oklch(0.90 0.02 55)" }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2
                className="font-display text-lg font-light tracking-wide"
                style={{ color: "oklch(0.25 0.04 40)" }}
              >
                All Responses
              </h2>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    style={{ color: "oklch(0.45 0.03 40)" }}
                  />
                  <input
                    type="text"
                    placeholder="Search guests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 text-xs font-body w-full sm:w-56 focus:outline-none transition-all duration-200"
                    style={{
                      background: "oklch(0.96 0.015 60)",
                      border: "1px solid oklch(0.88 0.02 55)",
                      color: "oklch(0.20 0.03 40)",
                    }}
                  />
                </div>
                {/* Filter */}
                <div className="flex gap-1">
                  {(["all", "yes", "no"] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilterAttending(f)}
                      className="px-3 py-2 font-display text-[10px] tracking-[0.15em] uppercase transition-all duration-200"
                      style={{
                        background: filterAttending === f ? "oklch(0.50 0.1 20)" : "transparent",
                        color: filterAttending === f ? "oklch(0.98 0.005 55)" : "oklch(0.35 0.03 40)",
                        border: `1px solid ${filterAttending === f ? "oklch(0.50 0.1 20)" : "oklch(0.88 0.02 55)"}`,
                      }}
                    >
                      {f === "all" ? "All" : f === "yes" ? "Attending" : "Declining"}
                    </button>
                  ))}
                </div>
                {/* Export */}
                <button
                  onClick={handleExportCSV}
                  disabled={!rsvps || rsvps.length === 0}
                  className="flex items-center gap-1.5 px-3 py-2 font-display text-[10px] tracking-[0.15em] uppercase transition-all duration-200 disabled:opacity-40"
                  style={{
                    border: "1px solid oklch(0.85 0.02 55)",
                    color: "oklch(0.35 0.03 40)",
                  }}
                >
                  <Download size={12} />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="p-12 text-center">
              <Loader2 className="animate-spin mx-auto mb-3" size={24} style={{ color: "oklch(0.50 0.1 20)" }} />
              <p className="font-body text-xs" style={{ color: "oklch(0.35 0.03 40)" }}>
                Loading responses...
              </p>
            </div>
          ) : filteredRsvps.length === 0 ? (
            <div className="p-12 text-center">
              <Users size={32} className="mx-auto mb-3 opacity-30" style={{ color: "oklch(0.35 0.03 40)" }} />
              <p className="font-body text-sm" style={{ color: "oklch(0.35 0.03 40)" }}>
                {rsvps && rsvps.length > 0 ? "No results match your search." : "No RSVPs received yet."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: "oklch(0.96 0.015 60)" }}>
                    {["Guest Name", "Email", "Status", "Message", "Date", "Actions"].map((h) => (
                      <th
                        key={h}
                        className={`text-left px-5 py-3 font-display text-[10px] tracking-[0.2em] uppercase ${h === "Actions" ? "text-right" : ""}`}
                        style={{ color: "oklch(0.35 0.03 40)", borderBottom: "1px solid oklch(0.90 0.02 55)" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRsvps.map((rsvp, i) => (
                    <tr
                      key={rsvp.id}
                      className="transition-colors duration-150 group"
                      style={{
                        borderBottom: i < filteredRsvps.length - 1 ? "1px solid oklch(0.93 0.015 55)" : undefined,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "oklch(0.97 0.015 60)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td className="px-5 py-4">
                        <p className="font-display text-sm font-medium" style={{ color: "oklch(0.20 0.03 40)" }}>
                          {rsvp.name}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        {rsvp.email ? (
                          <div className="flex items-center gap-1.5">
                            <Mail size={12} style={{ color: "oklch(0.40 0.03 40)" }} />
                            <span className="font-body text-xs" style={{ color: "oklch(0.30 0.03 40)" }}>
                              {rsvp.email}
                            </span>
                          </div>
                        ) : (
                          <span className="font-body text-xs italic" style={{ color: "oklch(0.55 0.02 40)" }}>
                            Not provided
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-display text-[10px] tracking-[0.1em] uppercase"
                          style={{
                            background: rsvp.attending === "yes" ? "oklch(0.40 0.15 150 / 0.12)" : "oklch(0.50 0.15 25 / 0.12)",
                            color: rsvp.attending === "yes" ? "oklch(0.32 0.15 150)" : "oklch(0.42 0.15 25)",
                          }}
                        >
                          {rsvp.attending === "yes" ? <CheckCircle size={10} /> : <XCircle size={10} />}
                          {rsvp.attending === "yes" ? "Attending" : "Declined"}
                        </span>
                      </td>
                      <td className="px-5 py-4 max-w-xs">
                        {rsvp.message ? (
                          <p className="font-body text-xs truncate" style={{ color: "oklch(0.30 0.03 40)" }} title={rsvp.message}>
                            {rsvp.message}
                          </p>
                        ) : (
                          <span className="font-body text-xs italic" style={{ color: "oklch(0.55 0.02 40)" }}>
                            &mdash;
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} style={{ color: "oklch(0.40 0.03 40)" }} />
                          <span className="font-body text-xs whitespace-nowrap" style={{ color: "oklch(0.30 0.03 40)" }}>
                            {new Date(rsvp.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditModal(rsvp)}
                            className="p-2 rounded-sm transition-all duration-200 opacity-70 hover:opacity-100"
                            style={{ color: "oklch(0.35 0.03 40)" }}
                            title="Edit RSVP"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => setDeletingRsvp(rsvp)}
                            className="p-2 rounded-sm transition-all duration-200 opacity-70 hover:opacity-100"
                            style={{ color: "oklch(0.50 0.15 25)" }}
                            title="Delete RSVP"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer */}
          {filteredRsvps.length > 0 && (
            <div
              className="px-5 py-3 border-t flex items-center justify-between"
              style={{ borderColor: "oklch(0.90 0.02 55)", background: "oklch(0.96 0.015 60)" }}
            >
              <p className="font-body text-xs" style={{ color: "oklch(0.35 0.03 40)" }}>
                Showing {filteredRsvps.length} of {rsvps?.length ?? 0} responses
              </p>
            </div>
          )}
        </section>

        {/* Guest Messages */}
        {guestMessages.length > 0 && (
          <section>
            <h2
              className="font-display text-lg font-light tracking-wide mb-4"
              style={{ color: "oklch(0.25 0.04 40)" }}
            >
              Guest Messages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {guestMessages.map((rsvp) => (
                <div
                  key={rsvp.id}
                  className="p-5 rounded-sm transition-all duration-300 hover:shadow-md"
                  style={{
                    background: "oklch(0.98 0.01 55)",
                    border: "1px solid oklch(0.90 0.02 55)",
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <MessageSquare size={14} className="mt-0.5 shrink-0" style={{ color: "oklch(0.55 0.1 85)" }} />
                    <div>
                      <p className="font-display text-sm font-medium" style={{ color: "oklch(0.25 0.04 40)" }}>
                        {rsvp.name}
                      </p>
                      <p className="font-body text-[10px] mt-0.5" style={{ color: "oklch(0.40 0.03 40)" }}>
                        {rsvp.attending === "yes" ? "Attending" : "Declined"} &middot;{" "}
                        {new Date(rsvp.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="font-body text-xs leading-relaxed italic" style={{ color: "oklch(0.30 0.03 40)" }}>
                    &ldquo;{rsvp.message}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
