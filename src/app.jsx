import React from 'react';
import ReactDOM from 'react-dom';
// import marked from 'marked';
// import highlightJs from 'highlight.js'

import 'Styles/style.scss';
import TemperatureInput from './TemperatureInput';
import MarathonVerdict from './MarathonVerdict';

// gdy komponent klasowy odbiera props, to nie musi mieć zdefiniowanej właściwość props
// tylko gdy nie ma własnego stanu -> nie ma własnego konstruktora
// https://codepen.io/gaearon/pen/zKRGpo?editors=0010
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kilo: '',
      mile: ''
    };
    // ?!
    this.handleKiloChange = this.handleKiloChange.bind(this);
    this.handleMileChange = this.handleMileChange.bind(this);
  }

  toKilos(mile) {
    return parseFloat(1 * (1.609344 * mile)).toFixed(6);
  }

  toMiles(km) {
    return parseFloat(1 * (km / 1.609344)).toFixed(6);
  }

  handleKiloChange(value) {
    const kilo = value;
    const mile = this.toMiles(kilo);
    this.setState(
      { kilo, mile }
    );
  }

  handleMileChange(value) {
    const mile = value;
    const kilo = this.toKilos(mile);
    this.setState(
      { mile, kilo }
    );
  }

  tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }

  render() {

    const kilo = this.state.kilo;
    const mile = this.state.mile;
    return (
      <div>
        <fieldset className="grid-container">
          <legend>Konwersja jednostek długości:</legend>
          Kilometry: <TemperatureInput lenght={kilo} onLengthChange={this.handleKiloChange} /><br />
          Mile: <TemperatureInput lenght={mile} onLengthChange={this.handleMileChange}/><br />
        </fieldset>
        <MarathonVerdict length={parseFloat(kilo)} />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

if (module.hot) {

  module.hot.accept();
  module.hot.dispose(() => {
    // usuwa dotychczasowy element i uruchamia skrypt ponownie
  });

}