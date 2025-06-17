import React, { useEffect, useState } from 'react';
import InvoiceRow from './Invice';
import './App.css';

function App() {
  const [rows, setRows] = useState([]);
  const [hsnData, setHsnData] = useState([]);

  useEffect(() => {
    fetch('./hsn.json')
      .then(res => res.json())
      .then(data => setHsnData(data));
  }, []);

  const addRow = () => {
    setRows([...rows, {
      itemName: "",
      hsn: "",
      gstRate: 0,
      unit: "box",
      quantity: 1,
      rate: 0,
      cess: 0
    }]);
  };

  const updateRow = (index, updatedRow) => {
    const newRows = [...rows];
    newRows[index] = updatedRow;
    setRows(newRows);
  };

  const deleteRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const clearAll = () => setRows([]);

  const totalTaxable = rows.reduce((sum, r) => sum + r.quantity * r.rate, 0);
  const totalTax = rows.reduce((sum, r) => sum + (r.quantity * r.rate * r.gstRate) / 100, 0);
  const total = totalTaxable + totalTax;

  return (
    <div className="container">
      <h2>GST Billing Software</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>HSN</th>
            <th>GST%</th>
            <th>Unit</th>
            <th>Qty</th>
            <th>Rate (₹)</th>
            <th>Taxable (₹)</th>
            <th>CGST (₹)</th>
            <th>SGST (₹)</th>
            <th>IGST (₹)</th>
            <th>Cess (₹)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <InvoiceRow
              key={i}
              index={i}
              row={row}
              hsnData={hsnData}
              onChange={updateRow}
              onDelete={deleteRow}
            />
          ))}
        </tbody>
      </table>

      <div className="button-row">
        <button onClick={addRow}>+ Add Item</button>
        <button onClick={() => window.print()}>🧾 Print Invoice</button>
        <button onClick={clearAll} style={{ backgroundColor: '#dc3545' }}>Clear All</button>
      </div>

      <div className="total">
        <p>Subtotal: ₹{totalTaxable.toFixed(2)}</p>
        <p>GST: ₹{totalTax.toFixed(2)}</p>
        <p><strong>Total: ₹{total.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}

export default App;
