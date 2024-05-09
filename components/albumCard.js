import Link from 'next/link'

export default function AlbumCard({ album }) {
  return (
    <Link href={`/albums/${album.slug}`}>
      <img className="albums__image" src={album?.albumFields.cover?.node?.mediaItemUrl} alt={album?.albumFields.cover?.node?.altText} />
    </Link>
  )
}
