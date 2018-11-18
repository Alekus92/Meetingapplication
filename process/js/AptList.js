var React = require("react");

var AptList = React.createClass({
  handleDelete: function() {
    this.props.onDelete(this.props.whichItem);
  },

  render: function() {
    return (
      <li className="patient-item media">
        <div className="media-left">
          <button
            className="patient-delete btn btn-xs btn-danger"
            onClick={this.handleDelete}
          >
            <span className="glyphicon glyphicon-remove" />
          </button>
        </div>
        <div className="patient-info media-body">
          <div className="patient-head">
            <span className="patient-name">
              {this.props.singleItem.fullName}
            </span>
            <span className="apt-date pull-right">
              {this.props.singleItem.aptDate}
            </span>
          </div>
          <div className="sex-name">
            <span className="label-item">Sex:</span>
            {this.props.singleItem.sex}
          </div>
          <div className="apt-notes">{this.props.singleItem.aptNotes}</div>
        </div>
      </li>
    );
  }
});

module.exports = AptList;
