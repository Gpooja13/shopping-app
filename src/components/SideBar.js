import React, { useEffect, useState } from "react";

const SideBar = ({allCategory,allColor }) => {


  useEffect(() => {
  
  }, []);

  return (
    <section className="float-left h-[100vh] md:w-[15vw] border-r p-10">
      <h2 className="font-semibold">FILTER</h2>
      <div className="mt-6 min-h-[60vh] flex flex-col justify-between">
        <div>
          <span className="font-medium">Category</span>
          <div>
            {allCategory.map((elem, index) => (
              <React.Fragment key={index}>
                <input
                  type="checkbox"
                  id={`category-${index}`}
                  name="category"
                  value={elem}
                />
                <label htmlFor={`category-${index}`} className="text-sm"> {elem}</label><br/>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div>
          <span className="font-medium">Brand</span>
          <div>
            <select name="brand" id="brand" className="text-sm pr-0">
              {allColor.map((elem) => {
                return (
                  <option value={elem} className="text-sm">
                   {elem}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div>
          <span>Color</span>
          <div>{
            allColor.map((elem)=>{
              return (<button key={elem} className="rounded-full m-1" style={{backgroundColor:elem}}>o</button>)
            })
          }</div>
        </div>
        <div>
          <span>Price</span>
          <div></div>
        </div>
      </div>
    </section>
  );
};

export default SideBar;
