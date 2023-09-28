"use client"

import AddGameModal from "@/components/choose/AddGameModal"
import ChoosedGame from "@/components/choose/ChoosedGame/ChoosedGame"
import Loader from "@/components/choose/ChoosedGame/Loader"
import UserGameList from "@/components/choose/UserGameList"
import { Game } from "@/lib/types"
import { useEffect, useState } from "react"

export default function Page() {
    const [games, setGames] = useState<Game[]>([])

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [choosedGameIndex, setChoosedGameIndex] = useState<Game | null>(null)
    const [choosing, setChoosing] = useState(false);

    function handleModalState(state: boolean) {
        if (modalIsOpen && !state) {
            setModalIsOpen(false)
        } else if (!modalIsOpen && state) {
            setModalIsOpen(true)
        }
    }

    function chooseRandomGame() {
        setChoosing(true);
        const randomIndex = Math.floor(Math.random() * games.length)
        const game = games[randomIndex]
        setChoosedGameIndex(game)
        setTimeout(() => setChoosing(false), 1500)
    }

    function addGame(game: Game) {
        const gamesTemp = [...games, game]
        window.localStorage.setItem("games", JSON.stringify(gamesTemp))
        setGames(gamesTemp)
    }

    useEffect(() => {
        const storedData = window.localStorage.getItem("games")
        if (storedData) {
            const parsedData = JSON.parse(storedData)
            setGames(parsedData)
        }
    }, [])

    return (
        <div className="flex flex-col w-full">
            <div className="mb-10">
                <div className="font-title text-[1.5rem] mb-4 text-white">Your games</div>

                <div className="flex gap-6">
                    <button
                        className="px-8 text-[1.5rem] flex flex-col items-center justify-center transition-all text-white hover:outline hover:outline-4 hover:outline-white bg-gray"
                        onClick={() => handleModalState(true)}
                    >
                        ADD
                        <span>+</span>
                    </button>
                    {games && (
                        <UserGameList games={games} />
                    )}
                </div>
            </div>

            {modalIsOpen && (
                <AddGameModal
                    closeCallback={handleModalState}
                    addGame={addGame}
                />
            )}

            <div className="flex flex-col items-center">
                {choosedGameIndex && (
                    <div className="mb-8">
                        {choosing ? (
                            <Loader />
                        ) : (
                            <ChoosedGame choosedGame={choosedGameIndex} />
                        )}
                    </div>
                )}

                <button
                    onClick={chooseRandomGame}
                    className="bg-red-500 text-white text[1.5rem] py-4 px-4 rounded-sm w-fit outline outline-white outline-0 transition-all hover:outline-4 "
                >
                    Choose
                </button>
            </div>

        </div>
    )
}