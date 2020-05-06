import React, {useState, useEffect} from 'react';
import Modal from './Modal/Modal';
import ListTaskItem from './ListTaskItem';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ButtonCpt from './Button/Button';

function ListTaskTable(props) {

    const { todoList, handleDeleteTodo, handleEditTodo } = props;
    const [isShowModal, setIsShowModal] = useState(false);
    const [todoSelected, setTodoSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
   

    useEffect(() => {
        // khi mà todoSelected thay đổi state (có giá trị) thì Modal sẽ open
        if(todoSelected) {
            setIsShowModal(true);
        }else {
            setIsShowModal(false)
        }
    }, [todoSelected])
    
    function handleSubmit(todo) {
        // check case user click liên tục
        if(isLoading) return;
        setIsLoading(true);
        if(handleDeleteTodo) {
            handleDeleteTodo(todo, (responseData) => {
                setIsLoading(false);
                if(responseData && responseData.error) {
                    alert(responseData.message)
                }else {
                    setTodoSelected(null);
                }
                
            });
        }
    }

    return (
        <div>
            <h2>List Task</h2>
            <div className="task-table">
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Task</th>
                            <th>Level</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // if truyen vao Object rong thi khong render
                            todoList && todoList.length > 0 && todoList.map((todo, index) => {
                                return <ListTaskItem 
                                    todo={todo} 
                                    index={index} 
                                    key={todo.id} 
                                    setTodoSelected={setTodoSelected} 
                                    handleEditTodo={handleEditTodo}
                                />
                            })
                        }
                    </tbody>
                </Table>
            </div>

            <Modal
                title='Thông Báo'
                width={500}
                isVisible = {isShowModal}
                renderFooter={() => {
                    return (
                        <>
                            <Button variant="secondary" onClick={() => setIsShowModal(false)}>Hủy</Button>
                            <ButtonCpt 
                                variant="info" 
                                type="submit"
                                loading={isLoading}
                                onClick={() => 
                                    handleSubmit(todoSelected)
                                }
                            >
                                Xóa
                            </ButtonCpt>
                        </>
                    )
                }}
                cancelModal={() => {
                    setIsShowModal(false);
                    setTodoSelected(null);
                }}
            >
                <p>Bạn có muốn xóa 
                    <span style={{fontWeight: 600}}>{todoSelected && todoSelected.name}</span> 
                không?</p>
            </Modal>

        </div>
    );
}

export default ListTaskTable;