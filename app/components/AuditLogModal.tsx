"use client";
import { useEffect, useState } from "react";

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
                <h2 className="text-xl font-bold mb-4">Audit Logs</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : logs.length === 0 ? (
                    <p>No audit logs found.</p>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="border-b font-semibold">
                            <tr>
                                <th>ID</th>
                                <th>Admin</th>
                                <th>Action</th>
                                <th>Listing ID</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log.id}>
                                    <td>{log.id}</td>
                                    <td>{log.admin}</td>
                                    <td>{log.action}</td>
                                    <td>{log.listingId}</td>
                                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <button
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
