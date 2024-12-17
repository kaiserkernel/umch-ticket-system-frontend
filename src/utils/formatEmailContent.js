import { POSITIONNAMES } from "../globalVariables";

export const formatEmailContent = (template, data, studentName) => {
    let _data = template;
    Object.keys(data).map((log) => {
        _data = _data.replace(`[${log}]`, data[log]);
    })

    if (studentName)
        _data = _data.replace("[student]", studentName);

    let authUser = localStorage.getItem("userData");
    authUser = JSON.parse(authUser);

    if (authUser) {
        _data = _data.replace("[admin]", authUser.firstName + " " + authUser.lastName)
            .replace("[email]", authUser.email)
            .replace("[position]", Number.isInteger(authUser.position)
                ? POSITIONNAMES[authUser.position]
                : "UMCH University Team")
    }

    return _data;
}