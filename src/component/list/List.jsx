import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";
import timeStamps from '../../assets/timeStamps.json'

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";
import { useState } from "react";

const List = ({ rows,currency,setSelectedOrderDetails,setSelectedOrderTimeStamps}) => {
  let counter=0;
  const arr=timeStamps.results
  rows.map(item=>{
    const id=item["&id"]
    const date=arr.find(ele=>ele["&id"]===id)
    item.orderSubmitted=date.timestamps.orderSubmitted
    item.orderReceived=date.timestamps.orderReceived
    item.orderStatusUpdated=date.timestamps.orderStatusUpdated
    item.uniqueVal=counter++;
    return {id:item["&id"],submitted:date}
  })

  function setDetails(rData){
    console.log('HI')
    const obj={
      buySellIndicator:rData.executionDetails.buySellIndicator,
      orderStatus:rData.executionDetails.orderStatus,
      orderType:rData.executionDetails.orderType
    }
    setSelectedOrderDetails(obj)
  }

  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / {currency}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {rows.map((row) => (
          <ListRow key={row.uniqueVal} mykey={row["&id"]} row={row} setSelectedOrderDetails={setSelectedOrderDetails} setSelectedOrderTimeStamps={setSelectedOrderTimeStamps}  onClick={()=>setDetails(row)}>
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell >{row.orderSubmitted}</ListRowCell>
            <ListRowCell>{row.bestExecutionData.orderVolume[currency]}</ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;
