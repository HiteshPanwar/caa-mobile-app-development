let password
export function handleValidations(text, type) {
     if (type === 'phoneNo') {
        // let mobileRegex = /^[1-9]{1}[0-9]{0,12}$/i;
        let mobileRegex = /^[1-9]{1}[0-9]{0,16}$/i;
      
        if (text === '') {
            return {
                status: false,
                value: text,
                errorText: 'Please enter mobile number.'
            }
        }
        else if (!mobileRegex.test(text)) {
            return {
                status: false,
                value: text,
                errorText: 'Please enter valid mobile number.'
            }
        }
        else {
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }
    } else if (type === 'password') {
        // let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ 
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: ' Please enter password.'
            }
        }
        else {
            password = text
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }
    }
    else if (type === 'confirmpassword') {
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: 'Please enter confirm password.'
            }
        }
        else if (password != text) {
            return {
                value: text,
                status: false,
                errorText: 'password and confirmation password does not match.'
            }
        }
        else {
            password = text
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }
    }
}

