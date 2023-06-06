using HelpDesk.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HelpDesk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly HelpDeskContext _context;
        
        public TicketsController(HelpDeskContext context)
        {
            _context = context;
        }

        [HttpGet("AllTickets")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
        {
            if (_context.Tickets == null)
            {
                return NotFound();
            }
            return await _context.Tickets.ToListAsync();
        }

        // POST api/<TicketsController>
        [HttpPost("NewTicket")]
        public async Task<ActionResult<Ticket>> PostUser(Ticket ticket)
        {
            if (_context.Tickets == null)
            {
                return Problem("Entity set 'HelpDeskContext.Tickets' is null.");
            }
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTickets", new { id = ticket.Id }, ticket);
        }

        // PUT api/<TicketsController>/5
        [HttpPatch("UpdateTicket/{id}")]
        public async Task<ActionResult> UpdateTicket(int id, TicketUpdate ticketUpdate)
        {
            // Retrieve the existing ticket
            Ticket existingTicket = await _context.Tickets.FindAsync(id); // Retrieve the ticket based on the given id

            if (existingTicket == null)
            {
                return NotFound(); // Return 404 Not Found if the ticket doesn't exist
            }

            // Update the fields
            existingTicket.Assignee = ticketUpdate.Assignee;
            existingTicket.Status = ticketUpdate.Status;
            existingTicket.Resolution = ticketUpdate.Resolution;

            using (_context)
            {
                _context.Entry(existingTicket).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }

            return Ok(); // Return 200 OK or any other appropriate response
        }


        // DELETE api/<TicketsController>/5
        [HttpDelete("DeleteTicket/{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            if (_context.Tickets == null)
            {
                return NotFound();
            }
            var user = await _context.Tickets.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Tickets.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
