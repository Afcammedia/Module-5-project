const form = document.getElementsByName('form-layout')[0];
const username = document.getElementsByName('username')[0];
const password = document.getElementsByName('password')[0];
const submit = document.querySelector('.btn');
let timeout;

submit.addEventListener('click', async (e) => {
    e.preventDefault();
    const formData = {
        username: username.value,
        password: password.value,
    };
    console.log(formData);
    try {
        const result = await axios.post('/api/v1/users/login', formData);
        const { data } = result;
        timeout = alertMessage(loadingBox, 'loading-message', 'Loading');
        if (data.status === 'Success') {
            clearTimeOut(timeout);
            timeout = alertMessage(successBox, 'success-message', data.message);
            window.location.replace(`/home`);
        } else {
            clearTimeOut(timeout);
            timeout = alertMessage(errorBox, 'error-message', data.message);
        }
    } catch (error) {
        clearTimeOut(timeout);
        alertMessage(
            errorBox,
            'error-message',
            'Incorrect Username or Password!'
        );
    }
});

const alertMessage = (element, messageClass, message) => {
    element.classList.toggle('visible');
    const innerMessage = document.querySelector(`.${messageClass}`);

    innerMessage.innerHTML = message;
    timeout = setTimeout(() => {
        element.classList.toggle('visible');
    }, 5000);
    clearMessage(innerMessage.innerHTML);
    return timeout;
};
const clearMessage = (element) => {
    element = '';
};
const clearTimeOut = (time) => {
    clearTimeout(time);
};

const fetchData = (username, password) => {
    return {
        username: username,
        password: password,
    };
};
