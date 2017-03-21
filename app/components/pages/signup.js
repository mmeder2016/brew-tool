/* ************************************************************************ */
/*
    This portion wraps the landing page components
*/
import * as React from 'react';

import { Purpose } from './wells/Purpose';
import { SignUpForm } from './forms/signupform.js';

class SignUp extends React.Component {
    render() {
        return (
            <div>
                <Purpose />
                <SignUpForm />
            </div>
        );
    }
}

export { SignUp };

