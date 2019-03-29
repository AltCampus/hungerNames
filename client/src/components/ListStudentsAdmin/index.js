import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getallstudentslist, removeStudent } from '../../store/actions';
import './ListStudentsAdmin.scss';
import AdminSideMenu from '../AdminSideMenu';
import Loader from '../Loader';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';


class ListStudentsAdmin extends Component {

  state = {
    isLoading: false
  }

  componentDidMount = () => {
    this.setState({
      isLoading: true
    })
    this.props.dispatch(getallstudentslist(succeed => {
      if (succeed) {
        this.setState({
          isLoading: false
        })
      }
    }));
  }

  submit = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: (id) => { 
            this.props.dispatch(removeStudent(id, succeed => {
            if (succeed) {
              this.props.history.push(`/admin/getallstudentslist`)
            }
          }));}
        },
        {
          label: 'No',
          onClick: () => { return this.props.history.push(`/admin/getallstudentslist`) }
        }
      ]
    });
  };

  render() {
    const { listAllStudents } = this.props;
    const { isLoading } = this.state;
    return (
      <>
        <AdminSideMenu />
        <div className="back-btn-box">
          <div onClick={this.props.history.goBack} className="back-btn">
            <i className="fas fa-angle-left fa-lg"></i>
            <span>Back</span>
          </div>
        </div>
        {
          isLoading ? (
            <div className="center">
              <Loader />
            </div>
          ) : (
            <div className="listStudent-wrapper">
              { listAllStudents.length == 0 || listAllStudents == 'undefined' ? <div className="empty">No students found :)</div>
                :
                listAllStudents.map(student => (
                  <div key={student.id} className="list-students">
                    <h3>Name: {student.name}</h3>
                    <p>Email: {student.email}</p>
                    <div className="deleteBtn-wrapper" title="delete this student">
                      <button onClick={() => this.submit(student.id)}>X</button>
                    </div>
                  </div>
                )) 
              }
            </div>
          )
        }
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