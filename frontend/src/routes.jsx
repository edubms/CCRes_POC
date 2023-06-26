import HomePage from './pages/home';
import ResourcesPage from './pages/resources';
import CostumerPage from './pages/costumer';

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
    path: '/costumer',
    exact: true,
    component: CostumerPage
  }
];