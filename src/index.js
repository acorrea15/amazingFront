import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
/* import { BrowserRouter } from "react-router-dom"; */
import 'bootstrap/dist/css/bootstrap.min.css';

//Importación de la información que queda en el store: 
import store from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

// Creación del store-persist: 
const persistedStore = persistStore(store);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <Provider store={store}>
  <PersistGate loading={<div>Cargando...</div>} persistor={persistedStore}>
    <React.StrictMode>
      {/* <BrowserRouter> */}
        <App />
      {/* </BrowserRouter> */}
    </React.StrictMode>  
  </PersistGate>
</Provider>

  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
