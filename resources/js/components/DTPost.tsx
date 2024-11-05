
import DataTable, { TableColumn } from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import { Post } from '../types/post.type';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

type DTPostProps = {
    data: Post[]
}

export default function DTPost({ data }: DTPostProps) {

    const navigate = useNavigate()
    const columns: TableColumn<Post>[] = [
        {
            name: 'ID.',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Posted',
            selector: row => row.posted,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.category.name,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div className='flex justify-center items-center gap-3'>
                    <Link
                        to={`/dashboard/post/${row.id}/edit`}
                        className='text-slate-500 hover:text-slate-600'
                    >
                        <PencilIcon className='size-5' />
                    </Link>
                    <button
                        type='button'
                        className='text-red-500 hover:text-red-600'
                        onClick={() => navigate(location.pathname + `?deletePost=${row.id}`)}
                    >
                        <TrashIcon className='size-5' />
                    </button>
                </div>
            ),
        }
    ];

    return (
        <DataTable
            columns={columns}
            data={data}
            pagination
        />
    )
}
