import Equation from '@matejmazur/react-katex';
import Modal from 'react-modal';
declare const Pdf: ({ file, children, ...rest }: {
    [x: string]: any;
    file: any;
    children: any;
}) => JSX.Element;
export { Pdf, Equation, Modal };
