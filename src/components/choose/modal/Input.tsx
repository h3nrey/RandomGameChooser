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
        <div className="flex flex-col">
            <label htmlFor="">
                {label}
            </label>
            <input
                className="text-black"
                type="text"
                name={name}
                onChange={handleInput}
                value={inputText}
                placeholder={placeholder} />
        </div>
    )
}