export interface Ticket {
    id?: number,
    reporter: string,
    assignee: string,
    status: string,
    title: string,
    resolution: string | null
}
