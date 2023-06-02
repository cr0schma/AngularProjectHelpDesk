using HelpDesk.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HelpDesk.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly HelpdeskContext _context;

        public FavoriteController(HelpdeskContext context)
        {
            _context = context;
        }

        private List<Ticket> GetAllFavoritesTicketInfo()
        {
            var query = (
                from Favorite in _context.Favorites
                join Ticket in _context.Tickets on Favorite.UserId equals Ticket.Reporter
                select new
                {
                    Ticket.Id,
                    Ticket.Reporter,
                    Ticket.Assignee,
                    Ticket.Status,
                    Ticket.Title,
                    Ticket.Resolution
                }).ToList();

            List<Ticket> result = new List<Ticket>();

            foreach (var ticket in query)
            {
                Ticket favoriteTicket = new Ticket()
                {
                    Id = ticket.Id,
                    Reporter = ticket.Reporter,
                    Assignee = ticket.Assignee,
                    Status = ticket.Status,
                    Title = ticket.Title,
                    Resolution = ticket.Resolution
                };

                result.Add(favoriteTicket);
            }
            return result;
        }

        private List<Ticket> GetReporterFavorites(string reporter)
        {
            var query = (
                from Favorite in _context.Favorites
                join Ticket in _context.Tickets on Favorite.UserId equals Ticket.Reporter where Favorite.UserId == reporter
                select new
                {
                    Ticket.Id,
                    Ticket.Reporter,
                    Ticket.Assignee,
                    Ticket.Status,
                    Ticket.Title,
                    Ticket.Resolution
                }).ToList();

            List<Ticket> result = new List<Ticket>();

            foreach (var ticket in query)
            {
                Ticket favoriteTicket = new Ticket()
                {
                    Id = ticket.Id,
                    Reporter = ticket.Reporter,
                    Assignee = ticket.Assignee,
                    Status = ticket.Status,
                    Title = ticket.Title,
                    Resolution = ticket.Resolution
                };

                result.Add(favoriteTicket);
            }
            return result;
        }

        // GET: api/<FavoriteController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Favorite>>> GetFavorites()
        {
            if (_context.Favorites == null)
            {
                return NotFound();
            }

            return await _context.Favorites.ToListAsync();
        }

        // GET: api/<FavoriteController>
        [HttpGet]
        [Route("withTicketInfo")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetFavoritesTicketInfo()
        {
            if (_context.Favorites == null)
            {
                return NotFound();
            }

            return GetAllFavoritesTicketInfo();
        }

        // GET api/<FavoriteController>/John Doe
        [HttpGet("{reporter}")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetFavorite(string reporter)
        {
            if (_context.Favorites == null)
            {
                return NotFound();
            }
            var favorite = GetReporterFavorites(reporter);

            if (favorite.Count == 0)
            {
                return NotFound();
            }

            return favorite;
        }

        // POST api/<FavoriteController>/reporter
        [HttpPost("{reporter}/{ticketNumber}")]
        public async Task<ActionResult<Favorite>> AddFavorite(string reporter, int ticketNumber)
        {
            Favorite newFavorite = new Favorite()
            {
                UserId = reporter,
                TicketNumber = ticketNumber
            };
            _context.Favorites.Add(newFavorite);
            await _context.SaveChangesAsync();

            return newFavorite;
        }

        // DELETE api/<FavoriteController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Favorite>> DeleteFavorite(int id)
        {
            var queryFavorite = await _context.Favorites.FindAsync(id);

            if (queryFavorite == null) { return NotFound(); }

            _context.Favorites.Remove(queryFavorite); 
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT api/<FavoriteController>/5
        /*[HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }*/

    }
}
