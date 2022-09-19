import Link from "next/link";

export default function Nav() {
  return (
    <div className="text-3xl text-center py-3 font-bold text-yellow-300             border-spacing-1 border-b border-yellow-300">
        <Link href='/'>
            <span className="cursor-pointer">
                Votey
            </span>
        </Link>
    </div>
  )
}
