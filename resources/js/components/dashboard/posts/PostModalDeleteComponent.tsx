
import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { deletePost } from '../../../services/PostService';
import { toast } from 'react-toastify';

export default function PostModalDeleteComponent() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const postId = parseInt(queryParams.get('deletePost')!)
    const show = postId ? true : false

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deletePost,
        onError: (error) => {
            toast.error("The post doesn't exist")
            navigate(location.pathname, { replace: true })
        },
        onSuccess: (data) => {
            queryClient.refetchQueries(['posts'])
            toast.success('Successfully removed')
            navigate(location.pathname, { replace: true })
        }
    })
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
                                    ¿Estas seguro que deseas eliminar el Post?
                                </DialogTitle>
                                <div className='flex gap-5'>
                                    <input
                                        type="submit"
                                        value='Cancel'
                                        className="bg-gray-600 hover:bg-gray-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                                        onClick={() => navigate(location.pathname, { replace: true })}
                                    />
                                    <input
                                        type="submit"
                                        value='Delete'
                                        className="bg-red-600 hover:bg-red-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                                        onClick={() => mutate(postId)}
                                    />
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}