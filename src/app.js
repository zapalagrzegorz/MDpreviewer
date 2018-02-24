import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import 'Styles/style.scss';

// custom renderer for markedJs
let renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" title=${title} href=${href}>${text}</a>`;
};

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
        initialValue: `# hello, This is Markdown Live Preview

----
## what is Markdown?
see [Wikipedia](http://en.wikipedia.org/wiki/Markdown)
        
> Markdown is a lightweight markup language, originally created by John Gruber and Aaron Swartz allowing people "to write using an easy-to-read, easy-to-write plain text format, then convert it to structurally valid XHTML (or HTML)".
        
----
## usage
1. Write markdown text in this textarea.
2. Click 'HTML Preview' button.
        
----
## markdown quick reference
# headers
        
*emphasis*
        
**strong**
        
* list
        
>block quote
        
code (4 spaces indent)
[links](http://wikipedia.org)
        
----
## changelog
* 17-Feb-2013 re-design

----
## thanks
* [markdown-js](https://github.com/evilstreak/markdown-js)`,
code: ``
      };
      // ?!
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      let newHtml = marked(event.target.value);
      this.setState(
        {
          code: newHtml,
          initialValue: event.target.value    
          // value: event.target.value
        }
        
      );
    }
    componentDidMount() {

      this.setState(
        {
          code: marked(this.state.initialValue, { renderer: renderer })
          // value: event.target.value
        });
    }
  
    render() {
      return (
        <section className ="MDRenderer__wrap">
          <h1 className="text-center MDRenderer__header">Markdown previewer (fcc)</h1>
          <div className="grid-container">
            <div className="grid-x grid-padding-x MDRenderer">
              <div className="cell small-12 medium-6"> 
                <textarea  className="MDRenderer__input" value={this.state.initialValue} onChange={this.handleChange} />
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

