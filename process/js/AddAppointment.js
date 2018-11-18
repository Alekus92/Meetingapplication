var React = require("react");

var AddAppointment = React.createClass({
  toggleAptDisplay: function() {
    // metodau
    this.props.handleToggle(); // handletaggle polaczone jest z glownym app.js przez propsy
  },

  handleAdd: function(e) {
    // event handler
    var tempItem = {
      fullName: this.refs.inputfullName.value,
      sex: this.refs.inputSex.value,
      aptDate:
        this.refs.inputAptDate.value + " " + this.refs.inputAptTime.value,
      aptNotes: this.refs.inputAptNotes.value
    };
    e.preventDefault(); // we dont want this page to reload
    this.props.addApt(tempItem);
  },

  render: function() {
    var displayAptBody = {
      display: this.props.bodyVisible ? "block" : "none"
    };

    return (
      <div className="panel panel-primary">
        <div
          className="panel-heading apt-addheading"
          onClick={this.toggleAptDisplay} //we have a clickHandler odnosi sie do funkcji powyzej
        >
          <span className="glyphicon glyphicon-plus" /> Add Appointment
        </div>
        <div className="panel-body" style={displayAptBody}>
          <form
            className="add-appointment form-horizontal"
            onSubmit={this.handleAdd}
          >
            <div className="form-group">
              <label className="col-sm-2 control-label" for="fullName">
                Full Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  ref="inputfullName"
                  placeholder="Patient's name"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" for="sex">
                Sex
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="sex"
                  ref="inputSex"
                  placeholder="Male/Female"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" for="aptDate">
                Date
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="aptDate"
                  ref="inputAptDate"
                />
              </div>
              <label className="col-sm-2 control-label" for="aptTime">
                Time
              </label>
              <div className="col-sm-4">
                <input
                  type="time"
                  className="form-control"
                  id="aptTime"
                  ref="inputAptTime"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" for="aptNotes">
                Apt. Notes
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="50"
                  id="aptNotes"
                  ref="inputAptNotes"
                  placeholder="Appointment Notes"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary pull-right">
                  Add Appointment
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    ); //return
  } //render
}); // AddAppointment

module.exports = AddAppointment;
