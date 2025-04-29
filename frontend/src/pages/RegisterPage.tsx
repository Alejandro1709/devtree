import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import type { RegisterForm } from '../types'
import ErrorMessage from '../components/ErrorMessage'
import { isAxiosError } from 'axios'
import { signup } from '../api/DevTreeAPI'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

export default function RegisterPage() {
  const location = useLocation()

  const navigate = useNavigate()

  const initialValues: RegisterForm = {
    name: '',
    handle: location?.state?.handle || '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  })

  const { data, mutate } = useMutation({ mutationFn: signup })

  const password = watch('password')

  const handleRegister = async (formData: RegisterForm) => {
    try {
      mutate(formData)

      console.log(data)

      toast.success('User created successfully')

      reset()

      navigate('/auth/login')
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message)
      }
    }
  }

  return (
    <>
      <h1 className="text-4xl text-white font-bold">Create Account</h1>

      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('name', {
              required: 'Your name is required',
            })}
          />

          {errors.name ? (
            <ErrorMessage>{errors.name.message}</ErrorMessage>
          ) : null}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('email', {
              required: 'Your email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address',
              },
            })}
          />

          {errors.email ? (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          ) : null}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Username (no spaces)"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('handle', {
              required: 'Your handle is required',
            })}
          />

          {errors.handle ? (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          ) : null}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password', {
              required: 'Your password is required',
              minLength: {
                value: 7,
                message: 'Password must be greater than 7 characters',
              },
            })}
          />

          {errors.password ? (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          ) : null}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Password Confirmation
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Password Confirmation"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password_confirmation', {
              required: 'Your password confirmation is required',
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
          />
          {errors.password_confirmation ? (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          ) : null}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Create Account"
        />
      </form>

      <nav className="mt-10">
        <Link to="/auth/login" className="text-center text-white text-lg block">
          Already have an account? login
        </Link>
      </nav>
    </>
  )
}
