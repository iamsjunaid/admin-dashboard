import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import ListingTable from '../components/ListingTable';

import Toast from '../components/Toast';

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get('auth');

    if (!isAuthenticated) redirect('/');

    return (
        <main className="">
            <h1 className="text-lg font-bold mb-4 border-b-2 p-2">Car Rentals Admin Dashboard</h1>
            <ListingTable />
            <Toast />
        </main>
    );
}
