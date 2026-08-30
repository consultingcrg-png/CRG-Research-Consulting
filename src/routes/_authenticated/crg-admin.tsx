import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, Pencil, Plus, ShieldAlert, Trash2 } from "lucide-react";
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

type WorkUpdate = {
  id: string;
  title: string;
  description: string;
  image_urls: string[];
  work_date: string;
  status: "draft" | "published";
};

type EmployeeEmail = {
  id: string;
  employee_name: string;
  email_address: string;
  department: string | null;
  position: string | null;
  status: "active" | "suspended";
};

function AdminPortal() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const signOut = async () => {
    await supabase.auth.signOut();
    qc.clear();
    void navigate({ to: "/staff-access-crg" });
  };

  // Role check
  useEffect(() => {
    void (async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError || !userData?.user) {
          console.error("Auth user check failed:", userError);
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

  // Inactivity timeout
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
          <TabsList>
            <TabsTrigger value="work">Recent Work</TabsTrigger>
            <TabsTrigger value="emails">Employee Emails</TabsTrigger>
          </TabsList>
          <TabsContent value="work" className="mt-6">
            <WorkUpdatesPanel />
          </TabsContent>
          <TabsContent value="emails" className="mt-6">
            <EmployeeEmailsPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

/* ---------------- Work updates ---------------- */

function WorkUpdatesPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<WorkUpdate | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "work_updates"],
    queryFn: async (): Promise<WorkUpdate[]> => {
      const { data, error } = await supabase
        .from("work_updates")
        .select("id,title,description,image_urls,work_date,status")
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
    });
  };

  const formOpen = creating || editing !== null;

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
          <div className="grid gap-4 sm:grid-cols-2">
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
            <Label htmlFor="image">Images</Label>
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
                {images.map((url) => (
                  <div key={url} className="relative">
                    <img
                      src={url}
                      alt="Work update"
                      className="size-20 rounded-md object-cover"
                    />
                    <button
                      type="button"
                      aria-label="Remove image"
                      onClick={() => setImages((p) => p.filter((u) => u !== url))}
                      className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-destructive text-destructive-foreground"
                    >
                      <Trash2 className="size-3" />
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

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No work updates yet.</p>
      ) : (
        <ul className="space-y-3">
          {data.map((item) => (
            <li
              key={item.id}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border-2 border-primary bg-card p-5 shadow-card"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-sm font-bold">{item.title}</h3>
                  <Badge variant={item.status === "published" ? "default" : "secondary"}>
                    {item.status}
                  </Badge>
                </div>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                  {item.work_date} · {item.description}
                </p>
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
        title="Delete this work update?"
        description="This permanently removes the update from the website."
        onCancel={() => setDeleteId(null)}
        onConfirm={() => deleteId && remove.mutate(deleteId)}
      />
    </div>
  );
}

/* ---------------- Employee emails ---------------- */

function EmployeeEmailsPanel() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<EmployeeEmail | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin", "employee_emails"],
    queryFn: async (): Promise<EmployeeEmail[]> => {
      const { data, error } = await supabase
        .from("employee_emails")
        .select("id,employee_name,email_address,department,position,status")
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <h2 className="truncate text-lg font-bold">Employee Emails</h2>
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
            <Label htmlFor="employee_name">Name *</Label>
            <Input
              id="employee_name"
              name="employee_name"
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
              defaultValue={editing?.email_address ?? ""}
              required
            />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Input id="department" name="department" defaultValue={editing?.department ?? ""} />
          </div>
          <div>
            <Label htmlFor="position">Position</Label>
            <Input id="position" name="position" defaultValue={editing?.position ?? ""} />
          </div>
          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <Button type="submit" disabled={save.isPending}>
              {save.isPending ? "Saving..." : "Save"}
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

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-sm text-muted-foreground">No employee records yet.</p>
      ) : (
        <ul className="space-y-3">
          {data.map((item) => (
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
