import React from 'react';


class WidgetUnit extends React.Component {


  constructor() {
    super();
     var  currentDate = new Date();
     this.state = {
      selectedUnit: null,
      selectedDate: {month : currentDate.getMonth() + 1, year :  currentDate.getFullYear()},
      fees: [],
      invoices: [],
      events: [],
      feeSearch: {limit: 3, page : 1, total: 0},
      invoiceSearch: {limit: 3, page : 1, total: 0},
      eventSearch: {limit: 3, page : 1, total: 0}
    };
    this.handleSelectUnit = this.handleSelectUnit.bind(this);
    this.handleSelectDate = this.handleSelectDate.bind(this);
    this.handleNextMonth = this.handleNextMonth.bind(this);
    this.handlePreviewMonth = this.handlePreviewMonth.bind(this);
    this.SearchForInvoices = this.SearchForInvoices.bind(this);
    this.SearchForEvents = this.SearchForEvents.bind(this);
    this.SearchForFees = this.SearchForFees.bind(this);

    this.handleNextPageInvoices = this.handleNextPageInvoices.bind(this);
    this.handlePreviewPageInvoices = this.handlePreviewPageInvoices.bind(this);
    this.handleNextPageFees = this.handleNextPageFees.bind(this);
    this.handlePreviewPageFees = this.handlePreviewPageFees.bind(this);
    this.LoadData = this.LoadData.bind(this);
    this.LoadDataAll = this.LoadDataAll.bind(this);
  }


  handleSelectUnit(unit)
  {
    this.setState({
      selectedUnit: unit
    },
    this.LoadDataAll
    );
  }

  LoadDataAll()
  {
    this.SearchForInvoices();
    this.SearchForEvents();
    this.SearchForFees();
  }

  LoadData()
  {
     this.SearchForInvoices();
    this.SearchForFees();
  }
  handleSelectDate(value)
  {
    this.setState({
      selectedDate: value
    },
    this.LoadData);
  } 

  handleNextMonth()
  {

    var newDate = this.state.selectedDate
    if(newDate.month == 12)
    {
      newDate.month = 1;
      newDate.year += 1;
    }else{
      newDate.month += 1;
    }
    this.handleSelectDate(newDate);
  }

  handlePreviewMonth()
  {

    var newDate = this.state.selectedDate
    if(newDate.month == 1)
    {
      newDate.month = 12;
      newDate.year -= 1;
    }else{
      newDate.month -= 1;
    }
    this.handleSelectDate(newDate);
  }

