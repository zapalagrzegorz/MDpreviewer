import React from 'react';
import ReactDOM from 'react-dom';

// functional component
// https://reactjs.org/docs/components-and-props.html
export default function MDoutput (props) {
    // helper function, not a functional component
    function createMarkup (arg) {
        // zwraca obiekt z property __html
        return { __html: arg };
    }

    // dangerouslySetInnerHTML to JSX attribute
    // który pozwala na dynamiczne określanie markup'u
    // czemu nie można przekazać gotowego html'a? Nie wiem, dokumentacja przekazuje to do funkcji
    return <div className="MDRenderer__output" dangerouslySetInnerHTML={createMarkup(props.value)} />;
}
