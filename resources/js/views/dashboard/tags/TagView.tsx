import { useNavigate, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTags } from '../../../services/TagService';
import { TableColumn } from 'react-data-table-component';
import { Tag } from '../../../types/tag.type';
import { PencilIcon, TrashIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import DataTable from 'react-data-table-component';
import TagStoreModal from '../../../components/dashboard/tags/TagStoreModal';
import TagUpdateModal from '../../../components/dashboard/tags/TagUpdateModal';
import TagDeleteModal from '../../../components/dashboard/tags/TagDeleteModal';

export default function TagView() {
    const navigate = useNavigate()
    const { data, isLoading } = useQuery({
        queryKey: ['tags'],
        queryFn: getTags
    });

    const columns: TableColumn<Tag>[] = [
        {
            name: 'ID.',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Actions',
            cell: row => (
                <div>
                    <div className='flex justify-center items-center gap-3'>
                        <button
                            type='button'
                            className='text-slate-500 hover:text-slate-600'
                            onClick={() => navigate(location.pathname + `?editTag=${row.id}`)}
                        >
                            <PencilIcon className='size-5' />
                        </button>
                        <button
                            type='button'
                            className='text-red-500 hover:text-red-600'
                            onClick={() => navigate(location.pathname + `?deleteTag=${row.id}`)}
                        >
                            <TrashIcon className='size-5' />
                        </button>
                    </div>
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
                <span className="font-bold text-slate-500">Tag</span>
            </div>
            <h2 className='text-4xl mt-2'>Tags</h2>
            <div className='text-right my-5'>
                <button
                    type='button'
                    className="bg-indigo-600 hover:bg-indigo-700 px-8 py-2 rounded text-white text-md font-bold cursor-pointer transition-colors"
                    onClick={() => navigate(location.pathname + `?newTag=true`)}
                >
                    New Tag
                </button>
            </div>
            <div className='overflow-y-auto'>
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                />
            </div>
            <TagStoreModal />
            <TagUpdateModal />
            <TagDeleteModal />
        </>
    )
}
