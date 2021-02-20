namespace vega.Extensions
{
    public interface IQueryObject
    {
        string sortBy { get; set; }
         bool isSortAscending { get; set; }
         int Page { get; set; }
         byte PageSize { get; set; }
    }
}