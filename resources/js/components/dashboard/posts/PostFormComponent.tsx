import { useEffect } from 'react';
import { useQuery } from "react-query";
import { Control, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch, Controller } from 'react-hook-form';
import { generateSlug } from '../../../utils/utils';
import { getCategoriesAll } from "../../../services/CategoryService";
import { getTags } from "../../../services/TagService";
import { PostFormData } from "../../../types/post.type";
import ErrorMessageComponent from "../../ErrorMessageComponent"
import TextEditorComponent from './TextEditorComponent';
import Select from 'react-select'


type PostFormComponentProps = {
    register: UseFormRegister<PostFormData>
    errors: FieldErrors<PostFormData>
    control: Control<PostFormData, any>
    watch: UseFormWatch<PostFormData>
    setValue: UseFormSetValue<PostFormData>
}

export default function PostFormComponent({ register, errors, control, watch, setValue }: PostFormComponentProps) {
    const title = watch('title');

    useEffect(() => {
        const newSlug = generateSlug(title)
        setValue('slug', newSlug);
    }, [title, setValue])


    const { data: categories } = useQuery({
        queryKey: ['categoriesSelect'],
        queryFn: getCategoriesAll
    });

    const { data: tags } = useQuery({
        queryKey: ['tagsSelect'],
        queryFn: getTags
    });

    return (
        <>
            <div className='flex gap-5 w-auto'>
                <div className='mb-5 space-y-3 w-full'>
                    <label htmlFor="title" className='text-sm uppercase font-bold'>Title</label>
                    <input
                        type="text"
                        id='title'
                        className='w-full p-3 border border-gray-200'
                        placeholder='Post title'
                        {...register('title', {
                            required: 'Title required'
                        })}
                    />
                    {errors.title && (
                        <ErrorMessageComponent>{errors.title.message}</ErrorMessageComponent>
                    )}
                </div>
                <div className='mb-5 space-y-3 w-full'>
                    <label htmlFor="slug" className='text-sm uppercase font-bold'>Slug</label>
                    <input
                        type="text"
                        id='slug'
                        className='w-full p-3 border border-gray-200'
                        placeholder='Post slug'
                        {...register('slug', {
                            required: 'Slug required'
                        })}
                    />
                    {errors.slug && (
                        <ErrorMessageComponent>{errors.slug.message}</ErrorMessageComponent>
                    )}
                </div>
            </div>
            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Description
                </label>
                <textarea
                    id="description"
                    className="w-full p-3 border border-gray-200"
                    placeholder="Post description"
                    {...register("description", {
                        required: "Description required"
                    })}
                />

                {errors.description && (
                    <ErrorMessageComponent>{errors.description.message}</ErrorMessageComponent>
                )}
            </div>
            <div className="mb-5 space-y-3">
                <label htmlFor="content" className="text-sm uppercase font-bold">
                    Content
                </label>
                {/* <textarea
                    id="content"
                    className="w-full p-3 border border-gray-200"
                    placeholder="Post content"
                    {...register("content", {
                        required: "Content required"
                    })}
                /> */}
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => {
                        return (
                            <TextEditorComponent value={value} onChange={onChange} />
                        )
                    }}
                    {...register("content", {
                        required: "Content required"
                    })}
                />

                {errors.content && (
                    <ErrorMessageComponent>{errors.content.message}</ErrorMessageComponent>
                )}
            </div>
            <div className='flex gap-5 w-auto'>
                <div className='mb-5 space-y-3 w-full'>
                    <label htmlFor="posted" className='text-sm uppercase font-bold'>Posted</label>
                    <select
                        id='posted'
                        className='w-full p-3 border border-gray-200'
                        {...register('posted', {
                            required: 'Posted required'
                        })}
                    >
                        <option value={''}>{'-- Select option --'}</option>
                        <option value={'not'}>{'No'}</option>
                        <option value={'yes'}>{'Yes'}</option>
                    </select>
                    {errors.posted && (
                        <ErrorMessageComponent>{errors.posted.message}</ErrorMessageComponent>
                    )}
                </div>
                <div className='mb-5 space-y-3 w-full'>
                    <label htmlFor="category_id" className='text-sm uppercase font-bold'>Categories</label>
                    <select
                        id='category_id'
                        className='w-full p-3 border border-gray-200'
                        {...register('category_id', {
                            required: 'Category required'
                        })}
                    >
                        <option value={''}>{'-- Select option --'}</option>
                        {categories && categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    {errors.category_id && (
                        <ErrorMessageComponent>{errors.category_id.message}</ErrorMessageComponent>
                    )}
                </div>
                <div className='mb-5 space-y-3 w-full'>
                    <label htmlFor="tag_id" className='text-sm uppercase font-bold'>Tags</label>
                    {tags && (
                        <Controller
                            name="tags"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    name="tags"
                                    isMulti
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    options={tags.map(tag => ({ value: tag.id, label: tag.name }))}
                                    value={value?.map(tag => ({ value: tag.id, label: tag.name }))}
                                    onChange={(selected) => {
                                        // Convierte el formato de opciones seleccionadas al formato esperado por el controlador
                                        onChange(selected ? selected.map(item => ({ id: item.value, name: item.label })) : []);
                                    }}
                                />
                            )}
                        />
                    )}
                    {/* <select
                        id='tag_id'
                        multiple
                        className='w-full p-3 border border-gray-200'
                        {...register('tags')}
                    >
                        <option value={''}>{'-- Select option --'}</option>
                        {tags && tags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select> */}
                    {errors.tags && (
                        <ErrorMessageComponent>{errors.tags.message}</ErrorMessageComponent>
                    )}
                </div>
            </div>
            <div className="mb-5 space-y-3">
                <label htmlFor="image" className="text-sm uppercase font-bold">
                    Image
                </label>
                <input
                    id="image"
                    className="w-full p-3 border border-gray-200"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    {...register("image")}
                />

                {errors.image && (
                    <ErrorMessageComponent>{errors.image.message}</ErrorMessageComponent>
                )}
                <input type="hidden" name="image_hidden" id="image_hidden" />
            </div>
        </>
    )
}
