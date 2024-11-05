import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTagById } from '../../../services/TagService';
import TagUpdateFormModal from './TagUpdateFormModal';

export default function TagUpdateModal() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const tagId = queryParams.get('editTag')!
    const show = tagId ? true : false

    // Buscar la categoria
    const { data: tag, isLoading } = useQuery({
        queryKey: ['tag', tagId],
        queryFn: () => getTagById(parseInt(tagId)),
        retry: false,
        enabled: !!tagId
    })

    if (isLoading) return 'cargando...'

    if (tag) return <TagUpdateFormModal tag={tag} show={show} />

}