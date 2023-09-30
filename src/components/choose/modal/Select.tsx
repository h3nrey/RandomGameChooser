"use client"

import { ChangeEvent, useState } from "react"

interface Props {
    label: string
    name: string
    children: JSX.Element
    changeCallback: (value: string | string[] | number, name: string) => void;
}

export default function Select({ changeCallback, label, name, children }: Props) {
    const [plataforms, setPlataforms] = useState<string[]>([])

    function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
        const selectedValue = e.target.value

        if (plataforms.includes(selectedValue)) return

        setPlataforms([...plataforms, selectedValue])
        changeCallback([...plataforms, selectedValue], name)
    }
    return (
        <select
            defaultValue=""
            onChange={handleSelect}
            className="text-bege px-2 py-2 bg-white rounded-md focus:outline-none focus:bg-gray focus:text-white"
            name="plataforms"

        >
            <option value="">Select a {name}</option>
            {children}
        </select>
    )
}