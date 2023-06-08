import { Favorite } from "./favorite"

export interface FavoriteWithTicketInfo {
    id: number,
    reporter: string,
    assignee: string,
    status: string,
    title: string,
    resolution: string | null,
    favorites: Favorite[]
}
