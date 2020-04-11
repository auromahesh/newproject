import React, { Component } from "react";
import { Button, Modal, Table, Alert } from "react-bootstrap";
import moment from "moment";
import _ from "lodash";

import './appModal.css';

const DatePicker = ({ name, onChange }) => {
  return <input name={name} onChange={onChange} type="date" />;
};

class AppModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_date: null,
      filtered: null,
    };
  }

  handleDateChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  filterRows = () => {
    const {
      selected_date,
      filtered
    } = this.state;
    if (this.state.selected_date) {
      const selectedDate = new Date(selected_date);
      const filteredRows = this.props.selectedMember.activity_periods.filter(
        (activity) => {
          const { start_time, end_time } = activity;
          const [start_year, start_month, start_date] = start_time.split(" ");
          const [end_year, end_month, end_date] = end_time.split(" ");
          const isStartEqual = moment(selectedDate).isSame(
            `${start_year}/${start_month}/${start_date}`,
            "day"
          );
          const isEndEqual = moment(selectedDate).isSame(
            `${end_year}/${end_month}/${end_date}`,
            "day"
          );
          if (isStartEqual || isEndEqual) {
            return activity;
          }
        }
      );
      if (!_.isEqual(filtered, filteredRows)) {
        this.setState({
          filtered: filteredRows,
        });
      }
    } else {
      if (filtered) {
        this.setState({
          filtered: null,
        });
      }
    }
  };

  componentDidUpdate = () => {
    this.filterRows();
  };

  render() {
    const {
      show,
      onHide,
      selectedMember: { activity_periods },
    } = this.props;

    const { filtered } = this.state;

    const rowData = filtered ? filtered : activity_periods;

    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span className="modal-title">User Activity Details</span>
            Start/End Time: <DatePicker name="selected_date" onChange={this.handleDateChange} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {rowData.map(({ start_time, end_time }, index) => (
                  <tr key={start_time}>
                    <td>{index + 1}</td>
                    <td>{start_time}</td>
                    <td>{end_time}</td>
                  </tr>
                ))}
                {filtered && filtered.length === 0 && (
                  <tr>
                    <td colSpan="3">
                    <Alert variant={'danger'}>
                      No Records Found!.
                    </Alert>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AppModal;
