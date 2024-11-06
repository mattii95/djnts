import { useQuery } from 'react-query';
import { getPostsByPosted } from '../services/PostService';
import { formatDate } from '../utils/utils';
import { CalendarDateRangeIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function BlogView() {
    const { data, isLoading } = useQuery({
        queryKey: ['blog'],
        queryFn: getPostsByPosted
    });

    console.log(data);


    return (
        <>
            <div className="flex relative items-center text-center max-h-[550px]">
                <img
                    className="object-cover w-full max-h-[550px]"
                    src="../images/bg-blog.jpg"
                    alt="img"
                />
                <div className="w-full absolute text-center">
                    <h2 className="text-6xl font-bold text-white text-center">
                        <span className="font-black text-white">BLOG</span>
                    </h2>
                </div>
            </div>
            <main className='py-16 flex container m-auto'>
                <section className='w-full flex-1'>
                    {data && data.map(post => (
                        <div
                            key={post.id}
                            className='flex h-60 bg-white gap-4 mb-5 mx-5 shadow-md rounded overflow-hidden'
                        >
                            <img
                                className='w-1/3 object-cover'
                                src={`../uploads/images/${post.image}`}
                                alt=""
                            />
                            <div className='p-3 w-2/3'>
                                <h3 className='text-3xl line-clamp-1'>{post.title}</h3>
                                <hr className='my-2' />
                                <div className='flex gap-2 my-2'>
                                    {post.tags.map(tag => (
                                        <p
                                            key={tag.id}
                                            className='bg-indigo-200 px-2 rounded-full uppercase text-indigo-900 text-sm'
                                        >
                                            {tag.name}
                                        </p>
                                    ))}
                                </div>
                                <div className='flex w-full gap-4 items-center'>
                                    <div className='flex items-center gap-1'><UserCircleIcon className='size-5 text-indigo-600' /> {post.user.name}</div>
                                    <div className='flex items-center gap-1'><CalendarDateRangeIcon className='size-5 text-indigo-600' /> {formatDate(post.created_at)}</div>
                                </div>
                                <p className='line-clamp-4 mt-2'>{post.description}</p>
                                <div></div>
                            </div>
                        </div>
                    ))}
                </section>
                {/* <aside className='w-72 bg-white p-3 shadow-md rounded'>
                    filtros
                </aside> */}
            </main>
        </>
    )
}
