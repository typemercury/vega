using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace vega.Controllers.Resources
{
    public class VehicleResource
    {
        public int Id { get; set; }
        public ModelResource Model { get; set; }
        public KeyValuePairResource Make { get; set; }
        public bool isRegistered { get; set; }
       
        public ContactResource Contact { get; set; }
       
        public DateTime LastUpdate { get; set; }
        public ICollection<FeatureResource> Features { get; set; }
        public VehicleResource()
        {
            Features = new Collection<FeatureResource>();
        }
    }
}