  SearchForInvoices()
  {
    var path = "unit/"+this.state.selectedUnit.id+"/invoices";
    var page = this.state.invoiceSearch.page;
    var limit = this.state.invoiceSearch.limit;
    var unitId = this.state.selectedUnit.id;
    var month = this.state.selectedDate.month;
    var year = this.state.selectedDate.year;
    $.ajax({
            url: path,
            type: 'GET',
            data: {  unitId:unitId,month: month, year: year, page: page, limit:limit}, 
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization",this.props.user._token);
            }.bind(this),
            success: function (data)
            {
              //Put the data into the element you care about.
              var invoices = data.invoices;
              var invoiceSearch = this.state.invoiceSearch;
              invoiceSearch.total = data.total;
              this.setState({
                invoices: invoices,
                invoiceSearch: invoiceSearch
              });
            }.bind(this),
            error: function (error)
            {
                console.log(error);
                 // Put whatever you need to do if the query fails here.
            }
        });
  }

  handleNextPageInvoices()
  {
    var invoiceSearch = this.state.invoiceSearch;
    if(invoiceSearch.total > invoiceSearch.limit * invoiceSearch.page)
    {
      invoiceSearch.page++;
      this.setState({
        invoiceSearch: invoiceSearch
      },
      this.SearchForInvoices);
    }
  }

  handlePreviewPageInvoices()
  {
    var invoiceSearch = this.state.invoiceSearch;
    if(invoiceSearch.page > 1)
    {
      invoiceSearch.page--;
      this.setState({
        invoiceSearch: invoiceSearch
      },
      this.SearchForInvoices);
      
    }
  }


   SearchForEvents()
  {
    var path = "unit/"+this.state.selectedUnit.id+"/events";
    var month = this.state.selectedDate.month;
    var year = this.state.selectedDate.year;
    var unitId = this.state.selectedUnit.id;
    $.ajax({
            url: path,
            type: 'GET',
            data: { unitId:unitId,month: month, year: year,}, 
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization",this.props.user._token);
            }.bind(this),
            success: function (data)
            {
                // Put the data into the element you care about.
                var events = data.events;
                this.setState({
                events: events
              });
            }.bind(this),
            error: function (error)
            {
                console.log(error);
                 // Put whatever you need to do if the query fails here.
            }
        });
  }


  SearchForFees()
  {
    var path = "unit/"+this.state.selectedUnit.id+"/fees";
    var page = this.state.feeSearch.page;
    var limit = this.state.feeSearch.limit;
    var unitId = this.state.selectedUnit.id;
    var month = this.state.selectedDate.month;
    var year = this.state.selectedDate.year;
   $.ajax({
            url: path,
            type: 'GET',
            data: { unitId:unitId, month: month, year:year, page: page, limit:limit}, 
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization",this.props.user._token);
            }.bind(this),
            success: function (data)
            {
                // Put the data into the element you care about.
                var fees = data.fees;
                 var feeSearch = this.state.feeSearch;
                 feeSearch.total = data.total;
                this.setState({
                  fees: fees,
                  feeSearch: feeSearch
                });
            }.bind(this),
            error: function (error)
            {
                console.log(error);
                 // Put whatever you need to do if the query fails here.
            }
        });
  }


  handleNextPageFees(){
    var feeSearch = this.state.feeSearch;
    if(feeSearch.total > feeSearch.limit * feeSearch.page)
    {
      feeSearch.page++;
      this.setState({
        feeSearch: feeSearch
      }, this.SearchForFees);
    }
  }

  handlePreviewPageFees(){
    var feeSearch = this.state.feeSearch;
    if(feeSearch.page > 1)
    {
      feeSearch.page--;
      this.setState({
        feeSearch: feeSearch
      },this.SearchForFees);
    }
  }


  renderUnitWidgets()
  {
    if(this.state.selectedUnit)
    {

    }
  }
  render() {
    return (
       <div className="widget-unit-container">
          <WidgetUnitSearch user={this.props.user} handleSelectUnit={this.handleSelectUnit} selectedUnit={this.state.selectedUnit}/>
          {(this.state.selectedUnit) ?  <WidgetUnitInformation selectedUnit={this.state.selectedUnit}/>: ""}
          {(this.state.selectedUnit) ?  <WidgetDatePicker handleSelectDate={this.handleSelectDate} selectedDate={this.state.selectedDate} />: ""}
          {(this.state.selectedUnit) ?  <WidgetUnitCalender user={this.props.user} fees={this.state.fees} invoices={this.state.invoices} events={this.state.events} selectedUnit={this.state.selectedUnit} selectedDate={this.state.selectedDate} handlePreviewMonth={this.handlePreviewMonth} handleNextMonth={this.handleNextMonth} handleEventsResult={this.handleEventsResult}/>: ""}
          {(this.state.selectedUnit) ?  <WidgetUnitFee user={this.props.user} fees={this.state.fees} selectedUnit={this.state.selectedUnit} selectedDate={this.state.selectedDate} handlePreviewMonth={this.handlePreviewMonth} handleNextMonth={this.handleNextMonth} handleFeesResult={this.handleFeesResult} handleNextPageFees={this.handleNextPageFees} handlePreviewPageFees={this.handlePreviewPageFees}/>: ""}
          {(this.state.selectedUnit) ?  <WidgetUnitInvoice user={this.props.user} invoices={this.state.invoices} selectedUnit={this.state.selectedUnit} selectedDate={this.state.selectedDate} handleInvoicesResult={this.handleInvoicesResult}   handleNextPageInvoices={this.handleNextPageInvoices} handlePreviewPageInvoices={this.handlePreviewPageInvoices}/> : ""}
       </div>
    );
  }
}

