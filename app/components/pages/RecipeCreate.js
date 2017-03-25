/* ************************************************************************ */
/*
    
*/
import React from 'react';
import { Grid, Row, Col, Panel, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

import Calculations from './panels/Calculations.js';
import Fermentables from './panels/Fermentables.js';
import Hops from './panels/Hops.js';

const titleCalcs = (<h4>Recipe Calculations</h4>);
const titleFrmnt = (<h4>Fermentables</h4>);
const titleHops = (<h4>Hops</h4>);


export default class RecipeCreate extends React.Component {

    saveClick() {
        console.log('saveClick() called');
    }

    clearClick() {
        console.log('clearClick() called');
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col>
                        <Calculations/>
                    </Col>
                </Row>
                <div className="show-grid row row-centered">
                    <div className="col-sm-12 col-centered">
                        <Button bsStyle="success" onClick={this.saveClick}>Save Recipe</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button bsStyle="danger" onClick={this.clearClick}>Clear Recipe</Button>
                    </div>
                </div>
                <br/>
                <div className="show-grid row row-centered">
                    <div className="col-sm-6 col-centered">
                        <Fermentables/>
                    </div>
                    <div className="col-sm-6 col-centered">
                        <Hops/>
                    </div>
                </div>
            </Grid>
        );
    }
}

