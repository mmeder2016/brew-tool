/* ************************************************************************ */
/*
    
*/
import React from 'react';
import { Grid, Row, Col, Panel, Form, FormGroup, Label, FormControl } from 'react-bootstrap';

const titleCalcs = (<h5>Calculated Values</h5>);

const calcsStyle = {
  paddingRight: "15px"
};

export default class Calculations extends React.Component {

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col sm={6} md={3}>
                        <Form componentClass="fieldset" inline>
                        <div className="center-block">
                            <Row>
                                <FormGroup controlId="recipeName">
                                    <Col sm={6} md={3}>
                                        <h3><Label>Recipe Name</Label></h3>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <FormControl type="text" placeholder="Recipe Name"/>
                                    </Col>
                                </FormGroup>
                            </Row>
                            <br/>
                            <Row>
                                <FormGroup controlId="brewDate">
                                    <Col sm={6} md={3}>
                                        <h3><Label>Brew Date</Label></h3>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <FormControl type="text" placeholder="Recipe Name" />
                                    </Col>
                                </FormGroup>
                            </Row>
                            <br/>
                            <Row>
                                <FormGroup controlId="style">
                                    <Col sm={6} md={3}>
                                        <h3><Label>Style</Label></h3>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <FormControl type="text" placeholder="Recipe Name" />
                                    </Col>
                                </FormGroup>
                            </Row>
                            <br/>
                            <Row>
                                <FormGroup controlId="batchSize">
                                    <Col sm={6} md={3}>
                                        <h3><Label>Batch Size</Label></h3>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <FormControl type="text" placeholder="Recipe Name" />
                                    </Col>
                                </FormGroup>
                            </Row>
                        </div>
                        </Form>
                    </Col>

                    <Col sm={6} md={3}>
                        <div className="center-block" style={calcsStyle}>
                        <Panel header={titleCalcs}  bsStyle="info">
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </Panel>
                        </div>
                    </Col>

                </Row>
            </Grid>
        );
    }
}
