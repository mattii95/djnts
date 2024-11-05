import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { getPermissions } from '../../../services/PermissionService';

export default function PermissionView() {

    const { data, isLoading } = useQuery({
        queryKey: ['permissions'],
        queryFn: getPermissions
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
            name: 'Actions',
            cell: row => (
                <div className='flex justify-center items-center gap-3'>
                    <Link to={`/permission/${row.id}/details`} > View </Link>
                    <Link to={`/permission/${row.id}/edit`} > Edit </Link>
                    <button
                        type='button'
                        className='block text-sm leading-6 text-red-500'
                        onClick={() => navigate(location.pathname + `?deletePermission=${row.id}`)}
                    >
                        Delete
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
                Home {'>'} Permissions
            </div>
            <h2 className='text-4xl mt-2'>Permissions</h2>
            <div className='text-right my-5'>
                {/* <Link
                    to="/permission/create"
                    className="bg-indigo-600 hover:bg-indigo-700 px-8 py-2 rounded text-white text-md font-bold cursor-pointer transition-colors"
                >
                    New Permission
                </Link> */}
            </div>
            <div className='overflow-y-auto'>
                <DataTable
                    columns={columns}
                    data={dt}
                    pagination
                />
            </div>
        </>
    )
}
