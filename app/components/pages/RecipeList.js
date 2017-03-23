/* ************************************************************************ */
/*
    
*/
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id: id,
      name: 'Item name ' + id,
      price: 2100 + i
    });
  }
}

addProducts(20);

export default class RecipeList extends React.Component {
  render() {
    return (
        

                    <BootstrapTable data={ products } maxHeight='175px' scrollTop={ 'Bottom' }>
                        <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                    </BootstrapTable>
    );
  }
}

/*

        <div className="panel panel-default">
            <div className="panel-heading">Table Scroll Example</div>
            <div className="panel-body panel-body-content">
                <div className="react-bs-table-container">
                    <BootstrapTable data={ products } maxHeight='175px' scrollTop={ 'Bottom' }>
                        <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        </div>

*/