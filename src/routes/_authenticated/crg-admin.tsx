import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useMemo, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  LogOut,
  Pencil,
  Plus,
  ShieldAlert,
  Trash2,
  X,
  Search,
  Calendar,
  Filter,
  ArrowUpDown,
  FileText,
  Newspaper,
  Download,
  ExternalLink,
  Briefcase,
  Users,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { KEY_SECTORS, RESOURCE_TYPES, NEWS_CATEGORIES } from "@/lib/sectors";

const LOGO_URL = "/crg-logo.png";
const IDLE_MS = 30 * 60 * 1000;
const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 5;

export const Route = createFileRoute("/_authenticated/crg-admin")({
  head: () => ({
    meta: [
      { title: "CRG Admin Portal" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Restricted administration area." },
    ],
  }),
  component: AdminPortal,
});

/* ---------------- Types ---------------- */

type WorkUpdate = {
  id: string;
  title: string;
  description: string;
  image_urls: string[];
  work_date: string;
  status: "draft" | "published";
  sector?: string | null;
};

type ResourceItem = {
  id: string;
  title: string;
  description: string;
  resource_type: string;
  sector?: string | null;
  file_url?: string | null;
  external_url?: string | null;
  author?: string | null;
  publication_date: string;
  status: "draft" | "published";
};

type NewsItem = {
  id: string;
  title: string;
  summary?: string | null;
  content: string;
  news_date: string;
  sector?: string | null;
  category?: string | null;
  image_urls: string[];
  external_link?: string | null;
  status: "draft" | "published";
};

type EmployeeEmail = {
  id: string;
  employee_name: string;
  email_address: string;
  department: string | null;
  position: string | null;
  status: "active" | "suspended";
  created_at?: string;
};

/* ---------------- Helper: Date Filtering ---------------- */

function matchesDateFilter(
  itemDateStr: string | null | undefined,
  filter: string,
  customStart?: string,
  customEnd?: string
): boolean {
  if (!itemDateStr) return true;
  if (filter === "ALL") return true;

  const itemDate = new Date(itemDateStr).getTime();
  if (isNaN(itemDate)) return true;

  const now = new Date();
  const nowTime = now.getTime();

  if (filter === "THIS_MONTH") {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    return itemDate >= startOfMonth && itemDate <= nowTime + 86400000;
  }
  if (filter === "LAST_30_DAYS") {
    const thirtyDaysAgo = nowTime - 30 * 24 * 60 * 60 * 1000;
    return itemDate >= thirtyDaysAgo && itemDate <= nowTime + 86400000;
  }
  if (filter === "LAST_90_DAYS") {
    const ninetyDaysAgo = nowTime - 90 * 24 * 60 * 60 * 1000;
    return itemDate >= ninetyDaysAgo && itemDate <= nowTime + 86400000;
  }
  if (filter === "THIS_YEAR") {
    const startOfYear = new Date(now.getFullYear(), 0, 1).getTime();
    return itemDate >= startOfYear && itemDate <= nowTime + 86400000;
  }
  if (filter === "CUSTOM") {
    let valid = true;
    if (customStart) {
      const start = new Date(customStart).getTime();
      if (!isNaN(start) && itemDate < start) valid = false;
    }
    if (customEnd) {
      const end = new Date(customEnd).getTime() + 86400000;
      if (!isNaN(end) && itemDate > end) valid = false;
    }
    return valid;
  }
  return true;
}

/* ---------------- Main Admin Portal ---------------- */

function AdminPortal() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const signOut = async () => {
    await supabase.auth.signOut();
    qc.clear();
    void navigate({ to: "/staff-access-crg" });
  };

  useEffect(() => {
    void (async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
          setIsAdmin(false);
          return;
        }

        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userData.user.id)
          .eq("role", "admin")
          .maybeSingle();

        if (error) {
          console.error("User roles query error:", error);
        }

        setIsAdmin(Boolean(data && data.role === "admin"));
      } catch (err) {
        console.error("Unexpected error checking role:", err);
        setIsAdmin(false);
      }
    })();
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const reset = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        toast.info("Signed out due to inactivity.");
        void signOut();
      }, IDLE_MS);
    };
    const events = ["mousemove", "keydown", "click", "scroll"] as const;
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAdmin === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-5">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-5">
        <div className="max-w-sm rounded-2xl border-2 border-primary bg-card p-8 text-center shadow-card">
          <ShieldAlert className="mx-auto size-8 text-destructive" />
          <h1 className="mt-4 text-lg font-bold">Not authorised</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This account does not have administrator access.
          </p>
          <Button className="mt-6" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <img src={LOGO_URL} alt="CRG logo" className="h-9 w-auto shrink-0 object-contain" />
            <h1 className="truncate text-base font-bold sm:text-lg">Admin Portal</h1>
          </div>
          <Button variant="outline" size="sm" onClick={signOut}>
            <LogOut className="size-4" /> Sign out
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <Tabs defaultValue="work">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="work" className="flex items-center gap-1.5">
              <Briefcase className="size-3.5" /> Recent Work
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-1.5">
              <FileText className="size-3.5" /> Resources
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-1.5">
              <Newspaper className="size-3.5" /> News
            </TabsTrigger>
            <TabsTrigger value="emails" className="flex items-center gap-1.5">
              <Users className="size-3.5" /> Employee Emails
            </TabsTrigger>
          </TabsList>

          <TabsContent value="work" className="mt-6">
            <WorkUpdatesPanel />
          </TabsContent>
          <TabsContent value="resources" className="mt-6">
            <ResourcesPanel />
          </TabsContent>
          <TabsContent value="news" className="mt-6">
            <NewsPanel />
          </TabsContent>
          <TabsContent value="emails" className="mt-6">
            <EmployeeEmailsPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

/* ---------------- 1. Work Updates Panel ---------------- */

function WorkUpdatesPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<WorkUpdate | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  // Filter states
  const [adminSearch, setAdminSearch] = useState("");
  const [adminSectorFilter, setAdminSectorFilter] = useState("ALL");
  const [adminDateFilter, setAdminDateFilter] = useState("ALL");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "work_updates"],
    queryFn: async (): Promise<WorkUpdate[]> => {
      const { data, error } = await supabase
        .from("work_updates")
        .select("id,title,description,image_urls,work_date,status,sector")
        .order("work_date", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((r) => ({
        ...r,
        image_urls: Array.isArray(r.image_urls) ? (r.image_urls as string[]) : [],
      })) as WorkUpdate[];
    },
  });

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: ["admin", "work_updates"] });
    void qc.invalidateQueries({ queryKey: ["work_updates", "published"] });
    void qc.invalidateQueries({ queryKey: ["work_updates", "all_published"] });
  };

  const save = useMutation({
    mutationFn: async (payload: Omit<WorkUpdate, "id"> & { id?: string }) => {
      const { data: userData } = await supabase.auth.getUser();
      if (payload.id) {
        const { error } = await supabase
          .from("work_updates")
          .update({
            title: payload.title,
            description: payload.description,
            image_urls: payload.image_urls,
            work_date: payload.work_date,
            status: payload.status,
            sector: payload.sector || "Other",
          })
          .eq("id", payload.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("work_updates").insert({
          title: payload.title,
          description: payload.description,
          image_urls: payload.image_urls,
          work_date: payload.work_date,
          status: payload.status,
          sector: payload.sector || "Other",
          created_by: userData.user?.id ?? null,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Work update saved.");
      setEditing(null);
      setCreating(false);
      setImages([]);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("work_updates").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Work update deleted.");
      setDeleteId(null);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const uploadImage = async (file: File) => {
    setUploading(true);
    const path = `${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const { error } = await supabase.storage.from("work-images").upload(path, file);
    if (error) {
      setUploading(false);
      toast.error(error.message);
      return;
    }
    const { data, error: signErr } = await supabase.storage
      .from("work-images")
      .createSignedUrl(path, SIGNED_URL_TTL);
    setUploading(false);
    if (signErr || !data) {
      toast.error(signErr?.message ?? "Could not prepare image link.");
      return;
    }
    setImages((prev) => [...prev, data.signedUrl]);
    toast.success("Image uploaded.");
  };

  const openForm = (item: WorkUpdate | null) => {
    setEditing(item);
    setCreating(item === null);
    setImages(item?.image_urls ?? []);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const title = String(f.get("title") ?? "").trim();
    const description = String(f.get("description") ?? "").trim();
    const sector = String(f.get("sector") ?? "Other");
    if (!title || !description) {
      toast.error("Title and description are required.");
      return;
    }
    save.mutate({
      ...(editing ? { id: editing.id } : {}),
      title,
      description,
      image_urls: images,
      work_date: String(f.get("work_date") ?? new Date().toISOString().slice(0, 10)),
      status: String(f.get("status") ?? "draft") as WorkUpdate["status"],
      sector,
    });
  };

  const formOpen = creating || editing !== null;

  // Filter and Sort Work Updates
  const filteredData = useMemo(() => {
    const result = data.filter((item) => {
      // Sector filter
      if (adminSectorFilter !== "ALL") {
        const itemSec = (item.sector ?? "Other").trim().toLowerCase();
        const selSec = adminSectorFilter.trim().toLowerCase();
        if (itemSec !== selSec) return false;
      }
      // Date filter
      if (!matchesDateFilter(item.work_date, adminDateFilter, customStartDate, customEndDate)) {
        return false;
      }
      // Search filter
      if (adminSearch.trim() !== "") {
        const q = adminSearch.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchSector = (item.sector ?? "").toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchSector) return false;
      }
      return true;
    });

    return result.sort((a, b) => {
      const dateA = new Date(a.work_date).getTime();
      const dateB = new Date(b.work_date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [data, adminSectorFilter, adminDateFilter, customStartDate, customEndDate, adminSearch, sortOrder]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <h2 className="truncate text-lg font-bold">Work Updates</h2>
        {!formOpen && (
          <Button onClick={() => openForm(null)}>
            <Plus className="size-4" /> New update
          </Button>
        )}
      </div>

      {formOpen && (
        <form
          onSubmit={onSubmit}
          className="animate-fade-up space-y-4 rounded-xl border-2 border-primary bg-card p-6 shadow-card"
        >
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input id="title" name="title" defaultValue={editing?.title ?? ""} required />
          </div>
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              rows={5}
              defaultValue={editing?.description ?? ""}
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="sector">Sector</Label>
              <select
                id="sector"
                name="sector"
                defaultValue={editing?.sector ?? "Other"}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {KEY_SECTORS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="work_date">Date</Label>
              <Input
                id="work_date"
                name="work_date"
                type="date"
                defaultValue={editing?.work_date ?? new Date().toISOString().slice(0, 10)}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                defaultValue={editing?.status ?? "draft"}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="draft">Draft (hidden)</option>
                <option value="published">Published (public)</option>
              </select>
            </div>
          </div>
          <div>
            <Label htmlFor="image">Images (Upload one or more)</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void uploadImage(file);
                e.target.value = "";
              }}
            />
            {images.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {images.map((url, idx) => (
                  <div key={url} className="relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                    <img
                      src={url}
                      alt={`Work update ${idx + 1}`}
                      className="size-full object-cover"
                    />
                    <span className="absolute left-1 bottom-1 rounded bg-black/75 px-1 text-[9px] text-white">
                      #{idx + 1}
                    </span>
                    <button
                      type="button"
                      aria-label="Remove image"
                      onClick={() => setImages((p) => p.filter((u) => u !== url))}
                      className="absolute top-1 right-1 grid size-5 place-items-center rounded-full bg-destructive text-destructive-foreground shadow-sm hover:opacity-90"
                    >
                      <Trash2 className="size-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={save.isPending || uploading}>
              {save.isPending ? "Saving..." : "Save"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditing(null);
                setCreating(false);
                setImages([]);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Search and Filters Bar */}
      {!formOpen && data.length > 0 && (
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search updates by title or keyword..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="h-9 pl-9 pr-8"
              />
              {adminSearch && (
                <button
                  onClick={() => setAdminSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Sector, Date, and Sort Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Sector Filter */}
              <div className="flex items-center gap-1.5">
                <Filter className="size-3.5 text-muted-foreground" />
                <Label htmlFor="adminSector" className="text-xs shrink-0 font-medium">
                  Sector:
                </Label>
                <select
                  id="adminSector"
                  value={adminSectorFilter}
                  onChange={(e) => setAdminSectorFilter(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-2.5 text-xs"
                >
                  <option value="ALL">All Sectors</option>
                  {KEY_SECTORS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-muted-foreground" />
                <Label htmlFor="adminDate" className="text-xs shrink-0 font-medium">
                  Date:
                </Label>
                <select
                  id="adminDate"
                  value={adminDateFilter}
                  onChange={(e) => setAdminDateFilter(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-2.5 text-xs"
                >
                  <option value="ALL">All Dates</option>
                  <option value="THIS_MONTH">This Month</option>
                  <option value="LAST_30_DAYS">Past 30 Days</option>
                  <option value="LAST_90_DAYS">Past 90 Days</option>
                  <option value="THIS_YEAR">This Year</option>
                  <option value="CUSTOM">Custom Range...</option>
                </select>
              </div>

              {/* Sort Order */}
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1 text-xs"
                onClick={() => setSortOrder((o) => (o === "desc" ? "asc" : "desc"))}
                title={`Sorted: ${sortOrder === "desc" ? "Newest First" : "Oldest First"}`}
              >
                <ArrowUpDown className="size-3.5" />
                {sortOrder === "desc" ? "Newest" : "Oldest"}
              </Button>
            </div>
          </div>

          {/* Custom Date Range Picker inputs */}
          {adminDateFilter === "CUSTOM" && (
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/60 text-xs">
              <span className="font-semibold text-muted-foreground">From:</span>
              <Input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="h-8 w-36 text-xs"
              />
              <span className="font-semibold text-muted-foreground">To:</span>
              <Input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="h-8 w-36 text-xs"
              />
              {(customStartDate || customEndDate) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-destructive"
                  onClick={() => {
                    setCustomStartDate("");
                    setCustomEndDate("");
                  }}
                >
                  Clear Range
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No work updates yet.</p>
      ) : filteredData.length === 0 ? (
        <p className="text-sm text-muted-foreground">No work updates match your filters.</p>
      ) : (
        <ul className="space-y-3">
          {filteredData.map((item) => (
            <li
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border-2 border-primary bg-card p-5 shadow-card"
            >
              <div className="flex items-start gap-4 min-w-0 flex-1">
                {item.image_urls[0] && (
                  <div className="relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                    <img
                      src={item.image_urls[0]}
                      alt={item.title}
                      className="size-full object-cover"
                    />
                    {item.image_urls.length > 1 && (
                      <span className="absolute bottom-0.5 right-0.5 rounded bg-black/75 px-1 text-[9px] font-semibold text-white">
                        +{item.image_urls.length - 1}
                      </span>
                    )}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-bold text-foreground">{item.title}</h3>
                    <Badge variant={item.status === "published" ? "default" : "secondary"}>
                      {item.status}
                    </Badge>
                    {item.sector && (
                      <Badge variant="outline" className="text-[11px]">
                        {item.sector}
                      </Badge>
                    )}
                    {item.image_urls.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        📷 {item.image_urls.length} {item.image_urls.length === 1 ? "image" : "images"}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {item.work_date} · {item.description}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
                <Button size="icon" variant="outline" onClick={() => openForm(item)}>
                  <Pencil className="size-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => setDeleteId(item.id)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete this work update?"
        description="This permanently removes the update from the website."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => deleteId && remove.mutate(deleteId)}
      />
    </div>
  );
}

/* ---------------- 2. Resources Panel ---------------- */

function ResourcesPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<ResourceItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string>("");

  // Filters
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "resources"],
    queryFn: async (): Promise<ResourceItem[]> => {
      const { data, error } = await supabase
        .from("resources")
        .select("id,title,description,resource_type,sector,file_url,external_url,author,publication_date,status")
        .order("publication_date", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ResourceItem[];
    },
  });

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: ["admin", "resources"] });
    void qc.invalidateQueries({ queryKey: ["resources", "published"] });
  };

  const save = useMutation({
    mutationFn: async (payload: Omit<ResourceItem, "id"> & { id?: string }) => {
      const { data: userData } = await supabase.auth.getUser();
      if (payload.id) {
        const { error } = await supabase
          .from("resources")
          .update({
            title: payload.title,
            description: payload.description,
            resource_type: payload.resource_type,
            sector: payload.sector || "Other",
            file_url: payload.file_url || null,
            external_url: payload.external_url || null,
            author: payload.author || null,
            publication_date: payload.publication_date,
            status: payload.status,
          })
          .eq("id", payload.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("resources").insert({
          title: payload.title,
          description: payload.description,
          resource_type: payload.resource_type,
          sector: payload.sector || "Other",
          file_url: payload.file_url || null,
          external_url: payload.external_url || null,
          author: payload.author || null,
          publication_date: payload.publication_date,
          status: payload.status,
          created_by: userData.user?.id ?? null,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Resource saved successfully.");
      setEditing(null);
      setCreating(false);
      setFileUrl("");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("resources").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Resource deleted.");
      setDeleteId(null);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const uploadFile = async (file: File) => {
    setUploading(true);
    const path = `${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const { error } = await supabase.storage.from("resource-files").upload(path, file);
    if (error) {
      setUploading(false);
      toast.error(error.message);
      return;
    }
    const { data } = supabase.storage.from("resource-files").getPublicUrl(path);
    setUploading(false);
    setFileUrl(data.publicUrl);
    toast.success("Document/File uploaded.");
  };

  const openForm = (item: ResourceItem | null) => {
    setEditing(item);
    setCreating(item === null);
    setFileUrl(item?.file_url ?? "");
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const title = String(f.get("title") ?? "").trim();
    const description = String(f.get("description") ?? "").trim();
    const resource_type = String(f.get("resource_type") ?? "Research Report");
    const sector = String(f.get("sector") ?? "Other");
    const author = String(f.get("author") ?? "").trim();
    const external_url = String(f.get("external_url") ?? "").trim();
    const publication_date = String(f.get("publication_date") ?? new Date().toISOString().slice(0, 10));
    const status = String(f.get("status") ?? "draft") as ResourceItem["status"];

    if (!title || !description) {
      toast.error("Title and description are required.");
      return;
    }

    save.mutate({
      ...(editing ? { id: editing.id } : {}),
      title,
      description,
      resource_type,
      sector,
      file_url: fileUrl || null,
      external_url: external_url || null,
      author: author || null,
      publication_date,
      status,
    });
  };

  const formOpen = creating || editing !== null;

  const filteredData = useMemo(() => {
    const result = data.filter((item) => {
      if (sectorFilter !== "ALL") {
        if ((item.sector ?? "Other").trim().toLowerCase() !== sectorFilter.trim().toLowerCase()) return false;
      }
      if (typeFilter !== "ALL") {
        if (item.resource_type !== typeFilter) return false;
      }
      if (!matchesDateFilter(item.publication_date, dateFilter, customStartDate, customEndDate)) return false;
      if (search.trim() !== "") {
        const q = search.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchAuthor = (item.author ?? "").toLowerCase().includes(q);
        const matchType = item.resource_type.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchAuthor && !matchType) return false;
      }
      return true;
    });

    return result.sort((a, b) => {
      const dateA = new Date(a.publication_date).getTime();
      const dateB = new Date(b.publication_date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [data, sectorFilter, typeFilter, dateFilter, customStartDate, customEndDate, search, sortOrder]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div>
          <h2 className="truncate text-lg font-bold">Resources & Publications</h2>
          <p className="text-xs text-muted-foreground">Manage reports, policy briefs, datasets, and toolkits.</p>
        </div>
        {!formOpen && (
          <Button onClick={() => openForm(null)}>
            <Plus className="size-4" /> New resource
          </Button>
        )}
      </div>

      {formOpen && (
        <form
          onSubmit={onSubmit}
          className="animate-fade-up space-y-4 rounded-xl border-2 border-primary bg-card p-6 shadow-card"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="res_title">Resource Title *</Label>
              <Input id="res_title" name="title" defaultValue={editing?.title ?? ""} required />
            </div>
            <div>
              <Label htmlFor="resource_type">Resource Type *</Label>
              <select
                id="resource_type"
                name="resource_type"
                defaultValue={editing?.resource_type ?? "Research Report"}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {RESOURCE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="res_sector">Sector</Label>
              <select
                id="res_sector"
                name="sector"
                defaultValue={editing?.sector ?? "Other"}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {KEY_SECTORS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="res_description">Summary / Abstract *</Label>
            <Textarea
              id="res_description"
              name="description"
              rows={4}
              defaultValue={editing?.description ?? ""}
              placeholder="Provide an overview, key findings, or publication abstract..."
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="author">Author / Lead Researcher</Label>
              <Input id="author" name="author" placeholder="e.g. CRG Advisory Team" defaultValue={editing?.author ?? ""} />
            </div>
            <div>
              <Label htmlFor="publication_date">Publication Date</Label>
              <Input
                id="publication_date"
                name="publication_date"
                type="date"
                defaultValue={editing?.publication_date ?? new Date().toISOString().slice(0, 10)}
              />
            </div>
            <div>
              <Label htmlFor="res_status">Status</Label>
              <select
                id="res_status"
                name="status"
                defaultValue={editing?.status ?? "draft"}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="draft">Draft (hidden)</option>
                <option value="published">Published (public)</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="file_upload">Upload Document / PDF</Label>
              <Input
                id="file_upload"
                type="file"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void uploadFile(file);
                }}
              />
              {fileUrl && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-accent">
                  <Download className="size-3.5" /> File attached: <span className="truncate max-w-xs">{fileUrl}</span>
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="external_url">Or External URL / Link</Label>
              <Input
                id="external_url"
                name="external_url"
                type="url"
                placeholder="https://..."
                defaultValue={editing?.external_url ?? ""}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit" disabled={save.isPending || uploading}>
              {save.isPending ? "Saving..." : "Save Resource"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditing(null);
                setCreating(false);
                setFileUrl("");
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Filters Bar */}
      {!formOpen && data.length > 0 && (
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search resources by title, author, keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 pl-9 pr-8"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Type Filter */}
              <div className="flex items-center gap-1.5">
                <Label htmlFor="resType" className="text-xs shrink-0 font-medium">
                  Type:
                </Label>
                <select
                  id="resType"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-2.5 text-xs"
                >
                  <option value="ALL">All Types</option>
                  {RESOURCE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sector Filter */}
              <div className="flex items-center gap-1.5">
                <Label htmlFor="resSector" className="text-xs shrink-0 font-medium">
                  Sector:
                </Label>
                <select
                  id="resSector"
                  value={sectorFilter}
                  onChange={(e) => setSectorFilter(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-2.5 text-xs"
                >
                  <option value="ALL">All Sectors</option>
                  {KEY_SECTORS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-muted-foreground" />
                <Label htmlFor="resDate" className="text-xs shrink-0 font-medium">
                  Date:
                </Label>
                <select
                  id="resDate"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-2.5 text-xs"
                >
                  <option value="ALL">All Dates</option>
                  <option value="THIS_MONTH">This Month</option>
                  <option value="LAST_30_DAYS">Past 30 Days</option>
                  <option value="LAST_90_DAYS">Past 90 Days</option>
                  <option value="THIS_YEAR">This Year</option>
                  <option value="CUSTOM">Custom Range...</option>
                </select>
              </div>

              {/* Sort Order */}
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1 text-xs"
                onClick={() => setSortOrder((o) => (o === "desc" ? "asc" : "desc"))}
              >
                <ArrowUpDown className="size-3.5" />
                {sortOrder === "desc" ? "Newest" : "Oldest"}
              </Button>
            </div>
          </div>

          {dateFilter === "CUSTOM" && (
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/60 text-xs">
              <span className="font-semibold text-muted-foreground">From:</span>
              <Input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="h-8 w-36 text-xs"
              />
              <span className="font-semibold text-muted-foreground">To:</span>
              <Input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="h-8 w-36 text-xs"
              />
              {(customStartDate || customEndDate) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-destructive"
                  onClick={() => {
                    setCustomStartDate("");
                    setCustomEndDate("");
                  }}
                >
                  Clear Range
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No resources added yet.</p>
      ) : filteredData.length === 0 ? (
        <p className="text-sm text-muted-foreground">No resources match your filters.</p>
      ) : (
        <ul className="space-y-3">
          {filteredData.map((item) => (
            <li
              key={item.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border-2 border-primary bg-card p-5 shadow-card"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-sm font-bold">{item.title}</h3>
                  <Badge variant="default" className="text-[11px] bg-accent text-accent-foreground">
                    {item.resource_type}
                  </Badge>
                  <Badge variant={item.status === "published" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                  {item.sector && (
                    <Badge variant="outline" className="text-[11px]">
                      {item.sector}
                    </Badge>
                  )}
                  {item.author && (
                    <span className="text-xs text-muted-foreground">By {item.author}</span>
                  )}
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  Published: {item.publication_date} · {item.description}
                </p>
                {(item.file_url || item.external_url) && (
                  <div className="mt-2 flex items-center gap-3">
                    {item.file_url && (
                      <a
                        href={item.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                      >
                        <Download className="size-3.5" /> Download File
                      </a>
                    )}
                    {item.external_url && (
                      <a
                        href={item.external_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                      >
                        <ExternalLink className="size-3.5" /> External Link
                      </a>
                    )}
                  </div>
                )}
              </div>
              <div className="flex shrink-0 gap-2">
                <Button size="icon" variant="outline" onClick={() => openForm(item)}>
                  <Pencil className="size-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => setDeleteId(item.id)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete this resource?"
        description="This will permanently delete the resource and its file link."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => deleteId && remove.mutate(deleteId)}
      />
    </div>
  );
}

/* ---------------- 3. News Panel ---------------- */

function NewsPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  // Filters
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "news"],
    queryFn: async (): Promise<NewsItem[]> => {
      const { data, error } = await supabase
        .from("news")
        .select("id,title,summary,content,news_date,sector,category,image_urls,external_link,status")
        .order("news_date", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((r) => ({
        ...r,
        image_urls: Array.isArray(r.image_urls) ? (r.image_urls as string[]) : [],
      })) as NewsItem[];
    },
  });

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: ["admin", "news"] });
    void qc.invalidateQueries({ queryKey: ["news", "published"] });
  };

  const save = useMutation({
    mutationFn: async (payload: Omit<NewsItem, "id"> & { id?: string }) => {
      const { data: userData } = await supabase.auth.getUser();
      if (payload.id) {
        const { error } = await supabase
          .from("news")
          .update({
            title: payload.title,
            summary: payload.summary || null,
            content: payload.content,
            news_date: payload.news_date,
            sector: payload.sector || "Other",
            category: payload.category || "Company News",
            image_urls: payload.image_urls,
            external_link: payload.external_link || null,
            status: payload.status,
          })
          .eq("id", payload.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("news").insert({
          title: payload.title,
          summary: payload.summary || null,
          content: payload.content,
          news_date: payload.news_date,
          sector: payload.sector || "Other",
          category: payload.category || "Company News",
          image_urls: payload.image_urls,
          external_link: payload.external_link || null,
          status: payload.status,
          created_by: userData.user?.id ?? null,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("News article saved successfully.");
      setEditing(null);
      setCreating(false);
      setImages([]);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("News article deleted.");
      setDeleteId(null);
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const uploadImage = async (file: File) => {
    setUploading(true);
    const path = `${crypto.randomUUID()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const { error } = await supabase.storage.from("work-images").upload(path, file);
    if (error) {
      setUploading(false);
      toast.error(error.message);
      return;
    }
    const { data, error: signErr } = await supabase.storage
      .from("work-images")
      .createSignedUrl(path, SIGNED_URL_TTL);
    setUploading(false);
    if (signErr || !data) {
      toast.error(signErr?.message ?? "Could not prepare image link.");
      return;
    }
    setImages((prev) => [...prev, data.signedUrl]);
    toast.success("Image uploaded.");
  };

  const openForm = (item: NewsItem | null) => {
    setEditing(item);
    setCreating(item === null);
    setImages(item?.image_urls ?? []);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const title = String(f.get("title") ?? "").trim();
    const summary = String(f.get("summary") ?? "").trim();
    const content = String(f.get("content") ?? "").trim();
    const category = String(f.get("category") ?? "Corporate Announcement");
    const sector = String(f.get("sector") ?? "Other");
    const news_date = String(f.get("news_date") ?? new Date().toISOString().slice(0, 10));
    const status = String(f.get("status") ?? "draft") as NewsItem["status"];
    const external_link = String(f.get("external_link") ?? "").trim();

    if (!title || !content) {
      toast.error("Title and news content are required.");
      return;
    }

    save.mutate({
      ...(editing ? { id: editing.id } : {}),
      title,
      summary: summary || null,
      content,
      category,
      sector,
      news_date,
      image_urls: images,
      external_link: external_link || null,
      status,
    });
  };

  const formOpen = creating || editing !== null;

  const filteredData = useMemo(() => {
    const result = data.filter((item) => {
      if (sectorFilter !== "ALL") {
        if ((item.sector ?? "Other").trim().toLowerCase() !== sectorFilter.trim().toLowerCase()) return false;
      }
      if (categoryFilter !== "ALL") {
        if ((item.category ?? "").trim().toLowerCase() !== categoryFilter.trim().toLowerCase()) return false;
      }
      if (!matchesDateFilter(item.news_date, dateFilter, customStartDate, customEndDate)) return false;
      if (search.trim() !== "") {
        const q = search.toLowerCase().trim();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchSummary = (item.summary ?? "").toLowerCase().includes(q);
        const matchContent = item.content.toLowerCase().includes(q);
        const matchCat = (item.category ?? "").toLowerCase().includes(q);
        if (!matchTitle && !matchSummary && !matchContent && !matchCat) return false;
      }
      return true;
    });

    return result.sort((a, b) => {
      const dateA = new Date(a.news_date).getTime();
      const dateB = new Date(b.news_date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [data, sectorFilter, categoryFilter, dateFilter, customStartDate, customEndDate, search, sortOrder]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div>
          <h2 className="truncate text-lg font-bold">News & Announcements</h2>
          <p className="text-xs text-muted-foreground">Publish corporate news, fieldwork updates, and event coverage.</p>
        </div>
        {!formOpen && (
          <Button onClick={() => openForm(null)}>
            <Plus className="size-4" /> New article
          </Button>
        )}
      </div>

      {formOpen && (
        <form
          onSubmit={onSubmit}
          className="animate-fade-up space-y-4 rounded-xl border-2 border-primary bg-card p-6 shadow-card"
        >
          <div>
            <Label htmlFor="news_title">Article Title *</Label>
            <Input id="news_title" name="title" defaultValue={editing?.title ?? ""} required />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="news_category">Category</Label>
              <select
                id="news_category"
                name="category"
                defaultValue={editing?.category ?? "Corporate Announcement"}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {NEWS_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="news_sector">Sector</Label>
              <select
                id="news_sector"
                name="sector"
                defaultValue={editing?.sector ?? "Other"}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {KEY_SECTORS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="news_date">Date</Label>
              <Input
                id="news_date"
                name="news_date"
                type="date"
                defaultValue={editing?.news_date ?? new Date().toISOString().slice(0, 10)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="news_summary">Short Summary / Excerpt</Label>
            <Input
              id="news_summary"
              name="summary"
              defaultValue={editing?.summary ?? ""}
              placeholder="Brief 1-2 sentence lead for card previews..."
            />
          </div>

          <div>
            <Label htmlFor="news_content">Full Article Content *</Label>
            <Textarea
              id="news_content"
              name="content"
              rows={6}
              defaultValue={editing?.content ?? ""}
              placeholder="Write the full story, press release or announcement details..."
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="news_status">Status</Label>
              <select
                id="news_status"
                name="status"
                defaultValue={editing?.status ?? "draft"}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="draft">Draft (hidden)</option>
                <option value="published">Published (public)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="external_link">External Press / Media Link</Label>
              <Input
                id="external_link"
                name="external_link"
                type="url"
                placeholder="https://..."
                defaultValue={editing?.external_link ?? ""}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="news_image">Article Images / Photos</Label>
            <Input
              id="news_image"
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void uploadImage(file);
                e.target.value = "";
              }}
            />
            {images.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {images.map((url, idx) => (
                  <div key={url} className="relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                    <img
                      src={url}
                      alt={`Article photo ${idx + 1}`}
                      className="size-full object-cover"
                    />
                    <button
                      type="button"
                      aria-label="Remove image"
                      onClick={() => setImages((p) => p.filter((u) => u !== url))}
                      className="absolute top-1 right-1 grid size-5 place-items-center rounded-full bg-destructive text-destructive-foreground shadow-sm hover:opacity-90"
                    >
                      <Trash2 className="size-2.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit" disabled={save.isPending || uploading}>
              {save.isPending ? "Saving..." : "Save Article"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditing(null);
                setCreating(false);
                setImages([]);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Filters Bar */}
      {!formOpen && data.length > 0 && (
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search news by title, content, category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 pl-9 pr-8"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Category Filter */}
              <div className="flex items-center gap-1.5">
                <Label htmlFor="newsCat" className="text-xs shrink-0 font-medium">
                  Category:
                </Label>
                <select
                  id="newsCat"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-2.5 text-xs"
                >
                  <option value="ALL">All Categories</option>
                  {NEWS_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sector Filter */}
              <div className="flex items-center gap-1.5">
                <Label htmlFor="newsSec" className="text-xs shrink-0 font-medium">
                  Sector:
                </Label>
                <select
                  id="newsSec"
                  value={sectorFilter}
                  onChange={(e) => setSectorFilter(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-2.5 text-xs"
                >
                  <option value="ALL">All Sectors</option>
                  {KEY_SECTORS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Filter */}
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-muted-foreground" />
                <Label htmlFor="newsDate" className="text-xs shrink-0 font-medium">
                  Date:
                </Label>
                <select
                  id="newsDate"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-2.5 text-xs"
                >
                  <option value="ALL">All Dates</option>
                  <option value="THIS_MONTH">This Month</option>
                  <option value="LAST_30_DAYS">Past 30 Days</option>
                  <option value="LAST_90_DAYS">Past 90 Days</option>
                  <option value="THIS_YEAR">This Year</option>
                  <option value="CUSTOM">Custom Range...</option>
                </select>
              </div>

              {/* Sort Order */}
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1 text-xs"
                onClick={() => setSortOrder((o) => (o === "desc" ? "asc" : "desc"))}
              >
                <ArrowUpDown className="size-3.5" />
                {sortOrder === "desc" ? "Newest" : "Oldest"}
              </Button>
            </div>
          </div>

          {dateFilter === "CUSTOM" && (
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/60 text-xs">
              <span className="font-semibold text-muted-foreground">From:</span>
              <Input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="h-8 w-36 text-xs"
              />
              <span className="font-semibold text-muted-foreground">To:</span>
              <Input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="h-8 w-36 text-xs"
              />
              {(customStartDate || customEndDate) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-destructive"
                  onClick={() => {
                    setCustomStartDate("");
                    setCustomEndDate("");
                  }}
                >
                  Clear Range
                </Button>
              )}
            </div>
          )}
        </div>
      )}

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No news articles published yet.</p>
      ) : filteredData.length === 0 ? (
        <p className="text-sm text-muted-foreground">No articles match your filters.</p>
      ) : (
        <ul className="space-y-3">
          {filteredData.map((item) => (
            <li
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border-2 border-primary bg-card p-5 shadow-card"
            >
              <div className="flex items-start gap-4 min-w-0 flex-1">
                {item.image_urls[0] && (
                  <div className="relative size-16 sm:size-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                    <img
                      src={item.image_urls[0]}
                      alt={item.title}
                      className="size-full object-cover"
                    />
                    {item.image_urls.length > 1 && (
                      <span className="absolute bottom-0.5 right-0.5 rounded bg-black/75 px-1 text-[9px] font-semibold text-white">
                        +{item.image_urls.length - 1}
                      </span>
                    )}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-bold text-foreground">{item.title}</h3>
                    {item.category && (
                      <Badge variant="default" className="text-[11px]">
                        {item.category}
                      </Badge>
                    )}
                    <Badge variant={item.status === "published" ? "default" : "secondary"}>
                      {item.status}
                    </Badge>
                    {item.sector && (
                      <Badge variant="outline" className="text-[11px]">
                        {item.sector}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {item.news_date} · {item.summary || item.content}
                  </p>
                  {item.external_link && (
                    <a
                      href={item.external_link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                    >
                      <ExternalLink className="size-3" /> View Source
                    </a>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2 self-end sm:self-center">
                <Button size="icon" variant="outline" onClick={() => openForm(item)}>
                  <Pencil className="size-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => setDeleteId(item.id)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete this news article?"
        description="This will permanently delete the news article from the portal."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => deleteId && remove.mutate(deleteId)}
      />
    </div>
  );
}

/* ---------------- 4. Employee Emails Panel ---------------- */

const ALPHABET_LETTERS = [
  "ALL", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
];

function EmployeeEmailsPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<EmployeeEmail | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Filters & Sorting
  const [search, setSearch] = useState("");
  const [letterFilter, setLetterFilter] = useState("ALL");
  const [dateCreatedFilter, setDateCreatedFilter] = useState("ALL");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [sortBy, setSortBy] = useState<"name_asc" | "name_desc" | "date_desc" | "date_asc" | "status" | "dept">("name_asc");

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "employee_emails"],
    queryFn: async (): Promise<EmployeeEmail[]> => {
      const { data, error } = await supabase
        .from("employee_emails")
        .select("id,employee_name,email_address,department,position,status,created_at")
        .order("employee_name");
      if (error) throw error;
      return (data ?? []) as EmployeeEmail[];
    },
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["admin", "employee_emails"] });

  const save = useMutation({
    mutationFn: async (payload: Omit<EmployeeEmail, "id"> & { id?: string }) => {
      const { data: userData } = await supabase.auth.getUser();
      if (payload.id) {
        const { error } = await supabase
          .from("employee_emails")
          .update({
            employee_name: payload.employee_name,
            email_address: payload.email_address,
            department: payload.department,
            position: payload.position,
            status: payload.status,
          })
          .eq("id", payload.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("employee_emails").insert({
          employee_name: payload.employee_name,
          email_address: payload.email_address,
          department: payload.department,
          position: payload.position,
          status: payload.status,
          created_by: userData.user?.id ?? null,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success("Employee record saved.");
      setEditing(null);
      setCreating(false);
      void invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggleStatus = useMutation({
    mutationFn: async (record: EmployeeEmail) => {
      const { error } = await supabase
        .from("employee_emails")
        .update({ status: record.status === "active" ? "suspended" : "active" })
        .eq("id", record.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Status updated.");
      void invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("employee_emails").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Employee record deleted.");
      setDeleteId(null);
      void invalidate();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const employee_name = String(f.get("employee_name") ?? "").trim();
    const email_address = String(f.get("email_address") ?? "").trim();
    if (!employee_name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_address)) {
      toast.error("A name and valid email address are required.");
      return;
    }
    save.mutate({
      ...(editing ? { id: editing.id } : {}),
      employee_name,
      email_address,
      department: String(f.get("department") ?? "").trim() || null,
      position: String(f.get("position") ?? "").trim() || null,
      status: editing?.status ?? "active",
    });
  };

  const formOpen = creating || editing !== null;

  // Filtered & Sorted Employee Emails
  const filteredData = useMemo(() => {
    const result = data.filter((item) => {
      // Name / Surname Letter Filter
      if (letterFilter !== "ALL") {
        const parts = item.employee_name.trim().split(/\s+/);
        const firstLetterOfFirstName = parts[0]?.[0]?.toUpperCase() ?? "";
        const firstLetterOfSurname = parts[parts.length - 1]?.[0]?.toUpperCase() ?? "";
        if (firstLetterOfFirstName !== letterFilter && firstLetterOfSurname !== letterFilter) {
          return false;
        }
      }

      // Date Created Filter
      if (item.created_at) {
        if (!matchesDateFilter(item.created_at, dateCreatedFilter, customStartDate, customEndDate)) {
          return false;
        }
      }

      // Search Filter
      if (search.trim() !== "") {
        const q = search.toLowerCase().trim();
        const matchName = item.employee_name.toLowerCase().includes(q);
        const matchEmail = item.email_address.toLowerCase().includes(q);
        const matchDept = (item.department ?? "").toLowerCase().includes(q);
        const matchPos = (item.position ?? "").toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchDept && !matchPos) return false;
      }
      return true;
    });

    // Sorting
    return result.sort((a, b) => {
      if (sortBy === "name_asc") return a.employee_name.localeCompare(b.employee_name);
      if (sortBy === "name_desc") return b.employee_name.localeCompare(a.employee_name);
      if (sortBy === "date_desc") {
        return new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime();
      }
      if (sortBy === "date_asc") {
        return new Date(a.created_at ?? 0).getTime() - new Date(b.created_at ?? 0).getTime();
      }
      if (sortBy === "status") return a.status.localeCompare(b.status);
      if (sortBy === "dept") return (a.department ?? "").localeCompare(b.department ?? "");
      return 0;
    });
  }, [data, letterFilter, dateCreatedFilter, customStartDate, customEndDate, search, sortBy]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div>
          <h2 className="truncate text-lg font-bold">Employee Directory & Emails</h2>
          <p className="text-xs text-muted-foreground">Manage organization contact directory and internal accounts.</p>
        </div>
        {!formOpen && (
          <Button
            onClick={() => {
              setCreating(true);
              setEditing(null);
            }}
          >
            <Plus className="size-4" /> New record
          </Button>
        )}
      </div>

      {formOpen && (
        <form
          onSubmit={onSubmit}
          className="animate-fade-up grid gap-4 rounded-xl border-2 border-primary bg-card p-6 shadow-card sm:grid-cols-2"
        >
          <div>
            <Label htmlFor="employee_name">Full Name *</Label>
            <Input
              id="employee_name"
              name="employee_name"
              placeholder="e.g. Martha Shikongo"
              defaultValue={editing?.employee_name ?? ""}
              required
            />
          </div>
          <div>
            <Label htmlFor="email_address">Email address *</Label>
            <Input
              id="email_address"
              name="email_address"
              type="email"
              placeholder="e.g. m.shikongo@crgconsulting.org"
              defaultValue={editing?.email_address ?? ""}
              required
            />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Input id="department" name="department" placeholder="e.g. Research & Policy" defaultValue={editing?.department ?? ""} />
          </div>
          <div>
            <Label htmlFor="position">Position / Job Title</Label>
            <Input id="position" name="position" placeholder="e.g. Senior Researcher" defaultValue={editing?.position ?? ""} />
          </div>
          <div className="flex flex-wrap gap-3 sm:col-span-2 pt-2">
            <Button type="submit" disabled={save.isPending}>
              {save.isPending ? "Saving..." : "Save Record"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditing(null);
                setCreating(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Search, Letter Filters, Date Created & Sort Controls */}
      {!formOpen && data.length > 0 && (
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 pl-9 pr-8"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Date Created & Sort By Selectors */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Date Created Filter */}
              <div className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-muted-foreground" />
                <Label htmlFor="empDate" className="text-xs shrink-0 font-medium">
                  Created:
                </Label>
                <select
                  id="empDate"
                  value={dateCreatedFilter}
                  onChange={(e) => setDateCreatedFilter(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-2.5 text-xs"
                >
                  <option value="ALL">All Time</option>
                  <option value="THIS_MONTH">This Month</option>
                  <option value="LAST_30_DAYS">Past 30 Days</option>
                  <option value="LAST_90_DAYS">Past 90 Days</option>
                  <option value="THIS_YEAR">This Year</option>
                  <option value="CUSTOM">Custom Range...</option>
                </select>
              </div>

              {/* Sort By Filter */}
              <div className="flex items-center gap-1.5">
                <ArrowUpDown className="size-3.5 text-muted-foreground" />
                <Label htmlFor="empSort" className="text-xs shrink-0 font-medium">
                  Sort By:
                </Label>
                <select
                  id="empSort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="h-9 rounded-md border border-input bg-background px-2.5 text-xs"
                >
                  <option value="name_asc">Name (A → Z)</option>
                  <option value="name_desc">Name (Z → A)</option>
                  <option value="date_desc">Date Created (Newest)</option>
                  <option value="date_asc">Date Created (Oldest)</option>
                  <option value="status">Status (Active first)</option>
                  <option value="dept">Department (A → Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Custom Date Range if selected */}
          {dateCreatedFilter === "CUSTOM" && (
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/60 text-xs">
              <span className="font-semibold text-muted-foreground">From:</span>
              <Input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="h-8 w-36 text-xs"
              />
              <span className="font-semibold text-muted-foreground">To:</span>
              <Input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="h-8 w-36 text-xs"
              />
              {(customStartDate || customEndDate) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-destructive"
                  onClick={() => {
                    setCustomStartDate("");
                    setCustomEndDate("");
                  }}
                >
                  Clear Range
                </Button>
              )}
            </div>
          )}

          {/* Alphabet Letter Selector for Name / Surname filtering */}
          <div className="pt-2 border-t border-border/60">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Filter by Initial (First / Last Name):
              </span>
              {letterFilter !== "ALL" && (
                <button
                  type="button"
                  onClick={() => setLetterFilter("ALL")}
                  className="text-[11px] text-accent hover:underline"
                >
                  Show All Letters
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              {ALPHABET_LETTERS.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setLetterFilter(letter)}
                  className={`size-7 rounded text-xs font-semibold transition-all ${
                    letterFilter === letter
                      ? "bg-accent text-accent-foreground shadow-sm scale-110"
                      : "bg-surface text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No employee records yet.</p>
      ) : filteredData.length === 0 ? (
        <p className="text-sm text-muted-foreground">No employee records match your search or filters.</p>
      ) : (
        <ul className="space-y-3">
          {filteredData.map((item) => (
            <li
              key={item.id}
              className="grid gap-4 rounded-xl border-2 border-primary bg-card p-5 shadow-card sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-sm font-bold">{item.employee_name}</h3>
                  <Badge variant={item.status === "active" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                  {item.created_at && (
                    <span className="text-[11px] text-muted-foreground">
                      Added: {new Date(item.created_at).toLocaleDateString("en-GB")}
                    </span>
                  )}
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {item.email_address}
                  {item.department ? ` · ${item.department}` : ""}
                  {item.position ? ` · ${item.position}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => toggleStatus.mutate(item)}>
                  {item.status === "active" ? "Suspend" : "Reactivate"}
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setEditing(item);
                    setCreating(false);
                  }}
                >
                  <Pencil className="size-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => setDeleteId(item.id)}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete this employee record?"
        description="This permanently removes the record. Consider suspending instead."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => deleteId && remove.mutate(deleteId)}
      />
    </div>
  );
}

/* ---------------- Helper: Confirm Dialog ---------------- */

function ConfirmDialog({
  open,
  title,
  description,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
