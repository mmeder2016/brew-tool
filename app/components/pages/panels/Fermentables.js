/* ************************************************************************ */
/*
    
*/
import React from 'react';
import { Grid, Row, Col, Panel, Form, FormGroup, Label, FormControl, Button } from 'react-bootstrap';
// https://github.com/pushtell/react-bootstrap-date-picker
import DatePicker from 'react-bootstrap-date-picker';

const titlePanel = (<h4>Fermentables</h4>);

export default class Fermentables extends React.Component {

    addClick() {
        console.log('addClick()');
    }

    handleChange(){
        console.log('handleChange()');
    }

    render() {
        return (
            <Panel header={titlePanel}  bsStyle="success">
                <Row className="show-grid">
                    <Col sm={12}>
                        <Form componentClass="fieldset" horizontal>
                        <div className="center-block">
                            <FormGroup controlId="fermentablesSelect">
                                <Col sm={10}>
                                    <FormControl componentClass="select" placeholder="Select" onChange={this.handleChange} >
                                        <option value="none">Select...</option>
                                        <option value="lager">Lager</option>
                                        <option value="pilsner">Pilsner</option>
                                        <option value="wiess">Wiess</option>
                                    </FormControl>
                                </Col>
                                <div className="col-sm-2 col-centered">
                                    <Button bsStyle="success" onClick={this.addClick}>Add</Button>
                                </div>
                            </FormGroup>
                        </div>
                        </Form>
                    </Col>
                </Row>
                <Row className="show-grid">
                    {this.renderFermentable(0)}
                </Row>
                <Row className="show-grid">
                    {this.renderFermentable(1)}
                </Row>
                <Row className="show-grid">
                    {this.renderFermentable(2)}
                </Row>
                <Row className="show-grid">
                    {this.renderFermentable(3)}
                </Row>
            </Panel>
        );
    }



    renderFermentable(idx)
    {
        let id = "frmnt-"+idx;

        return (
            <Form componentClass="fieldset" horizontal>
                <FormGroup controlId={id}>
                    <Col sm={1}/>
                    <Col sm={2}>
                        <FormControl type="text" placeholder="0" />
                    </Col>
                    <Col sm={1}>
                        <Label bsStyle="info">lbs</Label>
                    </Col>
                    <Col sm={2}>
                        <FormControl type="text" placeholder="0" />
                    </Col>
                    <Col sm={1}>
                        <Label bsStyle="info">oz</Label>
                    </Col>
                    <Col sm={3}>
                        <FormControl type="text" placeholder="Pilsner Malt (DE)" />
                    </Col>
                    <Col sm={2}>
                        <Button bsStyle="danger" onClick={this.addClick}>Del</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

