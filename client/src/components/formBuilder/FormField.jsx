import React from 'react';
import { useSelector } from 'react-redux';



const FormField = (
        { type, placeholder, onChange, name }
    ) => {

        const getFieldFromFormStateByName = (fieldName) => 
            (state) => 
            state.form.fields.find(field => field.name === fieldName)
    
        const fieldValueState = useSelector(getFieldFromFormStateByName(name))

        const { error, 
            // value
         } = fieldValueState

    return(
        <p>
            <input 
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}      
                required />

                {error 
                    && <span className='warned-text'>
                        {error}
                        </span>}
        </p>
    )
}

export default FormField