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
                    <Col sm={6}>
                        <Form componentClass="fieldset" horizontal>
                        <div className="center-block">
                                <FormGroup controlId="recipeName">
                                    <Col sm={3}>
                                        <h4><Label bsStyle="info">Recipe Name</Label></h4>
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl type="text" placeholder="Recipe Name"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="brewDate">
                                    <Col sm={3}>
                                        <h4><Label bsStyle="info">&nbsp;&nbsp;Brew&nbsp;&nbsp;Date&nbsp;</Label></h4>
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl type="text" placeholder="Recipe Name" />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="style">
                                    <Col sm={3}>
                                        <h4><Label bsStyle="info">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Style&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Label></h4>
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl type="text" placeholder="Recipe Name" />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="batchSize">
                                    <Col sm={3}>
                                        <h4><Label bsStyle="info">&nbsp;&nbsp;Batch Size&nbsp;</Label></h4>
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl type="text" placeholder="Recipe Name" />
                                    </Col>
                                </FormGroup>
                        </div>
                        </Form>
                    </Col>

                    <Col sm={6}>
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
