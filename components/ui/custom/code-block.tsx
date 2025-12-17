"use client";

import type { ReactNode } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  docco,
  tomorrowNight,
} from "react-syntax-highlighter/dist/esm/styles/hljs"; // Dark theme

// Define the props for the CodeBlock component
interface CodeBlockProps {
  className?: string;
  children: ReactNode; // ReactNode since children can be anything
  theme: string; // Accept the theme as a prop
  [key: string]: any; // Allow for any other props passed to SyntaxHighlighter
}

export function CodeBlock({
  className,
  children,
  theme,
  ...props
}: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "plaintext"; // Default to plaintext if no language

  // Ensure that `children` is a string
  const codeString = typeof children === "string" ? children : String(children);

  // Select style based on the current mode (dark or light)
  const syntaxStyle = theme === "dark" ? tomorrowNight : docco;

  return (
    <div className="relative overflow-x-auto max-w-[18rem]">
      <SyntaxHighlighter
        language={language}
        style={syntaxStyle} // Dynamically change the style based on theme
        PreTag="div"
        {...props}
      >
        {codeString} {/* Pass the code string to SyntaxHighlighter */}
      </SyntaxHighlighter>
    </div>
  );
}
