const notifStyle = {
    background: 'lightgrey',
    fontSize: '16px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
};

const notifStyle_success = {
    ...notifStyle,
    color: 'green',
};

const notifStyle_warning = {
    ...notifStyle,
    color: '#856f00',
}

const notifStyle_error = {
    ...notifStyle,
    color: 'red',
};

const Notification = ({ notifType, message }) => {
    if (message === null) {
        return null;
    } else if (notifType === "success" ) {
        return (
            <div className='success' style={notifStyle_success}>
                {message}
            </div>
        );
    } else if (notifType === "warning") {
        return (
            <div className='warning' style={notifStyle_warning}>
                {message}
            </div>
        );
    } else if (notifType === "error") {
        return (
            <div className='error' style={notifStyle_error}>
                {message}
            </div>
        );
    }
    
};

export default Notification;