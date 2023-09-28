import { createContext } from "react"
import { Game } from "@/lib/types"

export const GamesCollectionContext = createContext<Game[] | null>(null)