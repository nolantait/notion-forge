import React from "react";
import { Page, Document } from "react-pdf";
import Modal from "react-modal";

interface PdfProps {
  file: string;
  children: React.ReactNode;
}

const Pdf: React.FC<PdfProps> = ({ file, children, ...rest }) => {
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

export { Pdf, Modal };
