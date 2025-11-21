import Link from 'next/link'
import { LayoutDashboard, Car, Tag, HelpCircle, LogOut } from 'lucide-react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { logout } from './login/actions'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Simple session check
    const session = (await cookies()).get('admin_session')
    if (!session) {
        redirect('/admin/login')
    }

    return (
        <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white">
                <div className="flex h-16 items-center justify-center border-b border-slate-800">
                    <span className="text-xl font-bold">Kimchi Admin</span>
                </div>
                <nav className="p-4 space-y-2">
                    <Link href="/admin/dashboard" className="flex items-center gap-3 rounded-md px-4 py-3 hover:bg-slate-800">
                        <LayoutDashboard className="h-5 w-5" />
                        Панель
                    </Link>
                    <Link href="/admin/cars" className="flex items-center gap-3 rounded-md px-4 py-3 hover:bg-slate-800">
                        <Car className="h-5 w-5" />
                        Автомобили
                    </Link>
                    <Link href="/admin/brands" className="flex items-center gap-3 rounded-md px-4 py-3 hover:bg-slate-800">
                        <Tag className="h-5 w-5" />
                        Бренды
                    </Link>
                    <Link href="/admin/faqs" className="flex items-center gap-3 rounded-md px-4 py-3 hover:bg-slate-800">
                        <HelpCircle className="h-5 w-5" />
                        FAQ
                    </Link>
                    <Link href="/admin/steps" className="flex items-center gap-3 rounded-md px-4 py-3 hover:bg-slate-800">
                        <HelpCircle className="h-5 w-5" />
                        Этапы
                    </Link>

                    <form action={async () => { 'use server'; await logout() }} className="mt-auto pt-8">
                        <button className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-red-400 hover:bg-slate-800">
                            <LogOut className="h-5 w-5" />
                            Выйти
                        </button>
                    </form>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                {children}
            </main>
        </div>
    )
}
