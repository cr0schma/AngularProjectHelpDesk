using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace HelpDesk.Models;

public partial class HelpDeskContext : DbContext
{
    public HelpDeskContext()
    {
    }

    public HelpDeskContext(DbContextOptions<HelpDeskContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Favorite> Favorites { get; set; }

    public virtual DbSet<Ticket> Tickets { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=HelpDesk; Integrated Security=True; Encrypt=false");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Favorite>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Favorite__3214EC07BD518461");

            entity.Property(e => e.TicketNumber).HasColumnName("Ticket_Number");
            entity.Property(e => e.UserId).HasMaxLength(50);

            entity.HasOne(d => d.TicketNumberNavigation).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.TicketNumber)
                .HasConstraintName("FK__Favorites__Ticke__398D8EEE");
        });

        modelBuilder.Entity<Ticket>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Tickets__3214EC073B82B062");

            entity.Property(e => e.Assignee).HasMaxLength(50);
            entity.Property(e => e.Reporter).HasMaxLength(50);
            entity.Property(e => e.Status).HasMaxLength(6);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
