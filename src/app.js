import React from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';
import 'Styles/style.scss';

function createMarkup(arg) {
  return {__html: arg};
}

function MyComponent(props) {
  return <div dangerouslySetInnerHTML={createMarkup(props.value)}  />;
}
class EssayForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '',
        code: ''
      };
      // why bind(this)?
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
      this.setState(
        {
          code: marked(this.state.value),
          value: event.target.value
        }
        
      );
    }
  
    handleSubmit(event) {
      alert('An essay was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
          <div className="grid-x padding-x">
            <div className="cell small-6"> 
              <textarea value={this.state.value} onChange={this.handleChange} />
            </div>
            <div className="cell small-6"> 
             <MyComponent value={this.state.code}/>
            </div>
          </div>
          );
    }
  }

// ========================================

ReactDOM.render(
    <EssayForm />,
    document.getElementById('root'),
);

