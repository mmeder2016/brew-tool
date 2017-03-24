/* ************************************************************************ */
/*
    
*/
import React from 'react';
import { Grid, Row, Col, Panel, ButtonToolbar, Button } from 'react-bootstrap';

import Calculations from './panels/Calculations.js';

const titleCalcs = (<h4>Recipe Calculations</h4>);



export default class RecipeCreate extends React.Component {

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
            </Grid>
        );
    }
}

