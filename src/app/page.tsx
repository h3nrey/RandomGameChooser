import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div className='flex gap-2'>
        <Link href="/new">Find a new game</Link>
        <Link href="/choose">Choose random game</Link>
      </div>
    </main>
  )
}
