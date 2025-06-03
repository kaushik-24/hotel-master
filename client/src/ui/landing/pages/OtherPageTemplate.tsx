// src/ui/landing/templates/LandingPageTemplate.tsx

import React from "react";

interface LandingPageTemplateProps {
  data: {
    name: string;
  };
}

const LandingPageTemplate: React.FC<LandingPageTemplateProps> = ({ data }) => {
  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
           <h1 className="text-3xl font-bold mb-4">{data.name}</h1>

        </div>
  );
};

export default LandingPageTemplate;

