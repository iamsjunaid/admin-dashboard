'use client';

import * as Tooltip from '@radix-ui/react-tooltip';
import { FC } from 'react';
import classNames from 'classnames';

type Props = {
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
    className?: string;
};

const TooltipWithIcon: FC<Props> = ({ label, icon, onClick, className }) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <button
                        onClick={onClick}
                        className={classNames(
                            'p-2 rounded hover:bg-gray-100 transition-colors',
                            className
                        )}
                        aria-label={label}
                    >
                        {icon}
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        side="top"
                        className="bg-black text-white text-xs rounded px-2 py-1 shadow-sm"
                    >
                        {label}
                        <Tooltip.Arrow className="fill-black" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};

export default TooltipWithIcon;
