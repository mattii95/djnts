import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query';
import { PostFormData } from '../../../types/post.type';
import PostFormComponent from '../../../components/dashboard/posts/PostFormComponent';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { createPost } from '../../../services/PostService';

export default function CreatePostView() {
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

    const { register, handleSubmit, formState: { errors }, control, watch, setValue } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: createPost,
        onError: (error: Error) => {
            console.log(error.message);

        },
        onSuccess: (data) => {
            console.log(data);
            navigate('/dashboard/post')
        }
    });

    const handleForm = (formData: PostFormData) => {
        const formDataToSend = new FormData();

        formDataToSend.append('title', formData.title);
        formDataToSend.append('slug', formData.slug);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('posted', formData.posted);
        formDataToSend.append('category_id', formData.category_id.toString());
        formDataToSend.append('image', formData.image[0]);
        formData.tags.forEach(tag => {
            formDataToSend.append('tags[]', `${tag}`)
        })

        mutate(formDataToSend);
    };

    return (
        <>
            <div className='text-sm text-slate-400 flex gap-2 items-center'>
                <Link to={'/dashboard'} className="hover:text-slate-500">Home</Link>
                <ChevronRightIcon className="size-4" />
                <Link to={'/dashboard/post'} className="hover:text-slate-500">Post</Link>
                <ChevronRightIcon className="size-4" />
                <span className="font-bold text-slate-500">Create</span>
            </div>
            <h2 className='text-4xl mt-2'>New Post</h2>
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
