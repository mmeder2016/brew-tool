/* ************************************************************************ */
/*
    
*/
import React from 'react';
import BootstrapTable from 'reactjs-bootstrap-table';

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

let columns = [
  { name: 'id', display:'Product ID' },
  { name: 'name', display:'Product Name' },
  { name: 'price', display:'Product Price' }
]

// resize={extra: 0, minSize: 200}


export default class RecipeList extends React.Component {
  render() {
    return (
        <div>
            <BootstrapTable columns={columns} headers={true} data={products} bodyHeight={'3em'} resize={{extra: 0, minSize: 100}}/>
        </div>
    );
  }
}
