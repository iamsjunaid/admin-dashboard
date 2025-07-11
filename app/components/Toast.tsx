'use client';

import { useEffect, useState } from 'react';
import { useFeedback } from '../context/FeedbackContext';

export default function Toast() {
    const { message } = useFeedback();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !message) return null;

    return (
        <div className={'fixed top-4 right-4 px-4 py-2 rounded shadow-md text-white transition-all text-sm bg-black'}>
            {message}
        </div>
    );
}
