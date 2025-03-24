using System;
using System.Collections.Generic;

namespace Starter.Server.Models.Entities;

public partial class Product
{
    public int id { get; set; }
    public string? name { get; set; }
    public string? description { get; set; }
    public decimal? price { get; set; }
}
