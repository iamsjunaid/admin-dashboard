// components/ui/Button.tsx
'use client';

import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
    className?: string;
};

const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
};

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    disabled = false,
    className,
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={classNames(
                'px-4 py-2 rounded-md transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed',
                variantStyles[variant],
                className
            )}
        >
            {children}
        </button>
    );
};

export default Button;
