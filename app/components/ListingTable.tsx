'use client';

import { useEffect, useState } from 'react';

type Listing = {
    id: string;
    title: string;
    price: number;
    status: 'pending' | 'approved' | 'rejected';
    submittedBy: string;
};

export default function ListingTable() {
    const [data, setData] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);

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
        const res = await fetch('/api/listings', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status }),
        });

        if (res.ok) {
            fetchListings(); // Refresh table data
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Listings</h2>
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
                    {data.map((listing) => (
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
                                <button className="text-blue-600 hover:underline">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
