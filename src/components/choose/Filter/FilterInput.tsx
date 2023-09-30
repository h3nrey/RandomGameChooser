import { ChangeEvent, useState } from "react"

interface Props {
    name: string,
    label: string,
    placeholder?: string,
    changeCallback: (value: string[] | number, name: string) => void
}

export default function FilterInput({ name, label, placeholder, changeCallback }: Props) {
    const [inputValue, setInputValue] = useState<string | number>()

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        let value = e.target.value
        if (Number.isNaN(value)) value = 0
        setInputValue(value)
        changeCallback(parseInt(value), name)
    }

    return (
        <div className="flex items-center gap-3">
            <label htmlFor="" className="text-white">{label}</label>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                name="releaseDate"
                className="outline outline-4 w-fit max-w-[8rem] outline-white text-white bg-transparent rounded pl-2"
                placeholder={placeholder}
            />
        </div>
    )
}