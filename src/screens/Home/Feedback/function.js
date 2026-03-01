let password
export function handleValidations(text, type) {

    if (type === 'email') {
        let emailRegex = /^[A-Z0-9_-]+([\.][A-Z0-9_-]+)*@[A-Z0-9-]+(\.[a-zA-Z]{2,5})$/i;
        if (text === '') {
            return {
                status: false,
                value: text,
                errorText: 'please enter email address.'
            }
        }
        else if (!emailRegex.test(text)) {
            return {
                status: false,
                value: text,
                errorText:'please enter valid email address.'
            }
           
        }
        else {
         
            return {
                value: text,
                status: true,
                errorText: ''
            }
        }
    }
   
   
    else if (type === 'name') {
        var nameRegex = /([A-z][\s\.]|[A-z])+$/;
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: 'please enter name.'
            }
        } 
   
        else if (!nameRegex.test(text)) {
         
            return {
                status: false,
                value: text,
                errorText:'please enter valid name.'
            }
           
        }


        else {
            return {
                value: text,
                status:true,
                errorText: ''
            }
        }
    }

    else if (type === 'message') {
      
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: 'please enter message.'
            }
        } 

        else {
            return {
                value: text,
                status:true,
                errorText: ''
            }
        }
    }
}
