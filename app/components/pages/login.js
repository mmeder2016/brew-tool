/* ************************************************************************ */
/*
    This portion wraps the landing page components
*/
var React = require('react');

var Purpose = require('./wells/purpose.js');

var LoginForm = require('./forms/loginform.js');

var Login = React.createClass({
    render: function render() {
        return (
            <div>
                <Purpose />
                <LoginForm />
            </div>
        )
    }
});

module.exports = Login;

