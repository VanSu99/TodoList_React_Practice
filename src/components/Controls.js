import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ControlSearch from './ControlSearch';
import ControlSort from './ControlSort';
import ControlAddNew from './ControlAddNew';


function Controls(props) {

    const { 
        orderBy, 
        orderDir, 
        onSelectSort, 
        searchText, 
        onChangeSearch, 
        handleAddNewTask 
    } = props;

    let injectedPropsSort = {
        orderDir,
        orderBy,
        onSelectSort
    }

    return (
        <Row>
            <Col sm={6} lg={6}>
                <ControlSort {...injectedPropsSort} />
                <ControlSearch searchText={searchText} onChangeSearch={onChangeSearch} />
            </Col>

            <Col sm={6}>
                <ControlAddNew handleAddNewTask={handleAddNewTask} />
            </Col>
        </Row>

    );
}

export default Controls;