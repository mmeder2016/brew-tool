/* ************************************************************************ */
/*
    This portion is the sign-up form panel
*/
var React = require('react');

// 
var userState = require('../utils/userstate.js');

// Utility functions for things like field type
// validation - email, password, zip, etc
var validate = require('../utils/validate.js');

// Element render functions, primarily for form
// fields.
var renderField = require('../utils/renderfield.js');

// for reference
var newUser = {
    fname: '',
    lname: '',
    uname: '',      // use input events to check uname against user db,
                    // and set a flag to true unless a match is found
    uemail: '',
    upassw: '',
    cpassw: ''
};

var errors = {};

var SignUpForm = React.createClass({

    getInitialState: function() {
        console.log('SEARCH - getInitialState');
        return {errors: {}, submitted: null, currentUser: {}}
    },

    isValid: function() {
        // the form fields we will validate
        var fields = ['fname', 'lname', 'uname', 'uemail', 'upassw']

        fields.forEach(function(field) {
            var value = this.refs[field].value.replace(/^\s+|\s+$/g, '')
            if(!value) {
                errors[field] = 'This field is required'
            }
        }.bind(this))

        // check the email address for validity
        if(!validate.checkEmail(this.refs['uemail'].value)) {
            errors['uemail'] = 'The email address is invalid.'
        }

        // check the password for match, validity and strength
        if(!validate.checkPassw(this.refs['upassw'].value, this.refs['cpassw'].value)) {
            errors['upassw'] = 'The password is not strong enough or doesn\'t match.'
        }

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
            fname: this.refs.fname.value,
            lname: this.refs.lname.value,
            uname: this.refs.uname.value,
            uemail: this.refs.uemail.value,
            upassw: this.refs.upassw.value,
            cpassw: this.refs.cpassw.value
        }
        return data
    },

    handleSubmit: function() {
        console.log('handleSubmit!')
        if(this.isValid()) {
            userState.create(this.getFormData(), function(data) {
                console.log('got a user???')
                console.log(data)
                var user = JSON.parse(JSON.stringify(data))
                this.setState({currentUser: user});

// redirect to the route - /user
                 this.context.router.push('/user');

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
                    <div className="col-sm-12">
                    <br />
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title"><strong><i className="fa fa-user-plus"></i>    Sign Up</strong></h3>
                            </div>
                            <div className="panel-body">
                                <form role="form">
                                    <div className="row">
                                        <div className="col-sm-2"></div>
                                        <div className="col-sm-4">
                                            {renderField.textInputs(['fname', 'lname'], ['First Name: ', ' Last Name: '])}
                                        </div>
                                        <div className="col-sm-4">
                                            {renderField.textInputs(['uname','upassw','cpassw'], ['User Name: ', 'User Password: ','Confirm Password: '])}
                                        </div>
                                        <div className="col-sm-2"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-2"></div>
                                        <div className="col-sm-4">
                                            {renderField.textInputs(['uemail', 'uzip'], ['email: ', 'Zip Code: '])}
                                        </div>
                                        <div className="col-sm-4">
                                            <button type="button" className="btn btn-default" id="runSignup" onClick={this.handleSubmit}><i className="fa fa-user-plus"></i> Sign Up</button>
                                        </div>
                                        <div className="col-sm-2"></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

SignUpForm.contextTypes = {router: React.PropTypes.any};

module.exports = SignUpForm;


