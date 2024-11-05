
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Link, Outlet } from 'react-router-dom'

export default function AppLayout() {
    return (
        <div>
            <header className='w-full bg-white h-20 fixed z-10 shadow-sm'>
                <div className='flex justify-between items-center container h-full m-auto'>
                    <div className='text-4xl font-black'>
                        DJNTS
                    </div>
                    <nav className='flex gap-6'>
                        <Link
                            className='hover:text-indigo-600 active:text-indigo-600'
                            to={'/'}
                        >
                            Inicio
                        </Link>
                        <Link
                            className='hover:text-indigo-600 active:text-indigo-600'
                            to={'/blog'}
                        >
                            Blog
                        </Link>
                    </nav>
                    <div>
                        <UserCircleIcon className='size-7 text-slate-900' />
                    </div>
                </div>
            </header>
            <main className='w-full'>
                <Outlet />
            </main>
            <footer className=''>
                footer
            </footer>
        </div>
    )
}
