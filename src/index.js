import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Web3 from "web3";
import {Web3ReactProvider} from '@web3-react/core'

function getLibrary(provider) {
    return new Web3(provider)
}

ReactDOM.render(
    <React.StrictMode>
        <Web3ReactProvider getLibrary={getLibrary}>
            <App/>
            <div className={"bottom-container"}>
                <div className={"css-switch"} onClick={() => {
                    const lightCss = document.getElementById("light-css")
                    const darkCss = document.getElementById("dark-css")

                    if (lightCss.rel === "stylesheet") lightCss.rel = "stylesheet alternate"
                    else lightCss.rel = "stylesheet"
                    if (darkCss.rel === "stylesheet") darkCss.rel = "stylesheet alternate"
                    else darkCss.rel = "stylesheet"
                }}>
                    Switch theme ☀️🌛
                </div>
                <div className={"source"}>
                    <a href={"https://github.com/cfelde/attest-with-ethereum"}>Attest with Ethereum source code</a>
                </div>
            </div>
        </Web3ReactProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
