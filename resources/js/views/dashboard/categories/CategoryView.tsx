import { useQuery } from 'react-query'
import { Link, useNavigate } from 'react-router-dom';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Category } from '../../../types/category';
import { ChevronRightIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import CategoryStoreModal from '../../../components/dashboard/categories/CategoryStoreModal';
import { getCategoriesAll } from '../../../services/CategoryService';
import CategoryUpdateModal from '../../../components/dashboard/categories/CategoryUpdateModal';
import CategoryDeleteModal from '../../../components/dashboard/categories/CategoryDeleteModal';



export default function CategoryView() {
    const navigate = useNavigate()
    const { data, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategoriesAll
    });

    const columns: TableColumn<Category>[] = [
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
                            onClick={() => navigate(location.pathname + `?editCategory=${row.id}`)}
                        >
                            <PencilIcon className='size-5' />
                        </button>
                        <button
                            type='button'
                            className='text-red-500 hover:text-red-600'
                            onClick={() => navigate(location.pathname + `?deleteCategory=${row.id}`)}
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
                <span className="font-bold text-slate-500">Category</span>
            </div>
            <h2 className='text-4xl mt-2'>Categories</h2>
            <div className='text-right my-5'>
                <button
                    type='button'
                    className="bg-indigo-600 hover:bg-indigo-700 px-8 py-2 rounded text-white text-md font-bold cursor-pointer transition-colors"
                    onClick={() => navigate(location.pathname + `?newCategory=true`)}
                >
                    New Category
                </button>
            </div>
            <div className='overflow-y-auto'>
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                />
            </div>
            <CategoryStoreModal />
            <CategoryUpdateModal />
            <CategoryDeleteModal />
        </>
    )
}
