"use client"
import { Game } from "@/lib/types";
import { useContext, useState } from "react";
import GameListCard from "./GameListCard";
import { GamesCollectionContext } from "./GamesCollectionContext";

interface Props {
    removeGame: (index: number) => void,
}
export default function UserGameList({ removeGame }: Props) {
    const games: Game[] | null = useContext(GamesCollectionContext)

    function handleClick(i: number) {
        removeGame(i)
    }

    return (
        <>
            {(games && games.length > 0) ? (
                <ul className="flex gap-2 h-full">
                    {games && games.map((game, index) => (
                        <li
                            key={game.title}
                        >
                            <GameListCard
                                cover={game.cover}
                                close={() => handleClick(index)}
                            />
                        </li>

                    ))}
                </ul>
            ) : (
                <span>You game collection is empty :( try add one</span>
            )}
        </>

    )
}