/* ************************************************************************ */
/*
    
*/
import React from 'react';
import { Grid, Row, Col, Panel, ButtonToolbar, Button } from 'react-bootstrap';

import Recipes from './panels/Recipes.js';

const title = (<span><h2>Recipes</h2> <i>Click to edit</i></span>);


//  md={ 8 } mdOffset={ 1 }
export default class RecipeList extends React.Component {

    createClick() {
        console.log('create recipe click');
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col>
                        <Panel header={title}  bsStyle="success">
                            <Recipes/>
                        </Panel>
                    </Col>
                </Row>
                <Row><Col>
                    <ButtonToolbar>
                        <Button bsStyle="success" onClick={this.createClick}>Create a Recipe</Button>
                    </ButtonToolbar>
                </Col></Row>
            </Grid>
        );
    }
}

