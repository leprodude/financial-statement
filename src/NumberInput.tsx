import React from "react";

interface NumberInputProps {
  label: string,
  name: string,
  value: React.ReactText,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  visible?: boolean,
  disabled?: boolean,
  pattern?: string,
  placeholder?: string,
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  name,
  value,
  onChange,
  visible = true,
  disabled = false,
  pattern = "[-]?[0-9]{0,7}[.]?[0-9]{0,2}",
  placeholder = "e.g. 2000 | -2000"
}) => {
  return (
    <div className="field is-inline-block">
      {visible && (
        <>
          <label className="label" htmlFor={name}>{label}</label>
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

export default NumberInput;
