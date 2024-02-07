import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import  store  from "./redux/store/index"
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();//reportWebVitals es una función que mide el rendimiento de tu aplicación.



/* Se utiliza ReactDOM.createRoot para crear un "root" en el elemento con el id 'root'. Esto es parte de la nueva API de React Concurrent Mode.
Dentro de este "root", se renderiza la aplicación envuelta en React.StrictMode y Provider.
React.StrictMode activa características de desarrollo adicionales en React y sus descendientes.
Provider envuelve la aplicación y proporciona el store de Redux a todos los componentes. */