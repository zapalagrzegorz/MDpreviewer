import React from 'react';

// functional component
export default class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onLengthChange(event.target.value);
    } 
    
    render() {
        const length = this.props.length;
        return (
            <input type="text" size="30" value={length} onChange={this.handleChange} />
        );
    }
}
