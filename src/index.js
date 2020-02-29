import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();

import React from 'react';
import ReactDOM from 'react-dom';

// Import app and its global styles
import App from 'components/App';
import 'styles/app';


// Setup app component
ReactDOM.render(<App/>, document.getElementById('root'));