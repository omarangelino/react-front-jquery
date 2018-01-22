import React from 'react';

class HeadContainer extends React.Component {
  LoadHead()
  {
    if(this.props.user)
    {
      var username =  this.props.user.username;
      return (
        <div className="header-container">
          <div className="logo-container">
               <img src="/img/logo-white.png" alt="Logo" onClick={() => this.props.changeModule("Web") }/>
          </div>
          <div className="top-menu-container">
              <div className="user-container">
                <div className="float-right">
                  <div className="profile-picture-container">
                    <img src="/img/icone-user-profile.png" alt="Logo"/>
                  </div>
                  <div className="text-user-container"> 
                    <label onClick={() => this.props.changeModule("Dashboard") }>Omar Angelino</label>
                  </div>
                </div>
              </div>
              <div className="logout-container">
                <div className="float-right">
                  <div className="icone-email-container">
                    <i className="icone-email"></i>
                  </div>
                  <div className="icone-logout-container">
                    <i className="icone-logout"></i>
                  </div>
                  <div className="text-logout-container"> 
                    <label onClick={this.props.logoutUser} >Logout</label>
                  </div>
                </div>
              </div> 
          </div>
      </div>
      );
    }else{
      return (
        <div className="header-container">
          <div className="logo-container">
               <img src="/img/logo-white.png" alt="Logo" onClick={() => this.props.changeModule("Web") }/>
          </div>
          <div className="top-menu-container">
              <div className="user-container">
                <div className="float-right">
                  <div className="text-user-container"> 
                    <label onClick={() => this.props.changeModule("Login") }>Login</label>
                  </div>
                  <div className="text-user-container"> 
                    <label onClick={() => this.props.changeModule("Register") }>Register</label>
                  </div>
                </div>
              </div>
              <div className="logout-container">
                
              </div> 
          </div>
      </div>
      );
    }
  }
  render() 
  {
    return ( 
      <div className="header-frame">
        <nav className="head">
         {this.LoadHead()}
        </nav>
      </div>
    );
  }
}

export default HeadContainer;