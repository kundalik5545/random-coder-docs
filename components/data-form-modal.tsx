"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface DataFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { title: string; description: string }) => Promise<void>;
    initialData?: {
        title: string;
        description?: string | null;
    };
    title: string;
}

export function DataFormModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    title: modalTitle,
}: DataFormModalProps) {
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setFormData({
                title: initialData?.title || "",
                description: initialData?.description || "",
            });
            setError(null);
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.title.trim()) {
            setError("Title is required");
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit({
                title: formData.title.trim(),
                description: formData.description.trim() || "",
            });
            onClose();
            setFormData({ title: "", description: "" });
        } catch (err: any) {
            setError(err.message || "Failed to save");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-md rounded-lg border border-fd-border bg-fd-background p-6 shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-md p-1 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
                    aria-label="Close"
                >
                    <X className="h-5 w-5" />
                </button>

                <h2 className="mb-4 text-xl font-semibold text-fd-foreground">
                    {modalTitle}
                </h2>

                {error && (
                    <div className="mb-4 rounded-md border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-fd-foreground"
                        >
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="title"
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                            className="mt-1 block w-full rounded-md border border-fd-border bg-fd-background px-3 py-2 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:border-fd-ring focus:outline-none focus:ring-2 focus:ring-fd-ring"
                            placeholder="Enter title"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-fd-foreground"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            className="mt-1 block w-full rounded-md border border-fd-border bg-fd-background px-3 py-2 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:border-fd-ring focus:outline-none focus:ring-2 focus:ring-fd-ring"
                            placeholder="Enter description (optional)"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="rounded-md border border-fd-border bg-fd-background px-4 py-2 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent focus:outline-none focus:ring-2 focus:ring-fd-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-md bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground transition-colors hover:bg-fd-primary/80 focus:outline-none focus:ring-2 focus:ring-fd-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

