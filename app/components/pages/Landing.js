/* ************************************************************************ */
/*
    This portion wraps the landing page components

    NOTE: This page is meant to be modified to suit your purposes. The well
    and the panels are only there as demonstrations.
*/
import * as React from 'react';

import { Purpose } from './wells/Purpose';
import { PanelA } from './panels/PanelA';

class Landing extends React.Component {

    render() {
        return (
            <div>
                <Purpose />
                <div className="row">
                    <div className="col-sm-4">
                        <PanelA />
                    </div>
                    <div className="col-sm-4">
                        <PanelA />
                    </div>
                    <div className="col-sm-4">
                        <PanelA />
                    </div>
                </div>
            </div>
        );
    }
}

export { Landing };

