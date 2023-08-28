import HomePage from './pages/home';
import ResourcesPage from './pages/resources';
import CustomerPage from './pages/customer';

export const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/resources',
    exact: true,
    component: ResourcesPage
  },
  {
    path: '/customer',
    exact: true,
    component: CustomerPage
  }
];