import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class ModalProgressDialog extends React.Component {
  render() {
    const cancelAction = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.onCancel}
      />,
    ];

    const dialogStyles = {
      textAlign: 'center',
    };

    return (
      <Dialog
        title={this.props.title}
        actions={this.props.onCancel ? cancelAction : []}
        modal={true}
        open={this.props.open}
        style={dialogStyles}
      >
        <CircularProgress /><br/>
        {this.props.message}
      </Dialog>
    );
  }
}

ModalProgressDialog.propTypes = {
  message: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  open: React.PropTypes.bool.isRequired,

  onCancel: React.PropTypes.func,
};
