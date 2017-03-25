/* ************************************************************************ */
/*
    
*/
import React from 'react';
import { Grid, Row, Col, Panel, Form, FormGroup, Label, FormControl } from 'react-bootstrap';
// https://github.com/pushtell/react-bootstrap-date-picker
import DatePicker from 'react-bootstrap-date-picker';

const titlePanel = (<h4>Recipe Calculations</h4>);

const titleCalcs = (<h5>Calculated Values</h5>);

const calcsStyle = {
  paddingRight: "15px"
};

export default class Calculations extends React.Component {

    componentWillMount() {
        this.initializeState();
    }
    
    initializeState() {
        this.setState({
            today: new Date().toISOString(),
            recipeName: '',
            style: '',
            batchSize: '0.0'
        });
    }

    handleBrewDateChange(value, formattedValue) {
        console.log('handleBrewDateChange - '+formattedValue);
    }

    handleRecipeNameChange() {
        console.log('handleRecipeNameChange - '+this.recipeName.value);
    }

    renderStatic(text) {
        return (
            <div className="calc-border center-static">
                <FormControl.Static>{text}</FormControl.Static>
            </div>
        );
    }

    renderLabel(style, label) {
        return (
            <Label bsStyle={style}>{label}</Label>
        );
    }

    render() {
        return (
            <Panel header={titlePanel}  bsStyle="success">
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
                                        <FormControl type="text" 
                                                     placeholder="Recipe Name" 
                                                     inputRef={(ref) => {this.recipeName = ref}} 
                                                     onChange={this.handleRecipeNameChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="brewDate">
                                    <Col sm={3}>
                                        <h4><Label bsStyle="info">&nbsp;&nbsp;Brew&nbsp;&nbsp;Date&nbsp;</Label></h4>
                                    </Col>
                                    <Col sm={4}>
                                        <DatePicker id="brewdate-datepicker" value={this.state.today} onChange={this.handleBrewDateChange} />
                                    </Col>
                                    <Col sm={5}/>
                                </FormGroup>
                                <FormGroup controlId="style">
                                    <Col sm={3}>
                                        <h4><Label bsStyle="info">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Style&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Label></h4>
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl componentClass="select" placeholder="Select a Style" onChange={this.handleStyleChange} >
                                            <option value="none">Select a Style</option>
                                            <option value="lager">Lager</option>
                                            <option value="pilsner">Pilsner</option>
                                            <option value="wiess">Wiess</option>
                                        </FormControl>
                                    </Col>
                                </FormGroup>
                                <FormGroup controlId="batchSize">
                                    <Col sm={3}>
                                        <h4><Label bsStyle="info">&nbsp;&nbsp;Batch Size&nbsp;</Label></h4>
                                    </Col>
                                    <Col sm={9}>
                                        <FormControl type="text" placeholder="0.0" />
                                    </Col>
                                </FormGroup>
                            </div>
                        </Form>
                    </Col>

                    <Col sm={6}>
                        <div className="center-block" style={calcsStyle}>
                        <Panel header={titleCalcs}  bsStyle="info">
                            <Form componentClass="fieldset" horizontal>
                                <div className="center-block">
                                    <FormGroup controlId="cvOG">
                                        <Col sm={4}>
                                            {this.renderLabel("info", "O.G.")}
                                        </Col>
                                        <Col sm={4}>
                                            {this.renderStatic("0.000")}
                                        </Col>
                                        <Col sm={4} />
                                    </FormGroup>
                                    <FormGroup controlId="cvFG">
                                        <Col sm={4}>
                                            {this.renderLabel("info", "F.G.")}
                                        </Col>
                                        <Col sm={4}>
                                            {this.renderStatic("0.000")}
                                        </Col>
                                        <Col sm={4} />
                                    </FormGroup>
                                    <FormGroup controlId="cvIBU">
                                        <Col sm={4}>
                                            {this.renderLabel("info", "IBU")}
                                        </Col>
                                        <Col sm={4}>
                                            {this.renderStatic("00")}
                                        </Col>
                                        <Col sm={4} />
                                    </FormGroup>
                                    <FormGroup controlId="cvSRM">
                                        <Col sm={4}>
                                            {this.renderLabel("info", "SRM")}
                                        </Col>
                                        <Col sm={4}>
                                            {this.renderStatic("00")}
                                        </Col>
                                        <Col sm={4} />
                                    </FormGroup>
                                    <FormGroup controlId="cvABV">
                                        <Col sm={4}>
                                            {this.renderLabel("info", "ABV")}
                                        </Col>
                                        <Col sm={4}>
                                            {this.renderStatic("0.0")}
                                        </Col>
                                        <Col sm={4} />
                                    </FormGroup>
                                </div>
                            </Form>
                        </Panel>
                        </div>
                    </Col>
                </Row>
            </Grid>
            </Panel>
        );
    }
}
