import { CaretDown } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"
import './PopupStyle.css'

interface Props {
    name: string,
    options: string[]
    onChange: (value: string[] | number, filterName: string) => void
}

export default function FilterSelect({ name, options, onChange }: Props) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])
    const [popupOpen, setPopupOpen] = useState(false)
    const popup = useRef<HTMLDivElement>(null)

    function handleSelection(value: string) {
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter(option => option != value))
        } else {
            setSelectedOptions([...selectedOptions, value])
        }
    }

    function handlePopup() {
        if (popupOpen) {
            setPopupOpen(false)
        } else {
            setPopupOpen(true)
        }
    }

    useEffect(() => {
        onChange(selectedOptions, name)
    }, [selectedOptions])


    // Listening click 
    function CheckIfIsInsideOfPopup(e: MouseEvent) {
        if (popup.current && !popup.current.contains(e.target as Node)) {
            setPopupOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', CheckIfIsInsideOfPopup)

        return () => document.removeEventListener('mousedown', CheckIfIsInsideOfPopup)
    })

    return (
        <div className="flex gap-2 items-center">
            <div
                onClick={handlePopup}
                ref={popup}
                className="bg-white flex items-center px-2 py-2 gap-8 rounded text-gray cursor-pointer relative">
                {name}
                <CaretDown size={24} weight="bold" />

                {popupOpen && (
                    <div
                        // ref={popup}
                        className="popup absolute origin-top-left left-0 top-full  min-w-full pt-[2px]"
                    >
                        <div className="flex flex-col bg-white rounded overflow-y-scroll max-h-[200px] popup">
                            {options.map((option, index) => (
                                <span
                                    onClick={() => handleSelection(option)}
                                    className="hover:bg-gray hover:text-white flex justify-between transition-all px-2 pr-2 gap-2"
                                    key={option}>
                                    {option}

                                    {selectedOptions.includes(option) == true && (
                                        <span>v</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex gap-1">
                {selectedOptions.map((option, index) => (
                    <span
                        key={option}
                        onClick={() => setSelectedOptions(selectedOptions.filter(value => value != option))}
                        className="bg-red-500 text-white rounded-full px-3 py-1 pr-0 hover:pr-2 flex gap-0 hover:gap-1 items-center group transition-all"
                    >
                        {option}
                        <span className="scale-x-0 group-hover:scale-x-100 font-title cursor-pointer">X</span>
                    </span>
                ))}
            </div>
        </div>
    )
}