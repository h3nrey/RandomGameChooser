import Link from "next/link";

export default function Header() {
    return (
        <header>
            <Link href="/">
                <h1
                    className="text-red-500 font-title text-[2rem]"
                >
                    RANDOM GAME CHOOSER
                </h1>
            </Link>
        </header>
    )
}