import React from 'react'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../components/ErrorMessage'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import type { ProfileForm, User } from '../types'
import { updateUser, uploadImage } from '../api/DevTreeAPI'
import { toast } from 'sonner'

export default function ProfilePage() {
  const queryClient = useQueryClient()

  const data: User = queryClient.getQueryData(['user'])!

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      handle: data.handle,
      description: data.description,
    },
  })

  const updateProfileMutation = useMutation({
    mutationKey: ['updateUser'],
    mutationFn: updateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      toast.success(data?.message)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (data) => {
      console.log(data)
      queryClient.setQueryData(['user'], (prevData: User) => {
        return { ...prevData, image: data.image }
      })
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImageMutation.mutate(e.target.files[0])
    }
  }

  const handleUserProfileForm = (formData: ProfileForm) => {
    const user: User = queryClient.getQueryData(['user'])!
    user.description = formData.description
    user.handle = formData.handle

    updateProfileMutation.mutate(user)
  }

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl text-slate-800 text-center">
        Edit Profile
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle or username"
          {...register('handle', {
            required: 'Username is required',
          })}
        />

        {errors.handle ? (
          <ErrorMessage>{errors.handle.message}</ErrorMessage>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Description:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Your Description"
          {...register('description', {
            required: 'Description is required',
          })}
        />

        {errors.description ? (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Image:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Save Changes"
      />
    </form>
  )
}
