/* ************************************************************************ */
/*
    
*/
import React from 'react';
import { Grid, Row, Col, Panel, Form, FormGroup, Label, FormControl } from 'react-bootstrap';

const titleCalcs = (<h5>Calculated Values</h5>);

export default class Calculations extends React.Component {

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col sm={6} md={3}>
                        <Form componentClass="fieldset" inline>
                            <Row>
                                <FormGroup controlId="recipeName" bsSize="small">
                                    <Col sm={6} md={3}>
                                        <Label>Recipe Name</Label>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <FormControl type="text" placeholder="Recipe Name"/>
                                    </Col>
                                </FormGroup>
                            </Row>
                            <br/>
                            <Row>
                                <FormGroup controlId="brewDate" bsSize="small">
                                    <Col sm={6} md={3}>
                                        <Label>Brew Date</Label>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <FormControl type="text" placeholder="Recipe Name" />
                                    </Col>
                                </FormGroup>
                            </Row>
                            <br/>
                            <Row>
                                <FormGroup controlId="style" bsSize="small">
                                    <Col sm={6} md={3}>
                                        <Label>Style</Label>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <FormControl type="text" placeholder="Recipe Name" />
                                    </Col>
                                </FormGroup>
                            </Row>
                            <br/>
                            <Row>
                                <FormGroup controlId="batchSize" bsSize="small">
                                    <Col sm={6} md={3}>
                                        <Label>Batch Size</Label>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <FormControl type="text" placeholder="Recipe Name" />
                                    </Col>
                                </FormGroup>
                            </Row>
                        </Form>
                    </Col>

                    <Col sm={6} md={3}>
                        <Panel header={titleCalcs}  bsStyle="info">
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </Panel>
                    </Col>

                </Row>
            </Grid>
        );
    }
}
