'use client';

import { useEffect, useState } from 'react';

import { Listing } from '@/lib/data';

type Props = {
  listing: Listing | null;
  onClose: () => void;
  onSave: () => void;
};

export default function EditListingModal({ listing, onClose, onSave }: Props) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number | ''>('');

  useEffect(() => {
    if (listing) {
      setTitle(listing.title);
      setPrice(listing.price);
    }
  }, [listing]);

  if (!listing) return null;

  const handleSubmit = async () => {
    await fetch('/api/listings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: listing.id, title, price }),
    });

    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Edit Listing</h3>
        <div className="mb-4">
          <label className="block mb-1 text-sm">Title</label>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm">Price (₹)</label>
          <input
            type="number"
            className="w-full border px-2 py-1 rounded"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 text-gray-700">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
