import React from "react";
import { highlight, languages } from "prismjs";

import { cs } from "@utils";
import { View } from "@types";
import { Entity as CodeBlock } from "./";
import { Decorated } from "@entities";

export type Props = {
  block: CodeBlock;
  className?: string;
};

export const CodeComponent: View.Component<Props> = ({ block, className }) => {
  const code = block.code;
  const language = block.language.getOrElse(Decorated.fromString("javascript"));
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
