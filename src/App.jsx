import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";
import Prouduct from "./component/Prouduct";

function App() {
  const [data, setdata] = useState([]);
  const [currentPage, setcurrentPage] = useState(0);
  const [curr, setcurr] = useState(0);
  const [originalData, setOriginalData] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);


  function filterData(e){
    let value = e.target.value
    let newData = [...data] 
    if(value == "asc"){
      newData.sort((a,b)=>a.price-b.price);
    }
    if(value=="desc"){
      newData.sort((a,b)=>b.price-a.price);
    }
    setdata(newData)
  }

  function filterRaiting(e){
  const value = e.target.value;
  let newData = [...originalData]; 

  if (value === "4star") newData = newData.filter(el => el.rating >= 4);
  if (value === "3star") newData = newData.filter(el => el.rating >= 3);
  if (value === "below") newData = newData.filter(el => el.rating < 3);

  setdata(newData);
  setcurrentPage(0);
  setcurr(0);
    
  }

  async function fetchData() {
    try {
      let response = await fetch(
        "https://dummyjson.com/products?limit=200&skip=5",
      );
      let data = await response.json();
      let { products } = data;
      setdata(products);
      setOriginalData(products);
    } catch (err) {
      console.log(err);
    }
  }

  const itemInPage = 10;
  const noOfPages = Math.ceil(data.length / itemInPage);
  const start = currentPage * itemInPage;
  const end = start + itemInPage;


  function handelPageNo(e) {
    const pageNo=Number(e.target.id);
    // console.log(e.target)
    // console.log(pageNo)
    if(pageNo || pageNo==0 ){
      setcurrentPage(pageNo);
      setcurr(pageNo)
    }
    
    
  }

  function handelArrow(e){
    const move = e.target.id
    // console.log(move)


    if(move==="left"){
      if(curr>0){
        setcurr((prev)=>prev-1)
        setcurrentPage((prev)=>curr-1)
      }

    }
    if(move==="right"){
      if(curr<noOfPages-1){
        setcurrentPage((prev)=>prev+1)
        setcurr((prev)=>prev+1)
       
      }
    }

  }

  return data.length ? (
    <div className="bg-black text-white">
      <div className="text-center text-3xl font-bold p-5">Pagination & Filters</div>
     <div className="text-center">
       <select onClick={filterData} className="p-2 mx-2 border rounded text-white capitalize">
        <option value=""> Price Filter</option>
        <option value="asc">low to High</option>
        <option value="desc">high to Low</option>
      </select>
      <select onChange={filterRaiting} className="p-2 border rounded text-white capitalize">
        <option value="">Rating Filter</option>
        <option value="all">All</option>
        <option value="4star">4⭐️ & above</option>
        <option value="3star">3⭐️ & above</option>
        <option value="below">Below 3⭐️</option>
      </select>
     </div>
      {data.slice(start, end).map((el,idx) => (
        <Prouduct key={idx} product={el} />
      ))}
      <div className="flex p-10 justify-center items-center ">
        <span id="left" onClick={handelArrow} className="text-4xl cursor-pointer">⬅️</span>
        <div id="container" className="flex-wrap flex content-center" onClick={handelPageNo}>
          {[...Array(noOfPages)].keys().map((el,idn) => (
            <span id={el} key={idn} className={`max-sm:p-1 p-2 mx-1 my-2 border-2 cursor-pointer max-sm:text-sm ${curr == el ? "bg-red-500" : ""} `}
            >
              {el}
            </span>
          ))}
        </div>
        <span id="right"  onClick={handelArrow} className="text-4xl cursor-pointer">➡️</span>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white" >
      <div className="text-center text-3xl font-bold p-5">Pagination & Filters</div>
      <div className=" text-5xl animate-bounce">😿</div>
      <div className="">No data</div>
    </div>
  );
}

export default App;
