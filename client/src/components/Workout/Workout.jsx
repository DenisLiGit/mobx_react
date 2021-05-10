import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Row, Col, Card, Image, Button} from 'antd';
import {Steps} from 'antd';
import {Typography} from 'antd';

const {Title} = Typography;
const {Step} = Steps;

@inject('workoutStore')
@inject('exerciseStore')
@observer
class Workout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 0
        }

        this.doNextStep = this.doNextStep.bind(this)
    }

    componentDidMount() {
        this.props.workoutStore.getWorkout()
        this.props.exerciseStore.getExercise()
    }

    doNextStep() {
        let step = this.state.step
        this.setState({
            step: ++step
        })
    }

    render() {
        return (
            <Row>
                <Col span={19}>
                    <Title>
                        {this.props.workoutStore.workout.title}
                    </Title>
                    {this.props.exerciseStore.exercises.map(item => {
                        return item._id === this.props.workoutStore.workout.exerciseId[this.state.step] ?
                            (
                                <div key={item._id}>
                                    <Card>
                                        <Title> {item.title}</Title>
                                        {item.imglink1 && (
                                            <Image alt="example" src={item.imglink1}/>
                                        )}
                                        {item.imglink2 && (
                                            <Image alt="example" src={item.imglink2}/>
                                        )}
                                        {item.imglink3 && (
                                            <Image alt="example" src={item.imglink3}/>
                                        )}
                                        <Typography.Paragraph>
                                            {item.area}
                                        </Typography.Paragraph>
                                        <Typography.Paragraph>
                                            {item.description}
                                        </Typography.Paragraph>
                                        <Typography.Text code>
                                            {item.approach}
                                        </Typography.Text>
                                        <Typography.Text code>
                                            {item.repeat}
                                        </Typography.Text>
                                        <div>
                                            <Button type="primary" onClick={this.doNextStep}> Далее</Button>
                                        </div>
                                    </Card>
                                </div>
                            )
                            :
                            null
                    })}
                </Col>
                {/*todo переписать выборку только нужных упр*/}
                <Col span={4} offset={1}>
                    <Steps direction="vertical" current={this.state.step}>
                        {this.props.exerciseStore.exercises.map(item => {
                            return (<Step key={item._id} title={item.title}/>)
                        })}
                    </Steps>
                </Col>
            </Row>
        );
    }
}

export default Workout;