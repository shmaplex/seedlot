// components/legal/legal-content.tsx
"use client";

interface LegalBlock {
  type: "heading" | "paragraph" | "list";
  text?: string;
  items?: string[];
}

export function LegalContent({ content }: { content: LegalBlock[] }) {
  return (
    <div className="prose max-w-none text-left">
      {content.map((block, i) => {
        switch (block.type) {
          case "heading":
            return <h2 key={i as number}>{block.text}</h2>;

          case "paragraph":
            return <p key={i as number}>{block.text}</p>;

          case "list":
            return (
              <ul key={i as number}>
                {block.items?.map((item, j) => (
                  <li key={j as number}>{item}</li>
                ))}
              </ul>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
