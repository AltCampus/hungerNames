import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getallstudentslist } from '../../store/actions';
import './ListStudentsAdmin.scss';

class ListStudentsAdmin extends Component {

  componentDidMount = () => {
    this.props.dispatch(getallstudentslist());
  }

  render() {
    const { listAllStudents } = this.props;
    return (
      <>
        <div className="listStudent-wrapper">
          {
            listAllStudents && listAllStudents.map(student => (
              <div key={student.id} className="list-students">
                <h3>Name: {student.name}</h3>
                <p>Email: {student.email}</p>
              </div>
            ))
          }
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listAllStudents: state.listAllStudents
  }
}

export default connect(mapStateToProps)(ListStudentsAdmin);