'use client';

import { useEffect, useState } from 'react';

import EditListingModal from './EditListingModal';
import AuditLogModal from './AuditLogModal';

import { Listing } from '@/lib/data';

import { useFeedback } from '../context/FeedbackContext';

export default function ListingTable() {
    const { showMessage } = useFeedback();
    const [data, setData] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
    const [showAudit, setShowAudit] = useState(false);

    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

    const filteredListings = filter === 'all'
        ? data
        : data.filter((listing) => listing.status === filter);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        setLoading(true);
        const res = await fetch('/api/listings');
        const json = await res.json();
        setData(json);
        setLoading(false);
    };

    const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
        try {
            const res = await fetch(`/api/listings/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status }),
            });

            if (res.ok) {
                showMessage(`Listing ${status}`, 'success');
                fetchListings();
            } else {
                showMessage('Failed to update listing status', 'error');
            }
        } catch (err) {
            showMessage('Something went wrong', 'error');
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="p-4">
            <div className='flex justify-between items-center mb-4'>

                <h2 className="text-xl font-bold mb-4">Listings</h2>
                <div className="mb-4">
                    <label className="text-sm font-medium mr-2">Filter by Status:</label>
                    <select
                        className="border px-2 py-1 rounded"
                        value={filter}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value as 'all' | 'pending' | 'approved' | 'rejected')}
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <button className="mb-4 bg-gray-800 text-white px-4 py-2 rounded" onClick={() => setShowAudit(true)}>
                        View Audit Logs
                    </button>
                </div>

            </div>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="text-left p-2">Title</th>
                        <th className="text-left p-2">Price</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Submitted By</th>
                        <th className="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {filteredListings.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center p-4 text-gray-500">
                                No listings found.
                            </td>
                        </tr>
                    ) : (
                        filteredListings.map((listing) => (
                            <tr key={listing.id} className="border-t">
                                <td className="p-2">{listing.title}</td>
                                <td className="p-2">₹{listing.price}</td>
                                <td className="p-2 capitalize">{listing.status}</td>
                                <td className="p-2">{listing.submittedBy}</td>
                                <td className="p-2 space-x-2">
                                    <button
                                        className="text-green-600 hover:underline"
                                        onClick={() => updateStatus(listing.id, 'approved')}
                                        disabled={listing.status === 'approved'}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="text-red-600 hover:underline"
                                        onClick={() => updateStatus(listing.id, 'rejected')}
                                        disabled={listing.status === 'rejected'}
                                    >
                                        Reject
                                    </button>
                                    <button
                                        className="text-blue-600 hover:underline"
                                        onClick={() => setSelectedListing(listing)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {/* Edit Listing Modal */}
            <EditListingModal
                listing={selectedListing}
                onClose={() => setSelectedListing(null)}
                onSave={fetchListings}
            />
            {/* Audit Modal */}
            <AuditLogModal open={showAudit} onClose={() => setShowAudit(false)} />
        </div>
    );
}
