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
   
   
    else if (type === 'firstname') {
        var nameRegex = /([A-z][\s\.]|[A-z])+$/;
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: 'please enter first name.'
            }
        } 
   
        else if (!nameRegex.test(text)) {
         
            return {
                status: false,
                value: text,
                errorText:'please enter valid first name.'
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
    else if (type === 'lastname') {
        var nameRegex = /([A-z][\s\.]|[A-z])+$/;
        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: 'please enter last name.'
            }
        } 
   
        else if (!nameRegex.test(text)) {
         
            return {
                status: false,
                value: text,
                errorText:'please enter valid last name.'
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

    else if (type === 'mobileNo') {
        var numberRegex = /^[1-9][0-9]{9,12}$/;

        if (text === '') {
            return {
                value: text,
                status: false,
                errorText: 'please enter phonenumber.'
            }
        }
        else if (!numberRegex.test(text)) {
            return {
                status: false,
                value: text,
                errorText:'please enter valid phonenumber.'
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
    else if (type === 'content') {
      
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
