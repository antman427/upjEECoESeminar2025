using Microsoft.AspNetCore.Mvc;

using Starter.Server.Models.AppDbContext;
using Starter.Server.Models.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Starter.Server.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase {
        private readonly AppDbContext _db;

        public ProductController(AppDbContext db) {
            _db = db;
        }

        // GET: api/<ProductController>
        [HttpGet]
        public IEnumerable<Product> Get() {
            var result = _db.Product.AsEnumerable();
            return result;
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public Product Get(int id) {
            var result = _db.Product
                .Where(p => p.id == id)
                .FirstOrDefault();
            return result;
        }

        // POST api/<ProductController>
        [HttpPost]
        public Product Post([FromBody] Product product) {
            product.id = 0;
            _db.Product.Add(product);
            _db.SaveChanges();
            return product;
        }

        // PUT api/<ProductController>/5
        [HttpPut()]
        public Product Put([FromBody] Product product) {
            var myproduct = _db.Product.Find(product.id);
            if(myproduct != null) {
                myproduct.name = product.name;
                myproduct.description = product.description;
                myproduct.price = product.price;
                _db.SaveChanges();
                return myproduct;
            }
            return null;
        }

        // DELETE api/<ProductController>/5
        [HttpDelete("{id}")]
        public Product Delete(int id) {
            var product = _db.Product.Find(id);
            if(product != null) {
                _db.Product.Remove(product);
                _db.SaveChanges();
                return product;
            }
            return null;
        }
    }
}
