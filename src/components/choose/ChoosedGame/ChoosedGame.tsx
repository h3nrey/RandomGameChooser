import { Game } from "@/lib/types";
import { useEffect, useState } from "react";
import "./style.css"
export default function ChoosedGame({ choosedGame }: { choosedGame: Game }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <img
                className="w-40 cover"
                src={choosedGame.cover}
                alt=""
            />
            <div className="text-xl choosed__title text-red-500 drop-shadow-md">
                {choosedGame.title}
            </div>
        </div>
    )
}