import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ListingTable from '../components/ListingTable';
import Toast from '../components/Toast';

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get('auth');

    if (!isAuthenticated) redirect('/');

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <ListingTable />
            <Toast />
        </main>
    );
}
