/* global browser */
import DevToolsPanel from './components/DevToolsPanel';
import React from 'react';
import ReactDOM from 'react-dom';

let alreadyShown = false;

function createPanel() {
  browser.devtools.panels.create('GraphQL',
    './icons/icon48.png',
    './panel.html',
    (panel) => {
      panel.onShown.addListener((panelWindow) => {
        if (!alreadyShown) {
          ReactDOM.render(
            <DevToolsPanel
              requestFinished={browser.devtools.network.onRequestFinished}
              getHAR={browser.devtools.network.getHAR}
            />,
            panelWindow.document.getElementById('results'),
          );
        }
        alreadyShown = true;
      });
    },
  );
}

createPanel();
