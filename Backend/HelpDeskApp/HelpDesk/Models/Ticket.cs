using System;
using System.Collections.Generic;

namespace HelpDesk.Models;

public partial class Ticket
{
    public int Id { get; set; }

    public string? Reporter { get; set; }

    public string? Assignee { get; set; }

    public string? Status { get; set; }

    public string? Title { get; set; }

    public string? Resolution { get; set; }

    public virtual ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
}
