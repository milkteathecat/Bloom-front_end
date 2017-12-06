import React from 'react';
import $ from 'jquery';
import { Modal, Button, message } from 'antd';
import { WrappedCreatePostForm } from './CreatePostForm';
import { API_ROOT, TOKEN_KEY, AUTH_PREFIX, POS_KEY } from '../constants';
import { PropTypes } from 'prop-types';

export class CreatePostButton extends React.Component {
    static propTypes = {
        loadNearbyPosts: PropTypes.func.isRequired,
    }
    state = {
        visible: false,
        confirmLoading: false,
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        const form = this.form.getWrapperForm();
        form.validateFields((err, values) => {
            if (err) { return; }
            console.log('Received values of form: ', values);

            const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
            const formData = new FormData();
            formData.set('lat', lat + Math.random() * 0.1 - 0.05);
            formData.set('lon', lon + Math.random() * 0.1 - 0.05);
            formData.set('message', form.getFieldValue('message'));
            formData.set('image', form.getFieldValue('image')[0]);

            this.setState({ confirmLoading: true });
            $.ajax({
                method: 'POST',
                url: `${API_ROOT}/post`,
                headers: {
                    Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
                },
                processData: false,
                contentType: false,
                dataType: 'text',
                data: formData,
            }).then(() => {
                message.success('created a post successfully.');
                form.resetFields();
            },(error) => {
                message.error(error.responseText);
                form.resetFields();
            }).then(() => {
                this.props.loadNearbyPosts().then(() => {
                    this.setState({ visible: false, confirmLoading: false });
                });
            }).catch((e) => {
                message.error('create post failed.');
                console.error(e);
            });
        });
    }
    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>Create New Post</Button>
                <Modal
                    title="Create New Post"
                    visible={visible}
                    okText="Create"
                    cancelText="Cancel"
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <WrappedCreatePostForm wrappedComponentRef={this.saveFormRef}/>
                </Modal>
            </div>
        );
    }
}
