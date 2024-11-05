import { useQuery } from "react-query"
import { Navigate, useParams } from "react-router-dom"
import { getPostById } from "../../../services/PostService"
import EditPostFormComponent from "../../../components/dashboard/posts/EditPostFormComponent"

export default function EditPostView() {
    const params = useParams()
    const postId = parseInt(params.postId!)

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editPost', postId],
        queryFn: () => getPostById(postId),
        retry: false
    })

    if(isLoading) return 'Loading...'
    if (isError) return <Navigate to={'/404'} />
    if (data) return <EditPostFormComponent post={data} />
}
