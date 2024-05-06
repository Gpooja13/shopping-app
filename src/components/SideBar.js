import React, { useEffect} from "react";
import { useGlobalContext } from "@/Context/store";
import { RxCross1 } from "react-icons/rx";

const SideBar = ({
  allCategory,
  allSize,
  allColor,
  minPrice,
  maxPrice,
  filter,
  setFilter,
}) => {
  const {
    selectedColor,
    setSelectedColor,
    selectedCategory,
    setSelectedCategory,
    selectedPrice,
    setSelectedPrice,
    selectedSize,
    setSelectedSize,
    filtering,
  } = useGlobalContext();

  const clearAllFilter = () => {
    setSelectedCategory("");
    setSelectedSize("");
    setSelectedColor("");
    setSelectedPrice("");
    document.getElementById("category-0").checked = true;
    document.getElementById("color-0").checked = true;
    document.getElementById("price-range").value = maxPrice;
  };

  useEffect(() => {
    try {
      setTimeout(() => {
        document.getElementById("category-0").checked = true;
        document.getElementById("color-0").checked = true;
        document.getElementById("price-range").value = maxPrice;
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }, [filter]);

  return (
    <section
      className="float-left h-[100vh] md:w-[16vw] w-full border-r p-10 items-center sticky top-5 left-0"
      style={filter ? { display: "block" } : { display: "none" }}
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">FILTER</h2>{" "}
        <span>
          <RxCross1
            className="ml-auto cursor-pointer"
            title="Close"
            onClick={() => setFilter(!filter)}
          />
        </span>
      </div>

      <div className="mt-6 md:min-h-[70vh] min-h-[60vh] flex flex-col justify-between">
        <div>
          <span className="font-medium">Category</span>
          <div>
            {allCategory.map((elem, index) => (
              <React.Fragment key={index}>
                <input
                  type="radio"
                  id={`category-${index}`}
                  name="category"
                  value={elem}
                  className="checked:bg-indigo-500"
                  onClick={(e) => setSelectedCategory(e.target.value)}
                />
                <label htmlFor={`category-${index}`} className="text-sm mx-1">
                  {" "}
                  {elem}
                </label>
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
        <div>
          <span className="font-medium">Size</span>
          <div>
            <select
              name="size"
              id="size"
              className="text-sm pr-0"
              onClick={(e) => setSelectedSize(e.target.value)}
            >
              {allSize.map((elem) => {
                return (
                  <option value={elem} className="text-sm" key={elem}>
                    {elem}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div>
          <span className="font-medium">Color</span>
          <div>
            {allColor.map((elem, index) => {
              return (
                <input
                  type="radio"
                  id={`color-${index}`}
                  key={index}
                  name="color"
                  value={elem}
                  style={{ backgroundColor: elem }}
                  title={elem}
                  className="m-1 border-gray-500 checked:bg-indigo-500"
                  onClick={(e) => setSelectedColor(e.target.value)}
                />
              );
            })}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <span className="font-medium">Price</span>{" "}
            <span className="text-sm">{selectedPrice}</span>
          </div>
          <div>
            <input
              type="range"
              id="price-range"
              name="price-range"
              min={minPrice}
              max={maxPrice + 50}
              title="Price-range"
              step="50"
              className="h-1 accent-indigo-500 hover:accent-indigo-600"
              onChange={(e) => setSelectedPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="p-2 w-full">
          <button
            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm"
            title="Clear Filter"
            onClick={() => clearAllFilter()}
          >
            Clear All
          </button>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
