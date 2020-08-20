import React from "react";

export default ({
  visible = true,
  disabled = false,
  label,
  pattern = "[0-9]{0,7}",
  placeholder = "e.g. 2000",
  name,
  value,
  onChange,
}) => {
  return (
    <div class="field is-inline-block">
      {visible && (
        <>
          <label class="label">{label}</label>
          <div className="control">
            <input
              type="text"
              pattern={pattern}
              placeholder={placeholder}
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              required
              disabled={disabled}
            />
          </div>
        </>
      )}
    </div>
  );
};
