import React from 'react';

class WidgetAssociation extends React.Component 
{  
  
  constructor() {
    super();
    this.state = {
      value: 'Test value.',
      search : '',
      associations: [],
      page: 1,
      limit: 3,
      showPopup: false,
      association : null,
    };

    this.handleSearchAssociationSubmit = this.handleSearchAssociationSubmit.bind(this);
    this.handleViewAssociationViewOnClick = this.handleViewAssociationViewOnClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.ShowPopup = this.ShowPopup.bind(this);
    this.HidePopup = this.HidePopup.bind(this);
  }

  componentDidMount()
  {
     /*Load all units for the user*/
    this.SearchForAssociations();
  }

  handleSearchAssociationSubmit(event) {
    event.preventDefault();
    this.SearchForAssociations();
  }

  handleViewAssociationViewOnClick(association) {

    this.setState({ showPopup: true, association : association});
  }
   
   handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  SearchForAssociations()
  {
    var path = "user/associations";
    var page = this.state.page;
    var limit = this.state.limit;
    var searchValue = this.state.search;
    $.ajax({
            url: path,
            type: 'GET',
            data: { page: page, limit:limit, searchValue: searchValue}, 
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization",this.props.user._token);
            }.bind(this),
            success: function (data)
            {
              //Put the data into the element you care about.
              var associations = data.associations;
              this.setState({
                associations: associations
              });
            }.bind(this),
            error: function (error)
            {
                console.log(error);
                 // Put whatever you need to do if the query fails here.
            }
        });
  }

  ShowPopup() 
  {
    
    var association = this.state.association;
    var verified = (association.verified) ? "verified": "no-verified";
    var verifiedClass = (association.verified) ? "verified": "noverified";
    return (
      <div className="popup-container-full">
        <div className="widget-association-popup">
          <div className="widget-association-popup-row-1" >
            <p>{association.name}</p>
          </div>
          <div className="widget-association-popup-row-2">
            <p>{"Code :" +association.code}</p>
          </div>
          <div className="widget-association-popup-row-3" >
            <p>Address</p>
          </div>
          <div className="widget-association-popup-row-4" >
            <p>{association.address}</p>
          </div>
          <div className="widget-association-popup-row-5">
            <p className={verifiedClass}>{verified}</p>
          </div>
          <div className="widget-association-popup-row-6">
            <input className="popup-back" name="" value="" type="button" onClick={this.HidePopup}/>
          </div>
        </div>
      </div>
    );
  }

  HidePopup()
  {
    this.setState({
      showPopup: false,
      association: null
    });
  }
 render() {


  var renderedResult = this.state.associations.map((association) => {
      return (
        <tr key={association.id} className="widget-association-row-container">
          <td className="widget-association-row">
            <div className="widget-association-result-photo-container">
              <img src="/img/icon-profile-picture.png" alt="Profile Picture"/>
            </div>
            <div className="widget-association-result-data-container">
              <div className="widget-association-result-name-container">
                <label>{association.name}</label>
              </div>

              <div className="widget-association-result-status-container">
                  <label className={ (association.verified) ? "verified":"noverified"}>{ (association.verified) ? "verified":"no-verified"}</label>
              </div>
            </div>
            <div className="widget-association-result-options-container">
              <button onClick={() => this.handleViewAssociationViewOnClick(association)} className="btn">View</button>
            </div>
          </td>
        </tr>
      );
    });
    return (
      <div className="widget-association-container">
        <div className="widget-association-header">
          <div className="widget-association-icone-container">
            <i className="icone-widget-association"></i>
          </div>
          <div className="widget-association-form-container">
             <div className="widget-association-title-container">
                <label>Associations</label>
             </div>

             <div className="widget-association-search-container">
                <form onSubmit={this.handleSearchAssociationSubmit}>
                  <div>
                    <input className="widget-association-search-input" name="search" type="text"  onChange={this.handleInputChange} placeholder="Go ..." />
                  </div>
                  <div>
                     <input className="widget-association-search-submit" type="submit" name="accept" value=""/>
                  </div>
                 </form>
             </div>
          </div>
        </div>

        <div className="widget-association-table">
            <table>
              <tbody>
                {renderedResult}
               
              </tbody>
            </table>
        </div>

        <div className="widget-association-pagination">
          <div className="float-right">
            <div className="widget-association-pagination-button-container">
              <div className="widget-association-preview-container">
                <input type="button" value="" className="button-preview"/>
              </div>
              <div className="widget-association-next-container">
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

export default WidgetAssociation;