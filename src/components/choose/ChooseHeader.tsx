import { Game } from "@/lib/types";
import UserGameList from "./UserGameList";

interface Props {
    openModal: (state: boolean) => void
    removeGame: (index: number) => void
}

export default function ChooseHeader({ openModal, removeGame }: Props) {
    return (
        <div className="mb-10">
            <div className="font-title text-[1.5rem] mb-4 text-white">Your games</div>

            <div className="flex gap-2 items-center h-32">
                <button
                    className="px-8 h-full text-[1.5rem] flex flex-col items-center justify-center transition-all text-white hover:outline hover:outline-4 hover:outline-white bg-gray"
                    onClick={() => openModal(true)}
                >
                    ADD
                    <span>+</span>
                </button>

                <UserGameList removeGame={removeGame} />
            </div>
        </div>
    )
}