import React from 'react';


class WidgetMessage extends React.Component 
{  
   constructor() {
    super();
    this.state = {
      message : null,
      showPopup: false,
      value: 'Test value.',
      search : '',
      messages: [],
      page: 1,
      limit: 3
    };

    this.handleSearchMessageSubmit = this.handleSearchMessageSubmit.bind(this);
    this.handleViewMessageMoreOnClick = this.handleViewMessageMoreOnClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.HidePopup = this.HidePopup.bind(this);
    this.ShowPopup = this.ShowPopup.bind(this);
  }

 componentDidMount()
  {
     /*Load all units for the user*/
    this.SearchForMessages();
  }
  

  handleSearchMessageSubmit(event) {
    event.preventDefault();
    /*Load all messages for the user*/
     this.SearchForMessages();
    
  }

  handleViewMessageMoreOnClick(message) {
     this.setState({ showPopup: true, message: message});
   
  }
   

   handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
   
  SearchForMessages()
  {
    var path = "user/messages";
    var page = this.state.page;
    var limit = this.state.limit;
    var searchValue = this.state.search;
    $.ajax({
            url: path,
            type: 'GET',
            data: {  page: page, limit:limit, searchValue:searchValue}, 
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization",this.props.user._token);
            }.bind(this),
            success: function (data)
            {
              //Put the data into the element you care about.
              var messages = data.messages;
              this.setState({
                messages: messages
              });
            }.bind(this),
            error: function (error)
            {
                console.log(error);
                 // Put whatever you need to do if the query fails here.
            }
        });
  }

handleSearchSubmit(event) {
    event.preventDefault();
    this.SearchForMessages();
  }

  ShowPopup() 
  {

    var message = this.state.message;
    return (
      <div className="popup-container-full">
        <div className="widget-ticket-popup">
        <div className="widget-ticket-popup-row-1" >
            <div className="widget-ticket-popup-row-1-1">
                
            </div>
            <div className="widget-ticket-popup-row-1-2">
                <h4>Ticket Title</h4>
            </div>
        </div>

        <div className="widget-ticket-popup-row-2">
            <div className="widget-ticket-message no-owner">
                <div className="widget-ticket-message-row-1">
                    <label>omar <span>23:11:34</span>:</label>
                </div>
                <div  className="widget-ticket-message-row-2">
                    <p>hola como estas</p>
                </div>
            </div>
            <div className="widget-ticket-message">
                <div className="widget-ticket-message-row-1">
                    <label>Valentina <span>23:11:34</span>:</label>
                </div>
                <div className="widget-ticket-message-row-2" >
                    <p>hola como estas</p>
                </div>
            </div>
        </div>

        <div className="widget-ticket-popup-row-3" >
            <input name="" type="" />
        </div>

        <div className="widget-ticket-popup-row-4">
            <div className="widget-ticket-popup-row-4-1">
                <input className="btn" value="SEND" type="button" />
            </div>
            <div className="widget-ticket-popup-row-4-2">
                <input onClick={this.HidePopup} className="popup-back" name="" type="button"/>
            </div>
        </div>
    </div>
      </div>
    );
  }

  HidePopup()
  {
    this.setState({
      showPopup: false,
      fee: null
    });
  }
 render() 
 {
  var renderedResult = this.state.messages.map((message) => {
      return (
        <tr key={message.id} className="widget-message-row-container">
          <td className="widget-message-row">
            <div className="widget-message-row-column-1">
              <div className="widget-message-result-photo-container">
                <img src="/img/icon-profile-picture.png" alt="Profile Picture"/>
              </div>
              <div className="widget-message-row-title-container">
                  <p>{message.subject}</p>
              </div>
            </div>
            <div className="widget-message-row-column-2">
              <div className="widget-message-row-name-container">
                  <p>{message.content}<span onClick={() => this.handleViewMessageMoreOnClick(message)}>More</span></p>
              </div>
            </div>
          </td>
        </tr>
      );
    });
      return (
           <div className="widget-message-container">
            <div className="widget-message-header">
              <div className="widget-message-icone-container">
              </div>
              <div className="widget-message-form-container">
                 <div className="widget-message-title-container">
                    <label>Messages</label>
                 </div>

                 <div className="widget-message-search-container">
                    <form onSubmit= {this.handleSearchMessageSubmit}>
                      
                      <div>
                         <input className="widget-message-search-submit" type="submit" name="accept" value=""/>
                      </div>
                      <div>
                        <input className="widget-message-search-input" name="search" type="text"  onChange={this.handleInputChange} placeholder="Go ..." />
                      </div>
                      
                     </form>
                 </div>
              </div>
            </div>

            <div className="widget-message-table">
                <table>
                  <tbody>
                    {renderedResult}
                  </tbody>
                </table>
            </div>
            <div className="widget-message-pagination">
              <div className="float-right">
                <div className="widget-message-pagination-button-container">
                  <div className="widget-message-preview-container">
                    <input type="button" value="" className="button-preview"/>
                  </div>
                  <div className="widget-message-next-container">
                    <input type="button" value="" className="button-next"/>
                  </div>
                </div>
              </div>
            </div>
            { this.state.showPopup ? this.ShowPopup():""}
          </div>
      );
  }
}

export default WidgetMessage;
