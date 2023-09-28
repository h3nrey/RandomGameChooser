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
        releaseDate: ""
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
        <div className="bg-zinc-700 text-white py-6 px-10">
            <header>Add a game to your list</header>
            <form
                onSubmit={handleFormSubmission}
                action="/"
                className="flex flex-col gap-4"
            >
                <Input
                    label="Title"
                    placeholder="Ex: Undertale"
                    name="title"
                    changeCallback={handleInputChange}
                />
                <Input
                    label="Cover"
                    placeholder="Ex: https:someurl.(jpg/png)"
                    name="cover"
                    changeCallback={handleInputChange}
                />
                <GenresField
                    changeCallback={handleInputChange}
                />

                <Select
                    name="plataforms"
                    changeCallback={handleInputChange}
                >
                    <>
                        {options.map(option => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.name}
                            </option>
                        ))}
                    </>

                </Select>

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

                <div className="flex gap-10">
                    <button
                        type="submit"
                        className="bg-black/50 px-5 py-2 rounded-sm"
                    >
                        Add
                    </button>
                    <button
                        onClick={() => closeCallback(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}