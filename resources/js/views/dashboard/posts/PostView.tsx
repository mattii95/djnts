import { useQuery } from 'react-query'
import { Link } from 'react-router-dom';
import { Post } from '../../../types/post.type';
import DTPost from '../../../components/DTPost';
import PostModalDeleteComponent from '../../../components/dashboard/posts/PostModalDeleteComponent';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { getPosts } from '../../../services/PostService';

export default function PostView() {

    const { data, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts
    });

    if (isLoading) return 'Loading...';

    if (data) return (
        <>
            <div className='text-sm text-slate-400 flex gap-2 items-center'>
                <Link to={'/dashboard'} className="hover:text-slate-500">Home</Link>
                <ChevronRightIcon className="size-4" />
                <span className="font-bold text-slate-500">Post</span>
            </div>
            <h2 className='text-4xl mt-2'>Posts</h2>
            <div className='text-right my-5'>
                <Link
                    to="/dashboard/post/create"
                    className="bg-indigo-600 hover:bg-indigo-700 px-8 py-2 rounded text-white text-md font-bold cursor-pointer transition-colors"
                >
                    New Post
                </Link>
            </div>
            <div className='overflow-y-auto'>
                <DTPost data={data as Post[]} />
            </div>
            <PostModalDeleteComponent />
        </>
    )
}
