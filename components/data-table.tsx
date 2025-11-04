"use client";

import { useState } from "react";
import { Edit, Trash2, CheckCircle2, Circle } from "lucide-react";

interface DataItem {
    id: string;
    title: string;
    description?: string | null;
    completed?: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
}

interface DataTableProps {
    data: DataItem[];
    onEdit: (item: DataItem) => void;
    onDelete: (id: string) => void;
    onToggleComplete?: (id: string, completed: boolean) => void;
    showCompleted?: boolean;
}

export function DataTable({
    data,
    onEdit,
    onDelete,
    onToggleComplete,
    showCompleted = false,
}: DataTableProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const formatDate = (date: string | Date) => {
        const d = new Date(date);
        return d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const truncateDescription = (text: string | null | undefined, maxLength = 50) => {
        if (!text) return "—";
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) {
            return;
        }

        setDeletingId(id);
        try {
            await onDelete(id);
        } finally {
            setDeletingId(null);
        }
    };

    if (data.length === 0) {
        return (
            <div className="rounded-md border border-fd-border bg-fd-background p-8 text-center">
                <p className="text-fd-muted-foreground">No data available</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-md border border-fd-border">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-fd-border bg-fd-muted/50">
                        {showCompleted && (
                            <th className="px-4 py-3 text-left text-sm font-medium text-fd-foreground">
                                Status
                            </th>
                        )}
                        <th className="px-4 py-3 text-left text-sm font-medium text-fd-foreground">
                            Title
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-fd-foreground">
                            Description
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-fd-foreground">
                            Created At
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-fd-foreground">
                            Updated At
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-fd-foreground">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr
                            key={item.id}
                            className={`border-b border-fd-border transition-colors hover:bg-fd-accent/50 ${showCompleted && item.completed ? "opacity-60" : ""
                                }`}
                        >
                            {showCompleted && (
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() =>
                                            onToggleComplete?.(item.id, !item.completed)
                                        }
                                        className="text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                                        aria-label={item.completed ? "Mark incomplete" : "Mark complete"}
                                    >
                                        {item.completed ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                                        ) : (
                                            <Circle className="h-5 w-5" />
                                        )}
                                    </button>
                                </td>
                            )}
                            <td className="px-4 py-3 text-sm font-medium text-fd-foreground">
                                {showCompleted && item.completed ? (
                                    <span className="line-through">{item.title}</span>
                                ) : (
                                    item.title
                                )}
                            </td>
                            <td className="px-4 py-3 text-sm text-fd-muted-foreground">
                                {truncateDescription(item.description)}
                            </td>
                            <td className="px-4 py-3 text-sm text-fd-muted-foreground">
                                {formatDate(item.createdAt)}
                            </td>
                            <td className="px-4 py-3 text-sm text-fd-muted-foreground">
                                {formatDate(item.updatedAt)}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="rounded-md p-1.5 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-foreground"
                                        aria-label="Edit"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        disabled={deletingId === item.id}
                                        className="rounded-md p-1.5 text-fd-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-600 disabled:opacity-50"
                                        aria-label="Delete"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

