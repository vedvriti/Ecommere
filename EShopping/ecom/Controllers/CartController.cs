
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

using ecom.Models;

using System;

using System.Linq;

using System.Threading.Tasks;
 
namespace ecom.Controllers

{

    [ApiController]

    [Route("api/[controller]")]

    public class CartController : ControllerBase

    {

        private readonly EcomContext _context;
 
        public CartController(EcomContext context)

        {

            _context = context;

        }
 
        // // POST: api/cart/add-item

        // [HttpPost("add-item")]

        // public async Task<IActionResult> AddCartItem([FromBody] AddCartItemRequest request)

        // {

        //     if (!ModelState.IsValid)

        //     {

        //         return BadRequest(ModelState);

        //     }
 
        //     try

        //     {

        //         var product = await _context.Products

        //             .FirstOrDefaultAsync(p => p.ProductId == request.ProductId && !p.IsDeleted);
 
        //         if (product == null)

        //         {

        //             return NotFound($"Product with ID {request.ProductId} not found.");

        //         }
 
        //         var cartItem = new CartItem

        //         {

                  

        //             ProductId = request.ProductId,

                 

        //         };
 
        //         _context.CartItems.Add(cartItem);

        //         await _context.SaveChangesAsync();
 
        //         return Ok($"Added {product.Name}(s) to cart.");

        //     }

        //     catch (Exception ex)

        //     {

        //         return StatusCode(500, $"Internal server error: {ex.Message}");

        //     }

        // }
       [HttpPost("add-item")]
public async Task<IActionResult> AddCartItem([FromBody] AddCartItemRequest request)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    try
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(p => p.ProductId == request.ProductId && !p.IsDeleted);

        if (product == null)
        {
            return NotFound($"Product with ID {request.ProductId} not found.");
        }

        // Assuming no CustomerId is required for this operation
        var cartItem = new CartItem
        {
            ProductId = request.ProductId,
            Quantity = 1, // Set a default quantity or handle as per your application's logic
            // CustomerId = null; // If CustomerId is non-nullable, this will cause an error
            // Adjust CustomerId based on your application logic
            CustomerId = 1  // Example: Set a default CustomerId or handle appropriately
        };

        _context.CartItems.Add(cartItem);
        await _context.SaveChangesAsync();

        return Ok($"Added 1 {product.Name}(s) to cart.");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}


 
        // PUT: api/cart/update-item/{cartItemId}

      [HttpPut("update-item/{productId}")]
public async Task<IActionResult> UpdateCartItem(int productId, [FromQuery] int quantity)
{
    if (quantity <= 0)
    {
        return BadRequest("Quantity must be greater than zero.");
    }

    try
    {
        // Find the cart item based on the product ID
        var cartItem = await _context.CartItems.FirstOrDefaultAsync(ci => ci.ProductId == productId);

        if (cartItem == null)
        {
            return NotFound($"Cart item with Product ID {productId} not found.");
        }

        // Update the quantity of the cart item
        cartItem.Quantity = quantity;

        // Save changes to the database
        await _context.SaveChangesAsync();

        return Ok($"Cart item with Product ID {productId} updated successfully.");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}

 
        // DELETE: api/cart/delete-item/{cartItemId}

        // [HttpDelete("delete-item/{cartItemId}")]

        // public async Task<IActionResult> DeleteCartItem(int cartItemId)

        // {

        //     try

        //     {

        //         var cartItem = await _context.CartItems.FindAsync(cartItemId);
 
        //         if (cartItem == null)

        //         {

        //             return NotFound($"Cart item with ID {cartItemId} not found.");

        //         }
 
        //         _context.CartItems.Remove(cartItem);

        //         await _context.SaveChangesAsync();
 
        //         return Ok($"Cart item {cartItemId} deleted successfully.");

        //     }

        //     catch (Exception ex)

        //     {

        //         return StatusCode(500, $"Internal server error: {ex.Message}");

        //     }

        // }
        [HttpDelete("delete-item/{productId}")]
public async Task<IActionResult> DeleteCartItem(int productId)
{
    try
    {
        // Find all cart items with the specified productId
        var cartItems = await _context.CartItems
            .Where(ci => ci.ProductId == productId)
            .ToListAsync();

        if (cartItems == null || cartItems.Count == 0)
        {
            return NotFound($"No cart items found for product with ID {productId}.");
        }

        // Remove all cart items for the productId found
        _context.CartItems.RemoveRange(cartItems);
        await _context.SaveChangesAsync();

        return Ok($"All cart items for product ID {productId} deleted successfully.");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}

 
        // GET: api/cart/items

        // GET: api/cart/items
[HttpGet("items")]
public async Task<IActionResult> GetCartItems()
{
    try
    {
        var cartItems = await _context.CartItems
            .Include(ci => ci.Product) // Include related Product information
            .Where(ci => ci.Quantity > 0) // Optional: Include any filtering condition as needed
            .Select(ci => new 
            {
                ci.ProductId,
                ci.CustomerId,
                ci.Quantity,
                ci.Product.ProductImage,
                ci.Product.Description,
                ci.Product.Price
            })
            .ToListAsync();

        return Ok(cartItems);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}

    }
 
    // Request DTOs for cart operations

    public class AddCartItemRequest

    {

        public int ProductId { get; set; }

        public int CustomerId { get; set; }

        public int Quantity { get; set; }

       

    }
 
    public class UpdateCartItemRequest

    {
                public int Quantity { get; set; }
    }

}
