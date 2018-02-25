import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import highlightJs from 'highlight.js'
import 'Styles/style.scss';


// custom renderer for markedJs
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" title=${title} href=${href}>${text}</a>`;
};
marked.setOptions({
  renderer: renderer,
  highlight: function (code) {
    return highlightJs.highlightAuto(code).value;
  }
});

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
        initialValue: '# This is an tag\n## This is an tag\n###### This is an h6 tag\nhttps://github.com - automatic!\n[GitHub](https://github.com)\n\nI think you should use an`<addr>` element here instead.\n\nAs Kanye West said:\n\n > We\'re living the future so\n> the present is our past.\n\n1. Item 1\n1. Item 2\n1. Item 3\n   1. Item 3a\n   1. Item 3b\n\nIf you want to embed images, this is how you do it:\n\n![Image of FCC](https://avatars2.githubusercontent.com/u/9892522?v=3&s=400)\n\nIt\'s very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to Google!](https://google.com)\n\nAnd if you\'d like to use syntax highlighting, include the language:\n```javascript\nmarked.setOptions({\n    renderer: renderer,highlight: function (code) {\n        return highlightJs.highlightAuto(code).value;\n    }\n});```',
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
          code: marked(this.state.initialValue)
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

