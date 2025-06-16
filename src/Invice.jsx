import React from 'react';

const units = ["box", "tin", "kg", "litre", "piece"];

export default function InvoiceRow({ row, index, onChange, onDelete, hsnData }) {
  const handleItemChange = (e) => {
    const value = e.target.value;

    // Find matching HSN by description or keywords
    const match = hsnData.find(item =>
      item.description.toLowerCase().includes(value.toLowerCase()) ||
      (item.keywords || []).some(k => k.toLowerCase().includes(value.toLowerCase()))
    );

    onChange(index, {
      ...row,
      itemName: value,
      hsn: match?.hsn || "",
      gstRate: match?.gst_rate || 0
    });
  };

  const handleFieldChange = (field, value) => {
    onChange(index, { ...row, [field]: value });
  };

  // Convert quantity, rate, gstRate safely to numbers
  const quantityNum = Number(row.quantity) || 0;
  const rateNum = Number(row.rate) || 0;
  const gstRateNum = Number(row.gstRate) || 0;

  const taxableValue = quantityNum * rateNum;
  const tax = (taxableValue * gstRateNum) / 100;

  return (
    <tr>
      <td>
        <input
          type="text"
          value={row.itemName}
          onChange={handleItemChange}
          placeholder="Item Name"
        />
      </td>
      <td>
        <input
          type="text"
          value={row.hsn}
          readOnly
          placeholder="HSN Code"
        />
      </td>
      <td>
        <input
          type="number"
          value={row.gstRate}
          readOnly
          placeholder="GST Rate"
        />
      </td>
      <td>
        <select
          value={row.unit}
          onChange={e => handleFieldChange("unit", e.target.value)}
        >
          {units.map(u => (
            <option key={u} value={u}>{u}</option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="number"
          min="0"
          value={row.quantity}
          onChange={e => {
            const val = e.target.value;
            handleFieldChange("quantity", val === "" ? "" : Number(val));
          }}
          placeholder="Quantity"
        />
      </td>
      <td>
        <input
          type="number"
          min=" "
          value={row.rate}
          onChange={e => {
            const val = e.target.value;
            handleFieldChange("rate", val === "" ? "" : Number(val));
          }}
          placeholder="Rate per Unit"
        />
      </td>
      <td>{taxableValue.toFixed(2)}</td>
      <td>{tax.toFixed(2)}</td>
      <td>
        <button
          onClick={() => onDelete(index)}
          aria-label="Delete row"
          title="Delete row"
          style={{
            background: "transparent",
            border: "none",
            color: "red",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          🗑
        </button>
      </td>
    </tr>
  );
}
