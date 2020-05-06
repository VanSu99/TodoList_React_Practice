import React, { useState, useMemo } from 'react';
import Container from 'react-bootstrap/Container';
import Header from './components/Header/header';
import ListTaskTable from './components/ListTaskTable';
import Controls from './components/Controls';
import initTodoList from './mock/state';


function App() {

  const [todoList, setTodoList] = useState(initTodoList);
  const [orderBy, setOrderBy] = useState('name');
  const [orderDir, setOrderDir] = useState('asc');
  const [searchText, setSearchText] = useState('');

  function onSelectSort(orderBy, orderDir) {
    setOrderBy(orderBy);
    setOrderDir(orderDir);
  }

  function onChangeSearch(text) {
    //console.log('text: ', text);
    setSearchText(text);
  }

  function handleAddNewTask(newTask) {
    //console.log('Task moi nhap:', newTask);
    const newTodo = [...todoList];
    newTodo.push(newTask);
    setTodoList(newTodo);
  }

  /* sử dụng useMemo sẽ trả về 1 giá trị nếu [filters] thay đổi.
    ==> listTaskSearch sẽ được use như là 1 biến.
  */
  const listTaskSearch = useMemo(() => {
    //console.log('listTaskSearch running...');
    let newListTask = todoList.filter(todo => {
      return todo.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1; // bắt buộc phải tìm thấy được
    })
    return newListTask;
  }, [searchText, todoList]);

  const listTaskSearchAndSort = useMemo(() => {
    //console.log('listTaskSearchAndSort running...');
    let returnIndex = 1; // default sort DESC
    if (orderDir === 'asc') returnIndex = -1;

    listTaskSearch.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return returnIndex;
      else if (a[orderBy] > b[orderBy]) return (-1) * returnIndex;
      return 0;
    })

    return [...listTaskSearch];
  }, [orderBy, orderDir, listTaskSearch])

  function handleDeleteTodo(todo, callback) {
    console.log('waiting...')
    // dùng setTimeout để giá lập Server
    setTimeout(() => {
      let newTodos = [...todoList];
      let posTodo = newTodos.indexOf(todo);
      if (posTodo !== -1) {
        newTodos.splice(posTodo, 1);
        //console.log(newTodos)
        setTodoList(newTodos);
      }
      callback && typeof callback === 'function' && callback();
    }, 1000)
  }

  function handleEditTodo(todoEdit) {
    console.log('App resolve: ', todoEdit);
    // tìm id cần update trong todoList
    const posTodoEdit = todoList.findIndex((todo) => {
      return todo.id === todoEdit.id;
    });
    if(posTodoEdit !== -1){
      // trỏ tới index cần edit và gán cho nó giá trị cần sửa
      todoList[posTodoEdit].name = todoEdit.name;
      todoList[posTodoEdit].level = todoEdit.level;
      setTodoList(...[todoList]);
    }
  }

  let injectedPropsControl = {
    orderBy,
    orderDir,
    searchText,
    onSelectSort,
    onChangeSearch,
    handleAddNewTask
  }

  return (
    <Container>
      <Header />

      <Controls {...injectedPropsControl} />

      <ListTaskTable todoList={listTaskSearchAndSort} handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} />

    </Container>
  );
}

export default App;


// data gốc -> search => data 1 -> sort => data 2 render ra ListTaskTable