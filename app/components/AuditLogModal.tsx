"use client";
import { useEffect, useState } from "react";
import TooltipWithIcon from "./ui/TooltipWithIcon";
import { X } from "lucide-react";

type AuditLog = {
    id: string;
    admin: string;
    action: string;
    listingId: string;
    timestamp: string;
};

export default function AuditLogModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    console.log(`AuditLogModal open: ${open}`);

    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (open) {
            const fetchLogs = async () => {
                const res = await fetch("/api/audit-logs");
                const data = await res.json();
                setLogs(data);
                setLoading(false);
            };
            fetchLogs();
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-md font-semibold mb-4">Audit Logs</h2>
                    <TooltipWithIcon
                        label="Close"
                        icon={<X size={16} />}
                        onClick={onClose}
                    />
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : logs.length === 0 ? (
                    <p>No audit logs found.</p>
                ) : (
                    <div className="rounded-lg shadow-sm overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-2">ID</th>
                                    <th className="p-2">Admin</th>
                                    <th className="p-2">Action</th>
                                    <th className="p-2">Listing ID</th>
                                    <th className="p-2">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.map((log) => (
                                    <tr key={log.id}>
                                        <td className="p-2 border-b-1 border-gray-200">{log.id}</td>
                                        <td className="p-2 border-b-1 border-gray-200">{log.admin}</td>
                                        <td className="p-2 border-b-1 border-gray-200">{log.action}</td>
                                        <td className="p-2 border-b-1 border-gray-200">{log.listingId}</td>
                                        <td className="p-2 border-b-1 border-gray-200">{new Date(log.timestamp).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
