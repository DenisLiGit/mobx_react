import React from 'react'
import './App.css'
import {observer} from "mobx-react";
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import { BrowserRouter as Router} from "react-router-dom"

import LeftMenu from "./components/LeftMenu/LeftMenu";
import ContentBox from "./components/ContentBox/ContentBox";

@observer
class App extends React.Component {
    render() {
        return (
            <Router>
                <Layout style={{ minHeight: '100vh' }} >
                    <LeftMenu />
                    <ContentBox />
                </Layout>
            </Router>
        );
    }
}

export default App