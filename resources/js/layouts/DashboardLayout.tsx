import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { getUser, logout } from '../services/AuthService'
import SidebarComponent from '../components/dashboard/SidebarComponent'

export default function DashboardLayout() {
    const navigate = useNavigate()
    const token = localStorage.getItem('AUTH_TOKEN')

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
        }
    });

    const { data, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        enabled: !!token,
        retry: false
    });

    useEffect(() => {
        if (!token) {
            navigate('/dashboard/auth/login')
            return;
        }
        
        // Si la consulta falló o el usuario no es admin, redirige
        if (isError || (data && data.roles.some(role => role.name === 'guest'))) {
            navigate('/dashboard/auth/login');
            return;
        }
    }, [data, isLoading, navigate, isError, token])

    const { mutate } = useMutation({
        mutationFn: logout,
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (_) => {
            localStorage.removeItem('AUTH_TOKEN')
            navigate('/dashboard/auth/login')
        }
    })

    if (isLoading) return 'Loading...';

    if (data) return (
        <>
            <div className="md:flex bg-slate-200">
                <SidebarComponent />
                <div className='w-full h-screen overflow-y-auto'>
                    <header className='sticky top-0 z-50 h-16 p-4 bg-white shadow-sm text-right'>
                        {token && (
                            <button
                                type='button'
                                className='bg-red-500 px-5 py-2 
                            text-white rounded-sm uppercase font-bold'
                                onClick={() => mutate()}
                            >Log out</button>
                        )}
                    </header>
                    <main className="flex-1 m-12 p-6 rounded-xl shadow-md bg-white">
                        <Outlet />
                    </main>
                    <footer className='sticky top-[100vh] bg-white p-4 text-center'>
                        Todos los derechos reservados. DJNTS
                    </footer>
                </div>
            </div>
            <ToastContainer position="top-right" pauseOnHover={false} pauseOnFocusLoss={false} />
        </>

    )
}
