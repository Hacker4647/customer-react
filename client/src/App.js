import React, {useState} from "react";
import "./App.css";
import dummyData from "./customers_data_data.json";



function App() {
  // console.log(dummyData)
  const customers = React.useMemo(() => dummyData, []);
  const [search, setSearch] = useState('');
  const [sortedBy, setSortedBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  const filteredAndSortedCustomers = customers
    .filter(
      (customer) =>
        customer.customer_name.toLowerCase().includes(search.toLowerCase()) ||
        customer.location.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortedBy === 'date') {
        return a.created_at.localeCompare(b.created_at);
      } 
      
      // else if (sortedBy === 'time') {
      //   return a.created_at.localeCompare(b.created_at) || a.created_at.localeTime().localeCompare(b.created_at.localeTime());
      // } 

      else {
        return 0;
      }
    });

  // Paginate data
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredAndSortedCustomers.slice(indexOfFirstRecord, indexOfLastRecord);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
     <div className="container">
     <select className="sorting-text" onChange={(e) => setSortedBy(e.target.value)}>
        <option value="">Sort by...</option>
        <option value="date">Sort by Date</option>
        {/* <option value="time">Sort by Time</option> */}
      </select>
      <p >Customer Details</p>
     <input type="text" className="text-end" placeholder="Search Name/Location..." onChange={(e) => setSearch(e.target.value)} /> 
     </div>
      <table>
        {/* Render table headers */}
        <thead>
          <tr>
            <th rowSpan={2}>S.No</th>
            <th rowSpan={2}>Customer Name</th>
            <th rowSpan={2}>Age</th>
            <th rowSpan={2}>Phone</th>
            <th rowSpan={2}> Location</th>
            <th colSpan={2}>Created At</th>
            {/* <th>Time</th> */}
          </tr>

          <tr className="nextrow">
            <th >Date</th>
            <th >Time</th>
          </tr>
        </thead>
        {/* Render table body */}
        <tbody>
          {currentRecords.map((customer, index) => (
            <tr key={index}>
              <td>{customer.sno}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{new Date(customer.created_at).toLocaleDateString()}</td>
              <td>{new Date(customer.created_at).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render pagination */}
      <div className="text-container">
        {Array.from({ length: Math.ceil(filteredAndSortedCustomers.length / recordsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} >
          Page {index + 1} 
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;

 
