"use client"

import { useParams } from 'next/navigation'
import React from 'react'
import { api } from '@/trpc/react'
import UserProfile from '@/components/user/user-details'
import Loading from '@/app/(pages)/loading'
import PostCard from '@/components/cards/post-card'
import { Separator } from '@/components/ui/separator'
import NotFound from '@/app/not-found'

const ProfilePage: React.FC = ({ }) => {

  const params = useParams()
  const profile = params.profile as string
  const username = decodeURIComponent(profile).substring(1)

  const { data, isLoading, isError } = api.user.profileInfo.useQuery({ username })

  if (isLoading) return <Loading />
  if (isError) return <NotFound />

  return (
    <div>
      {data?.userDetails ? (
        <>
          <UserProfile {...data.userDetails} />
          {data.posts?.length > 0 ? (
            data.posts.map((post, index) => (
              <div key={post.id}>
                <PostCard {...post} />
                {index !== data.posts.length - 1 && <Separator />}
              </div>
            ))
          ) : (
            <div className="h-[50vh] w-full justify-center items-center flex text-[#777777]">
              <p>No threads yet.</p>
            </div>
          )}
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );

}

export default ProfilePage