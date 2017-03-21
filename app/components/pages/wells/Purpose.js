/* ************************************************************************ */
/*
    This is just a demonstration of a subcomponent (in this case a Boostrap
    well). It can be rendered within any other container as needed. 

    CSS Notes: The following classes (found in /public/assets/css/site.css) 
    are used here - 

        content-well 
        well-shadow

        site-font

        well-content-block
        well-block-shadow

*/
import * as React from 'react';

class Purpose extends React.Component {
    render() {
        return(
            <div className="well well-content well-content-shadow">
                <h3 className="site-font">Our Purpose...</h3>
                <div className="well-content-block well-block-shadow">
                    This is the purpose. It should be placed properly inside its containing well.
                    This is the purpose. It should be placed properly inside its containing well.
                </div>
            </div>
        );
    }
}

export { Purpose };
