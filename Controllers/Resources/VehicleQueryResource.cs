namespace vega.Controllers.Resources
{
    public class VehicleQueryResource
    {
        public int? MakeId { get; set; }
        public int? ModelId { get; set; }
        public string sortBy { get; set; }
        public bool isSortAscending { get; set; }
        public int Page { get; set; }
        public byte PageSize { get; set; }
    }
}