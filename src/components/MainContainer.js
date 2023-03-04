import React,{useEffect, useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState('Alphabetically')
  const [filterBy, setFilterBy] = useState('Tech')


  useEffect(()=> {
    fetch(`http://localhost:3001/stocks`)
    .then(r=> r.json())
    .then(stocks => setStocks(stocks))
  },[])
  function handleAddStock (stockToAdd) {
    const stockInPortfolio = portfolio.find((stock) => stock.id === stockToAdd.id)
    if(!stockInPortfolio) {
      setPortfolio ([...portfolio, stockToAdd])
    }
  }
  function handleRemoveStock(stockToRemove){
    setPortfolio((portfolio)=> {
      return portfolio.filter((stock)=> stock.id !== stockToRemove.id)
    })
  }
  
  const sortedStocks = [...stocks].sort((stock1, stock2) => {
    if(sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name)
    } else {
      return stock1.price - stock2.price
    }
  })

  const filteredStocks = sortedStocks.filter((stock) => stock.type === filterBy)

  return (
    <div>
      <SearchBar 
      sortBy={sortBy}
      onChangeSort={setSortBy}
      filterBy={filterBy}
      onChangeFilter={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer 
          onAddStock={handleAddStock} 
          stocks={filteredStocks}/>
        </div>
        <div className="col-4">
          <PortfolioContainer 
          stocks= {portfolio}
          onRemoveStock={handleRemoveStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
