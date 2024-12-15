import { useState } from "react";
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
// import useShopifyStore from "../../store/useShopifyStore";

function CollectionComponent({products=[]}) {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 30 });
  // const products = useShopifyStore((state) => state.products);

  const genderOptions = [
    "Men",
    "Women",
    "Unisex",
    "Kids",
    "Elderly",
    "Teenagers",
  ];
  const categoryOptions = ["Sunglasses", "Eyeglasses", "Contact Lenses"];
  const frameColorOptions = ["Black", "Blue", "Brown", "Gold", "Silver"];
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
    const value = parseInt(e.target.value, 10) || 0;

    setPriceRange((prev) => {
      if (type === "min" && value > prev.max) {
        return { ...prev, min: value, max: value };
      }
      if (type === "max" && value < prev.min) {
        return { ...prev, max: value, min: value };
      }

      return { ...prev, [type]: value };
    });
  };

  return (
    <div className="flex flex-col lg:flex-row relative">
      {/* Sidebar for filters */}
      <div
        className={`bg-slate-100 lg:block ${
          isopen ? "block" : "hidden"
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
                value={priceRange.min}
                onChange={(e) => handlePriceChange(e, "min")}
              />
              <span>-</span>
              <input
                type="number"
                className="border w-[125px]  py-1 px-3"
                min={1}
                value={priceRange.max}
                onChange={(e) => handlePriceChange(e, "max")}
              />
            </div>

            <div className="flex gap-10 mt-3 items-center">
              <div>
                Price: ${priceRange.min} — ${priceRange.max}
              </div>
              <button className="border bg-slate-200 px-3 py-2 hover:bg-slate-300 transition">
                Filter
              </button>
            </div>
          </div>

          <div className="p-4">
            <FilterBoxComponent header="Gender" options={genderOptions} />
            <FilterBoxComponent
              header="Product Categories"
              options={categoryOptions}
            />
            <FilterBoxComponent
              header="Frame Color"
              options={frameColorOptions}
            />
            <FilterBoxComponent
              header="Filter by Brands"
              options={brandOptions}
            />
            <FilterBoxComponent
              header="Product Status"
              options={productStatusOptions}
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
          <span className="font-semibold">Sunglasses</span>
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
          {products?.length > 0 ? (
            products.map(
              (product) =>
                product && <ProductCard key={product.id} product={product} />
            )
          ) : (
            <p>No products available</p>
          )}
        </div>
        <div>
          <button className="w-full p-5 bg-slate-300 font-semibold">
            Load More
          </button>
          <div className="text-center p-14">
            “النظارات الواقية الصناعية ضرورية لحماية العمال في البيئات التي تشكل
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
            />
          )}
        </div>
      )}
    </div>
  );
}

export default CollectionComponent;
