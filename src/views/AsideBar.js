import React, { Component,Fragment } from 'react'
import MenuLink from './MenuLink'
import {Link} from 'react-router-dom'

class AsideBar extends Component {
    render() {
        return (
            <Fragment>
              <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <Link to={""} className="brand-link">
                  <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                  <span className="brand-text font-weight-light">Organic World</span>
                </Link>
                <div className="sidebar">
                  <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                      <img src="dist/img/user2-160x160.jpg" width="200" height="200" className="img-circle elevation-2" alt="User" />
                    </div>
                    <div className="info">
                      <Link to={""} className="d-block">Ibrahim Olayinka</Link>
                    </div>
                  </div>
                  <nav className="mt-2">
                      <MenuLink />
                  </nav>
                </div>
              </aside>

            </Fragment>
        )
    }
}

export default AsideBar
