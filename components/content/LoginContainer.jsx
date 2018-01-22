import React from 'react';

import WebModule from './global/WebModule';
import UserDashboardModule from './login/UserDashboardModule';
import ProfileModule from './login/ProfileModule';


import AssociationsModule from './login/AssociationsModule';
import UnitsModule from './login/UnitsModule';
import ExpensesModule from './login/ExpensesModule';
import FeesModule from './login/FeesModule';
import ConfigurationsModule from './login/ConfigurationsModule';
import InvoicesModule from './login/InvoicesModule';
import UsersModule from './login/UsersModule';
import PostsModule from './login/PostsModule';
import IncomesModule from './login/IncomesModule';
class LoginContainer extends React.Component 
{  
  renderLoadModule()
  {
    switch(this.props.currentModule) 
    {
      case "Dashboard":
        return (
        <UserDashboardModule user={this.props.user}  createPopopMessage={this.props.user} createPopUpMessage={this.props.createPopUpMessage}/>
        );
        break;
      case "Profile":
        return (
          <ProfileModule user={this.props.user}/>
        );
        break;
      case "Users":
        return (
          <UsersModule/>
        );
        break;
      case "Units":
        return (
          <UnitsModule/>
        );
        break;
      case "Posts":
        return (
          <PostsModule/>
        );
        break;
      case "Incomes":
        return (
          <IncomesModule/>
        );
        break;
      case "Invoices":
        return (
          <InvoicesModule/>
        );
        break;
      case "Expenses":
        return (
          <ExpensesModule/>
        );
        break;
      case "Fees":
        return (
          <FeesModule/>
        );
        break;
        case "Associations":
        return (
          <AssociationsModule user={this.props.user}/>
        );
        break;
      case "Configurations":
        return (
          <ConfigurationsModule/>
        );
        break;
      default:
        return (
        <UserDashboardModule user={this.props.user}  createPopopMessage={this.props.user} createPopUpMessage={this.props.createPopUpMessage}/>
        );
        break;
    }
  }
    
 render() {
    return (
      <div className="">{this.renderLoadModule()}</div>
    );
  }
}

export default LoginContainer;