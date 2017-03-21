/* ************************************************************************ */
/*
    This portion wraps the landing page components
*/
var React = require('react');

var Purpose = require('./wells/purpose.js');
var SignupForm = require('./forms/signupform.js');

var Signup = React.createClass({
    render: function render() {
        return (
            <div>
                <Purpose />
                <SignupForm />
            </div>
        )
    }
});

module.exports = Signup;

