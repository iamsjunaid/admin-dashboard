import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import ListingTable from '../components/ListingTable';

import Toast from '../components/Toast';
import TooltipWithIcon from '../components/ui/TooltipWithIcon';
import { Power } from 'lucide-react';

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get('auth');

    if (!isAuthenticated) redirect('/');

    const onClose = async () => {
        'use server';
        const cookieStore = await cookies();
        cookieStore.set('auth', '', {
            expires: new Date(0),
            path: '/',
            httpOnly: true
        });
        redirect('/');
    };

    return (
        <main>
            <div className="flex justify-between items-center mb-4 text-lg font-bold border-b-2 px-4 py-2">
                <h1>Admin Dashboard</h1>
                <TooltipWithIcon
                    label="Logout"
                    className='bg-gray-200 hover:bg-gray-400 rounded p-2'
                    icon={<Power size={16} />}
                    onClick={onClose}
                />
            </div>
            <ListingTable />
            <Toast />
        </main>
    );
}
