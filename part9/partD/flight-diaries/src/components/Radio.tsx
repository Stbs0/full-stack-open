import React from "react";
export default function Radio({
  name,
  radios,
  setFunc,
}: {
  setFunc: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  radios: string[];
}) {
  return (
    <>
      {" "}
      <label htmlFor={name}>{name}</label> {"   "}
      {radios.map((radio) => (
        <div key={radio}>
          <label htmlFor={radio}>{radio}</label>
          <input
            type='radio'
            id={radio}
            name={name}
            value={radio}
            onChange={(event) => setFunc(event.target.value)}
          />
        </div>
      ))}
    </>
  );
}
