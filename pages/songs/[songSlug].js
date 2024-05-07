'use client'

import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { useEffect } from 'react'

const GET_SONG_DETAILS = gql`
  query GetSongDetails($songSlug: ID!) {
    song(id: $songSlug, idType: SLUG) {
      databaseId
      slug
      songFields {
        length
        lyrics
        songTitle
      }
    }
  }
`

export default function Song() {
  const { query = {} } = useRouter()
  const { songSlug } = query
  const { loading, error, data } = useQuery(GET_SONG_DETAILS, {
    variables: {
      songSlug: songSlug,
    },
  })

  if (loading) return <p>Loading...</p>
  if (loading) return <p>Error! {error.message}</p>

  const songData = data?.song

  const songLengthMinutes = Math.floor(Number(songData?.songFields?.length) / 1000 / 60)
  const songLengthSeconds = Math.floor(Number(songData?.songFields?.length) / 1000) - songLengthMinutes * 60
  const songLyricsStrings = songData.songFields?.lyrics.split('\r')

  return (
    <Layout>
      <Link href="/albums/">
        <p className="return-link">&#x2190; Return to Albums Page</p>
      </Link>
      <div className="song">
        <h1 className="song__title">{songData.songFields?.songTitle}</h1>
        <div className="song__length">
          <p>Length of the song:</p>
          <span className="song__length-strong">
            {songLengthMinutes} {songLengthMinutes > 1 ? 'minutes' : 'minute'} {songLengthSeconds > 0 && `and ${songLengthSeconds} seconds`}
          </span>
        </div>
        <h3 className="song__subtitle">Lyrics:</h3>
        <p className="song__lyrics">
          {songLyricsStrings.map((str, i) => (
            <p className="song__lyrics-string" key={i}>
              {str}
            </p>
          ))}
        </p>
      </div>
    </Layout>
  )
}
