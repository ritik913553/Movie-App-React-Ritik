import React from "react";
function Dropdown({ title, options, func ,value }) {
  return (
    <div className="select my-2">
      <select   value={value === null ? "" : value}  onChange={func} name="format" id="format">
        <option value="" disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
export default Dropdown;
