'use client';

import { useFeedback } from '../context/FeedbackContext';

export default function Toast() {
    const { message, type } = useFeedback();

    if (!message) return null;

    return (
        <div className={`fixed top-4 right-4 px-4 py-2 rounded shadow-md text-white transition-all
      ${type === 'success' ? 'bg-green-800' :
                type === 'error' ? 'bg-red-800' :
                    'bg-blue-800'}`}>
            {message}
        </div>
    );
}
