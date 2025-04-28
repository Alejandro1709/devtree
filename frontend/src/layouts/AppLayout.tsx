import { Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAuthUser } from '../api/DevTreeAPI'
import DevTree from '../components/DevTree'

export default function AppLayout() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: getAuthUser,
    retry: 2,
    refetchOnWindowFocus: false,
  })

  if (isLoading) return 'Loading...'

  if (isError) {
    return <Navigate to="/auth/login" />
  }

  if (data) return <DevTree data={data} />
}
