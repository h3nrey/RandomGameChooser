"use client"

import AddGameModal from "@/components/choose/AddGameModal"
import ChooseHeader from "@/components/choose/ChooseHeader"
import ChoosedGame from "@/components/choose/ChoosedGame/ChoosedGame"
import Loader from "@/components/choose/ChoosedGame/Loader"
import { GamesCollectionContext } from "@/components/choose/GamesCollectionContext"
import UserGameList from "@/components/choose/UserGameList"
import { Game } from "@/lib/types"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

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

    function removeGame(gameIndex: number) {
        const gamesTemp = games.filter((_, index) => index != gameIndex)
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
            <GamesCollectionContext.Provider value={games}>
                <ChooseHeader removeGame={removeGame} openModal={handleModalState} />
            </GamesCollectionContext.Provider>

            {/* {modalIsOpen && (
                <AddGameModal
                    closeCallback={handleModalState}
                    addGame={addGame}
                />
            )} */}

            {createPortal(
                <>
                    {modalIsOpen && (
                        <AddGameModal
                            closeCallback={handleModalState}
                            addGame={addGame}
                        />
                    )}
                </>,
                document.body
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
                    className="bg-red-500 text-white text[1.75rem] py-4 px-4 rounded-sm w-fit outline outline-white outline-0 transition-all hover:outline-4 "
                >
                    Choose
                </button>
            </div>

        </div>
    )
}