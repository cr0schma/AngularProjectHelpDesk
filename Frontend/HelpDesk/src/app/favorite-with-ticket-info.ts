import { Favorite } from "./favorite"

export interface FavoriteWithTicketInfo {
    Id?: number,
    Reporter: string,
    Assignee: string,
    Status: string,
    Title: string,
    Resolution: string | null,
    Favorites: Favorite[]
}
