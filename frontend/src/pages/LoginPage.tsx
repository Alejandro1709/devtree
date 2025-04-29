import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage'
import type { LoginForm } from '../types'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { login } from '../api/DevTreeAPI'

export default function LoginPage() {
  const navigate = useNavigate()

  const initialValues: LoginForm = {
    email: '',
    password: '',
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues })

  const { data, mutate } = useMutation({ mutationFn: login })

  const handleLogin = async (formData: LoginForm) => {
    try {
      mutate(formData)

      localStorage.setItem('token', data.token)

      navigate('/admin')

      toast.success('User logged in successfully')
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.message)
      }
    }
  }

  return (
    <>
      <h1 className="text-4xl text-white font-bold">Login</h1>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        noValidate
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('email', {
              required: 'Your email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
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
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Login"
        />
      </form>

      <nav className="mt-10">
        <Link
          to="/auth/register"
          className="text-center text-white text-lg block"
        >
          Don't have an account? Register
        </Link>
      </nav>
    </>
  )
}
