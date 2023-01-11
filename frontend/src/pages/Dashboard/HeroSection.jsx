import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const HeroSection = () => {
    const firstName = useSelector(state => state.auth.firstName);
    const lastName = useSelector(state => state.auth.lastName);

    const [isModifying, setIsModifying] = useState(false);

    const modify = () => {
        if (isModifying) {
            setIsModifying(false);
        } else {
            setIsModifying(true);
        }
    }

    if(isModifying) {
        return (
            <div className="header">
                <h1>Welcome back<br /></h1>
                <div className="input-wrapper">
                    <label htmlFor="firstNameUpdate">FirstName</label>
                    <input type="text" id="firstNameUpdate" placeholder='firstname'/>
                </div>
                <div className="input-wrapper">
                    <label htmlFor="lastNameUpdate">LastName</label>
                    <input type="text" id="lastNameUpdate" placeholder='lastname'/>
                </div>
                <button className="edit-button" onClick={modify}>Save</button>
                <button className="edit-button" onClick={modify}>Cancel</button>
            </div>
          )
    } else {
        return (
            <div className="header">
                <h1>Welcome back<br />{lastName} {firstName}</h1>
                <button className="edit-button" onClick={modify}>Edit Name</button>
            </div>
        )
    }
}

export default HeroSection