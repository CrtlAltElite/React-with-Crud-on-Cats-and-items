
import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'


export default class AdminRoute extends Component {
    render() {
        return this.props.isAdmin ? (
            <ProtectedRoute {...this.props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          );
    }
}

