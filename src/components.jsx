/* eslint-disable react/prefer-stateless-function, react/no-multi-comp */
import React from 'react';

export class SearchBar extends React.Component {
    render () {
        return (
            <form>
                <input type="text" placeholder="Search..." />
                <p>
                    <input type="checkbox" />
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
        const products = this.props.products;
        let lastCategory = null;
        products.forEach((product) => {
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow
                    category={product.category}
                    key={product.category}
                />);
            } else {
                rows.push(<ProductRow
                    // name={this.product.name}
                    // price={this.product.price}
                    product={product}
                    key={product.name}
                />);
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
        const category = this.props.category;
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
        let name = this.props.product.name;
        const price = this.props.product.price;

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

