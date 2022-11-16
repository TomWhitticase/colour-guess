import React from "react";

interface IMessageProps {
  message: string;
}

export default function Message({ message }: IMessageProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -x-translate-1/2 bg-white p-4 rounded-lg shadow-lg">
      {message}
    </div>
  );
}
