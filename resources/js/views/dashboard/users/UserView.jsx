import { useQuery } from "react-query";
import { getUsers } from "../../../services/UserService";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import { PencilIcon, TrashIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import UserRolModalComponent from "../../../components/dashboard/users/UserRolModalComponent";


export default function UserView() {
    const navigate = useNavigate()
    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers
    });

    const columns = [
        {
            name: 'ID.',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div className='flex justify-center items-center gap-3'>
                    {/* <Link to={`/role/${row.id}/detail`} > View </Link> */}
                    <Link to={`/user/${row.id}/edit`}
                        className="text-sm leading-6 text-slate-500 hover:text-slate-600"
                    >
                        <PencilIcon className="size-6" />
                    </Link>
                    <button
                        type='button'
                        className='text-sm leading-6 text-indigo-500 hover:text-indigo-600'
                        onClick={() => navigate(location.pathname + `?rolUser=${row.id}`)}
                    >
                        <UserGroupIcon className="size-6" />
                    </button>
                    <button
                        type='button'
                        className='text-sm leading-6 text-red-500 hover:text-red-600'
                        onClick={() => navigate(location.pathname + `?deleteUser=${row.id}`)}
                    >
                        <TrashIcon className="size-6" />
                    </button>
                </div>
            ),
        }
    ];

    if (isLoading) return 'Loading...';

    const dt = data.map(d => {
        return { ...d }
    });

    if (data) return (
        <>
            <div className='text-sm text-slate-400'>
                Home {'>'} Users
            </div>
            <h2 className='text-4xl mt-2'>Users</h2>
            <div className='text-right my-5'>
                <Link
                    to="/user/create"
                    className="bg-indigo-600 hover:bg-indigo-700 px-8 py-2 rounded text-white text-md font-bold cursor-pointer transition-colors"
                >
                    New User
                </Link>
            </div>
            <div className='overflow-y-auto'>
                <DataTable
                    columns={columns}
                    data={dt}
                    pagination
                />
            </div>
            <UserRolModalComponent />
        </>
    )
}
