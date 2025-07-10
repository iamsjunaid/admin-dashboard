'use client';

import { useEffect, useState } from 'react';

import { Check, X, Pencil } from 'lucide-react';

import EditListingModal from './EditListingModal';
import AuditLogModal from './AuditLogModal';

import Button from '../components/ui/Button';
import TooltipWithIcon from '../components/ui/TooltipWithIcon';

import { Listing } from '@/lib/data';

import { useFeedback } from '../context/FeedbackContext';

export default function ListingTable() {
    const { showMessage } = useFeedback();
    const [data, setData] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
    const [showAudit, setShowAudit] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;


    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

    const filteredListings = filter === 'all'
        ? data
        : data.filter((listing) => listing.status === filter);

    const totalPages = Math.ceil(filteredListings.length / itemsPerPage);
    const paginatedListings = filteredListings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
        } catch {
            showMessage('Something went wrong', 'error');
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="p-4">
            <div className='flex justify-between items-center mb-4'>

                <h2 className="text-md font-semibold mb-4">Manage Listings</h2>
                <div className="mb-4">
                    <label className="text-sm font-medium mr-1 p-2">Filter by Status:</label>
                    <select
                        className="bg-gray-200 px-2 py-1 rounded border-none cursor-pointer"
                        value={filter}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilter(e.target.value as 'all' | 'pending' | 'approved' | 'rejected')}
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <Button variant='secondary' className='ml-2' onClick={() => setShowAudit(true)}>
                        View Audit Logs
                    </Button>
                </div>

            </div>
            <div className='rounded-lg shadow-sm overflow-hidden'>
                <table className="w-full text-sm">
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
                            paginatedListings.map((listing) => (
                                <tr key={listing.id} >
                                    <td className="p-2 border-b-1 border-gray-200"><p>{listing.title}</p></td>
                                    <td className="p-2 border-b-1 border-gray-200"><p>₹{listing.price}</p></td>
                                    <td className="p-2 border-b-1 border-gray-200 capitalize text-center"><p className='bg-gray-100 w-1/2 rounded'>{listing.status}</p></td>
                                    <td className="p-2 border-b-1 border-gray-200"><p>{listing.submittedBy}</p></td>
                                    <td className="p-2 border-b-1 border-gray-200 space-x-2">
                                        <TooltipWithIcon
                                            label="Approve"
                                            icon={<Check size={16} />}
                                            onClick={() => updateStatus(listing.id, 'approved')}
                                        />

                                        <TooltipWithIcon
                                            label="Reject"
                                            icon={<X size={16} />}
                                            onClick={() => updateStatus(listing.id, 'rejected')}
                                        />

                                        <TooltipWithIcon
                                            label="Edit"
                                            icon={<Pencil size={16} />}
                                            onClick={() => setSelectedListing(listing)}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`p-2 w-[2.4rem] rounded ${currentPage === i + 1 ? 'bg-black text-white' : 'bg-gray-200'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

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
