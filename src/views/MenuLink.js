import React from 'react'
import {NavLink} from 'react-router-dom'

const MenuLink = () => {
    return (
        <React.Fragment>
             <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
               
                <li className="nav-item">
                    <NavLink to="/" className="nav-link bg-success">
                        <i className="nav-icon fas fa-th"></i>
                        <p>
                         DashBoard
                        {/* <span className="right badge badge-danger">50</span>+ */}
                        </p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/users" className="nav-link"  >
                        {/* <i className="nav-icon fas fa-th"></i> */}
                        <i className="fa fa-user"></i> &nbsp;
                        <p>
                         Registered Users
                        <span className="right badge badge-danger" >50</span>
                        </p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/products" className="nav-link"  >
                        {/* <i className="nav-icon fas fa-th"></i> */}
                        <i className="fa fa-user"></i> &nbsp;
                        <p>
                         All Products
                        <span className="right badge badge-danger" >50</span>
                        </p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/categories" className="nav-link" >
                        <i className="fa fa-user-tie"></i> &nbsp;
                        <p>
                         Product Categories
                        <span className="right badge badge-danger" >4</span>
                        </p>
                    </NavLink>
                </li>

                {/* <li className="nav-item">
                    <NavLink to="/dresscode" className="nav-link"  >
                        <i className="fa fa-tshirt"></i> &nbsp;
                        <p>
                         Dress Code Schedule
                        </p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/songs" className="nav-link" >
                        <i className="fa fa-music"></i> &nbsp;
                        <p>
                         Song Schedule
                        <span className="right badge badge-danger" >50</span>
                        </p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/finance" className="nav-link" >
                        <i className="fas fa-dollar-sign"></i> &nbsp;
                        <p>
                         Financial Record
                        </p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/department" className="nav-link" >
                        <i className="fas fa-archway"></i> &nbsp;
                        <p>
                         Department Unit
                        <span className="right badge badge-danger" >5</span>
                        </p>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/event" className="nav-link" >
                        <i className="fas fa-calendar"></i> &nbsp;
                        <p>
                         Upcoming Events
                        <span className="right badge badge-danger" >5</span>
                        </p>
                    </NavLink>
                </li> */}

                {/* <li className="nav-item has-treeview menu-open">
                <Link to="#" className="nav-link" >
                    <i className="fas fa-cog"></i>&nbsp;
                    <p>
                    Settings
                    <i className="right fas fa-angle-left" />
                    </p>
                </Link>
                <ul className="nav nav-treeview">
                    <li className="nav-item">
                    <NavLink to="/role" className="nav-link" activeStyle={{backgroundColor:'#007bff',color:'white'}} >
                        <i className="far fa-circle nav-icon" />
                        <p>User Role</p>
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/cells" className="nav-link" activeStyle={{backgroundColor:'#007bff',color:'white'}} >
                        <i className="far fa-circle nav-icon" />
                        <p>Cell Information</p>
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    </li>
                  </ul>
                </li> */}
            </ul>
        </React.Fragment>
    )
}

export default MenuLink


// activeStyle={{backgroundColor:'#007bff'}} 