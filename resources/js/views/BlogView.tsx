import {  useQuery } from 'react-query';
import {  getPostsByPosted } from '../services/PostService';
import { formatDate } from '../utils/utils';

export default function BlogView() {
    const { data, isLoading } = useQuery({
        queryKey: ['blog'],
        queryFn: getPostsByPosted
    });

    console.log(data);


    return (
        <div className='container m-5 flex '>
            <section className='w-full'>
                {data && data.map(post => (
                    <div
                        key={post.id}
                        className='flex h-60 bg-white gap-4 mb-5 mx-5 shadow-md rounded'
                    >
                        <img
                            className='w-1/3 object-cover'
                            src={`../uploads/images/${post.image}`}
                            alt=""
                        />
                        <div className='p-3 w-2/3'>
                            <h3 className='text-3xl'>{post.title}</h3>
                            <hr />

                            <div className='flex gap-3'>
                                {post.tags.map(tag => (
                                    <p
                                        key={tag.id}
                                        className='text-xs uppercase my-2 bg-blue-500 px-2 py-1 rounded-xl text-white'
                                    >
                                        {tag.name}
                                    </p>
                                ))}
                            </div>
                            <div>
                            <p>{post.user.name}</p>
                            <p>{formatDate(post.created_at)}</p>
                            </div>
                            <p>{post.description}</p>
                            <div></div>
                        </div>
                    </div>
                ))}
            </section>
            <aside className='w-72'>
                filtros
            </aside>
        </div>
    )
}
