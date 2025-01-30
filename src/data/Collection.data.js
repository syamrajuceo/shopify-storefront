
export const categoryOptions = ["sunglasses", "eyeglasses", "contact lenses"];

export const FilterName = {
  Gender: "Gender",
  Category: "Product Categories",
  Color: "Frame Color",
  Brand: "Filter by Brands",
  Status: "Product Status",
  Sort:"Sort By"
}

// Define SortName object if it's missing
export const SortName = {
  Recommended: "recommended",
  // Bestseller: "bestseller",
  // NewArrivals: "new_arrivals",
  PriceLowHigh: "price_low_high",
  PriceHighLow: "price_high_low",
};
export const sortDataOptions = [
  { value: SortName.Recommended, label: "Recommended (Default)" },
  // { value: SortName.Bestseller, label: "Bestseller" },
  // { value: SortName.NewArrivals, label: "New Arrivals" },
  { value: SortName.PriceLowHigh, label: "Price: Low to High" },
  { value: SortName.PriceHighLow, label: "Price: High to Low" },
];


export const SortHelper = (value) => {
  return sortDataOptions.find((obj) => obj.value === value) || sortDataOptions[0];
};


// Correct usage of SortHelper
const defaultSort = SortHelper(SortName.Recommended);

export const filterDataOptions = {
  [FilterName.Gender]: [],
  [FilterName.Category]: [],
  [FilterName.Color]: [],
  [FilterName.Brand]: [],
  [FilterName.Status]: [],
  [FilterName.Sort]: defaultSort,
};

export const ColorDataOptions = [
  "Air Force Blue", "Amethyst", "Aqua", "Black", "Black Iridium", "Blue",
  "Blue Hawaii", "Bronze", "Brown", "Brown and Blue", "Brown and Pink",
  "Cherry", "Clear", "Clear and Blue", "Copper", "Crystal", "Crystal Brown",
  "Dark Blue", "Dark Brown", "Dark Gray", "Dark Green", "Dark Violet",
  "Echo Blue", "Gold", "Graphite", "Gravel", "Green", "Green Gray", "Grey",
  "Hawaii Lava", "Hippie Blue", "Honey", "Light Blue", "Light Brown",
  "Light Green", "Light Gray", "Light Violet", "Mahogany", "Maui Rose",
  "Mauve", "Navy Blue", "Nude", "Olive Green", "Orange", "Pink",
  "Prizm Black", "Prizm Bronze", "Prizm Deep Water", "Prizm Field",
  "Prizm Gaming", "Prizm Grey", "Prizm Jade", "Prizm Purple", "Prizm Road",
  "Prizm Ruby", "Prizm Sapphire", "Prizm Tungsten", "Prizm Violet",
  "Purple", "Red", "Rose", "Rose Gold", "Silver", "Smoke", "Solid Blue",
  "Solid Green", "Solid Smoke", "Solid Teal", "Violet", "Violet and Rose",
  "Warm Grey", "White", "Yellow"
];
export const EyeDataBrands = [
  "Acuvue", "Adidas", "Adlux", "Air Optix", "Alcon", "Amara", "Armani Exchange",
  "Arnette", "Banito", "Baush & Lomb", "Bella", "Biofinity", "Biomedics",
  "Biotrue", "Burberry", "Calvin Klein", "Calvin Klein Junior", "Calvin Klein Jeans",
  "Calvin Klein Jeans Junior", "Carolina Herrera", "Carrera", "Cartier", "Christian Dior",
  "Clarti", "Clarity 1 day", "Colorvision", "Converse", "Converse Junior",
  "Cooper Vision", "Dailies", "Demetz", "Desire", "Despada", "Diva", "DKNY",
  "Dolce & Gabbana", "Emporio Armani", "Fashion Care", "Ferrari Scuderia", "Fila",
  "Freshlook", "Giorgio Armani", "Gucci", "Guess", "Hugo", "Idee", "Jaguar",
  "Jimmy Choo", "Kool", "Lacoste", "Layala", "LensMe", "Levis", "Love Moschino",
  "Luminous", "Naturel", "Nautica", "Magid", "Marc Jacobs", "Maui Jim", "Menicon",
  "Michael Kors", "Miraflex", "Montblanc", "Morel", "Moschino", "MyLens", "Nano Vista",
  "Nett", "Nike", "Nova", "Oakley", "Pepe Jeans", "Philips", "Police", "Polo Ralph",
  "Polo Ralph Lauren", "Porsche Design", "Prada Milano", "Prada", "Precision 1",
  "Proclear", "Pure Vision", "Puma", "Ralph", "Ralph Lauren", "Range Rover", "Ray Ban",
  "Renu", "Rosa Belle", "Salvatore Ferragamo", "Sama", "Seventh Street", "Silhouette",
  "SofLens", "Swarovski", "Taaliyah", "Ted Baker", "Tom Ford", "Tommy Hilfiger",
  "Tommy Jeans", "Total 30", "Trooper", "Udyogi", "Ultra", "Under Armour", "Uvex",
  "Versace", "Vintage", "3M", "Q2", "Safe Plus"
];


export const genderDataOptions = [
  "male",
  "female",
  "unisex",
  // "Kids",
  // "Elderly",
  // "Teenagers",
];

export const productDataStatus = [
  "Available", "Out of Stock"
  // , "New Arrival"
]

export const PriceRangeName = {
  BELOW_2000: "Below 2000",
  FROM_2000_TO_3000: "2000 - 3000",
  FROM_3000_TO_6000: "3000 - 6000",
  FROM_6000_TO_10000: "6000 - 10000",
  FROM_10000_TO_15000: "10000 - 15000",
};

export const PriceRangeList = Object.values(PriceRangeName);


export const PriceDataRangeMap = {
  [PriceRangeName.BELOW_2000]: { min: 0, max: 2000 },
  [PriceRangeName.FROM_2000_TO_3000]: { min: 2000, max: 3000 },
  [PriceRangeName.FROM_3000_TO_6000]: { min: 3000, max: 6000 },
  [PriceRangeName.FROM_6000_TO_10000]: { min: 6000, max: 10000 },
  [PriceRangeName.FROM_10000_TO_15000]: { min: 10000, max: 15000 },
};

/**
 * Returns the price range name and range object based on the given min and max values.
 */
export const PriceDataHelper = ({ min, max }) => {
  for (const [key, range] of Object.entries(PriceDataRangeMap)) {
    if (min >= range.min && max <= range.max) {
      return { key, range }; // Returns the matching range object with name
    }
  }

  // Default to the lowest range (Below 2000)
  return { key: PriceRangeName.BELOW_2000, range: PriceDataRangeMap[PriceRangeName.BELOW_2000] ,default:true};
};
