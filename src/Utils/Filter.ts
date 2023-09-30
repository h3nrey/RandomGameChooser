import { Filters, Game } from "@/lib/types";

export function filterGames(games: Game[], filters: Filters | null) {
    if (!filters) return games
    const { genres, plataforms, releaseDate, rating } = filters
    const afterReleaseDate = true;
    const isMinRating = true;
    let filteredGames = games

    // GENRES
    if (genres.length > 0) {
        filteredGames = filteredGames.filter(game => {
            for (let i = 0; i < genres.length; i++) {
                const curGenre = genres[i];
                if (game.genres.includes(curGenre)) return true
            }
            return false
        })
    }

    // PLATAFORMS 
    if (plataforms.length > 0) {
        filteredGames = filteredGames.filter(game => {
            for (let i = 0; i < plataforms.length; i++) {
                const curPlataform = plataforms[i];
                if (game.plataforms.includes(curPlataform)) return true
            }
            return false
        })
    }

    // RELEASE DATE 
    if (releaseDate) {
        console.log("has release date")
        filteredGames = filteredGames.filter(game => {
            if (afterReleaseDate) {
                if (game.releaseDate >= releaseDate) return true
                else return false
            } else {
                if (game.releaseDate <= releaseDate) return true
                else return false
            }
        })
    }

    // RELEASE DATE 
    if (rating) {
        filteredGames = filteredGames.filter(game => {
            if (isMinRating) {
                if (game.rating >= rating) return true
                else return false
            } else {
                if (game.rating <= rating) return true
                else return false
            }
        })
    }
    
    console.log("filtered games")
    console.log(filteredGames)
    return filteredGames
}