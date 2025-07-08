import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get('auth');

    if (!isAuthenticated) {
        redirect('/');
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
            {/* Add listings table here */}
        </div>
    );
}
