import React from 'react';
import { createBrowserHistory } from 'history'
import { BrowserRouter,Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routes } from './routes';


const history = createBrowserHistory({forceRefresh: true});

function App() {
  return (
      <Router history={history}>
      {renderRoutes(routes)}
      </Router>
  );
}
  
export default App
