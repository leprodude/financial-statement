import { useState } from "react";

type Input = string | number;


export default function useInputState(initialVal: Input): [Input, ((event: React.ChangeEvent<HTMLInputElement>) => void)] {
  const [value, setValue] = useState(initialVal);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = (event.target as HTMLInputElement).value as Input;
    setValue(value);
  };
  return [value, handleChange];
}