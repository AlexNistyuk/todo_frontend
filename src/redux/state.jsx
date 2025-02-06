const truncate = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength-1) + '...' : text;
}

let state = {
    page: {
        maxNameLength: 20,
        maxDescriptionLength: 60,
        nameRegister: "name",
        descriptionRegister: "description",
    },
    task: {
        maxNameLength: 20,
        maxDescriptionLength: 60,
        maxAssigneeLength: 20,
        nameRegister: "name",
        descriptionRegister: "description",
        assigneeRegister: "assignee",
        maxShowDescriptionLength: 60,
    },
    maxToastHeader: 30,
    successToastColor: '#07bc0c',
    toastAutoClose: 3000,
    truncate: truncate,
}

export default state