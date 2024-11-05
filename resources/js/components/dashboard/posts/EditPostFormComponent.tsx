import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import PostFormComponent from './PostFormComponent';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { updatePost } from '../../../services/PostService';
import { Post, PostFormData } from '../../../types/post.type';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

type EditPostFormComponentProps = {
    post: Post
}

export default function EditPostFormComponent({ post }: EditPostFormComponentProps) {
    const navigate = useNavigate()
    const initialValues: PostFormData = {
        title: '',
        slug: '',
        description: '',
        content: '',
        posted: 'not',
        category_id: -1,
        image: '',
        tags: []
    };

    const { register, handleSubmit, formState: { errors }, reset, control, watch, setValue } = useForm({ defaultValues: initialValues })

    useEffect(() => {
        if (post) {
            reset({
                title: post.title,
                slug: post.slug,
                description: post.description,
                content: post.content,
                posted: post.posted,
                category_id: post.category_id,
                image: post.image,
                tags: post.tags
            })
            setValue('category_id', post.category_id);
        }
    }, [post, reset])

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updatePost,
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            queryClient.invalidateQueries({ queryKey: ['editPost', post.id] })
            navigate('/dashboard/post')
        }
    })

    const handleForm = (formData: PostFormData) => {
        const formDataToSend = new FormData();

        formDataToSend.append('title', formData.title);
        formDataToSend.append('slug', formData.slug);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('posted', formData.posted);
        formDataToSend.append('category_id', formData.category_id.toString());
        formData.tags.forEach(tag => {
            formDataToSend.append('tags[]', `${tag.id}`)
        })
        if (formData.image[0]) {
            formDataToSend.append('image', formData.image[0]);
        }
        formDataToSend.append('_method', 'put')

        const data = { formData: formDataToSend, postId: post.id }
        mutate(data)
    }

    return (
        <>
            <div className='text-sm text-slate-400 flex gap-2 items-center'>
                <Link to={'/dashboard'} className="hover:text-slate-500">Home</Link>
                <ChevronRightIcon className="size-4" />
                <Link to={'/dashboard/post'} className="hover:text-slate-500">Post</Link>
                <ChevronRightIcon className="size-4" />
                <span className="font-bold text-slate-500">Edit</span>
            </div>
            <h2 className='text-4xl mt-2'>Edit Post</h2>
            <div className='text-right my-5'>
                <Link
                    to="/dashboard/post"
                    className="bg-indigo-600 hover:bg-indigo-700 px-8 py-2 rounded text-white text-md font-bold cursor-pointer transition-colors"
                >
                    Back
                </Link>
            </div>
            <form
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <PostFormComponent
                    register={register}
                    errors={errors}
                    control={control}
                    watch={watch}
                    setValue={setValue}
                />
                <input
                    type="submit"
                    value='Save'
                    className="bg-indigo-600 hover:bg-indigo-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
                />
            </form>
        </>
    )
}
