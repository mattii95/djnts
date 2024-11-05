
import { Fragment, useEffect, useState } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deletePost } from '../../../services/PostService';
import { toast } from 'react-toastify';
import { addRolToUser, getUserById, removeRolToUser } from '../../../services/UserService';
import { getRoles } from '../../../services/RolService';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import ErrorMessageComponent from '../../ErrorMessageComponent';

export default function UserRolModalComponent() {
    const navigate = useNavigate()
    const location = useLocation()
    const [hasRoles, setHasRoles] = useState([])
    const queryParams = new URLSearchParams(location.search)
    const userId = queryParams.get('rolUser')
    const show = userId ? true : false

    const { data, isLoading } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => getUserById(userId),
        enabled: !!userId,
        retry: false
    });

    const { data: roles, isLoading: isLoadingRoles } = useQuery({
        queryKey: ['rolesSelect', userId],
        queryFn: getRoles,
        enabled: !!data
    });

    console.log(data);
    

    useEffect(() => {
        if (data && roles) {
            const filteredRoles = roles.filter(rol => !data.roles.some(user => user.name === rol.name))
            setHasRoles(filteredRoles);
        }
    }, [data, isLoading, roles, isLoadingRoles])

    const clientQuery = useQueryClient()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: { 'role_id': '' } });

    const { mutate: addRol } = useMutation({
        mutationFn: addRolToUser,
        onError: (error) => {
            toast.error(error)
            reset()
        },
        onSuccess: (data) => {
            clientQuery.invalidateQueries(['user', userId])
            clientQuery.invalidateQueries(['rolesSelect'])
            toast.success(data)
            reset()
        }
    });

    const { mutate: removeRol } = useMutation({
        mutationFn: removeRolToUser,
        onError: (error) => {
            toast.error(error)
            reset()
        },
        onSuccess: (data) => {
            clientQuery.invalidateQueries(['user', userId])
            clientQuery.invalidateQueries(['rolesSelect'])
            toast.success(data)
        }
    });

    const handleForm = (formData) => {
        const data = { userId, formData }
        addRol(data);
    }

    const handleClick = (rolId) => {
        const formData = { role_id: rolId }
        const data = { userId, formData }
        removeRol(data);
    }

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                {isLoading ? (
                                    <div>cargando</div>
                                ) : data
                                    ? (
                                        <>
                                            <DialogTitle
                                                as="h3"
                                                className="font-medium text-2xl text-slate-600 my-5"
                                            >
                                                Roles de: <span className='font-black uppercase'>{data.name}</span>
                                            </DialogTitle>
                                            <div className='flex flex-col w-full gap-5'>
                                                {
                                                    data.roles.map(rol => (
                                                        <div
                                                            key={rol.id}
                                                            className='border p-4 flex justify-between'
                                                        >
                                                            {rol.name}
                                                            <button
                                                                type="button"
                                                                className='size-6 text-red-500 hover:text-red-600 transition-colors'
                                                                onClick={() => handleClick(rol.id)}
                                                            >
                                                                <TrashIcon />
                                                            </button>
                                                        </div>
                                                    ))
                                                }
                                                <hr />
                                                <h3 className='text-slate-600 uppercase text-md font-semibold'>Agrega nuevos roles</h3>
                                                <form
                                                    noValidate
                                                    onSubmit={handleSubmit(handleForm)}
                                                >
                                                    <div className='flex gap-4'>
                                                        <select
                                                            id='role_id'
                                                            className='p-3 border w-full border-gray-200'
                                                            {...register('role_id', {
                                                                required: 'Role required'
                                                            })}
                                                        >
                                                            <option value={''}>{'-- Select option --'}</option>
                                                            {hasRoles.map(rol => (
                                                                <option key={rol.id} value={rol.id}>{rol.name}</option>
                                                            ))}
                                                        </select>
                                                        <input
                                                            type="submit"
                                                            value='Asignar'
                                                            className="bg-slate-500 hover:bg-slate-600 px-10 text-white uppercase font-bold cursor-pointer transition-colors"
                                                        />
                                                    </div>
                                                    {errors.role_id && (
                                                        <ErrorMessageComponent>{errors.role_id.message}</ErrorMessageComponent>
                                                    )}
                                                </form>
                                            </div>
                                        </>
                                    )
                                    : <div>No hay datos</div>
                                }
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
