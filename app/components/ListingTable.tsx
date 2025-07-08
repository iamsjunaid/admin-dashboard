'use client';

import { useEffect, useState } from 'react';

import { Listing } from '@/lib/data';

export default function ListingTable() {
    const [data, setData] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/listings')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, []);

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
                            <td className="p-2">{listing.status}</td>
                            <td className="p-2">{listing.submittedBy}</td>
                            <td className="p-2 space-x-2">
                                <button className="text-green-600">Approve</button>
                                <button className="text-red-600">Reject</button>
                                <button className="text-blue-600">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
