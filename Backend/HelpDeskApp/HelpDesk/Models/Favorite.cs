using System;
using System.Collections.Generic;

namespace HelpDesk.Models;

public partial class Favorite
{
    public int Id { get; set; }

    public string? UserId { get; set; }

    public int? TicketNumber { get; set; }

    public virtual Ticket? TicketNumberNavigation { get; set; }
}
