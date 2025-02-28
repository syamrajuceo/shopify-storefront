import { useEffect, useState } from "react";
import FilterBoxComponent from "./FilterBox.component";
import { IoIosArrowForward } from "react-icons/io";
import { ProductCard } from "../productCard/ProductCard";
// import ProductData from "../../data/Product.data.json";
import { FaFilter } from "react-icons/fa6";
import { BiSortAlt2 } from "react-icons/bi";
import SortComponent from "./Sort.component";
import FilterComponent from "./Filter.component";
import FilterController from "./FilterController";
import { Link } from "react-router-dom";
import { categoryOptions, ColorDataOptions, EyeDataBrands, filterDataOptions, FilterName, genderDataOptions, productDataStatus } from "../../data/Collection.data";
// import useShopifyStore from "../../store/useShopifyStore";
const currencyFormat = "AED";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: currencyFormat })
    .format(price)
    .split(".")[0]; // Removes decimal places

function CollectionComponent({ products = [], type = "Men" }) {
  const [temporarypriceRange, temporarysetPriceRange] = useState({ min: 0, max: 500 });
  const [priceRange, setPriceRange] = useState(temporarypriceRange);
  const [filterProduct, setFilterProduct] = useState(products);

  const [pagenatedProduct, setPagenatedProduct] = useState(() => {
    if (!filterProduct || filterProduct.length === 0) {
      return [];
    }
    if (filterProduct.length < 8) {
      return filterProduct;
    }
    return filterProduct.slice(0, 8);
  });

  useEffect(() => {
    if (!filterProduct || filterProduct.length === 0) {
      setPagenatedProduct([]);
    } else if (filterProduct.length < 8) {
      setPagenatedProduct(filterProduct);
    } else {
      setPagenatedProduct(filterProduct.slice(0, 8));
    }
  }, [filterProduct]);

  const [visibleCount, setVisibleCount] = useState(8);

  const loadMore = () => {
    const newCount = visibleCount + 4;
    setVisibleCount(newCount);

    if (filterProduct.length >= newCount) {
      setPagenatedProduct(filterProduct.slice(0, newCount));
    } else {
      setPagenatedProduct(filterProduct);
    }
  };


  const [filterOptions, setFilterOptions] = useState(filterDataOptions);

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
    setVisibleCount(8)

    // setFilterProduct(filteredProducts);
    // console.log("Filter Options", filterOptions);
  }, [products, filterOptions, priceRange]);
  useEffect(() => {
    setFilterOptions(filterDataOptions)
  }, [type])
  const genderOptions = genderDataOptions;
  const frameColorOptions = ColorDataOptions;
  const brandOptions = EyeDataBrands;
  const productStatusOptions = productDataStatus;
  const [appliedfilter, SetAppliedFilter] = useState(0);
  // const [isopen, setIsOpen] = useState(false);
  const [selectedfilter, SetSelectedFilter] = useState(null);
  // const toggleAnswer = (index) => {
  //   setOpenIndexs((prevOpenIndexs) => {
  //     const newOpenIndexs = [...prevOpenIndexs];
  //     if (newOpenIndexs.includes(index)) {
  //       newOpenIndexs.splice(newOpenIndexs.indexOf(index), 1);
  //     } else {
  //       newOpenIndexs.push(index);
  //     }
  //     return newOpenIndexs;
  //   });
  // };
  const handlePriceChange = (e, type) => {
    // Update state dynamically while user types
    temporarysetPriceRange((prev) => ({
      ...prev,
      [type]: e.target.value, // Keep live user input
    }));
  };

  const handleKeyDownPriceChange = (e, type) => {
    const step = 50; // Define step increment/decrement value
    let value = parseInt(e.target.value, 10) || 0; // Get the input value

    if (e.key === "ArrowUp") {
      value += step - 1;
    } else if (e.key === "ArrowDown") {
      value = Math.max(value - step + 1, 0); // Prevent negative values
    } else {
      return; // Exit if it's not an arrow key
    }

    // Ensure value is within range
    if (type === "min") {
      value = Math.min(value, temporarypriceRange.max); // Prevent min > max
    } else if (type === "max") {
      value = Math.max(value, temporarypriceRange.min); // Prevent max < min
    }

    // Update the state with the adjusted value
    temporarysetPriceRange((prev) => ({
      ...prev,
      [type]: value,
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
    <div className="flex flex-col lg:flex-row relative h-full">
      {/* Sidebar for filters */}
      {/* <div
        className={`bg-[#FFFFFF] lg:block ${isopen ? "block" : "hidden"
          } lg:w-1/5`}
      > */}
      <div className={`bg-[#FFFFFF] lg:block lg:w-1/5 hidden border-2 sticky h-full top-2`}>
        <div className="p-3">
          <div className="pl-3">
            <h1 className="font-semibold text-xl">Price</h1>
            <div className="flex  lg:flex-col xl:flex-row gap-2 mt-3 items-center">
              <div>
                <h1 className="text-[12px]">Min Price</h1>
                <input
                  type="number"
                  className="border w-[116.44px] h-[38px] py-1 px-3"
                  min={0}
                  value={temporarypriceRange.min}
                  onChange={(e) => handlePriceChange(e, "min")}
                  onKeyDown={(e) => handleKeyDownPriceChange(e, "min")}
                />
              </div>

              <span className="text-[14px] text-[#030712]">-</span>
              <div>
                <h1 className="text-[12px]">Max Price</h1>
                <input
                  type="number"
                  className="border w-[116.44px] h-[38px]  py-1 px-3"
                  min={1}
                  value={temporarypriceRange.max}
                  onChange={(e) => handlePriceChange(e, "max")}
                  onKeyDown={(e) => handleKeyDownPriceChange(e, "max")}
                />
              </div>

            </div>

            <div className="flex  mt-3 items-center justify-between">
              <div> Price: {formatPrice(temporarypriceRange.min)} — {formatPrice(temporarypriceRange.max)}</div>

              <button className="border  px-3 py-2 bg-[#E5E7EB]  transition" onClick={() => { setPriceRange(temporarypriceRange) }}>
                Apply
              </button>
            </div>
          </div>

          <div className="p-3">
            {type === "" || !["gender"].includes(type) && <FilterBoxComponent
              header={FilterName.Gender}
              options={genderOptions}
              filterseletedOptions={filterOptions.Gender}
              onFilterChange={handleFilterChange}
              type={type}
            />}
            {type === "" || !["contactLenses", "sunGlasses", "eyeGlasses"].includes(type) && <FilterBoxComponent
              header={FilterName.Category}
              options={categoryOptions}
              filterseletedOptions={filterOptions[FilterName.Category]}
              onFilterChange={handleFilterChange}
              type={type}
            />}
            <FilterBoxComponent
              header={FilterName.Color}
              options={frameColorOptions}
              filterseletedOptions={filterOptions[FilterName.Color]}
              onFilterChange={handleFilterChange}
              type={type}
            />
            <FilterBoxComponent
              header={FilterName.Brand}
              options={brandOptions}
              filterseletedOptions={filterOptions[FilterName.Brand]}
              onFilterChange={handleFilterChange}
              type={type}
            />
            <FilterBoxComponent
              header={FilterName.Status}
              options={productStatusOptions}
              filterseletedOptions={filterOptions[FilterName.Status]}
              onFilterChange={handleFilterChange}
              type={type}
            />

          </div>
        </div>
      </div>



      {/* Main product section */}
      <div className="w-full lg:w-4/5 px-5">
        <div className="flex items-center space-x-2 text-sm text-gray-700 p-4">
          <Link className="hover:text-blue-600 cursor-pointer" to={"/shop"}>Shop</Link>
          {type !== "" && (<>
            <IoIosArrowForward />
            {/* <span className="hover:text-blue-600 cursor-pointer">Eyewear</span>
          <IoIosArrowForward />  */}
            <span className="font-semibold">
              {type === "ContactLenses"
                ? "Contact Lenses"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </>)}
        </div>

        <div className="bg-white p-3 text-sm text-gray-700">

          Showing {pagenatedProduct.length} of {filterProduct.length} results

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
          ) : (
            <p>No product available</p>
          )}

        </div>
        <div>
          {visibleCount < filterProduct.length && (
            <button
              className="w-full p-5 bg-[#3C424221]  font-semibold mt-4"
              onClick={loadMore}
            >
              Load More
            </button>
          )}

          {/* <div className="text-center p-14">
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
          </div> */}
        </div>
      </div>
      {/* mobile */}
      {selectedfilter === null ? (
        <div className="flex lg:hidden fixed z-30 bottom-[70px] md:bottom-[0px] border-r-1 bg-[#FFFFFF] p-3 w-full justify-between">
          <button
            className="flex flex-col items-center w-[50%] border-r-2"
            onClick={() => SetSelectedFilter("sort")}
          >
            <div className="flex  items-center gap-3">
              <BiSortAlt2 className="text-xl text-blue-600" />
              <p className="mt-1">Sort</p>
            </div>
            <p className="text-[#9C9C9C] text-[11px]">Recommended</p>
          </button>
          <button
            className="flex flex-col items-center w-[50%] "
            onClick={() => SetSelectedFilter("filter")}
          >
            <div className="flex items-center gap-3">
              <FaFilter className="text-xl text-blue-600" />
              <p className="mt-1">Filter</p>
            </div>

            <p className="text-[#9C9C9C] text-[11px]">{appliedfilter} Applied</p>
          </button>
        </div>
      ) : (
        <div className="block lg:hidden fixed z-30 bottom-[70px]  bg-[#FFFFFF]  w-full">
          {selectedfilter === "sort" && (
            <SortComponent SetSelectedFilter={SetSelectedFilter} Sortoption={filterOptions[FilterName.Sort]} setSortOption={setFilterOptions} />
          )}
          {selectedfilter === "filter" && (
            <FilterComponent
              SetSelectedFilter={SetSelectedFilter}
              SetFilterCount={SetAppliedFilter}
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              priceRange={priceRange} setPriceRange={setPriceRange}
              UrlType={type}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default CollectionComponent;
