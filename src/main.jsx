import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routes from './routes/Routes.jsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './stores/auth.store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routes/>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
)
