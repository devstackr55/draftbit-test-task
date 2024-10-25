// ViewExamples.tsx
import React, { useEffect, useState } from "react";

interface Example {
  id: number;
  some_int: number;
  some_text: string;
}

const ViewExamples: React.FC = () => {
  const [examples, setExamples] = useState<Example[] | null>(null);

  useEffect(() => {
    // Fetch examples data from backend API
    fetch("http://localhost:12346/examples")
      .then((res) => res.json())
      .then((data) => setExamples(data))
      .catch((error) => console.error("Error fetching examples:", error));
  }, []);

  return (
    <div>
      {examples ? (
        examples.map((example) => (
          <div key={example.id}>
            Int: {example.some_int}, Str: {example.some_text}
          </div>
        ))
      ) : (
        <span>Loading examples...</span>
      )}
    </div>
  );
};

export default ViewExamples;
