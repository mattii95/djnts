
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Link, Outlet, useLocation } from 'react-router-dom'
import FooterComponent from '../components/FooterComponent'

export default function AppLayout() {
    const location = useLocation()
    const isActive = (path: string) => location.pathname === path ? 'text-indigo-700 font-bold' : '';
    return (
        <div>
            <header className='w-full bg-white h-20 fixed z-10 shadow-sm'>
                <div className='flex justify-between items-center container h-full m-auto'>
                    <div className='text-4xl font-black'>
                        <a href={'/'}>
                            <img src="./images/logo.png" className='h-10 w-full' alt="" />
                        </a>
                    </div>
                    <nav className='flex gap-6'>
                        <Link
                            className={`hover:text-indigo-600 ${isActive('/')}`}
                            to={'/'}
                        >
                            Home
                        </Link>
                        <Link
                            className={`hover:text-indigo-600 ${isActive('/radio')}`}
                            to={'/radio'}
                        >
                            Radio
                        </Link>
                        <Link
                            className={`hover:text-indigo-600 ${isActive('/blog')}`}
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
            <Outlet />
            <FooterComponent />
        </div>
    )
}
