import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import DashboardLayout from "./layouts/DashboardLayout";
import HomeView from "./views/dashboard/home/HomeView";
import PostView from './views/dashboard/posts/PostView';
import CreatePostView from "./views/dashboard/posts/CreatePostView";
import EditPostView from "./views/dashboard/posts/EditPostView";
import CategoryView from './views/dashboard/categories/CategoryView';
import RolView from './views/dashboard/roles/RolView';
import RolDetails from "./views/dashboard/roles/RolDetails";
import TagView from "./views/dashboard/tags/TagView";
import AppLayout from "./layouts/AppLayout";
import IndexView from "./views/IndexView";
import BlogView from "./views/BlogView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />} >
                    <Route path="/" element={<IndexView />} index />
                    <Route path="/blog" element={<BlogView />} />
                </Route>
                <Route path="dashboard" element={<AuthLayout />} >
                    <Route path="auth/login" element={<LoginView />} />
                </Route>
                {<Route path="dashboard" element={<DashboardLayout />}>
                    <Route path="" element={<HomeView />} index />
                    <Route path="post" element={<PostView />} />
                    <Route path="post/create" element={<CreatePostView />} />
                    <Route path="post/:postId/edit" element={<EditPostView />} />
                    <Route path="category" element={<CategoryView />} />
                    <Route path="tag" element={<TagView />} />
                    <Route path="role" element={<RolView />} />
                    <Route path="role/:rolId/detail" element={<RolDetails />} />
                    {/*<Route path="permission" element={<PermissionView />} />
                    <Route path="user" element={<UserView />} /> */}
                </Route>}
            </Routes>
        </BrowserRouter>
    )
};