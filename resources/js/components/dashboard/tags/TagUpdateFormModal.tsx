
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { toast } from 'react-toastify';
import ErrorMessageComponent from '../../ErrorMessageComponent';
import { Tag, TagFormData } from '../../../types/tag.type';
import { updateTag } from '../../../services/TagService';

type TagUpdateFormModalProps = {
    tag: Tag
    show: boolean
}
export default function TagUpdateFormModal({ tag, show }: TagUpdateFormModalProps) {
    const navigate = useNavigate()
    const initialValues: TagFormData = {
        name: tag.name
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateTag,
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('tags')
            toast.success(data)
            navigate(location.pathname, { replace: true })
        }
    })

    const handleForm = (formData: TagFormData) => {
        const dataSend = {
            formData,
            tagId: tag.id
        }

        mutate(dataSend)
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
                                <DialogTitle
                                    as="h3"
                                    className="font-black text-4xl text-slate-600 my-5"
                                >
                                    Update Tag
                                </DialogTitle>
                                <form
                                    className='flex flex-col gap-5'
                                    noValidate
                                    onSubmit={handleSubmit(handleForm)}
                                >
                                    <div className='space-y-3 w-full'>
                                        <label htmlFor="name" className='text-sm uppercase font-bold'>Name</label>
                                        <input
                                            type="text"
                                            id='name'
                                            className='w-full p-3 border border-gray-200'
                                            placeholder="Tag's name"
                                            {...register('name', {
                                                required: 'Name required'
                                            })}
                                        />
                                        {errors.name && (
                                            <ErrorMessageComponent>{errors.name.message}</ErrorMessageComponent>
                                        )}
                                    </div>
                                    <div className='flex gap-5'>
                                        <input
                                            type="button"
                                            value='Cancel'
                                            className="bg-gray-600 hover:bg-gray-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                                            onClick={() => {
                                                reset()
                                                navigate(location.pathname, { replace: true })
                                            }}
                                        />
                                        <input
                                            type="submit"
                                            value='Save'
                                            className="bg-green-600 hover:bg-green-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                                        />
                                    </div>
                                </form>

                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
