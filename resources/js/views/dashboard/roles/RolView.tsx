import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom';
import DataTable, { TableColumn } from 'react-data-table-component';
import { getRoles } from '../../../services/RolService';
import { Role } from '../../../types/role.type';
import { ChevronRightIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import RolStoreModal from '../../../components/dashboard/roles/RolStoreModal';
import RolUpdateModal from '../../../components/dashboard/roles/RolUpdateModal';
import RolDeleteModal from '../../../components/dashboard/roles/RolDeleteModal';



export default function RolView() {
    const navigate = useNavigate()
    const { data, isLoading } = useQuery({
        queryKey: ['roles'],
        queryFn: getRoles
    });

    const columns: TableColumn<Role>[] = [
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
            name: 'Actions',
            cell: row => (
                <div className='flex justify-center items-center gap-3'>
                    <Link to={`/dashboard/role/${row.id}/detail`} >
                        <EyeIcon className='size-5' />
                    </Link>
                    <button
                        type='button'
                        className='text-slate-500 hover:text-slate-600'
                        onClick={() => navigate(location.pathname + `?editRol=${row.id}`)}
                    >
                        <PencilIcon className='size-5' />
                    </button>
                    <button
                        type='button'
                        className='text-red-500 hover:text-red-600'
                        onClick={() => navigate(location.pathname + `?deleteRol=${row.id}`)}
                    >
                        <TrashIcon className='size-5' />
                    </button>
                </div>
            ),
        }
    ];

    if (isLoading) return 'Loading...';

    if (data) return (
        <>
            <div className='text-sm text-slate-400 flex gap-2 items-center'>
                <Link to={'/dashboard'} className="hover:text-slate-500">Home</Link>
                <ChevronRightIcon className="size-4" />
                <span className="font-bold text-slate-500">Rol</span>
            </div>
            <h2 className='text-4xl mt-2'>Roles</h2>
            <div className='text-right my-5'>
                <button
                    type='button'
                    className="bg-indigo-600 hover:bg-indigo-700 px-8 py-2 rounded text-white text-md font-bold cursor-pointer transition-colors"
                    onClick={() => navigate(location.pathname + `?newRol=true`)}
                >
                    New Rol
                </button>
            </div>
            <div className='overflow-y-auto'>
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                />
            </div>
            <RolStoreModal />
            <RolUpdateModal />
            <RolDeleteModal />
        </>
    )
}
