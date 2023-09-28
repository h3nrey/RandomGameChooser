import Image from 'next/image'
import Link from 'next/link'

export default function Home() {

  return (
    <main className='flex-1 flex justify-center items-center'>
      <div className='flex gap-10'>
        <Link
          href="/new"
          className='px-8 py-10 text-[1.5rem] bg-gray text-white hover:outline hover:outline-6 hover:outline-white'
        >Find a new game
        </Link>
        <Link
          href="/choose"
          className='px-8 py-10 text-[1.5rem] bg-gray text-white hover:outline hover:outline-6 hover:outline-white'
        >
          Choose random game
        </Link>
      </div>
    </main>
  )
}
