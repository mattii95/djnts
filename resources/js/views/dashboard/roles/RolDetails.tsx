import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { addPermissionToRol, getRolById, removePermissionToRol } from '../../../services/RolService';
import { ChevronRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import ErrorMessageComponent from '../../../components/ErrorMessageComponent';
import { toast } from 'react-toastify';
import { getPermissions } from '../../../services/PermissionService';
import { Role } from '../../../types/role.type';
import { Permission, PermissionFormData, PermissionIdRol } from '../../../types/permission.type';

export default function RolDetails() {
    const params = useParams()
    const rolId = parseInt(params.rolId!)
    const [hasPermissions, setHasPermissions] = useState<Permission[]>([])

    const { data: rol, isLoading } = useQuery({
        queryKey: ['rolDetail', rolId],
        queryFn: () => getRolById(rolId)
    })

    const { data: permissions, isLoading: isLoadingP } = useQuery({
        queryKey: ['permissionsSelect'],
        queryFn: getPermissions
    })

    useEffect(() => {
        if (!isLoadingP && !isLoading) {
            const filteredPermissions = permissions!.filter(permission => !rol.permissions.some((role: Role) => role.name === permission.name))
            setHasPermissions(filteredPermissions);
        }
    }, [permissions, isLoadingP, rol, isLoading])

    const clientQuery = useQueryClient()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: { 'permission_id': '' } });

    const { mutate: addPermission } = useMutation({
        mutationFn: addPermissionToRol,
        onError: (error: Error) => {
            toast.error(error.message)
            reset()
        },
        onSuccess: (data) => {
            clientQuery.invalidateQueries(['rolDetail', rolId])
            clientQuery.invalidateQueries(['permissionsSelect'])
            toast.success(data)
            reset()
        }
    });

    const { mutate: removePermission } = useMutation({
        mutationFn: removePermissionToRol,
        onError: (error: Error) => {
            toast.error(error.message)
            reset()
        },
        onSuccess: (data) => {
            clientQuery.invalidateQueries(['rolDetail', rolId])
            clientQuery.invalidateQueries(['permissionsSelect'])
            toast.success(data)
        }
    });

    const handleForm = (formData: PermissionIdRol) => {
        const data = {
            rolId: rol.id,
            formData
        }
        addPermission(data);
    }

    const handleClick = (formData: PermissionIdRol) => {
        const data = {
            rolId: rol.id,
            formData
        }
        removePermission(data);
    }

    if (isLoading) return 'Loading...';

    if (rol) return (
        <>
            <div className='text-sm text-slate-400 flex gap-2 items-center'>
                <Link to={'/dashboard'} className="hover:text-slate-500">Home</Link>
                <ChevronRightIcon className="size-4" />
                <Link to={'/dashboard/role'} className="hover:text-slate-500">Roles</Link>
                <ChevronRightIcon className="size-4" />
                <span className="font-bold text-slate-500">{rol.name}</span>
            </div>
            <h2 className='text-4xl mt-2'>{rol.name}</h2>
            <div className='my-5'>
                <div className='text-sm uppercase font-bold'>Permisos</div>
                <div className='grid grid-cols-4 gap-3'>
                    {rol.permissions && rol.permissions.map((permission: Permission) => (
                        <div
                            key={permission.id}
                            className='border p-3 flex justify-between'
                        >
                            {permission.name}
                            <button
                                type="button"
                                className='size-6 text-red-500 hover:text-red-600 transition-colors'
                                onClick={() => handleClick({ permission_id: permission.id.toString() })}
                            >
                                <TrashIcon />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {hasPermissions && (
                <form
                    className='flex flex-col'
                    noValidate
                    onSubmit={handleSubmit(handleForm)}
                >
                    <div className='w-96'>
                        <label htmlFor="permission_id" className='text-sm uppercase font-bold'>Asigna permisos</label>
                        {errors.permission_id && (
                            <ErrorMessageComponent>{errors.permission_id.message}</ErrorMessageComponent>
                        )}
                    </div>
                    <div className='flex gap-4'>
                        <select
                            id='permission_id'
                            className='p-3 border border-gray-200'
                            {...register('permission_id', {
                                required: 'permission required'
                            })}
                        >
                            <option value={''}>{'-- Select option --'}</option>
                            {hasPermissions.map(permission => (
                                <option key={permission.id} value={permission.id}>{permission.name}</option>
                            ))}
                        </select>
                        <input
                            type="submit"
                            value='Asignar'
                            className="bg-slate-500 hover:bg-slate-600 px-10 text-white uppercase font-bold cursor-pointer transition-colors"
                        />
                    </div>
                </form>
            )}

        </>
    )
}
