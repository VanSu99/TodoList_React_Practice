import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function ControlSearch(props) {

    const { searchText, onChangeSearch } = props;

    function handleChangeSearchText(e) {
        onChangeSearch && typeof onChangeSearch === 'function' && onChangeSearch(e.target.value);
    }

    function handleClearSearchText() {
        onChangeSearch && typeof onChangeSearch === 'function' && onChangeSearch('');
    }

    return (
        <div className="search-box mt-4">
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search for..."
                    aria-label="Search for..."
                    aria-describedby="basic-addon2"
                    value={searchText}
                    onChange={handleChangeSearchText}
                />
                <InputGroup.Append>
                    <Button 
                        variant="primary" 
                        type="reset"
                        onClick={handleClearSearchText}
                        >
                        Clear                 
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
}

export default ControlSearch;