import React, {useEffect} from 'react';
import {List} from "antd";
import PlayCircleOutlined from "@ant-design/icons/lib/icons/PlayCircleOutlined";
import {NavLink} from "react-router-dom";
import {observer} from "mobx-react";
import { Typography } from 'antd';
import './WorkoutList.scss'

const { Title } = Typography;

const WorkoutList = observer((props) => {
    const {workoutStore} = props

    useEffect(() => {
        workoutStore.getWorkouts()
    }, [workoutStore])

    const chooseWorkout = (id) => {
        workoutStore.setCurrentWorkout(id)
    }

    return (
        <List
            className="Workouts-List"
            dataSource={workoutStore.workouts}
            renderItem={item => (
                <List.Item className="Workouts-List__Item">
                    <NavLink to="/workout" onClick={chooseWorkout(item._id)}>
                        <PlayCircleOutlined style={{fontSize: '3rem'}}/>
                    </NavLink>
                    <Title level={2} >{item.title}</Title>
                </List.Item>
            )}
        />
    );
})

export default WorkoutList;