import React from 'react';
import ReactDOM from 'react-dom';
import {SearchBar, ProductTable} from './components'
import 'Styles/style.scss';


class FilterableProductTable extends React.Component {
  render () {
      return (
          <div>
              <SearchBar />
              <ProductTable products={this.props.products} />
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