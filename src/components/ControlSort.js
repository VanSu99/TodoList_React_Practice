import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { SORT } from '../constants';

function ControlSort(props) {

    const { onSelectSort, orderBy, orderDir } = props;

    function onSelectDropdown(eventKey) {
        let [orderBy, orderDir] = eventKey.split('-');
        if (onSelectSort) {
            onSelectSort(orderBy, orderDir);
        }
    }

    return (
        <div className="button-control d-flex">
            <div className="dropdown mr-3">
                <DropdownButton id="dropdown-basic-button" title="Sort By" onSelect={onSelectDropdown}>
                    {
                        SORT.map((sort) => (
                            <Dropdown.Item
                                key={sort.key}
                                eventKey={sort.key}
                                active={`${orderBy}-${orderDir}` === sort.key}>
                                {sort.text}
                            </Dropdown.Item>
                        ))
                    }
                </DropdownButton>
            </div>
            <div className="sort-desc">
                <span className="d-block">{orderBy} - {orderDir}</span>
            </div>
        </div>
    );
}

export default ControlSort;