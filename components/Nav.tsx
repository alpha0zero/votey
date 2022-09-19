import Link from "next/link";

export default function Nav() {
  return (
    <nav className="w-3/4 mx-auto relative top-2 text-3xl text-center py-3  bg-yellow-300 rounded-lg shadow shadow-gray-700">
        <Link href='/'>
            <span className="cursor-pointer">
                Votey
            </span>
        </Link>
    </nav>
  )
}
