import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import 'Styles/style.scss';

// helper function, not a functional component
function createMarkup(arg) {
  // zwraca obiekt z property __html
  return {__html: arg};
}

// functional component
// https://reactjs.org/docs/components-and-props.html
function MDoutput(props) {
  // dangerouslySetInnerHTML to JSX attribute
  // który pozwala na dynamiczne określanie markup'u
  // czemu nie można przekazać gotowego html'a? Nie wiem, dokumentacja przekazuje to do funkcji
  return <div className="MDRenderer__output" dangerouslySetInnerHTML={createMarkup(props.value)}  />;
}

// gdy komponent klasowy odbiera props, to nie musi mieć zdefiniowanej właściwość props
// tylko gdy nie ma własnego stanu -> nie ma własnego konstruktora
// https://codepen.io/gaearon/pen/zKRGpo?editors=0010
class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // value: '',
        code: ''
      };
      // ?!
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      let newHtml = marked(event.target.value);
      this.setState(
        {
          code: newHtml,
          // value: event.target.value
        }
        
      );
    }
  
    render() {
      return (
        <section className ="MDRenderer__wrap">
          <h1 className="text-center MDRenderer__header">Markdown previewer (fcc)</h1>
          <div className="grid-container">
            <div className="grid-x grid-padding-x MDRenderer">
              <div className="cell small-12 medium-6"> 
                <textarea  className="MDRenderer__input" /* value={this.state.value} */ onChange={this.handleChange} />
              </div>
              <div className="cell small-12 medium-6"> 
              <MDoutput  value={this.state.code}/>
              </div>
            </div>
          </div>
        </section>
          );
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);

