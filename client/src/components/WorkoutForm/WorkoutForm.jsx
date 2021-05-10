import React, {useEffect} from 'react';
import {FormikProvider, useFormik} from "formik";
import {Transfer, ResetButton, SubmitButton, Form, FormItem, Input} from "formik-antd";
import {Button, Tag} from "antd"
import {observer} from "mobx-react";
import "./WorkoutForm.scss"

const WorkoutForm = observer((props) => {
    const {exerciseStore, workoutStore} = props

    useEffect(() => {
        exerciseStore.getExercise()
    }, [exerciseStore])

    const formik = useFormik({
        initialValues: {
            title: 'Тренировка 1'
        },
        onSubmit: (values, actions) => {
            workoutStore.setWorkout({
                title: values.title,
                exerciseId: values.transfer
            })
            actions.setSubmitting(false)
            actions.resetForm()
        },
        validate: (values) => {
            console.log('validation')
        }
    })

    return (
        <FormikProvider value={formik}>
            <Form labelCol={{xs: 4}} wrapperCol={{xs: 20}}>
                <FormItem name="title" label="Название" required={true}>
                    <Input name="title" value={formik.values.title} onChange={formik.handleChange}/>
                </FormItem>
                <Transfer
                    name="transfer"
                    className="Form-Transfer"
                    dataSource={exerciseStore.exercises.map(item => {
                        return {key: item._id, title: item.title}
                    })
                    }
                    render={item => item.title}
                    listStyle={{
                        width: 340,
                        height: 300,
                    }}
                />
                <div className='Control-Wrap'>
                    {workoutStore.errorMessage && (
                        <Tag color="red">{workoutStore.errorMessage}</Tag>
                    )}
                    {workoutStore.successMessage && (
                        <Tag color="green">{workoutStore.successMessage}</Tag>
                    )}
                    <Button.Group size="large">
                        <SubmitButton type="primary" disabled={false}> Сохранить </SubmitButton>
                        <ResetButton>Очистить</ResetButton>
                    </Button.Group>
                </div>
            </Form>
        </FormikProvider>
    );
})

export default WorkoutForm;