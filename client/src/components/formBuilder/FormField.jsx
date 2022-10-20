import React from 'react';
import { useSelector } from 'react-redux';



const FormField = (
        { type, placeholder, onChange, name }
    ) => {

        // const getFieldFromFormStateByName = (fieldName) => 
        //     (state) => 
        //     state.form.fields.find(field => field.name === fieldName)
    
        // const fieldValueState = useSelector(getFieldFromFormStateByName(name))
        const fieldsValueStateArr = useSelector(state => state.form.fields)
        let getFieldFromFormStateByName = []

        if (fieldsValueStateArr) {
            getFieldFromFormStateByName = fieldsValueStateArr
             .find(field => field.name === name)
        }
         
        // const { error } = getFieldFromFormStateByName
        // const { error } = fieldValueState

    return(
        <p>
            <input 
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}      
                required />

                {getFieldFromFormStateByName 
                    && <span className='warned-text'>
                        {getFieldFromFormStateByName.error}
                        </span>}
        </p>
    )
}

export default FormField