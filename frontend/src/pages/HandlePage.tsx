import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUserByHandle } from '../api/DevTreeAPI'
import { Ring2 } from 'ldrs/react'
import 'ldrs/react/Ring2.css'

export default function HandlePage() {
  const params = useParams()

  const handle = params.handle!

  const { data, error, isLoading } = useQuery({
    queryKey: ['handle', handle],
    queryFn: () => getUserByHandle(handle),
    retry: 1,
  })

  if (isLoading)
    return (
      <div className="mx-auto">
        <Ring2
          size="40"
          stroke="5"
          strokeLength="0.25"
          bgOpacity="0.1"
          speed="0.8"
          color="white"
        />
      </div>
    )

  if (error) return <Navigate to="/404" />

  console.log(data)

  return <div>HandlePage</div>
}
