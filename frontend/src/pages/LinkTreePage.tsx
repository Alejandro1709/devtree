import { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { social } from '../data/social'
import DevTreeInput from '../components/DevTreeInput'
import { isValidUrl } from '../utils'
import { toast } from 'sonner'
import { updateUser } from '../api/DevTreeAPI'
import { SocialNetwork, User } from '../types'

export default function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social)

  const queryClient = useQueryClient()
  const user: User = queryClient.getQueryData(['user'])!

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Updated successfully')
    },
  })

  useEffect(() => {
    const updatedData = devTreeLinks.map((item) => {
      const userlink = JSON.parse(user.links).find(
        (link: SocialNetwork) => link.name === item.name
      )
      if (userlink) {
        return { ...item, url: userlink.url, enabled: userlink.enabled }
      }
      return item
    })
    setDevTreeLinks(updatedData)
  }, [])

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    )
    setDevTreeLinks(updatedLinks)
  }

  const links: SocialNetwork[] = JSON.parse(user.links)

  const handleToggleLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map((item) => {
      if (item.name === socialNetwork) {
        if (isValidUrl(item.url)) {
          return { ...item, enabled: !item.enabled }
        } else {
          toast.error('URL is not valid.')
          return item
        }
      }
      return item
    })

    let updatedItems: SocialNetwork[] = []
    const selectedSocialNetwork = updatedLinks.find(
      (link) => link.name === socialNetwork
    )

    if (selectedSocialNetwork?.enabled) {
      // Enabling the link
      const id = links.filter((link) => link.enabled).length + 1

      if (links.some((link) => link.name === socialNetwork)) {
        updatedItems = links.map((link) =>
          link.name === socialNetwork ? { ...link, enabled: true, id } : link
        )
      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id,
        }
        updatedItems = [...links, newItem]
      }
    } else {
      // Disabling the link
      const indexToDisable = links.findIndex(
        (link) => link.name === socialNetwork
      )

      updatedItems = links.map((link) => {
        if (link.name === socialNetwork) {
          return { ...link, id: 0, enabled: false }
        } else if (link.id > links[indexToDisable].id) {
          return { ...link, id: link.id - 1 } // Adjust indices
        } else {
          return link
        }
      })
    }

    setDevTreeLinks(updatedLinks)

    queryClient.setQueryData(['user'], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems),
      }
    })
  }

  return (
    <>
      <div className="space-y-5">
        {devTreeLinks.map((item) => (
          <DevTreeInput
            key={item.name}
            item={item}
            onUrlChange={handleUrlChange}
            onLinkChange={handleToggleLink}
          />
        ))}
        <button
          className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
          onClick={() => mutate(queryClient.getQueryData(['user'])!)}
        >
          Guardar Cambios
        </button>
      </div>
    </>
  )
}
