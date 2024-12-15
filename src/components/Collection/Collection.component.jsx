import { useEffect, useState } from "react";
import FilterBoxComponent from "./FilterBox.component";
import { IoIosArrowForward } from "react-icons/io";
import { ProductCard } from "../productCard/ProductCard";
// import ProductData from "../../data/Product.data.json";
import { FaFilter, FaSort } from "react-icons/fa6";
import { BiSortAlt2 } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";
import faqData from "../../data/FAQ.data.json";
import SortComponent from "./Sort.component";
import FilterComponent from "./Filter.component";
import FilterController from "./FilterContoiller";
// import useShopifyStore from "../../store/useShopifyStore";

function CollectionComponent({ products = [], type = "Men" }) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [temporarypriceRange, temporarysetPriceRange] = useState({ min: 0, max: 500 });
  const [typeProductOption, SetTypeProductOption] = useState({
    Gender: [],
    "Product Categories": [],
    "Frame Color": [],
    "Filter by Brands": [],
    "Product Status": []
  })
  const [filterProduct, setFilterProduct] = useState(products);
  const [pagenatedProduct, setPagenatedProduct] = useState(filterProduct.slice(0, 8));
  const [visibleCount, setVisibleCount] = useState(4);

  const loadMore = () => {
    const newCount = visibleCount + 8; 
    setVisibleCount(newCount);
    setPagenatedProduct(filterProduct.slice(0, newCount));
  };  
  const [filterOptions, setFilterOptions] = useState({
    Gender: [],
    "Product Categories": [],
    "Frame Color": [],
    "Filter by Brands": [],
    "Product Status": []
  });
  useEffect(() => {
    if (type === "Men") {
      // setFilterOptions((prevState) => ({
      //   ...prevState,
      //   Gender: prevState.Gender ? [...prevState.Gender, "male"] : ["male"],
      // }));
      SetTypeProductOption((prevState) => ({
        ...prevState,
        Gender: prevState.Gender ? [...prevState.Gender, "male"] : ["male"],
      }));
    }
    if (type === "Women") {
      SetTypeProductOption((prevState) => ({
        ...prevState,
        Gender: prevState.Gender ? [...prevState.Gender, "female"] : ["female"],
      }));
    }

  }, [])

  // const products = useShopifyStore((state) => state.products);
  useEffect(() => {
    // let filteredProducts = [...products];

    // filteredProducts = filteredProducts.filter(product => 
    //   product.price >= priceRange.min && product.price <= priceRange.max
    // );

    // Object.keys(filterOptions).forEach(key => {
    //   if (filterOptions[key]?.length > 0) {
    //     filteredProducts = filteredProducts.filter(product => 
    //       filterOptions[key].some(option => product[key]?.includes(option))
    //     );
    //   }
    // });
    const filteredProducts = FilterController(products, filterOptions, priceRange);

    // Set the filtered products in the state
    setFilterProduct(filteredProducts);


    // setFilterProduct(filteredProducts);
    // console.log("Filter Options", filterOptions);
  }, [products, filterOptions, priceRange]);

  const genderOptions = [
    "male",
    "female",
    "unisex",
    // "Kids",
    // "Elderly",
    // "Teenagers",
  ];
  const categoryOptions = ["Sunglasses", "Eyeglasses", "Contact Lenses"];
  const frameColorOptions = ["pink", "black", "gray", "blue"];
  const brandOptions = ["Ray-Ban", "Oakley", "Gucci", "Prada", "Versace"];
  const productStatusOptions = ["Available", "Out of Stock", "New Arrival"];
  const [appliedfilter, SetAppliedFilter] = useState(0);
  const [isopen, setIsOpen] = useState(false);
  const [openindexs, setOpenIndexs] = useState([]);
  const [selectedfilter, SetSelectedFilter] = useState(null);
  const toggleAnswer = (index) => {
    setOpenIndexs((prevOpenIndexs) => {
      const newOpenIndexs = [...prevOpenIndexs];
      if (newOpenIndexs.includes(index)) {
        newOpenIndexs.splice(newOpenIndexs.indexOf(index), 1);
      } else {
        newOpenIndexs.push(index);
      }
      return newOpenIndexs;
    });
  };
  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value, 10) || 0; // Get the input value
    const step = 50; // Define step increment/decrement value

    let adjustedValue = value;

    if (type === "min") {
      // Ensure min value is adjusted in multiples of 50
      adjustedValue = value > temporarypriceRange.min ? value + step - (value % step) : value - step - (value % step);
      adjustedValue = Math.min(adjustedValue, temporarypriceRange.max); // Prevent min from exceeding max
    } else if (type === "max") {
      // Ensure max value is adjusted in multiples of 50
      adjustedValue = value > temporarypriceRange.max ? value + step - (value % step) : value - step - (value % step);
      adjustedValue = Math.max(adjustedValue, temporarypriceRange.min); // Prevent max from being below min
    }

    temporarysetPriceRange((prev) => ({
      ...prev,
      [type]: adjustedValue,
    }));
  };


  const handleFilterChange = (header, selectedOptions) => {
    const parsedOptions = Array.isArray(selectedOptions) ? selectedOptions : JSON.parse(selectedOptions);

    setFilterOptions((prevState) => ({
      ...prevState,
      [header]: parsedOptions
    }));
  };



  return (
    <div className="flex flex-col lg:flex-row relative">
      {/* Sidebar for filters */}
      <div
        className={`bg-slate-100 lg:block ${isopen ? "block" : "hidden"
          } lg:w-1/4`}
      >
        <div className="p-3">
          <div className="pl-9">
            <h1 className="font-semibold text-xl">Widget Price Filter</h1>
            <div className="flex  lg:flex-col xl:flex-row gap-2 mt-3">
              <input
                type="number"
                className="border w-[125px] py-1 px-3"
                min={0}
                value={temporarypriceRange.min}
                onChange={(e) => handlePriceChange(e, "min")}
              />
              <span>-</span>
              <input
                type="number"
                className="border w-[125px]  py-1 px-3"
                min={1}
                value={temporarypriceRange.max}
                onChange={(e) => handlePriceChange(e, "max")}
              />
            </div>

            <div className="flex gap-10 mt-3 items-center">
              <div>
                Price: ${temporarypriceRange.min} — ${temporarypriceRange.max}
              </div>
              <button className="border bg-slate-200 px-3 py-2 hover:bg-slate-300 transition" onClick={() => { setPriceRange(temporarypriceRange) }}>
                Filter
              </button>
            </div>
          </div>

          <div className="p-4">
            <FilterBoxComponent
              header="Gender"
              options={genderOptions}
              filterseletedOptions={filterOptions.Gender}
              onFilterChange={handleFilterChange}
              typeProductOption={typeProductOption}
            />
            <FilterBoxComponent
              header="Product Categories"
              options={categoryOptions}
              filterseletedOptions={filterOptions["Product Categories"]}
              onFilterChange={handleFilterChange}
            />
            <FilterBoxComponent
              header="Frame Color"
              options={frameColorOptions}
              filterseletedOptions={filterOptions["Frame Color"]}
              onFilterChange={handleFilterChange}
            />
            <FilterBoxComponent
              header="Filter by Brands"
              options={brandOptions}
              filterseletedOptions={filterOptions["Filter by Brands"]}
              onFilterChange={handleFilterChange}
            />
            <FilterBoxComponent
              header="Product Status"
              options={productStatusOptions}
              filterseletedOptions={filterOptions["Product Status"]}
              onFilterChange={handleFilterChange}
            />

          </div>
        </div>
      </div>

      {/* Mobile filter toggle
            <button
                className="lg:hidden p-2 m-2 bg-slate-300 rounded-full absolute right-0"
                onClick={() => setIsOpen(!isopen)}
            >
                {isopen ? <MdClose size={24} /> : <FaBars size={24} />}
            </button> */}

      {/* Main product section */}
      <div className="w-full lg:w-3/4 bg-slate-200">
        <div className="flex items-center space-x-2 text-sm text-gray-700 p-4">
          <span className="hover:text-blue-600 cursor-pointer">Shop</span>
          <IoIosArrowForward />
          <span className="hover:text-blue-600 cursor-pointer">Eyewear</span>
          <IoIosArrowForward />
          <span className="font-semibold">{type}</span>
        </div>
        <div className="bg-slate-300 p-3 text-sm text-gray-700">
          Showing all 16 results
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 justify-items-center">
          {/* {ProductData.map((prodobj, index) => (
            <ProductCard
              key={index}
              DeliveryFee={prodobj.DeliveryFee}
              image={prodobj.image}
              Head={prodobj.Head}
              RealPrice={prodobj.RealPrice}
              OurPrice={prodobj.OurPrice}
              off={prodobj.off}
            /> */}
          {pagenatedProduct && pagenatedProduct.length > 0 ? (
  pagenatedProduct.map((product) =>
    product ? <ProductCard key={product.id} product={product} /> : null
  )
) : type === "ContactLenses" ? (
  <p>Coming soon</p>
) : (
  <p>No product available</p>
)}

        </div>
        <div>
        {visibleCount < filterProduct.length && (
        <button
          className="w-full p-5 bg-slate-300 font-semibold mt-4"
          onClick={loadMore}
        >
          Load More
        </button>
      )}
          <div className="text-center p-14">
          النظارات الواقية الصناعية ضرورية لحماية العمال في البيئات التي تشكل”
            فيها الغبار والحطام والمواد الكيميائية والمخاطر العالية التأثير
            تهديدًا. تلبي مجموعتنا من النظارات الواقية المعتمدة أعلى المعايير
            العالمية، بما في ذلك ANSI Z87.1 و EN166، لضمان حماية كاملة للعينين.
            تتوفر النظارات بعدسات مع أو بدون قوة تصحيحية، ونقدم أنماطًا تناسب كل
            احتياج صناعي، بدءًا من البناء إلى التصنيع。”
            
            {faqData.map((faq, index) => (
              <div key={index} className="p-2 m-2 border-slate-500 ">
                <h1
                  className="flex p-2 justify-between font-semibold text-lg border-y-2 border-slate-500 cursor-pointer"
                  onClick={() => toggleAnswer(index)}
                >
                  {faq.question}{" "}
                  <span className="flex items-center justify-center">
                    {openindexs.includes(index) ? (
                      <AiOutlineClose className="text-lg font-semibold" />
                    ) : (
                      <GoPlus className="text-lg font-semibold" />
                    )}
                  </span>{" "}
                </h1>
                {openindexs.includes(index) && (
                  <p className="text-slate-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* mobile */}
      {selectedfilter === null ? (
        <div className="flex lg:hidden fixed z-30 bottom-[75px] md:bottom-[0px] bg-slate-300 p-3 w-full justify-between">
          <button
            className="flex flex-col items-center w-[50%] border-r-2"
            onClick={() => SetSelectedFilter("sort")}
          >
            <div className="flex  items-center gap-3">
              <BiSortAlt2 className="text-xl text-blue-600" />
              <p className="mt-1">Sort</p>
            </div>
            <p>Recommended</p>
          </button>
          <button
            className="flex flex-col items-center w-[50%] "
            onClick={() => SetSelectedFilter("filter")}
          >
            <div className="flex items-center gap-3">
              <FaFilter className="text-xl text-blue-600" />
              <p className="mt-1">Filter</p>
            </div>

            <p>{appliedfilter} Applied</p>
          </button>
        </div>
      ) : (
        <div className="block lg:hidden fixed z-30 bottom-[75px] bg-slate-300 p-3 w-full">
          {selectedfilter === "sort" && (
            <SortComponent SetSelectedFilter={SetSelectedFilter} />
          )}
          {selectedfilter === "filter" && (
            <FilterComponent
              SetSelectedFilter={SetSelectedFilter}
              SetFilterCount={SetAppliedFilter}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              priceRange={priceRange} setPriceRange={setPriceRange}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default CollectionComponent;
