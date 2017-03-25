/* ************************************************************************ */
/*
    
*/
import React from 'react';
import { Grid, Row, Col, Panel, Form, FormGroup, Label, FormControl } from 'react-bootstrap';
// https://github.com/pushtell/react-bootstrap-date-picker
import DatePicker from 'react-bootstrap-date-picker';

const titlePanel = (<h4>Fermentables</h4>);

export default class Fermentables extends React.Component {

    render() {
        return (
            <Panel header={titlePanel}  bsStyle="success">
                <Grid>
    
                </Grid>
            </Panel>
        );
    }

}

