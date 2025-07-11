'use client';

import { useEffect, useState } from 'react';

import { Listing } from '@/lib/data';
import { X } from 'lucide-react';
import TooltipWithIcon from './ui/TooltipWithIcon';
import Button from './ui/Button';

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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-semibold mb-4">Edit Listing</h3>
          <TooltipWithIcon
            label="Close"
            icon={<X size={16} />}
            onClick={onClose}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm">Title</label>
          <input
            type="text"
            className="w-full bg-gray-200 px-2 py-1 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm">Price (₹)</label>
          <input
            type="number"
            className="w-full bg-gray-200 px-2 py-1 rounded"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-center space-x-2">
          <Button onClick={handleSubmit} variant='primary' className='w-full'>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
