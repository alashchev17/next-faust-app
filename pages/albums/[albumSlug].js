import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'

const GET_ALBUM_DETAILS = gql`
  query GetAlbumDetails($albumSlug: ID!) {
    album(id: $albumSlug, idType: SLUG) {
      albumFields {
        albumTitle
        cover {
          node {
            altText
            mediaItemUrl
          }
        }
        releaseDate
        trackList {
          nodes {
            ... on Song {
              id
              slug
              songFields {
                length
                songTitle
              }
            }
          }
        }
      }
    }
  }
`

export default function Album() {
  const { query = {} } = useRouter()
  const { albumSlug } = query

  const { loading, error, data } = useQuery(GET_ALBUM_DETAILS, {
    variables: {
      albumSlug,
    },
  })

  const albumData = data?.album?.albumFields

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error! {error.message}</p>

  return (
    <Layout>
      <Link href="/albums">
        <p className="return-link">&#x2190; View All Albums</p>
      </Link>
      <div className="album">
        <h1 className="album__title">{albumData?.albumTitle}</h1>
        <p className="album__release">
          Released on {new Date(albumData?.releaseDate).toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <img className="album__image" src={albumData?.cover.node?.mediaItemUrl} alt={albumData?.cover.node?.altText} />
        <h3 className="album__subtitle">Track List:</h3>
        <ol className="album__track-list">
          {albumData?.trackList.nodes.map((song) => (
            <li className="album__track" key={song.slug}>
              <Link href={`/songs/${song.slug}`}>{song.songFields?.songTitle}</Link>
            </li>
          ))}
        </ol>
      </div>
    </Layout>
  )
}
