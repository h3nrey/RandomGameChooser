"use client"

import { ChangeEvent, useState } from "react"

interface PlataformSelectProps {
    name: string
    children: JSX.Element
    changeCallback: (value: string | string[] | number, name: string) => void;
}

export default function Select({ changeCallback, name, children }: PlataformSelectProps) {
    const [plataforms, setPlataforms] = useState<string[]>([])

    function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
        const selectedValue = e.target.value

        if (plataforms.includes(selectedValue)) return

        setPlataforms([...plataforms, selectedValue])
        changeCallback([...plataforms, selectedValue], name)
    }
    return (
        <div className="flex flex-col">
            <label htmlFor="">
                Plataforms
            </label>
            <select
                defaultValue=""
                onChange={handleSelect}
                className="text-black"
                name="plataforms"

            >
                <option value="">Select a {name}</option>
                {children}
            </select>
            <p>{plataforms}</p>
        </div>


    )
}