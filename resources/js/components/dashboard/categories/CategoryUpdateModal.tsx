
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCategoryById } from '../../../services/CategoryService';
import CategoryUpdateFormModal from './CategoryUpdateFormModal';

export default function CategoryUpdateModal() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const categoryId = queryParams.get('editCategory')!

    // Buscar la categoria
    const { data: category, isLoading } = useQuery({
        queryKey: ['category', categoryId],
        queryFn: () => getCategoryById(parseInt(categoryId)),
        retry: false,
        enabled: !!categoryId
    })

    if (isLoading) return 'cargando...'

    if (category) return <CategoryUpdateFormModal category={category} />

}
