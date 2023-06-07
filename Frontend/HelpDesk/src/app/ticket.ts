export interface Ticket {
    Id?: number,
    Reporter: string,
    Assignee: string,
    Status: string,
    Title: string,
    Resolution: string | null
}
