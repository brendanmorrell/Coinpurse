import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import { startRemoveExpense } from '../actions/expenses';
import { toggleModal, pushToDashboard } from '../actions/modal';

export class DeleteModal extends React.Component {
  onRemoveExpense = () => {
    const { modal } = this.props;
    const { id } = this.props;
    this.props.startRemoveExpenseProp(id);
    this.props.toggleModal(!modal);
    this.props.pushToDashboard(true);
  };
  doNotRemoveExpense = () => {
    const { modal } = this.props;
    this.props.toggleModal(!modal);
  };
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modal}
          className="modal"
          onAfterOpen={() => ({})}
          onRequestClost={() => ({})}
          closeTimeoutMS={11100}
          contentLabel="Modal"
        >
          <h3 className="modal__title">Are you sure you want to delete this expense?</h3>
          <div className="modal-div">
            <button className="button" onClick={this.onRemoveExpense}>Yes</button>
            <button className="button" onClick={this.doNotRemoveExpense}>No</button>
          </div>
        </Modal>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch, props) => ({
  startRemoveExpenseProp: (id) => dispatch(startRemoveExpense(id)),
  toggleModal: (modal) => dispatch(toggleModal(modal)),
  pushToDashboard: (pushTD) => dispatch(pushToDashboard(pushTD)),
});
const mapStateToProps = (state, props) => ({ modal: state.modal.modal });
export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
