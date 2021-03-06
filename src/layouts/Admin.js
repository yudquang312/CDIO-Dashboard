import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from 'components/Sidebar/Sidebar.js';
import Notification from '../hooks';
import routes from 'routes.js';

class Admin extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
            exact={!!prop.exact}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (this.props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return 'Brand';
  };
  render() {
    console.log(sessionStorage.getItem('isLogged'));
    return sessionStorage.getItem('isLogged') ? (
      <Notification>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: '/admin/manage-product',
            imgSrc: require('assets/img/brand/Dino-cheerful-brand.png'),
            imgAlt: '...',
          }}
        />
        <div className="main-content" ref="mainContent">
          {/* <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          /> */}
          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/admin/manage-product" />
          </Switch>
          {/* <Container fluid>
            <AdminFooter />
          </Container> */}
        </div>
      </Notification>
    ) : (
      <Redirect to="/auth/login" />
    );
  }
}

export default Admin;
