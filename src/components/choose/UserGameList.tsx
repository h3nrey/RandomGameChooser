"use client"
import { Game } from "@/lib/types";
import { useState } from "react";
import GameListCard from "./GameListCard";

export default function UserGameList({ games }: { games: Game[] }) {
    function removeGame(i: number) {
        if (!games) return

        // setGames(games?.filter((g, index) => index != i))
    }
    return (
        <ul className="flex">
            {games && games.map((game, index) => (
                <li
                    key={game.title}
                >
                    <GameListCard
                        cover={game.cover}
                        close={() => removeGame(index)}
                    />
                </li>

            ))}
        </ul>
    )
}