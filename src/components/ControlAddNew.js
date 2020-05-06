import React, { useState } from 'react';
import Modal from './Modal/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { TASK_LEVEL } from '../constants';
import { v4 as uuidv4 } from 'uuid';


function ControlAddNew({ handleAddNewTask }) {

    const [isOpenModal, setIsOpenModal] = useState(false);
    const initTask = {
        name: '',
        level: 0
    }
    // khi user thêm 1 job mới thì lưu vào state cục bộ => rồi mới đẩy ra bên ngoài
    const [task, setTask] = useState({
        name: '',
        level: 0
    });

    function handlOnChangeNewTodo(e, keyField) { 
        setTask({
            ...task,
            [keyField]: e.target.value
        })
    }

    function handleSubmit() {
        let newTask = {
            id: uuidv4(),
            ...task
        }
        if(handleAddNewTask && typeof handleAddNewTask === 'function') {
            handleAddNewTask(newTask);
        }
        setIsOpenModal(false);
        setTask(initTask);
    }

    return (
        <div>
            <div className="add-task">
                <Button
                    variant="info"
                    type="submit"
                    block
                    onClick={() => { setIsOpenModal(true) }}
                >
                    Add Task
                    </Button>
            </div>
            <Modal
                title='Thêm việc nào...'
                width={500}
                isVisible={isOpenModal}
                renderFooter={() => {
                    return (
                        <>
                            <Button variant="secondary" onClick={() => setIsOpenModal(false)}>Cancel</Button>
                            <Button 
                                variant="info" 
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Add
                            </Button>
                        </>
                    )
                }}
                cancelModal={() => {
                    setIsOpenModal(false)
                }}
            >
                <InputGroup className="mb-3">
                    <FormControl
                        value={task.name}
                        placeholder="Enter todo..."
                        aria-label="Todos"
                        aria-describedby="basic-addon1"
                        onChange={(e) => handlOnChangeNewTodo(e, 'name')}
                    />
                </InputGroup>
                <Form>
                    <Form.Group 
                        controlId="exampleForm.SelectCustom" 
                        value={task.level} 
                        onChange={(e) => handlOnChangeNewTodo(e, 'level')}
                    >
                        <Form.Label>Level select</Form.Label>
                        <Form.Control as="select" custom>
                            {
                                TASK_LEVEL.map((item, index) => {
                                    return (
                                        <option value={index} key={index}>{item.name}</option>
                                    )
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal>
        </div>
    );
}

export default ControlAddNew;