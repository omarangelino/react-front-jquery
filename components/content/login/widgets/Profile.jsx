import React from 'react';

class WidgetProfile extends React.Component 
{  
  
   constructor() {
    super();
    this.state = {
      value: 'Test value.'
    };
    this.handleEditProfileOnClick = this.handleEditProfileOnClick.bind(this);
  }
  handleEditProfileOnClick() {
    // alert('Edit user');
    
  }
  render() 
 {
      return (
           <div className="widget-profile-container">
              <div className="widget-profile-picture-container">
                <img src="/img/icon-profile-picture.png" alt="Profile Picture"/>
              </div>
              <div className="widget-profile-button-container">
                <button className="btn" onClick={this.handleEditProfileOnClick}>Edit Profile</button>
              </div>
          </div>
      );
  }
}

export default WidgetProfile;