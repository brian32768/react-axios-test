import { actions, taskStatus, uniqueId } from './action-types'

export function addTask({ title, description }) {
    console.log("actions.addTask", title, description);
    return {
        type: actions.ADD_TASK,
        payload: {
            id: uniqueId(),
            title,
            description,
            status: taskStatus.UNSTARTED,
        },
    };
}
export function changeTaskStatus({ id, status }) {
    console.log("actions.changeTaskStatus", id, status);
    return {
        type: actions.CHANGE_TASK_STATUS,
        payload: {
            id,
            status
        },
    };
}