class WidgetUnitSearch extends React.Component 
{
  constructor() {
    super();
    this.state = {
      value: 'Test value.',
      search : '',
      page: null,
      limit: null,
      by: null,
      order: null,
      panelOpen: false,
      units: []
    };
    this.handleSearchUnitSubmit = this.handleSearchUnitSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleToogleButtonClick = this.handleToogleButtonClick.bind(this);
    this.SearchForUnits = this.SearchForUnits.bind(this);
  }

  componentDidMount()
  {
     /*Load all units for the user*/
    this.SearchForUnits();
  }

  SearchForUnits()
  {
    var path = "user/units";
    var searchValue = this.state.search;
    var page = this.state.page;
    var limit = this.state.limit;
    var by = this.state.by;
    var order = this.state.order;
    $.ajax({
            url: path,
            type: 'GET',
            data: { searchvalue : searchValue, page: page, limit:limit, by:by, order: order}, 
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization",this.props.user._token);
            }.bind(this),
            success: function (data)
            {
                // Put the data into the element you care about.
                 $("#select_unit").html("");
                var units = data.units;
                
                this.setState({
                  units: units
                });

                $('#select_unit').trigger("change");

            }.bind(this),
            error: function (error)
            {
                console.log(error);
                 // Put whatever you need to do if the query fails here.
            }
        });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  } 

  handleSearchUnitSubmit(event) {
    event.preventDefault();
    this.SearchForUnits();
  }

  handleToogleButtonClick()
  {
    this.setState({
      panelOpen: !this.state.panelOpen
    });
  }

  render() {
 
    var renderedResult = this.state.units.map((unit) => {
      const id =  unit.id;
      const name =  unit.name;
      return (

        <tr key={id} className="widget-unit-row-container">
          <td className={ "widget-unit-row" + ( this.props.selectedUnit ? ((id == this.props.selectedUnit.id) ? ' active' : '') : ''  )} onClick={ () => this.props.handleSelectUnit(unit)}>
            <div className="widget-unit-result-icon-container">
              <i> </i>
            </div>
            <div className="widget-unit-result-data-container">
              <div className="widget-unit-result-name-container">
                  <label>{name}</label>
              </div>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <div className="widget-search-unit-container">
        <div className="widget-unit-header">
          <div className="widget-unit-form-container">
             <div className="widget-unit-title-container">
                <label>Units</label>
             </div>
 
             <div className="widget-unit-search-container">
                <form onSubmit= {this.handleSearchUnitSubmit}>
                  <div>
                    <input className="widget-unit-search-input" name="search" type="text"  onChange={this.handleInputChange} placeholder="Go ..." />
                  </div>
                  <div>
                     <input className="widget-unit-search-submit" type="submit" name="accept" value=""/>
                  </div>
                 </form>
             </div>
          </div>
          <div className="widget-unit-button-toggle-result-container">
            <input type="button" value="" onClick={this.handleToogleButtonClick} className={(this.state.panelOpen ? ' active' : '')}/>
          </div>
        </div>

        <div className={"widget-unit-table" + (this.state.panelOpen ? ' toggle' : '')}>
          <table>
            <tbody>
              {renderedResult}
            </tbody>
          </table>
          <div className="widget-unit-pagination">
            <div className="float-right">
              <div className="widget-unit-pagination-button-container">
                <div className="widget-unit-preview-container">
                  <input type="button" value="" className="button-preview"/>
                </div>
                <div className="widget-unit-next-container">
                  <input type="button" value="" className="button-next"/>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
 
class WidgetUnitInformation extends React.Component {
  render() {
    return (
      <div className="widget-unit-information">
        <div className="widget-unit-information-row-1">
          <div className="widget-unit-information-label-name">
            <label>Name</label>
          </div>
          <div className="widget-unit-information-label-address">
            <label>Address</label>
          </div>
        </div>
        <div className="widget-unit-information-row-2">
          <div className="widget-unit-information-text-name">
            <p>{this.props.selectedUnit.name}</p>
          </div>
          <div className="widget-unit-information-text-address">
            <p>{this.props.selectedUnit.address}</p>
          </div>
        </div>

        <div className="widget-unit-information-row-3">
          <div className="widget-unit-information-label-phone">
            <label>Phone</label>
          </div>
          <div className="widget-unit-information-text-phone">
            <label>{this.props.selectedUnit.phone}</label>
          </div>

          <div className="widget-unit-information-button-payment">
            <input type="button" className="btn" value="Register Payment"/>
           </div>
        </div>
      </div>
    );
  }
}

class WidgetDatePicker extends React.Component {

 constructor()
 {
  super();
  this.handleMonthChange =this.handleMonthChange.bind(this);
  this.handleYearChange =this.handleYearChange.bind(this);
 }
  handleMonthChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if(value < 13 && value > 0)
    {
      var selectedDate = this.props.selectedDate;
      selectedDate.month = value;
      this.props.handleSelectDate(selectedDate);
    }
  }
  handleYearChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if(value < 2018 && value > 2009)
    {
      var selectedDate = this.props.selectedDate;
      selectedDate.year = value;
      this.props.handleSelectDate(selectedDate);
    } 
  } 


  render() {

    

    return (
      <div className="widget-unit-date-picker">
        <div className="widget-unit-date-picker-row-1">
          <form>
            <div className="widget-unit-date-picker-month-container">
              <div className="widget-unit-date-picker-month-label">
                <p>Month</p>
              </div>
               <div className="widget-unit-date-picker-month-text">
                <input type="number" value={this.props.selectedDate.month} name="month" onChange={this.handleMonthChange}/>
              </div>
               <div className="widget-unit-date-picker-month-button">
                <input type="submit" value=""/>
              </div>
            </div>

            <div className="widget-unit-date-picker-year-container">
              <div className="widget-unit-date-picker-year-label">
                <p>Year</p>
              </div>
               <div className="widget-unit-date-picker-year-text">
                <input type="number" value={this.props.selectedDate.year} name="year" onChange={this.handleYearChange}/>
              </div>
               <div className="widget-unit-date-picker-year-button">
                <input type="submit" value=""/>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

class WidgetUnitCalender extends React.Component {

constructor() {
    super();
    var  currentDate = new Date();
    this.state = {
      currentDate: {month : currentDate.getMonth() + 1, year :  currentDate.getFullYear(), day :currentDate.getDate()}
    };
    this.renderWeekCalendar = this.renderWeekCalendar.bind(this);
  }

 renderWeekCalendar()
 {
      var month = this.props.selectedDate.month;
      var year =  this.props.selectedDate.year;

      var d = new Date(year, month-1, 1);
      var maxDays = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();

      var i = 0;
      var n = d.getDay();
      var weeks = [];
      var newmonth = true;
      var x = 0;
      while( i < maxDays)
      { 
        var week = { days : null, key: null};
        var days = [];
        x++;
        for(var j= n ; j < 7 ; j++)
        {
            var day = {day : null, key: null};
            if(i < maxDays)
            {
                if(newmonth)
                {
                    for(var z = 0; z <  n; z++)
                    {
                      var daySpace = {day : null, key: null};
                      daySpace.day = 0;
                      daySpace.key = "day-space-" + z;
                      days.push(daySpace);
                    }
                    newmonth = false;
                }
                day.day = i + 1;
                day.key = "day-"+(1 + i);
                days.push(day);
                i++;
            }
        }
        n = 0;
        week.days = days;
        week.keyWeek = "week-"+x;
        weeks.push(week);
      }

      var renderResult = weeks.map((week) => {
          var rowKey = week.keyWeek;
          var renderRowCalener = week.days.map((day) => {
              
                if(day.day == 0)
                {
                  return (
                    <td id={day.key} key={day.key}>
                      <p></p>
                    </td>
                  );
                }else if( 32>day.day  && day.day >0 ){
                  return (
                    <td id={day.key} key={day.key}>
                      <p>{day.day}</p>
                    </td>
                  );
                }
              });
        
        return (
            <tr id={rowKey} key={rowKey}>
              {renderRowCalener}
            </tr>
          );
      });
      return renderResult;
    }

  render() {
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    var monthNameAve = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month = monthNames[this.props.selectedDate.month-1];
    var currentMonth =   monthNameAve[this.state.currentDate.month-1];
    return (
      <div className="widget-unit-calendar-container">
        <div className="widget-unit-calendar-row-1">
          <div>
            <div>
              {  currentMonth  + ". "  +this.state.currentDate.day}
            </div>
            <div>
               { this.state.currentDate.year }
            </div>
           </div>
        </div>
        <div className="widget-unit-calendar-row-2">
          <div>
            <p>{month}</p>
          </div>
        </div>
        
        <div className="widget-unit-calendar-row-3">
          <table>
            <thead>
              <tr>
                <td><p>S</p></td>
                <td><p>M</p></td>
                <td><p>T</p></td>
                <td><p>W</p></td>
                <td><p>T</p></td>
                <td><p>F</p></td>
                <td><p>S</p></td>
              </tr>
            </thead>
            <tbody>
              {this.renderWeekCalendar()}
            </tbody>
          </table>
          
        </div>
        <div className="widget-unit-calendar-row-5">
          <div className="widget-unit-calendar-pagination-button-container">
            <div className="widget-unit-calendar-preview-container">
              <input type="button" value="" className="button-preview"  onClick={this.props.handlePreviewMonth}/>
            </div>
            <div className="widget-unit-calendar-next-container">
              <input type="button" value="" className="button-next" onClick={this.props.handleNextMonth}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class WidgetUnitFee extends React.Component {

  constructor()
  {
    super();
    this.state = {
      fee : null,
      showPopup: false,
      page: null,
      limit: null,
    };
    this.handleViewFeeViewOnClick = this.handleViewFeeViewOnClick.bind(this);
    this.HidePopup = this.HidePopup.bind(this);
    this.ShowPopup = this.ShowPopup.bind(this);
    this.handleOnPrint = this.handleOnPrint.bind(this);
  }

  handleViewFeeViewOnClick(fee) {

    this.setState({ showPopup: true, fee: fee});
  }

  handleOnPrint(fee)
  {
    var path = "fee/"+fee.id+"/print";
    $.ajax({
      url: path,
      type: 'GET',
      xhrFields: {
        responseType: 'blob'
      },
      beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization",this.props.user._token);
      }.bind(this),
      success: function (pdf)
      {
        window.open(URL.createObjectURL(pdf));
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

    var fee = this.state.fee;
    return (
      <div className="popup-container-full">
        <div className="widget-fee-popup">
          <div className="widget-fee-popup-row-1">
            <p>Fee # {fee.reference}</p>
          </div>
          <div className="widget-fee-popup-row-2">
            <div className="widget-fee-popup-row-2-1">
              <label>Type</label>
            </div>
            <div className="widget-fee-popup-row-2-2">
              <input name=""  type="text" defaultValue={fee.type} disabled/>
            </div>
          </div>
          <div className="widget-fee-popup-row-3">
            <div className="widget-fee-popup-row-3-1">
              <label>Description</label>
            </div>
            <div className="widget-fee-popup-row-3-2">
              <textarea defaultValue={fee.description}/>
            </div>
          </div>
          <div className="widget-fee-popup-row-4">
            <div className="widget-fee-popup-row-4-1">
              <label>Date</label>
            </div>
            <div className="widget-fee-popup-row-4-2">
              <input name=""  type="text" defaultValue={fee.from} disabled/>
            </div>
          </div>
          <div className="widget-fee-popup-row-5">
            <div className="widget-fee-popup-row-5-1">
              <label>Amount</label>
            </div>
            <div className="widget-fee-popup-row-5-2">
              <input name=""  type="text" defaultValue={fee.amount} disabled/>
            </div>
          </div>
          <div className="widget-fee-popup-row-6">
            <div className="inlineflex">
              <div className="widget-fee-popup-row-6-1">
                <input onClick={() => this.handleOnPrint(fee)} className="btn" name="" value="Print" type="button"/>
              </div>
              <div className="widget-fee-popup-row-6-2">
                <input onClick={this.HidePopup} className="popup-back" name="" value="" type="button"/>
              </div>
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
  render() {

    var monthNameAve = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month = monthNameAve[this.props.selectedDate.month-1];
    var year = this.props.selectedDate.year;
    var renderedResult = this.props.fees.map((fee) => {
      const id =  fee.id;
      return (
        <tr key={id}>
          <td  className="widget-unit-fee-result-row">
            <div className="widget-unit-fee-result-col-1">
              <p>{fee.type}</p>
            </div>
            <div className="widget-unit-fee-result-col-2">
              <p>{fee.from}</p>
            </div>
            <div>
              <div className="widget-unit-fee-result-col-3">
                <p>{fee.amount}</p>
              </div>
              <div className="widget-unit-fee-result-col-4">
                <input onClick={() => this.handleViewFeeViewOnClick(fee)} type="button" className="btn" value="VIEW"/>
              </div>
            </div>
        </td>
      </tr>
      );
    });

    return (
      <div className="widget-unit-fee-container">
        <div className="widget-unit-fee-row-1">
          <div className="widget-unit-fee-title-container">
            <p>FEES</p>
          </div>
          <div className="widget-unit-fee-cant-container">
            <p>10</p>
          </div>
        </div>
        <div className="widget-unit-fee-row-2">
          <table>
              <tbody>
                {renderedResult}
              </tbody>
            </table>
        </div>
        <div className="widget-unit-fee-row-3">
          <div className="widget-unit-fee-pagination-button-container">
            <div className="widget-unit-fee-preview-container">
              <input type="button" value="" onClick={this.props.handlePreviewPageFees}/>
            </div>
            <div className="widget-unit-fee-next-container">
              <input type="button" value="" onClick={this.props.handleNextPageFees}/>
            </div>
          </div>
        </div>
        <div className="widget-unit-fee-row-4">
          <div className="widget-unit-fee-month-pagination-button-container">
            <div className="widget-unit-fee-preview-month-container">
              <input type="button" value="" onClick={this.props.handlePreviewMonth}/>
            </div>
            <div className="widget-unit-fee-date-container">
              <p>{month + ". " + year}</p>
            </div>
            <div className="widget-unit-fee-next-month-container">
              <input type="button" value="" onClick={this.props.handleNextMonth}/>
            </div>
          </div>
        </div>
        { this.state.showPopup ? this.ShowPopup():""}
      </div>
    );
  }
}

class WidgetUnitInvoice extends React.Component {

  constructor()
  {
    super();
    this.state = {
      invoice : null,
      showPopup: false,
      page: null,
      limit: null
    };

    this.handleViewInvoiceViewOnClick = this.handleViewInvoiceViewOnClick.bind(this);
    this.handleOnPrint = this.handleOnPrint.bind(this);
    this.ShowPopup = this.ShowPopup.bind(this);
    this.HidePopup = this.HidePopup.bind(this);
  }

  handleViewInvoiceViewOnClick(invoice) {

    this.setState({ showPopup: true, invoice: invoice});
  }

  handleOnPrint(invoice)
  {
    var path = "invoice/"+invoice.id+"/print";
    $.ajax({
      url: path,
      type: 'GET',
      xhrFields: {
        responseType: 'blob'
      },
      beforeSend: function (xhr) {
          xhr.setRequestHeader("Authorization",this.props.user._token);
      }.bind(this),
      success: function (pdf)
      {
        window.open(URL.createObjectURL(pdf));
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

    var invoice = this.state.invoice;

    var renderedResult = invoice.fees.map((fee) => {
      const id =  fee.id;
      return (
        <tr key={id}>
          <td className="widget-invoice-result-row">
              <div>
                  <label>{fee.title}</label>
              </div>
          </td>
        </tr>
      );
    });

    return (
      <div className="popup-container-full">
        <div className="widget-invoice-popup">
          <div className="widget-invoice-row-1">
              <div className="widget-invoice-row-1-1" >
                  <h4>Invoice Informacion</h4>
              </div>
              <div className="widget-invoice-row-1-2">
                  <input onClick={this.HidePopup} name="print" value="" className="popup-back" type="button"/>
              </div>
          </div>
          <div className="inlineflex">

            <div className="widget-invoice-row-2">
                <div className="widget-invoice-row-2-1">
                    <div className="widget-invoice-row-2-1-1">
                        <label>N-</label>
                    </div>
                    <div className="widget-invoice-row-2-1-2">
                        <label>{invoice.reference}</label>
                    </div>
                </div>
                <div className="widget-invoice-row-2-2">
                    <div className="widget-invoice-row-2-2-1">
                        <label>Date</label>
                    </div>
                    <div className="widget-invoice-row-2-2-2">
                        <label>{invoice.created_at}</label>
                    </div>
                </div> 
                  
            </div>
            <div className="widget-invoice-row-2-3">
                   <input onClick={() => this.handleOnPrint(invoice)} name="print" value="Print" className="btn" type="button"/>
              </div>  
          </div>
        <div className="widget-invoice-row-3">
              <div className="widget-invoice-row-3-1">
                  <label>Fees</label>
              </div>  
              <div className="widget-invoice-row-3-2">
                  <table>
                      <tbody>
                        {renderedResult}
                      </tbody>
                  </table>
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
      invoice: null
    });
  }
 
  render() {

    var renderedResult = this.props.invoices.map((invoice) => {
      const id =  invoice.id;
      var created_at = new Date(invoice.created_at);
      return (
        <tr key={id}>
          <td  className="widget-unit-invoice-result-row">
            <div className="widget-unit-invoice-result-col-1">
              <p>{invoice.status}</p>
            </div>
            <div className="widget-unit-invoice-result-col-2">
              <div>
                <p>{(created_at.getMonth() + 1) +"-"+ created_at.getDay() +"-"+ created_at.getFullYear()}</p>
              </div>
              <div>
                <p>{"N. "+ invoice.reference }</p>
              </div>
            </div>
            <div> 
              <div className="widget-unit-invoice-result-col-3">
                <p>{invoice.amount}</p>
              </div>
              <div className="widget-unit-invoice-result-col-4">
                <input onClick={() => this.handleViewInvoiceViewOnClick(invoice)} type="button" value="VIEW" className="btn"/>
              </div>
            </div>
          </td>
        </tr>
      );
    });

    return (
      <div className="widget-unit-invoice-container">
        <div className="widget-unit-invoice-row-1">
          <div className="widget-unit-invoice-title-container">
            <p>Invoices</p>
          </div>
        </div>
        <div className="widget-unit-invoice-row-2">
          <table>
              <tbody>
                {renderedResult}
              </tbody>
            </table>
        </div>
        <div className="widget-unit-invoice-row-3">
          <div className="widget-unit-invoice-pagination-button-container">
            <div className="widget-unit-invoice-preview-container">
              <input type="button" value="" onClick={this.props.handlePreviewPageInvoices}/>
            </div>
            <div className="widget-unit-invoice-next-container">
              <input type="button" value=""onClick={this.props.handleNextPageInvoices}/>
            </div>
          </div>
        </div>
        { this.state.showPopup ? this.ShowPopup():""}
      </div>
    );
  }
}

export default WidgetUnit;