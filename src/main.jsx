// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { FirebaseContext } from './store/Context.jsx';
import Context from './store/Context.jsx';
import firebaseConfig  from './Firebase/config.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseContext.Provider value={{ firebaseConfig  }}>
    <Context>
    <App />
    </Context>
  </FirebaseContext.Provider>
);
