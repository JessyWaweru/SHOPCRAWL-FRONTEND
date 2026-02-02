import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrophy, faHistory } from "@fortawesome/free-solid-svg-icons";

function Highlights() {
  return (
    <div 
        className="flex flex-wrap justify-evenly items-center w-full md:w-3/4 m-auto min-h-[50vh] text-gray-700 bg-cover bg-center rounded-xl shadow-xl my-8 p-8"
        style={{
            backgroundImage:`url('https://images.unsplash.com/photo-1637625854255-d893202554f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1854&q=80')`
        }}
    >
      {/* Search Feature */}
      <div className="flex flex-col gap-4 items-center w-full md:w-1/3 p-4 bg-white/90 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="rounded-full h-32 w-32 bg-gray-400 flex items-center justify-center text-white text-4xl hover:bg-rose-600 transition-colors duration-300"> 
            <FontAwesomeIcon icon={faSearch} />
        </div>
        <h3 className="border-b-2 border-rose-600 pb-3 font-bold text-lg text-center">
            SEARCH PRODUCTS
        </h3>
        <p className="text-center text-sm leading-relaxed">
            Simply enter the product name, and our app will gather real-time information from the most popular e-commerce sites.
        </p>
      </div>

      {/* Rankings Feature */}
      <div className="flex flex-col gap-4 items-center w-full md:w-1/3 p-4 bg-white/90 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 mx-0 md:mx-4 my-4 md:my-0">
        <div className="rounded-full h-32 w-32 bg-gray-400 flex items-center justify-center text-white text-4xl hover:bg-rose-600 transition-colors duration-300"> 
            <FontAwesomeIcon icon={faTrophy} />
        </div>
        <h3 className="border-b-2 border-rose-600 pb-3 font-bold text-lg text-center">
            ON-DEMAND RANKINGS
        </h3>
        <p className="text-center text-sm leading-relaxed">
            The search results will be automatically ranked by cost and marginal benefits. Find exactly what works for your budget.
        </p>
      </div>
      
      {/* History Feature */}
      <div className="flex flex-col gap-4 items-center w-full md:w-1/3 p-4 bg-white/90 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="rounded-full h-32 w-32 bg-gray-400 flex items-center justify-center text-white text-4xl hover:bg-rose-600 transition-colors duration-300"> 
            <FontAwesomeIcon icon={faHistory} />
        </div>
        <h3 className="border-b-2 border-rose-600 pb-3 font-bold text-lg text-center">
            SEARCH HISTORY
        </h3>
        <p className="text-center text-sm leading-relaxed">
            Shopcrawl keeps a record of your search history, enabling easy revision of previous searches and findings.
        </p>
      </div>
    </div>
  );
}

export default Highlights;