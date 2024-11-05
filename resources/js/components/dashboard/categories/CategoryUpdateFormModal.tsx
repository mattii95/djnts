
import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import CategoryForm from './CategoryForm';
import { useForm } from 'react-hook-form';
import { Category, CategoryFormData } from '../../../types/category';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { updateCategory } from '../../../services/CategoryService';
import { useNavigate, useLocation } from 'react-router-dom';

type CategoryUpdateFormModalProps = {
    category: Category
}
export default function CategoryUpdateFormModal({ category }: CategoryUpdateFormModalProps) {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const categoryId = queryParams.get('editCategory')!
    const show = categoryId ? true : false
    
    const initialValues: CategoryFormData = {
        name: category.name,
        slug: category.slug
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateCategory,
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('categories')
            toast.success(data)
            navigate(location.pathname, { replace: true })
        }
    })

    const handleForm = (formData: CategoryFormData) => {
        const parseId = parseInt(categoryId)
        const dataSend = {
            formData,
            categoryId: parseId
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
                                    Create Category
                                </DialogTitle>
                                <form
                                    className='flex flex-col gap-5'
                                    noValidate
                                    onSubmit={handleSubmit(handleForm)}
                                >
                                    <CategoryForm register={register} errors={errors} />
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
                                        // onClick={() => mutate(postId)}
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
