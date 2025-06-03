// src/ui/landing/templates/RoomTemplate.tsx

import React from "react";

interface RoomTemplateProps {
  data: {
    name: string;
  };
}

const RoomTemplate: React.FC<RoomTemplateProps> = ({ data }) => {
  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">{data.name}</h1>

         </div>
  );
};

export default RoomTemplate;

