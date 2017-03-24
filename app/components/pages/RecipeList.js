/* ************************************************************************ */
/*
    
*/
import React from 'react';
import { Grid, Row, Col, Panel } from 'react-bootstrap';

import Recipes from './panels/Recipes.js';

//  md={ 8 } mdOffset={ 1 }
export default class RecipeList extends React.Component {
  render() {
    return (
        <Grid>
            <Row className="show-grid">
                <Col>
                    <Panel header={ 'Recipes' }>
                        <Recipes/>
                    </Panel>
                </Col>
            </Row>
        </Grid>
    );
  }
}

