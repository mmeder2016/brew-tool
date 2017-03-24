/* ************************************************************************ */
/*
    
*/
import React from 'react';
import { Grid, Row, Col, Panel, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

import Calculations from './panels/Calculations.js';

const titleCalcs = (<h4>Recipe Calculations</h4>);



export default class RecipeCreate extends React.Component {

    saveClick() {
    }

    clearClick() {
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col>
                        <Panel header={titleCalcs}  bsStyle="success">
                            <Calculations/>
                        </Panel>
                    </Col>
                </Row>
                <div className="show-grid row row-centered">
                    <div className="col-sm-12 col-centered">
                        <Button bsStyle="success" onClick={this.saveClick}>Save Recipe</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button bsStyle="danger" onClick={this.clearClick}>Clear Recipe</Button>
                    </div>
                </div>
            </Grid>
        );
    }
}

