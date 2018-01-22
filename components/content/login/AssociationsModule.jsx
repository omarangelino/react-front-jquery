import React from 'react';


class AssociationsModule extends React.Component {

	constructor(){
		super();
		this.state = {
			associations : [],
			total: 0,
			page: 1,
			search : '',
			limit: 1
		};

		this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
		this.SearchForAssociations = this.SearchForAssociations.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);

		this.handleOnClickJoin = this.handleOnClickJoin.bind(this);
		this.handleOnClickPage = this.handleOnClickPage.bind(this);
		this.handleOnClickPreview = this.handleOnClickPreview.bind(this);
		this.handleOnClickNext = this.handleOnClickNext.bind(this);
	}


  componentDidMount()
  {
     /*Load all units for the user*/
    this.SearchForAssociations();
  }
  

handleSearchSubmit(event){
	event.preventDefault();
	this.SearchForAssociations();
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
    var path = "associations";
    var page = this.state.page;
    var limit = this.state.limit;
    var searchValue = this.state.search;
    $.ajax({
        url: path,
        type: 'POST',
        data: {  page: page, limit:limit, searchValue:searchValue}, 
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization",this.props.user._token);
        }.bind(this),
        success: function (data)
        {
          //Put the data into the element you care about.
          var associations = data.associations;
          var total = data.total;
          this.setState({
            associations: associations,
            total: total
          });
        }.bind(this),
        error: function (error)
        {
            console.log(error);
             // Put whatever you need to do if the query fails here.
        }
    });
  }
  
  handleOnClickJoin(association)
  {
  	var path = "/association/"+association.id+"/join";
    $.ajax({
        url: path,
        type: 'POST',
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization",this.props.user._token);
        }.bind(this),
        success: function (data)
        {
          this.handlePopupMessageSuccessful(association.name,"Join Successfully!");
          this.SearchForAssociations();
        }.bind(this),
        error: function (error)
        {
            this.handlePopupMessageFail(association.name,"Join Successfully!");
             this.SearchForAssociations();
             // Put whatever you need to do if the query fails here.
        }.bind(this)
    });
  	
  }

  handleOnClickPage(page)
  {
  	console.log("Preview" + page);
  	this.setState({
        page: page
      },this.SearchForAssociations);
  }

  handleOnClickPreview()
  {
  	console.log("Preview");
  	var page = this.state.page;
  	if(page > 1)
  	{
  		page -=1;
  		this.setState({
        	page: page
      	},this.SearchForAssociations);
  	}
  	
  } 

  handleOnClickNext()
  {
  	console.log("Next");
  	var page = this.state.page;
  	if(page < this.state.total)
  	{
  		page +=1;
  		this.setState({
        	page: page
      	},this.SearchForAssociations);
  	}
  }

  handlePopupMessageSuccessful(title, message)
  {
  		var popupContainer = $( '<div class="popup-container-full">');
        var popup = $( '<div class="popup-successful">');
        var title = $( '<div class="popup-row-1"><h3 class="text-center">'+title+'</h3></div>');
        var message = $( '<div class="<div class="popup-row-2"><p>'+message+'</p></div>');
         var buttonsContainer =  $( '<div class="popup-row-3"></div>');
        var buttonOK = $( '<button class="btn">Ok</button>');
        buttonOK.click(function (e) 
        {
             popupContainer.remove();
        })
        popupContainer.append(popup);
        popup.append(title);
        popup.append(message);
        popup.append(buttonsContainer);
        buttonsContainer.append(buttonOK);
       $( "body" ).append(popupContainer);
  }

  handlePopupMessageFail(title, message)
  {
  		var popupContainer = $( '<div class="popup-container-full">');
        var popup = $( '<div class="popup-error">');
        var title = $( '<div class="popup-row-1"><h3 class="text-center">'+title+'</h3></div>');
        var message = $( '<div class="<div class="popup-row-2"><p>'+message+'</p></div>');
        var buttonsContainer =  $( '<div class="popup-row-3"></div>');
        var buttonOK = $( '<button class="btn">Ok</button>');
        buttonOK.click(function (e) 
        {
             popupContainer.remove();
        })
        popupContainer.append(popup);
        popup.append(title);
        popup.append(message);
        popup.append(buttonsContainer);
        buttonsContainer.append(buttonOK);
       $( "body" ).append(popupContainer);
  }

  handlePopupMessageAlert(title, message)
  {
  		var popupContainer = $( '<div class="popup-container-full">');
        var popup = $( '<div class="popup-alert">');
        var title = $( '<div class="popup-row-1"><h3 class="text-center">'+title+'</h3></div>');
        var message = $( '<div class="<div class="popup-row-2"><p>'+message+'</p></div>');
        var buttonsContainer =  $( '<div class="popup-row-3"></div>');
        var buttonYes = $( '<button class="btn">Yes</button>');
        buttonYes.click(function (e) 
        {
            
        })
        var buttonNo = $( '<button class="btn">No</button>');
        buttonNo.click(function (e) 
        {
             popupContainer.remove();
        })
        popupContainer.append(popup);
        popup.append(title);
        popup.append(message);
        popup.append(buttonsContainer);
        buttonsContainer.append(buttonYes);
        buttonsContainer.append(buttonNo);
       $( "body" ).append(popupContainer);
  }
  render() {
	var pagination = [];
	var previewPage = "";
	var nextPage = "";
	if(this.state.total != 0){
		var pages = Math.ceil(this.state.total/this.state.limit);
		if(this.state.page > 1)
		{
			previewPage = <div className="preview-page"><input type="submit" value="<" onClick={this.handleOnClickPreview}/></div>;
		}
		for (var i = 1; i < pages + 1; i++) 
		{
		  pagination.push(<li key={i}><input type="submit" value={i} name={i} className={(this.state.page == i)? "active":""} onClick={() => this.handleOnClickPage(i)}/></li>);
		}
		if(this.state.page < pages)
		{
			nextPage = <div className="next-page"><input type="submit" value=">" onClick={this.handleOnClickNext}/></div>;
		}
	}
	
	var renderedResult; 
	if(this.state.associations != null && this.state.associations.length > 0)
	{
		renderedResult = this.state.associations.map((association) => {
  		const id = association.id;
  		const code = association.code;
  		const name = association.name;
  		const verified = association.verified;
  		const address = association.address;

  		return (
  			<tr key={id}>
 				<td className="result-row">
 					<div className="result-col-1">
 						<div className="result-col-1-1">
 							<div className="result-logo">
 								<i/>
 							</div>
 							<div className="name-container lg-inline-flex ms-block">
	 							<div className="result-col-1-1-1">
	 								<div className="result-name-label">
	 									<p>Association</p>
	 								</div>
	 								<div className="result-name">
	 									<p>{name}</p>
	 								</div>
	         					</div>
	         					<div className="result-col-1-1-2">
	         						<div className="result-code-label">
	         							<p>Code</p>
	 								</div>
	 								<div className="result-code">
	 									<p>{code}</p>
	 								</div>
	         					</div>
         					</div>
 						</div>
 						<div className="result-col-1-2">
 							<div className="result-verified">
 								<p className={ (verified )? "verified": "no-verified" }>{(verified)? "verified": "no-verified"}</p>
								</div>
								<div className="result-join">
									<input type="submit" value="Join" className="btn" onClick={() => this.handleOnClickJoin(association)}/>
								</div>
 						</div>
 					</div>
 					<div className="result-col-2">
 						<div className="result-address-label">
 							<p>Address</p>
     					</div>
     					<div className="result-address">
     						<p>{address}</p>
     					</div>
 					</div>
 				</td>
 			</tr>
  			);
  		});
	}else{
		renderedResult = <tr><td className="result-no-result"><p>No Result</p></td></tr>;
	}
	
    return (
    	<div>
	    	<div className="header-body-container">
		      <div className="content-header">
		        <div className="title-container">
		          <h2>Associations</h2>
		        </div>
		        <div className="ticket-container">
		        </div>
		      </div>
		    </div>
		    <div className="offsetarea">
	          <div className="body-frame">
	              <div className="content-body">
	              
	              	<div className="association">
	              		<div className="header-container">
	              			<div className="header-result">
				                <div className="block text-center">
				                	<div className="flex">
						              	<div className="add-new-association">
					                 		<input type="button" value=""/>
					                 	</div>
					                 	<div className="search-form-container">
					                 		<form onSubmit={this.handleSearchSubmit}>
						                 		<div className="form-seach-input">
						                 			<input type="text" name="search" onChange={this.handleInputChange}/>
								                </div>
								                <div className="form-search-button">
								                	<input type="submit" value=""/>
								                </div>
							                </form>
						                </div>
						                <div className="section-icon">
						                 	<i/>
						                </div>
					                </div>
				                 </div>
				                 <div className="header-col-2">
				                 	<form>
				                 		{previewPage}
					                 	<div className="page-list">
					                 		<ul>
					                 			{pagination}
					                 		</ul>
					                 	</div>
					                 	{nextPage}
					                </form>
				                 </div>
			                 </div>
	                 	</div>
	                 	<div className="result-body">
		                 	<table>
		                 		<tbody>
		                 			{renderedResult}
		                 		</tbody>
	                 		</table>
	                 	</div>
	                 <div className="result-footer">
	                 	<form>
		                 	{previewPage}
		                 	<div className="page-list">
		                 		<ul>
		                 			{pagination}
		                 		</ul>
		                 	</div>
		                 	{nextPage}
	                 	</form>
	                 </div>
	                </div>
	              </div>
	          </div>
	        </div>
        </div>
    );
  }
}
 
export default AssociationsModule;