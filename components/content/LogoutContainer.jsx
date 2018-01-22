import React from 'react';

import WebModule from './global/WebModule';
import LoginModule from './logout/LoginModule';
import RegisterModule from './logout/RegisterModule';

class LogoutContainer extends React.Component 
{  
  renderLoadModule()
  {

    if (this.props.currentModule == "Web") 
    {
      return (
        <WebModule user={this.props.user}/>
      );
         
    }else if (this.props.currentModule == "Login")
    {
      return (
          <LoginModule user={this.props.user} loginUser={this.props.loginUser}/>
      );
      
    }else if (this.props.currentModule == "Register")
    {
      return (
          <RegisterModule user={this.props.user}/>
      );
      
    }else {
      return;
    }
  }
   
 render() {
    return (
      <div className="">{this.renderLoadModule()}</div>
    );
  }
}




export default LogoutContainer;