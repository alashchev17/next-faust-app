import { gql, useQuery } from '@apollo/client'
import AlbumCard from '../components/albumCard'
import Layout from '../components/Layout'

const GET_ALBUMS = gql`
  query getAlbums {
    albums {
      nodes {
        albumFields {
          albumTitle
          releaseDate
          cover {
            node {
              databaseId
              mediaItemUrl
            }
          }
        }
        databaseId
        slug
      }
    }
  }
`

export default function Albums() {
  const { loading, error, data } = useQuery(GET_ALBUMS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error! {error.message}</p>

  return (
    <Layout>
      <h1 className="title">Albums</h1>
      <ul className="albums">
        {data.albums.nodes.map((album) => (
          <li className="albums__item" key={album.databaseId}>
            <AlbumCard album={album} />
          </li>
        ))}
      </ul>
    </Layout>
  )
}
