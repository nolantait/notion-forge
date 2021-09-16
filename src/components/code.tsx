import React from "react";
import { highlight, languages } from "prismjs";

import { CodeProps } from "@types";

export const Code = ({
  code,
  language = "javascript",
}: CodeProps): JSX.Element => {
  const languageL = language.toLowerCase();
  const prismLanguage = languages[languageL] || languages.javascript;

  return (
    <pre className="notion-code">
      <code
        className={`language-${languageL}`}
        dangerouslySetInnerHTML={{
          __html: highlight(code, prismLanguage, language),
        }}
      />
    </pre>
  );
};
