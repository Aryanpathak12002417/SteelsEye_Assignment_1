import styles from "./ListRow.module.css";

const ListCell = ({ children,row,setSelectedOrderDetails,setSelectedOrderTimeStamps,mykey }) => {

  function setDetails(){
    const obj={
      buySellIndicator:row.executionDetails.buySellIndicator,
      orderStatus:row.executionDetails.orderStatus,
      orderType:row.executionDetails.orderType
    }
    const obj2={
      orderReceived:row.orderReceived,
      orderStatusUpdated:row.orderStatusUpdated,
      orderSubmitted:row.orderSubmitted
    }
    setSelectedOrderDetails(obj)
    setSelectedOrderTimeStamps(obj2)
  }
  return <tr key={mykey} onClick={setDetails} className={styles.cell}>{children}</tr>;
};

export default ListCell;
