'use client';

import { createContext, useContext, useState } from 'react';

type FeedbackContextType = {
    message: string;
    type: 'success' | 'error' | 'info' | '';
    showMessage: (msg: string, type?: 'success' | 'error' | 'info') => void;
    clearMessage: () => void;
};

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider = ({ children }: { children: React.ReactNode }) => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState<FeedbackContextType['type']>('');

    const showMessage = (msg: string, type: 'success' | 'error' | 'info' = 'info') => {
        setMessage(msg);
        setType(type);
        setTimeout(() => clearMessage(), 3000);
    };

    const clearMessage = () => {
        setMessage('');
        setType('');
    };

    return (
        <FeedbackContext.Provider value={{ message, type, showMessage, clearMessage }}>
            {children}
        </FeedbackContext.Provider>
    );
};

export const useFeedback = () => {
    const context = useContext(FeedbackContext);
    if (!context) throw new Error('useFeedback must be used within FeedbackProvider');
    return context;
};
