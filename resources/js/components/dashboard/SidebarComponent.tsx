import { Link, useLocation } from "react-router-dom";
import { HomeIcon, DocumentTextIcon, PaperClipIcon, UserGroupIcon, LockOpenIcon, UserIcon, TagIcon, GlobeAltIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";

export default function SidebarComponent() {
    const location = useLocation()
    const isActive = (path: string) => location.pathname === path ? 'bg-indigo-700' : 'bg-indigo-600';
    return (
        <aside className="md:w-72 h-screen bg-indigo-600">
            <div className="h-16 p-4 bg-indigo-700 text-center text-white font-black text-2xl">
                DJNTS
            </div>
            <nav className="flex flex-col justify-center">
                <Link
                    to="/dashboard"
                    className={`flex justify-between items-center px-8 font-bold text-lg text-white uppercase hover:bg-indigo-700 py-4 transition-colors ${isActive('/dashboard')}`}
                >
                    <div className="flex items-center gap-2">
                        <HomeIcon className="size-5" />
                        Home
                    </div>
                </Link>
                <Link
                    to="/dashboard/post"
                    className={`flex justify-between items-center px-8 font-bold text-lg text-white uppercase hover:bg-indigo-700 py-4 transition-colors ${isActive('/dashboard/post')}`}
                >
                    <div className="flex items-center gap-2">
                        <DocumentTextIcon className="size-5" />
                        Posts
                    </div>
                </Link>
                <Link
                    to="/dashboard/category"
                    className={`flex items-center gap-2 px-8 font-bold text-lg text-white uppercase hover:bg-indigo-700 py-4 transition-colors ${isActive('/dashboard/category')}`}
                >
                    <PaperClipIcon className="size-5" />
                    Categories
                </Link>
                <Link
                    to="/dashboard/tag"
                    className={`flex items-center gap-2 px-8 font-bold text-lg text-white uppercase hover:bg-indigo-700 py-4 transition-colors ${isActive('/dashboard/tag')}`}
                >
                    <TagIcon className="size-5" />
                    Tags
                </Link>
                <Link
                    to="/dashboard/role"
                    className={`flex items-center gap-2 px-8 font-bold text-lg text-white uppercase hover:bg-indigo-700 py-4 transition-colors ${isActive('/dashboard/role')}`}
                >
                    <UserGroupIcon className="size-5" />
                    Roles
                </Link>
                <Link
                    to="/dashboard/permission"
                    className={`flex items-center gap-2 px-8 font-bold text-lg text-white uppercase hover:bg-indigo-700 py-4 transition-colors ${isActive('/dashboard/permission')}`}
                >
                    <LockOpenIcon className="size-5" />
                    Permissions
                </Link>
                <Link
                    to="/dashboard/user"
                    className={`flex items-center gap-2 px-8 font-bold text-lg text-white uppercase hover:bg-indigo-700 py-4 transition-colors ${isActive('/dashboard/user')}`}
                >
                    <UserIcon className="size-5" />
                    Users
                </Link>
                <a
                    href={import.meta.env.VITE_BASE_URL}
                    target="_blank"
                    className={`flex items-center gap-2 px-8 font-bold text-lg text-white uppercase hover:bg-indigo-700 py-4 transition-colors `}
                >
                    <GlobeAltIcon className="size-5" />
                        Web
                    <ArrowUpRightIcon className="size-3" />
                </a>
            </nav>
        </aside>
    )
}
