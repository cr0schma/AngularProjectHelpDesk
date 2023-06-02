using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HelpDesk.Models;

public partial class HelpdeskContext : DbContext
{
    public HelpdeskContext()
    {
    }

    public HelpdeskContext(DbContextOptions<HelpdeskContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Favorite> Favorites { get; set; }

    public virtual DbSet<Ticket> Tickets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Favorite>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Favorite__3214EC078FE78071");

            entity.Property(e => e.TicketNumber).HasColumnName("Ticket_Number");
            entity.Property(e => e.UserId).HasMaxLength(50);

            entity.HasOne(d => d.TicketNumberNavigation).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.TicketNumber)
                .HasConstraintName("FK__Favorites__Ticke__398D8EEE");
        });

        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Tickets__3214EC074E8FA8B6");

            entity.Property(e => e.Assignee).HasMaxLength(50);
            entity.Property(e => e.Reporter).HasMaxLength(50);
            entity.Property(e => e.Status).HasMaxLength(6);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
