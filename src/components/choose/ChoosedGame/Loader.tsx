import { GameController } from "@phosphor-icons/react"

export default function Loader() {
    return (
        <div className="text-red-500 flex flex-col items-center gap-2">
            <span className="loader">
                <GameController size={24} weight="bold" />
            </span>
            <span className="flex gap-2">
                Choosing
                <span className="flex gap-1">
                    <span className="dots">.</span>
                    <span className="dots">.</span>
                    <span className="dots">.</span>
                </span>
            </span>
        </div>
    )
}