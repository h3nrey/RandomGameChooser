export type Game =  {
    title: string,
    cover: string,
    genres: string[],
    plataforms: string[],
    languages: string[],
    rating: number,
    releaseDate: number
}

export type Filters = {
    genres: string[],
    plataforms: string[],
    releaseDate: number | null,
    rating: number | null
}