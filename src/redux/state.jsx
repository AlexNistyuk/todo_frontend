const truncate = (text, max_length) => {
    return text.length > max_length ? text.substring(0, max_length-1) + '...' : text;
}

let state = {
    maxTaskName: 20,
    maxTaskDescription: 85,
    maxToastHeader: 30,
    successToastColor: '#07bc0c',
    toastAutoClose: 3000,
    truncate: truncate,
}

export default state