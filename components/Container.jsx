import React from 'react';

import LogoutContainer from './content/LogoutContainer';
import LoginContainer from './content/LoginContainer';
import MenuContainer from './content/MenuContainer';


class Container extends React.Component {
  
  constructor() {
    super();
    this.state = {
      associations: null,
      selectedAssociation : null,
      menuOpen : false
    };
    this.handleClickCloseOpenMenu = this.handleClickCloseOpenMenu.bind(this);
  }

  handleClickCloseOpenMenu()
  {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }
  renderLoadContainer()
  {
    if(this.props.user)
    {
      return (
        <div className={ this.state.menuOpen ? "toggle":""}>
          <MenuContainer changeModule={this.props.changeModule} authorizedModules={this.props.authorizedModules} handleSelectAssociation={this.props.handleSelectAssociation} handleClickCloseOpenMenu={this.handleClickCloseOpenMenu}/>
          <LoginContainer  currentModule={this.props.currentModule} user={this.props.user} createPopUpMessage={this.props.createPopUpMessage}/>
        </div>
      );
    }else{

      return (
        <div >
          <LogoutContainer  currentModule={this.props.currentModule} handlerLogin={this.props.handlerLogin} loginUser={this.props.loginUser}/>
        </div>
      );
    }
  }
  render() {
    return (
      
            <div>
              {this.renderLoadContainer()}
          </div>
    );
  }
}

export default Container;