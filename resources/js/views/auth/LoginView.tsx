import { useNavigate } from "react-router-dom";
import ErrorMessageComponent from "../../components/ErrorMessageComponent";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { login } from "../../services/AuthService";
import { UserLoginForm } from "../../types/auth.type";

export default function LoginView() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<UserLoginForm>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const { mutate } = useMutation({
        mutationFn: login,
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            localStorage.setItem('AUTH_TOKEN', data.token)
            navigate('/dashboard')
        }
    })

    const handleForm = (formData: UserLoginForm) => {
        mutate(formData)
    }
    return (
        <form
            onSubmit={handleSubmit(handleForm)}
            noValidate
        >
            <div className='mb-5 space-y-3 w-full'>
                <label htmlFor="email" className='text-sm uppercase font-bold'>Email</label>
                <input
                    type="email"
                    id='email'
                    className='w-full p-3 border border-gray-200'
                    placeholder='correo@correo.com'
                    {...register('email', {
                        required: 'email required'
                    })}
                />
                {errors.email && (
                    <ErrorMessageComponent>{errors.email.message}</ErrorMessageComponent>
                )}
            </div>
            <div className='mb-5 space-y-3 w-full'>
                <label htmlFor="password" className='text-sm uppercase font-bold'>Password</label>
                <input
                    type="password"
                    id='password'
                    className='w-full p-3 border border-gray-200'
                    placeholder='********'
                    {...register('password', {
                        required: 'password required'
                    })}
                />
                {errors.password && (
                    <ErrorMessageComponent>{errors.password.message}</ErrorMessageComponent>
                )}
            </div>
            <input
                type="submit"
                value='Login'
                className="bg-indigo-600 hover:bg-indigo-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
            />
        </form>
    )
}
