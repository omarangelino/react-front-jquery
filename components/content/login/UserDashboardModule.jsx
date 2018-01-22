import React from 'react';

import WidgetProfile from './widgets/Profile'
import WidgetAssociation from './widgets/Association'
import WidgetMessage from './widgets/Message'
import WidgetUnit from './widgets/Unit'

class UserDashboardModule extends React.Component 
{

  
  render() {
    return (
      <div>
        <div className="header-body-container">
          <div className="content-header">
            <div className="title-container">
              <h2>Dashboard</h2>
            </div>
            <div className="ticket-container">
              <div className="float-right">
                <div className="text-ticket-container"> 
                  <label>Ticket:</label>
                </div>
                <div className="icone-message-container">
                  <i className="icone-message">
                    <label className="icon-text">3</label>
                  </i>
                </div>
                <div className="icone-alert-container">
                  <i className="icone-alert">
                      <label className="icon-text">10</label>
                    </i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="offsetarea">
          <div className="body-frame">
              <div className="content-body dashboard-body">
                <WidgetProfile user={this.props.user} createPopUpMessage={this.props.createPopUpMessage}/>
                <WidgetAssociation user={this.props.user} createPopUpMessage={this.props.createPopUpMessage}/>
                <WidgetMessage user={this.props.user} createPopUpMessage={this.props.createPopUpMessage}/>
                <WidgetUnit user={this.props.user} createPopUpMessage={this.props.createPopUpMessage}/>
              </div>
          </div>
        </div>
      </div>
    );
  }
}




export default UserDashboardModule;