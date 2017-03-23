/* ************************************************************************ */
/*
    
*/
import React from 'react';
import { Col, Panel } from 'react-bootstrap';

import Recipes from './panels/Recipes.js';

export default class RecipeList extends React.Component {
  render() {
    return (
        <Col md={ 8 } mdOffset={ 1 }>
            <Panel header={ 'Table Scroll Example' }>
                <span style={ { color: 'red' } }>
                    You can use <code>scrollTop</code> to set the table content scroll, available value is <code>Top</code>, <code>Bottom</code> and a numeric value
                </span>
                <Recipes/>
            </Panel>
        </Col>
    );
  }
}

