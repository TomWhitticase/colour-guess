import React from "react";

interface IProgressProviderProps {
  valueStart: number;
  valueEnd: number;
  children: any;
}

export default function ProgressProvider({
  valueStart,
  valueEnd,
  children,
}: IProgressProviderProps) {
  const [value, setValue] = React.useState(valueStart);
  React.useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return children(value);
}
