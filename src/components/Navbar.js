import Link from 'next/link'

export const Navbar = () => {
  
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-center text-center md:text-left py-3 px-5 bg-indigo-600 text-white hover:text-white focus:text-white shadow-lg">
      <div className="container w-full mx-auto">
          <Link href={'/'}>
            <a className="text-2xl text-white  font-bold">
              MDR Next JS
            </a>
          </Link>
      </div>
    </nav>
  )
}
