"use client"

import { filterGames } from "@/Utils/Filter"
import AddGameModal from "@/components/choose/AddGameModal"
import ChooseHeader from "@/components/choose/ChooseHeader"
import ChoosedGame from "@/components/choose/ChoosedGame/ChoosedGame"
import Loader from "@/components/choose/ChoosedGame/Loader"
import FilterContainer from "@/components/choose/Filter/FilterContainer"
import { GamesCollectionContext } from "@/components/choose/GamesCollectionContext"
import UserGameList from "@/components/choose/UserGameList"
import { Filters, Game } from "@/lib/types"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export default function Page() {
    const [games, setGames] = useState<Game[]>([])

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [choosedGameIndex, setChoosedGameIndex] = useState<Game | null | undefined>(null)
    const [choosing, setChoosing] = useState(false);

    const [filtersSelected, setSelectedFilters] = useState<Filters | null>(null);


    // Modal 
    function handleModalState(state: boolean) {
        if (modalIsOpen && !state) {
            setModalIsOpen(false)
        } else if (!modalIsOpen && state) {
            setModalIsOpen(true)
        }
    }

    // Choose 
    function getFilters(selectedFilters: Filters) {
        setSelectedFilters(selectedFilters)
    }

    function chooseRandomGame() {
        setChoosing(true);
        const filteredGames = filterGames(games, filtersSelected)
        setTimeout(() => setChoosing(false), 1500)
        if (filterGames.length < 1) {
            setChoosedGameIndex(undefined)
            return
        }


        const randomIndex = Math.floor(Math.random() * filteredGames.length)
        const game = filteredGames[randomIndex]
        setChoosedGameIndex(game)
    }

    // Game List 
    function updateGames(games: Game[]) {
        window.localStorage.setItem("games", JSON.stringify(games))
        setGames(games)
    }

    function removeGame(gameIndex: number) {
        const filteredGames = games.filter((_, index) => index != gameIndex)
        updateGames(filteredGames)
    }

    // Retrieve data from local storage 
    useEffect(() => {
        const storedData = window.localStorage.getItem("games")

        if (storedData) {
            const parsedData = JSON.parse(storedData)
            setGames(parsedData)
        }
    }, [])

    return (
        <div className="flex flex-col w-full pb-4">
            <GamesCollectionContext.Provider value={games}>
                <ChooseHeader removeGame={removeGame} openModal={handleModalState} />


                {/* {createPortal(
                    <>
                        {modalIsOpen && (
                            <AddGameModal
                                closeCallback={handleModalState}
                                addGame={(game: Game) => updateGames([...games, game])}
                            />
                        )}
                    </>,
                    document.body
                )} */}

                <FilterContainer sendFilters={getFilters} />

                <div className="flex flex-col items-center">
                    {(choosedGameIndex !== null) && (
                        <div className="mb-8">
                            {choosing ? (
                                <Loader />
                            ) : (
                                <>
                                    {choosedGameIndex != undefined ? (
                                        <ChoosedGame choosedGame={choosedGameIndex} />
                                    ) : (
                                        <p className="text-[1.75rem] text-white">Your list doesn&apos;t have a game with these filters :(</p>
                                    )}
                                </>
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
            </GamesCollectionContext.Provider>
        </div>
    )
}