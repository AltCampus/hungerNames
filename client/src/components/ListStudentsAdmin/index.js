import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getallstudentslist, removeStudent } from '../../store/actions';
import './ListStudentsAdmin.scss';

class ListStudentsAdmin extends Component {

  componentDidMount = () => {
    this.props.dispatch(getallstudentslist());
  }

  handleDelete = (id) => {
    this.props.dispatch(removeStudent(id));
  }

  render() {
    const { listAllStudents } = this.props;
    return (
      <>
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        <div className="listStudent-wrapper">
          {
            listAllStudents && listAllStudents.map(student => (
              <div key={student.id} className="list-students">
                <h3>Name: {student.name}</h3>
                <p>Email: {student.email}</p>
                <div className="deleteBtn-wrapper" title="delete this student">
                  <button onClick={() => this.handleDelete(student.id)}>X</button>
                </div>
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