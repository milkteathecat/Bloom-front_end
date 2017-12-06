import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;

class CreatePostForm extends React.Component {
    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Form layout="vertical">
                <FormItem label="Message">
                    {getFieldDecorator('message', {
                        rules: [{ required: true, message: 'Please input the title of collection!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
            </Form>
        );
    }
}

export const WrappedCreatePostForm = Form.create()(CreatePostForm);