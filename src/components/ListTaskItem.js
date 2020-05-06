import React, { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import { TASK_LEVEL } from '../constants';

function ListTaskItem({ todo, index, setTodoSelected, handleEditTodo }) {

    const { name, level } = todo;
    const [todoEdit, setTodoEdit] = useState(null);

    const handleClickEdit = useCallback(() => {
        setTodoEdit(todo);
    }, [todo])

    const handleCancelEdit = useCallback(() => {
        setTodoEdit(null);
    },[])

    const handlOnChangeEditTodo = useCallback((keyField) => {
        return (e) => {
            setTodoEdit({
                ...todoEdit,
                [keyField]: e.target.value
            })
        }
    },[todoEdit])

    const handleSaveEdit = useCallback(() => {
        //console.log('save todo: ', todoEdit)
        if(handleEditTodo && typeof handleEditTodo === 'function'){
            handleEditTodo(todoEdit);
        }
        setTodoEdit(null);
    }, [handleEditTodo, todoEdit])

    return (
        <>
            <tr>
                <td>{index + 1}</td>
                <td>
                    {
                        !todoEdit ? name : 
                        <InputGroup className="mb-3">
                            <FormControl
                                value={todoEdit.name}
                                placeholder="Edit todo..."
                                aria-label="Todos"
                                aria-describedby="basic-addon1"
                                onChange={handlOnChangeEditTodo('name')}
                            />
                        </InputGroup>
                    }
                </td>
                <td>
                    {
                        !todoEdit ? 
                        <Badge variant={`${TASK_LEVEL[level].class}`}>
                            {TASK_LEVEL[level].name}
                        </Badge>    : 
                        <Form>
                            <Form.Group
                                controlId="exampleForm.SelectCustom"
                                value = {todoEdit.level}
                                onChange={handlOnChangeEditTodo('level')}
                            >
                                <Form.Control as="select" custom>
                                    {
                                        TASK_LEVEL.map((item, index) => {
                                            return (
                                                <option value={index} key={item.name + index}>{item.name}</option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    }
                </td>
                <td>
                    {
                        !todoEdit ? <Button
                            className="mr-2"
                            variant="warning"
                            onClick={handleClickEdit}
                        >
                            Edit
                        </Button> : 
                        <Button
                        className="mr-2"
                        variant="primary"
                        onClick={handleSaveEdit}
                        >
                            Save
                        </Button>
                    }
                    
                    {
                        !todoEdit ? 
                        <Button
                            variant="danger"
                            onClick={() => {
                                setTodoSelected(todo);
                            }}
                        >
                            Delete
                        </Button> : 
                        <Button
                            variant="secondary"
                            onClick={handleCancelEdit}
                        >
                            Cancel
                        </Button>
                    }
                </td>
            </tr>
        </>
    );
}

export default ListTaskItem;