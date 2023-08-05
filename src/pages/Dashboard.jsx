import { useState,useRef,useEffect } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({
    "Click on any Order below": "To See Details"
  });
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({
    "Click on any Order below": "To See Details"
  });
  const [searchResult,setSearchResult]=useState([])
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef();
  const mockArray=mockData.results.map(item=>{
    return item["&id"]
  })

  function handleChange(e){
    setCurrency(e.target.value)
  }
  let counter=0;


  const handleOutsideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);


  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle="6 orders" />
        <div className={styles.actionBox}>
          <div className={styles.searchContainer}>
          <Search
            value={searchText}
            mockArray={mockArray}
            setSearchText={setSearchText}
            setSearchResult={setSearchResult}
            inputRef={inputRef}
            setShowResults={setShowResults}
          />
          {showResults && <div style={{position:'absolute',display:'flex',flexDirection:'column',backgroundColor:'royalblue',marginTop:'25px',maxWidth:'100%'}}>
            {searchResult.map((item)=>{
              return <div key={counter++}style={{padding:'20px',borderBottom:'1px solid black',cursor:'pointer'}}>{item}</div>
            })}
          </div>
          }
          </div>
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={handleChange}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List rows={mockData.results} currency={currency} setSelectedOrderTimeStamps={setSelectedOrderTimeStamps} setSelectedOrderDetails={setSelectedOrderDetails}/>
      </div>
    </div>
  );
};

export default Dashboard;
