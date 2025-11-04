"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { DataFormModal } from "@/components/data-form-modal";

interface DailyNote {
    id: string;
    title: string;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
}

interface DataItem {
    id: string;
    title: string;
    description?: string | null;
    completed?: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export default function DailyNotesPage() {
    const [data, setData] = useState<DailyNote[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<DailyNote | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/daily-notes");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const result = await response.json();
            setData(result);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item: DataItem) => {
        // Convert DataItem to DailyNote
        const dailyNote: DailyNote = {
            ...item,
            createdAt: typeof item.createdAt === 'string' ? item.createdAt : item.createdAt.toISOString(),
            updatedAt: typeof item.updatedAt === 'string' ? item.updatedAt : item.updatedAt.toISOString(),
        };
        setEditingItem(dailyNote);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/daily-notes/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete");
            }
            await fetchData();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete");
        }
    };

    const handleSubmit = async (formData: { title: string; description: string }) => {
        try {
            const url = editingItem
                ? `/api/daily-notes/${editingItem.id}`
                : "/api/daily-notes";
            const method = editingItem ? "PATCH" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || "Failed to save");
            }

            await fetchData();
            setIsModalOpen(false);
            setEditingItem(null);
        } catch (err) {
            throw err;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <p className="text-fd-muted-foreground">Loading...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-fd-foreground">Daily Notes</h1>
                    <p className="mt-1 text-sm text-fd-muted-foreground">
                        Manage your daily notes and topics
                    </p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 rounded-md bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/80 focus:outline-none focus:ring-2 focus:ring-fd-ring"
                >
                    <Plus className="h-4 w-4" />
                    Add New
                </button>
            </div>

            {error && (
                <div className="rounded-md border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
                    {error}
                </div>
            )}

            <DataTable
                data={data}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <DataFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingItem(null);
                }}
                onSubmit={handleSubmit}
                initialData={editingItem || undefined}
                title={editingItem ? "Edit Daily Note" : "Add Daily Note"}
            />
        </div>
    );
}

