import React from "react";

import { Page, Document } from "react-pdf";
import { Components } from "@types";

export type Props = {
  file: string;
  rest: any[];
};

export const Component: Components.Presenter<Props> = ({ file, ...rest }) => {
  const [numPages, setNumPages] = React.useState(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <Document file={file} onLoadSuccess={onDocumentLoadSuccess} {...rest}>
      {Array.from(new Array(numPages), (_, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
};