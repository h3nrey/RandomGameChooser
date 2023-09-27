"use client"

import AddGameModal from "@/components/choose/AddGameModal"
import UserGameList from "@/components/choose/UserGameList"
import gamesData from "@/lib/database.json"
import { Game } from "@/lib/types"
import { ReactElement, useEffect, useRef, useState } from "react"

export default function Page() {
    const [games, setGames] = useState<Game[]>([])

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const carousel = useRef<HTMLDivElement>(null)
    const [carrouselPos, setCarrouselPos] = useState(0)

    function handleModalState(state: boolean) {
        if (modalIsOpen && !state) {
            setModalIsOpen(false)
        } else if (!modalIsOpen && state) {
            setModalIsOpen(true)
        }
    }

    function addGame(game: Game) {
        const gamesTemp = [...games, game]
        window.localStorage.setItem("games", JSON.stringify(gamesTemp))
        setGames(gamesTemp)
    }

    function moveCarousel() {
        const element = carousel.current
        if (element == null) return


        let amount = 208
        let targetPos = 0;

        const routine = setInterval(() => {
            // console.log("moved")
            // const curPos = element.getBoundingClientRect().left;
            const curPos = element.offsetLeft;
            const elSize = element.offsetWidth;
            targetPos = curPos - amount
            console.log("curPos" + curPos)
            console.log(targetPos)
            console.log(elSize)
            setCarrouselPos(targetPos % -(elSize))
        }, 200)

        window.setTimeout(() => {
            clearInterval(routine)
        }, 1200)
    }

    useEffect(() => {
        const storedData = window.localStorage.getItem("games")
        if (storedData) {
            const parsedData = JSON.parse(storedData)
            setGames(parsedData)
        }
    }, [])

    return (
        <div className="flex flex-col">
            Your games

            {games && (
                <UserGameList games={games} />
            )}
            <button
                onClick={() => handleModalState(true)}
            >
                add a game
            </button>

            {modalIsOpen && (
                <AddGameModal
                    closeCallback={handleModalState}
                    addGame={addGame}
                />
            )}

            <div
                className="w-52 h-64 outline-4 outline outline-red-600 z-10 relative overflow-hidden"
            >
                <div
                    className="whitespace-nowrap absolute z-[-1] transition-all"
                    style={{ left: `${carrouselPos}px` }}
                    // style={{ transform: `translateX(${carrouselPos}px)` }}
                    ref={carousel}
                >
                    {games && games.map(game => (
                        <div key={game.title} className="w-52 inline-block transition">
                            <img
                                src={game.cover}
                                alt=""
                                className="h-60 w-full"
                            />
                            <h2>{game.title}</h2>
                        </div>
                    ))}
                </div>


            </div>

            <button
                onClick={moveCarousel}
                className="bg-black text-white text-3xl px-2 rounded-sm w-fit"
            >
                Choose
            </button>
        </div>
    )
}