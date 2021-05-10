import React, {Component} from 'react';
import {Layout, Menu} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
} from '@ant-design/icons';
import {NavLink} from "react-router-dom";

const {Sider} = Layout;

class LeftMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuCollapsed: false
        }

        this.collaplseHandle = this.collaplseHandle.bind(this)
    }

    collaplseHandle() {
        this.setState({
            menuCollapsed: !this.state.menuCollapsed
        })
    }

    render() {
        return (
            <Sider collapsible collapsed={this.state.menuCollapsed} onCollapse={this.collaplseHandle}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined/>}>
                        <NavLink to="/">
                            Начать тренировку</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined/>}>
                        <NavLink to="/createWorkout">
                            Создать тренировку
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<TeamOutlined/>}>
                        <NavLink to="/createExercise">
                            Создать упражнение
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<TeamOutlined/>}>
                        <NavLink to="/food">
                            Food
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<FileOutlined/>}>
                        Todos
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default LeftMenu;