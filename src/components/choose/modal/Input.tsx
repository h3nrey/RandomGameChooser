"use client"
import { ChangeEvent, useState } from "react";

interface InputProps {
    label: string;
    placeholder: string;
    name: string;
    changeCallback: (value: string | string[] | number, name: string) => void
}
export default function Input({ label, placeholder, name, changeCallback }: InputProps) {
    const [inputText, setInputText] = useState("")

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setInputText(value)
        changeCallback(value, name)
    }

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-[1.25rem]">
                {label}
            </label>
            <input
                className="text-gray bg-white placeholder:text-bege px-2 rounded-md py-2 transition-all outline-0 outline outline-white focus:outline-4 focus:bg-gray focus:text-white"
                type="text"
                name={name}
                onChange={handleInput}
                value={inputText}
                placeholder={placeholder} />
        </div>
    )
}