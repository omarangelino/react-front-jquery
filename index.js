import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'universal-cookie';
import Container from './components/Container'
import HeadContainer from './components/HeadContainer'

 
class App extends React.Component {

  constructor() {
    super();
    const cookies = new Cookies();
    var user = cookies.get('user');
    var module = "Dashboard";
    if(!user)
    {
       user = null;
       module = "web";
    }
    this.state = {
      user: user,
      association : null,
      authorizedModules: [], 
      currentModule: module
    };

    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.handleSelectAssociation = this.handleSelectAssociation.bind(this);
  }

  loginUser(user)
  {
    const cookies = new Cookies();
    cookies.set('user', user);
    this.setState({
      user : user
    });
  }

  logoutUser()
  {
    const cookies = new Cookies();
    cookies.remove('user');
    this.setState({
      user : null,
      currentModule: "Dashboard"
    });
  } 

  handleSelectAssociation(associationId)
  {

    var path = "user/menurole";
    $.ajax({
        url: path,
        type: 'Post',
        data: { associationId: associationId}, 
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization",this.state.user._token);
        }.bind(this),
        success: function (data)
        {
          var authorizedModules = data.accessModules;
          this.setState({
            association: associationId,
            authorizedModules: authorizedModules
          });
        }.bind(this),
        error: function (error)
        {
            this.setState({
            association: associationId,
            authorizedModules: []
          });
            console.log(error);
             // Put whatever you need to do if the query fails here.
        }.bind(this)
    });
  }
  createPopUpMessage(popupTitle,text,alert = 0,type = 0) // this will create a popup
  {
      var popupClass = 'popup_panel_message_content';
        if(alert == 1)
        {
          popupClass = 'popup_panel_alert_content';
        }else{

          popupClass = 'popup_panel_message_content';
        }
        var popupContainer = $( '<div id="message_panel" class="popup_message_panel">');
        var popup = $( '<div id="message" class="'+popupClass+'">');
        var title = $( '<div class="col-lg-12"><h3 class="text-center">'+popupTitle+'</h3></div>');
        var message = $( '<div class="col-lg-12">'+text+'</div>');
         var buttonsContainerRow =  $( '<div class="eow"></div>');
        var buttonsContainer =  $( '<div class="col-lg-12 button_container"></div>');
        popupContainer.append(popup);
        popup.append(title);
        popup.append(message);
        popup.append(buttonsContainerRow);
        buttonsContainerRow.append(buttonsContainer);
       $( "body" ).append(popupContainer);

       if(type == 0)
        {
           var buttonOK = $( '<button class="btn btn-edit">Ok</button>');

           buttonOK.click(function (e) {
             popupContainer.remove();
           })
           buttonsContainer.append(buttonOK);

        }else if(type== 1){

          var buttonYes = $( '<button class="btn btn-edit">Yes</button>');

          var buttonNo = $( '<button class="btn btn-edit">No</button>');

            buttonsContainer.append(buttonYes);
            buttonsContainer.append(" ");
            buttonsContainer.append(buttonNo);
            buttonNo.click(function (e) {
             popupContainer.remove();
           })
            buttonYes.click(function (e) {
             popupContainer.remove();
           })

            return buttonYes;
        }

        return null;
    }
  changeModule(newModule){
    this.setState({
      currentModule : newModule
    });
    console.log('Change Module Handler ' + newModule);
    return;
  }

  render() {
    return (
      <div>
        <HeadContainer changeModule={this.changeModule.bind(this)} user={this.state.user} logoutUser={this.logoutUser}/>
        <Container changeModule={this.changeModule.bind(this)} authorizedModules={this.state.authorizedModules} handleSelectAssociation={this.handleSelectAssociation} currentModule={this.state.currentModule} user={this.state.user} createPopUpMessage={this.createPopUpMessage} loginUser={this.loginUser}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

