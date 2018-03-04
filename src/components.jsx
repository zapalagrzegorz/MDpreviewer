/* eslint-disable react/prefer-stateless-function, react/no-multi-comp, react/prop-types */
import React from 'react';

export class SearchBar extends React.Component {
    constructor (props) {
        super(props);
        // https://reactjs.org/docs/thinking-in-react.html#step-4-identify-where-your-state-should-live
        // nie musi mieć swojego stanu, bo istnieje common owner component
        // app potrzebuje wartości value, do przekazania jej tabeli
        // this.state = {
        //     value: '',
        // };
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }
    handleChange (event) {
        // event.target.value
        // logika filtrowania
        // bez bindowania w constructor'rze this będzie oznaczało <input>
        const { value } = event.target;
        this.props.onInputTextChange(value);
        // this.setState({ value });
    }
    handleCheckboxChange () {
        // event.target.value
        // logika filtrowania
        // bez bindowania w constructor'rze this będzie oznaczało <input>
        // const { value } = event.target;
        //  =
        this.props.onInputCheckboxChange(!this.props.isInStock);
        // this.setState({ value });
    }
    render () {
        // const value = this.props.value;
        // const isInStock = this.props.isInStock;
        const { value, isInStock } = this.props;
        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={this.handleChange}
                    value={value}
                />
                <p>
                    <input
                        type="checkbox"
                        onChange={this.handleCheckboxChange}
                        // w HTML'u checked to samodzielny atrybut bez wartości
                        checked={isInStock}
                    />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        );
    }
}

export class ProductTable extends React.Component {
    render () {
        const rows = [];
        // const sortValue = this.props.sortValue;
        // const products = this.props.products;
        const { sortValue, products } = this.props;
        let lastCategory = null;
        products.forEach((product) => {
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow
                    category={product.category}
                    key={product.category}
                />);
            }
            if (sortValue === '') {
                rows.push(<ProductRow
                    // name={this.product.name}
                    // price={this.product.price}
                    product={product}
                    key={product.name}
                />);
            } else {
                const productName = product.name.toLowerCase();
                if (productName.includes(sortValue)) {
                    rows.push(<ProductRow
                        product={product}
                        key={productName}
                    />);
                }
            }
            lastCategory = product.category;
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

class ProductCategoryRow extends React.Component {
    render () {
        // const category = this.props.category;
        const { category } = this.props;
        return (
            <tr>
                <th colSpan="2">
                    {category}
                </th>
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    render () {
        // let name = this.props.product.name;
        const { price } = this.props.product;
        let { name } = this.props.product;
        if (!this.props.product.stocked) {
            name = (<span style={{ color: 'red' }}>{name}</span>);
        }
        return (
            <tr>
                <td>{name}</td>
                <td>{price}</td>
            </tr>
        );
    }
}

