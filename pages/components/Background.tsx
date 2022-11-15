import React from "react";

interface IProps {
  targetColor: string;
}

export default function Background({ targetColor }: IProps) {
  return <div style={{ backgroundColor: targetColor }}>test</div>;
}
