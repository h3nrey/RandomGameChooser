import { useContext, useEffect, useState } from "react"
import { GamesCollectionContext } from "../GamesCollectionContext"
import Select from "../modal/Select"
import FilterSelect from "./FilterSelect"
import { Filters } from "@/lib/types"
import { ObjectType } from "typescript"
import { plataforms } from "@/lib/plataforms"
import Input from "../modal/Input"
import FilterInput from "./FilterInput"

interface Props {
    sendFilters: (selectedFilters: Filters) => void
}

export default function FilterContainer({ sendFilters }: Props) {
    const games = useContext(GamesCollectionContext)
    const [genres, setGenres] = useState<string[]>([])

    const [selectedFilters, setSelectedFilters] = useState<Filters>({
        genres: [],
        plataforms: [],
        releaseDate: null,
        rating: null
    })

    useEffect(() => {
        if (!games) return

        let genresTemp: string[] = []
        games.map(game => {
            const filteredGenres = game.genres.filter(genre => !genresTemp.includes(genre))
            genresTemp = [...genresTemp, ...filteredGenres]
        })
        setGenres(genresTemp)
    }, [games])


    function updateFilters(value: string[] | number, filterName: string) {
        if (!selectedFilters) return
        let newSelectedFilters = { ...selectedFilters, [filterName]: value }
        console.log("new filters")
        console.log(newSelectedFilters)
        setSelectedFilters(newSelectedFilters)
        sendFilters(newSelectedFilters)
    }

    return (
        <div className="flex mb-10">
            <span className="text-white font-title text-[1.5rem] mr-8">
                Filters
            </span>

            <div className="flex gap-4 flex-wrap">
                <FilterSelect
                    name="genres"
                    options={genres}
                    onChange={updateFilters}
                />
                <FilterSelect
                    name="plataforms"
                    options={plataforms}
                    onChange={updateFilters}
                />
                <FilterInput name="releaseDate" label="Release Date" placeholder="Year" changeCallback={updateFilters} />
                <FilterInput name="rating" label="Rating" placeholder="Min" changeCallback={updateFilters} />
            </div>

        </div>
    )
}