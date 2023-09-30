"use client"

import { ChangeEvent, FormEvent, useState } from "react";
import GenresField from "./modal/GenresField";
import Select from "./modal/Select";
import Input from "./modal/Input";
import { Game } from "@/lib/types";
import { plataforms as options } from "@/lib/plataforms"

interface Props {
    closeCallback: (state: boolean) => void
    addGame: (game: Game) => void
}

export default function AddGameModal({ closeCallback, addGame }: Props) {
    const [formData, setFormData] = useState<Game>({
        title: "",
        cover: "",
        genres: [],
        plataforms: [],
        languages: [],
        rating: 0,
        releaseDate: 0
    })

    function handleInputChange(value: string | string[] | number, name: string) {
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
    }

    function handleFormSubmission(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        addGame(formData)
        closeCallback(false)
    }

    return (
        <div className="bg-red-500 top-1/2 -translate-y-1/2 left-1/2 fixed flex-col -translate-x-1/2 text-white py-6 px-10 z-20">
            <header className="font-title text-[2rem] text-center mb-2">Add a game to your list</header>
            <form
                onSubmit={handleFormSubmission}
                action="/"
                className="flex flex-col gap-4 rounded-lg"
            >
                <Input
                    label="Title"
                    placeholder="Ex: Undertale"
                    name="title"
                    changeCallback={handleInputChange}
                />
                <Input
                    label="Cover"
                    placeholder="Ex: https://someurl.(jpg/png)"
                    name="cover"
                    changeCallback={handleInputChange}
                />
                <GenresField
                    changeCallback={handleInputChange}
                />

                <div className="flex flex-col">
                    <label htmlFor="" className="text-[1.25rem]">
                        Plataformas
                    </label>
                    <Select
                        label="Plataforms"
                        name="plataforms"
                        changeCallback={handleInputChange}
                    >
                        <>
                            {options.map(option => (
                                <option
                                    key={option}
                                    value={option}
                                >
                                    {option}
                                </option>
                            ))}
                        </>

                    </Select>
                </div>


                <div
                    className="flex gap-10"
                >
                    <Input
                        label="Rating"
                        placeholder="Ex: 95.5"
                        name="rating"
                        changeCallback={handleInputChange}
                    />
                    <Input
                        label="Release date"
                        placeholder="Ex: 2015"
                        name="releaseDate"
                        changeCallback={handleInputChange}
                    />
                </div>

                <div className="flex gap-10 mt-4">
                    <button
                        type="submit"
                        className="bg-gray px-7 outline outline-white outline-0 hover:outline-4 transition-all py-2 rounded-sm"
                    >
                        Add
                    </button>
                    <button
                        className="outline outline-white outline-2 px-5 rounded-sm hover:outline-4 transition-all"
                        onClick={() => closeCallback(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}