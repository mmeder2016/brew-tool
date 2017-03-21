/* ************************************************************************ */
/*
    This portion is the login form panel
*/
var React = require('react');

// Helper for making AJAX requests to our API
var helpers = require('../utils/helpers');

// Utility functions for things like field type
// validation - email, password, zip, etc
var validate = require('../utils/validate');

// Element render functions, primarily for form
// fields.
var renderField = require('../utils/renderfield');

var currUser = {
    uname:  '',
    upassw: ''
};

var errors = {};

var LoginForm = React.createClass({

    getInitialState: function() {
        console.log('SEARCH - getInitialState');
        return {errors: {}, submitted: null, currentUser: {}}
    },

    isValid: function() {
        // the form fields we will validate
        var fields = ['uname', 'upassw']

        fields.forEach(function(field) {
            var value = this.refs[field].value.replace(/^\s+|\s+$/g, '')
            if(!value) {
                errors[field] = 'This field is required'
            }
        }.bind(this))

        // check the password for match, validity and strength
// probably don't need to validate here, just try to login is all...
//        if(!validate.checkPassw(this.refs['upassw'].value, this.refs['upassw'].value)) {
//            errors['upassw'] = 'The password is not strong enough or doesn\'t match.'
//        }

        // set it now, the test will reset it if necessary
        var isValid = true

        // if any errors were detected and saved then reset
        // the valid flag to false and stop checking errors
        for (var error in errors) {
            isValid = false
            console.log(error)
            break
        }

        this.setState({errors: errors})

        return isValid
    },

    getFormData: function() {
        var data = {
            uname: this.refs.uname.value,
            upassw: this.refs.upassw.value
        }
        return data
    },

    handleSubmit: function() {
        if(this.isValid()) {
            helpers.createUser(this.getFormData())
            .then(function(data) {
                console.log('got a user???')
                console.log(data.length)
                var user = JSON.parse(JSON.stringify(data))
                this.setState({currentUser: user});
            }.bind(this));
        } else {
            console.log('oops!')
            console.log(this.state.errors)
            console.log(this.props.errors)
        }
    },

    render: function() {
        return(
            <div>
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                        <br />
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title"><strong><i className="fa fa-sign-in"></i>    Log In</strong></h3>
                            </div>
                            <div className="panel-body">
                                <form role="form">
                                    <div className="row">
                                        <div className="col-sm-4"></div>
                                        <div className="col-sm-6">
                                            {renderField.textInputs(['uname','upassw'], ['User Name: ', 'User Password: '])}
                                        </div>
                                        <div className="col-sm-2"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-4"></div>
                                        <div className="col-sm-6">
                                            <button type="button" className="btn btn-default" id="runLogin" onClick={this.handleSubmit}><i className="fa fa-sign-in"></i> Log In</button>
                                        </div>
                                        <div className="col-sm-2"></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
            </div>
        )
    }
});

module.exports = LoginForm;


