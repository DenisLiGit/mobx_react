import React, {Component} from 'react';
import {Layout} from 'antd';
import HeaderBox from "../HeaderBox/HeaderBox";
import {Switch, Route} from "react-router-dom"
import WorkoutForm from "../WorkoutForm/WorkoutForm";
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import {inject} from "mobx-react";
import "./ContentBox.scss"
import WorkoutList from "../WorkoutList/WorkoutList";
import Workout from "../Workout/Workout";

const {Content, Footer} = Layout;

@inject('exerciseStore')
@inject('workoutStore')
class ContentBox extends Component {
    render() {
        return (
            <Layout className="site-layout">
                <HeaderBox/>
                <Content className="Content-Wrap">

                    <Switch>
                        <Route exact path="/">
                            <div className="Content-Wrap__Center">
                                <WorkoutList workoutStore={this.props.workoutStore}/>
                            </div>
                        </Route>
                        <Route path="/createWorkout">
                            <div className="Content-Wrap__Center">
                                <WorkoutForm exerciseStore={this.props.exerciseStore}
                                             workoutStore={this.props.workoutStore}/>
                            </div>
                        </Route>
                        <Route path="/createExercise">
                            <div className="Content-Wrap__Center">
                                <ExerciseForm exerciseStore={this.props.exerciseStore}/>
                            </div>
                        </Route>
                        <Route path="/workout">
                            <div className="Content-Wrap__Full">
                                <Workout/>
                            </div>
                        </Route>
                        <Route path="/food">
                            <p>Food</p>
                        </Route>
                    </Switch>

                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
}

export default ContentBox;