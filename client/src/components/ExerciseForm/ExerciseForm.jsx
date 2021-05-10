import React from 'react';
import {FormikProvider, useFormik} from "formik";
import {
    AutoComplete,
    SubmitButton,
    Input,
    ResetButton,
    Form,
    FormItem,
} from "formik-antd"
import {Button, Tag} from "antd"
import {observer} from "mobx-react";
import './ExerciseForm.scss'

const ExerciseForm = observer((props) => {
    const {exerciseStore} = props
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            area: 'Спина',
            approach: 1,
            repeat: 10,
            imglink1: '',
            imglink2: '',
            imglink3: ''
        },
        onSubmit: (values, actions) => {
            exerciseStore.setExercise(values)
            actions.setSubmitting(false)
            actions.resetForm()
        },
        validate: values => {
            if (values.length) {
                console.log('validate')
            }
        }
    })
    return (
        <FormikProvider value={formik}>
            <Form labelCol={{xs: 4}} wrapperCol={{xs: 20}}>
                <FormItem name="title" label="Название" required={true}>
                    <Input name="title" value={formik.values.title} onChange={formik.handleChange}/>
                </FormItem>
                <FormItem name="description" label="Описание" required={true}>
                    <Input.TextArea name="description" value={formik.values.description} onChange={formik.handleChange}/>
                </FormItem>
                <FormItem name="area" label="Название">
                    <AutoComplete
                        name="area"
                        options={[
                            {value: 'Спина'},
                            {value: 'Плечи'},
                            {value: 'Ноги'}
                        ]}
                        showArrow={true}
                        value={formik.values.area}
                        onChange={formik.handleChange}
                    />
                </FormItem>
                <FormItem name="approach" label="Подходы" required={true}>
                    <Input name="approach" value={formik.values.approach} onChange={formik.handleChange}/>
                </FormItem>
                <FormItem name="repeat" label="Повторения" required={true}>
                    <Input name="repeat" value={formik.values.repeat} onChange={formik.handleChange}/>
                </FormItem>

                <FormItem name="imglink1" label="img">
                    <Input name="imglink1" value={formik.values.imglink1} onChange={formik.handleChange}/>
                </FormItem>
                <FormItem name="imglink2" label="img">
                    <Input name="imglink2" value={formik.values.imglink2} onChange={formik.handleChange}/>
                </FormItem>
                <FormItem name="imglink3" label="img">
                    <Input name="imglink3" value={formik.values.imglink3} onChange={formik.handleChange}/>
                </FormItem>
                <div className='Control-Wrap'>
                    {exerciseStore.errorMessage && (
                        <Tag color="red">{exerciseStore.errorMessage}</Tag>
                    )}
                    {exerciseStore.successMessage && (
                        <Tag color="green">{exerciseStore.successMessage}</Tag>
                    )}
                    <Button.Group>
                        <SubmitButton>Сохранить</SubmitButton>
                        <ResetButton>Очистить</ResetButton>
                    </Button.Group>
                </div>
            </Form>
        </FormikProvider>
    )
})

export default ExerciseForm;