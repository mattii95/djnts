import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { CategoryFormData } from '../../../types/category';
import ErrorMessageComponent from '../../ErrorMessageComponent';

type CategoryFormProps = {
    register: UseFormRegister<CategoryFormData>
    errors: FieldErrors<CategoryFormData>
}

export default function CategoryForm({ register, errors }: CategoryFormProps) {
    return (
        <>
            <div className='space-y-3 w-full'>
                <label htmlFor="name" className='text-sm uppercase font-bold'>Name</label>
                <input
                    type="text"
                    id='name'
                    className='w-full p-3 border border-gray-200'
                    placeholder="Category's name"
                    {...register('name', {
                        required: 'Name required'
                    })}
                />
                {errors.name && (
                    <ErrorMessageComponent>{errors.name.message}</ErrorMessageComponent>
                )}
            </div>
            <div className='space-y-3 w-full'>
                <label htmlFor="slug" className='text-sm uppercase font-bold'>Slug</label>
                <input
                    type="text"
                    id='slug'
                    className='w-full p-3 border border-gray-200'
                    placeholder="Category's slug"
                    {...register('slug', {
                        required: 'Slug required'
                    })}
                />
                {errors.slug && (
                    <ErrorMessageComponent>{errors.slug.message}</ErrorMessageComponent>
                )}
            </div>
        </>
    )
}
