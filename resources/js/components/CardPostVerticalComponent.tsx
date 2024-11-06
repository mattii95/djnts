
import { CalendarDateRangeIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Post } from '../types/post.type'
import { formatDate } from '../utils/utils';
import { useEffect, useState } from 'react';
import { Tag } from '../types/tag.type';

export default function CardPostVerticalComponent({ post }: { post: Post }) {

    const [tags, setTags] = useState<Tag[]>([])

    useEffect(() => {
        if (post.tags) {
            const topFiveTags = post.tags.slice(0, 5)
            setTags(topFiveTags)
        }
    }, [post.tags])


    return (
        <a
            href='#'
            className='bg-white min-h-96 shadow-md hover:scale-105 duration-300 transition-all'
        >
            <div className='min-h-56 overflow-hidden'>
                <img src={`./uploads/images/${post.image}`} className='object-cover bg-center' alt="Image" />
            </div>
            <div className='flex flex-col justify-between min-h-40'>
                <div className='p-2'>
                    <h3 className='line-clamp-1 font-bold'>{post.title}</h3>
                    <div className='flex gap-2 mt-1'>
                        {
                            tags.map(tag => (
                                <div className='bg-indigo-200 px-2 rounded-full text-indigo-900 text-sm'>#{tag.name}</div>
                            ))
                        }
                    </div>
                    <hr className='my-2' />
                    <p className='line-clamp-4'>
                        {post.description}
                    </p>
                </div>
                <div className='flex w-full justify-between items-center bg-neutral-100 p-2'>
                    <div className='flex items-center gap-1'><UserCircleIcon className='size-5 text-indigo-600' /> {post.user.name}</div>
                    <div className='flex items-center gap-1'><CalendarDateRangeIcon className='size-5 text-indigo-600' /> {formatDate(post.created_at)}</div>
                </div>
            </div>
        </a>
    )
}
