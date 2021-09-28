import React from "react";
import { highlight, languages } from "prismjs";

import { cs } from "@utils";
import { Components } from "@types";
import { CodeBlock } from "@entities";

export type Props = {
  block: CodeBlock;
  className?: string;
};

export const Component: Components.Presenter<Props> = ({
  block,
  className,
}) => {
  const { code, language } = block;
  const formattedLanguage = language.asString.toLowerCase();
  const prismLanguage = languages[formattedLanguage] || languages.javascript;
  const style = cs(`language-${formattedLanguage}`, className);

  return (
    <pre className="notion-code">
      <code
        className={style}
        dangerouslySetInnerHTML={{
          __html: highlight(code, prismLanguage, formattedLanguage),
        }}
      />
    </pre>
  );
};