import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getRolById } from '../../../services/RolService';
import RolUpdateFormModal from './RolUpdateFormModal';

export default function RolUpdateModal() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const rolId = queryParams.get('editRol')!
    const show = rolId ? true : false

    // Buscar la categoria
    const { data: rol, isLoading } = useQuery({
        queryKey: ['rol', rolId],
        queryFn: () => getRolById(parseInt(rolId)),
        retry: false,
        enabled: !!rolId
    })

    if (isLoading) return 'cargando...'

    if (rol) return <RolUpdateFormModal role={rol} show={show} />

}