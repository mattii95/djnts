import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <div className='flex justify-center items-center h-screen py-9'>
            <div className="bg-white flex flex-col px-4 rounded-md shadow-md w-[350px] h-[458px] justify-center items-center">
                <div>
                    <div className='text-6xl py-6 px-4 font-black text-center'>DJNTS</div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
