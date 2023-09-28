"use client"

import { ChangeEvent, useEffect, useState } from "react"

interface GenresFieldProps {
    changeCallback: (value: string | string[] | number, name: string) => void
}

export default function GenresField({ changeCallback }: GenresFieldProps) {
    const [genres, setGenres] = useState<string[]>([])
    const [inputText, setInputText] = useState("")

    useEffect(() => {
        window.addEventListener('keydown', GetGenreFromInput);

        return () => {
            window.removeEventListener('keydown', GetGenreFromInput);
        };
    },)

    function GetGenreFromInput(e: KeyboardEvent) {
        if (e.key == ",") {
            if (genres.includes(inputText)) {
                alert("This is genre is already in genres list")
                return
            }

            setGenres([...genres, inputText])
            changeCallback([...genres, inputText], "genres")
            setInputText("")
        }
    }

    function handleInputText(e: ChangeEvent<HTMLInputElement>) {
        setInputText(e.target.value)
    }
    return (
        <div className="flex gap-2 items-end">

            <div className="flex flex-col">
                <label htmlFor="" className="text-[1.25rem]">
                    Genres
                </label>
                <input
                    value={inputText}
                    onChange={handleInputText}
                    className="text-gray bg-white placeholder:text-bege px-2 rounded-md py-2 transition-all outline-0 outline outline-white focus:outline-4 focus:bg-gray focus:text-white w-96"
                    type="text"
                    name="genres"
                    placeholder="type ',' to add multiple genres"
                />
            </div>

            <div className="flex gap-1">
                {genres && genres.map((genre, index) => (
                    <span
                        key={index}
                        className="bg-black/80 rounded-full h-fit text-white px-3"
                    >
                        {genre}
                    </span>
                ))}
            </div>
        </div>
    )
}