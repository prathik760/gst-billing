import React, { useState, useEffect } from 'react';
import hsnData from './hsn.json'; // Make sure this path is correct

const HSNTable = () => {
  const [hsnCodes, setHsnCodes] = useState([]);

  useEffect(() => {
    setHsnCodes(hsnData); // Directly using imported JSON data
  }, []);

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>HSN Code List</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th>HSN Code</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {hsnCodes.length === 0 ? (
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>No HSN data found.</td>
            </tr>
          ) : (
            hsnCodes.map((item, index) => (
              <tr key={index}>
                <td>{item.code}</td>
                <td>{item.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HSNTable;
