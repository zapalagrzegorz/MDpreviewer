import React from 'react';
import ReactDOM from 'react-dom';
import { SearchBar, ProductTable } from './components';
import 'Styles/style.scss';


class FilterableProductTable extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            // products : this.props.products
            search: '',
            inStockOnly: false,
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }
    handleSearchChange (search) {
        // filtered list of products isn’t state because it can be computed
        // by combining the original list of products with the search text and value of the checkbox.
        this.setState({ search });
    }
    handleCheckboxChange (inStockOnly) {
        this.setState({ inStockOnly });
    }
    render () {
        const { products } = this.props;
        return (
            <div className="grid-container">
                <SearchBar
                    onInputTextChange={this.handleSearchChange}
                    onInputCheckboxChange={this.handleCheckboxChange}
                    value={this.state.search}
                    isInStock={this.state.inStockOnly} 
              />
                <ProductTable
                    products={products}
                    sortValue={this.state.search}
                    isInStock={this.state.inStockOnly}
              />
            </div>
        );
    }
}

const PRODUCTS = [
    {
        category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football',
    },
    {
        category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball',
    },
    {
        category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball',
    },
    {
        category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch',
    },
    {
        category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5',
    },
    {
        category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7',
    },
];
// ========================================

ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('root'),
);


if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
    // usuwa dotychczasowy element i uruchamia skrypt ponownie
    });
}
