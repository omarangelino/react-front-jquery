import React from 'react';

class LoginModule extends React.Component 
{
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleLoginAttemptSubmit = this.handleLoginAttemptSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleLoginAttemptSubmit(event)
  {
      event.preventDefault();
      $.ajax({
            type: 'POST',
            url: "login",
            dataType: 'json',
            data: { email: this.state.email, password : this.state.password},
      success: function (data) {
            var user = data.user;
            this.props.loginUser(user);
      }.bind(this),
      error: function (error) {
         console.log(error);
          // Put whatever you need to do if the query fails here.
      }
      });
  }
  
   handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="flex-center position-ref full-height login-container">
        <div className="row text-center">
            <img className="big-logo" src="img/we_LOGO_BLANCO_500.png" width="auto" height="300"/>
        </div>
        <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default">
                    <div className="panel-heading">Login</div>
                    <div className="panel-body">
                        <form onSubmit={ this.handleLoginAttemptSubmit } method="POST">
                            <div>
                                <label htmlFor="email" className="col-md-4 control-label">Username</label>

                                <div className="col-md-6">
                                    <input id="email" type="text" className="form-control" name="email" onChange={this.handleInputChange} />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="col-md-4 control-label">Password</label>
                                <div className="col-md-6">
                                    <input id="password" type="password" className="form-control" name="password" onChange={this.handleInputChange} />
                                </div>
                            </div>

                            <div className="form-group">
                              <input type="hidden" name="remember" value="true"/>
                            </div>

                            <div className="form-group">
                              <div className="col-md-8 col-md-offset-4">
                                <input id="submit" type="submit" className="btn btn-primary" value="Login"/>
                                <a className="btn btn-link" id="reset" >Forgot Password?</a>
                              </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default LoginModule;