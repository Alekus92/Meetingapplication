var React = require("react"); // importuje lybraru React z mode nodules i pozwala na wykorzystaniewsztskich mozliwsoci
var ReactDOM = require("react-dom"); // zeby propracowac z DOMEM
var _ = require("lodash");

var AptList = require("./AptList");
var AddAppointment = require("./AddAppointment");
var SearchAppointments = require("./SearchApts");

var MainInterface = React.createClass({
  getInitialState: function() {
    // metoda
    return {
      aptBodyVisible: false,
      orderBy: "fullName",
      orderDir: "asc",
      queryText: "",
      myAppts: []
    }; //return
  }, //getInialstate

  componentDidMount: function() {
    this.serverRequest = $.get(
      "./js/data.json",
      function(result) {
        var tempApts = result;
        this.setState({
          myAppts: tempApts
        }); //setState
      }.bind(this)
    );
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  deleteMessage: function(item) {
    var allApts = this.state.myAppts;
    var newApts = _.without(allApts, item);
    this.setState({
      myAppts: newApts
    }); //setState
  }, //deleteMessage

  toggleAddDisplay: function() {
    var temVisibility = !this.state.aptBodyVisible;
    this.setState({
      aptBodyVisible: temVisibility
    });
  },

  addItem: function(tempItem) {
    var tempApts = this.state.myAppts;
    tempApts.push(tempItem);
    this.setState({
      myAppts: tempApts
    });
  },

  reOrder: function(orderBy, orderDir) {
    this.setState({
      orderBy: orderBy,
      orderDir: orderDir
    });
  },

  searchApts(q) {
    this.setState({
      queryText: q
    });
  },

  render: function() {
    var filteredApts = []; // pobierze cala date powyzej
    var orderBy = this.state.orderBy;
    var orderDir = this.state.orderDir;
    var queryText = this.state.queryText;
    var myAppointments = this.state.myAppts;

    myAppointments.forEach(function(item) {
      if (
        item.fullName.toLowerCase().indexOf(queryText) != -1 ||
        item.sex.toLowerCase().indexOf(queryText) != -1 ||
        item.aptDate.toLowerCase().indexOf(queryText) != -1 ||
        item.aptNotes.toLowerCase().indexOf(queryText) != -1
      ) {
        filteredApts.push(item);
      }
    }); //forEach

    filteredApts = _.orderBy(
      filteredApts,
      function(item) {
        return item[orderBy].toLowerCase();
      },
      orderDir
    ); //orderBy

    filteredApts = filteredApts.map(
      function(item, index) {
        return (
          <AptList
            key={index}
            singleItem={item}
            whichItem={item}
            onDelete={this.deleteMessage}
          />
        ); //return
      }.bind(this) // bierzemy map funckje zeby bundowala z funcja this
    ); //filteredApts.map
    return (
      <div className="interface">
        <AddAppointment
          bodyVisible={this.state.aptBodyVisible}
          handleToggle={this.toggleAddDisplay}
          addApt={this.addItem}
        />
        <SearchAppointments
          orderBy={this.state.orderBy}
          orderDir={this.state.orderDir}
          onReOrder={this.reOrder}
          onSearch={this.searchApts}
        />
        <ul className="item-list media-list">{filteredApts}</ul>
      </div>
    ); //return
  } //render
}); //MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById("patientAppointments")
);
