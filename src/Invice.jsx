import React from 'react';

const uqcOptions = [
  { code: 'box', label: 'Box' },
  { code: 'pcs', label: 'Pieces' },
  { code: 'kg', label: 'Kilogram' },
  { code: 'lt', label: 'Litre' }
];

const gstSlabs = [0, 5, 12, 18, 28];

export default function InvoiceRow({ row, index, onChange, onDelete, hsnData }) {
  const handleItemChange = (e) => {
    const value = e.target.value;
    const match = hsnData.find(item =>
      item.description?.toLowerCase().includes(value.toLowerCase()) ||
      (item.keywords || []).some(k => k.toLowerCase().includes(value.toLowerCase()))
    );
    onChange(index, {
      ...row,
      itemName: value,
      hsn: match?.hsn || "",
      gstRate: match?.gst_rate || 0,
      description: match?.description || "",
      unit: match?.uqc || row.unit
    });
  };

  const handleFieldChange = (field, value) => {
    onChange(index, { ...row, [field]: value });
  };

  const qty = Number(row.quantity) || 0;
  const rate = Number(row.rate) || 0;
  const gstRate = Number(row.gstRate) || 0;
  const taxable = qty * rate;

  const halfGST = ((taxable * gstRate) / 200).toFixed(2); // CGST and SGST
  const fullGST = ((taxable * gstRate) / 100).toFixed(2); // IGST
  const cess = Number(row.cess || 0).toFixed(2);

  return (
    <tr>
      <td>
        <input type="text" value={row.itemName} onChange={handleItemChange} />
        {row.description && <small>{row.description}</small>}
      </td>
      <td><input type="text" value={row.hsn} readOnly /></td>
      <td>
        <select value={row.gstRate} onChange={e => handleFieldChange("gstRate", Number(e.target.value))}>
          {gstSlabs.map(rate => <option key={rate} value={rate}>{rate}%</option>)}
        </select>
      </td>
      <td>
        <select value={row.unit} onChange={e => handleFieldChange("unit", e.target.value)}>
          {uqcOptions.map(u => <option key={u.code} value={u.code}>{u.label}</option>)}
        </select>
      </td>
      <td>
        <input type="text" value={row.quantity} onChange={e => handleFieldChange("quantity", Number(e.target.value))} />
      </td>
      <td>
        <input type="text" value={row.rate} onChange={e => handleFieldChange("rate", Number(e.target.value))} />
      </td>
      <td>₹{taxable.toFixed(2)}</td>
      <td>₹{halfGST}</td>
      <td>₹{halfGST}</td>
      <td>₹{fullGST}</td>
      <td>
        <input
          type="number"
          value={row.cess}
          onChange={e => handleFieldChange("cess", Number(e.target.value))}
          style={{ width: "60px" }}
        />
      </td>
      <td>
        <button onClick={() => onDelete(index)} style={{ color: 'red', border: 'none', background: 'transparent' }}>🗑</button>
      </td>
    </tr>
  );
}
