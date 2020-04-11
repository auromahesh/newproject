import React, { Component } from "react";
import { getMembers } from "../services/memberService";
import { Table } from "react-bootstrap";
import AppModal from "./appModal";

import "./users.css";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: getMembers(),
      selectedMember: null,
    };
  }

  addModalClose = () => {
    this.setState({ selectedMember: null });
  };

  handleSelectedMember = (member) => () => {
    this.setState({ selectedMember: member });
  };

  render() {
    const { members, selectedMember } = this.state;
    const membersCount = members.length;

    if (membersCount === 0) return <p>There are no members in the DB</p>;
    return (
      <div>
        <p>There are {membersCount} members in the DB</p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S. No</th>
              <th>ID</th>
              <th>Members</th>
              <th>Area</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <tr
                className="table-row"
                key={member.id}
                onClick={this.handleSelectedMember(member)}
              >
                <td>{index + 1}</td>
                <td>{member.id}</td>
                <td>{member.real_name}</td>
                <td>{member.tz}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {selectedMember && (
          <AppModal
            show={selectedMember}
            onHide={this.addModalClose}
            selectedMember={selectedMember}
          />
        )}
      </div>
    );
  }
}

export default Users;
