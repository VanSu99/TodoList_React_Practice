import React from 'react';
import Button from 'react-bootstrap/Button';
import Loading from './Loading';
import './button.css';

function ButtonCpt(props) {

    const { children, loading, ...restProps } = props;

    return (
        <div>
            <Button            
                {...restProps}
                variant="danger"
            >
                { loading && <Loading /> }
                <span>{children}</span>
            </Button>
        </div>
    );
}

export default ButtonCpt;