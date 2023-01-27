import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { modifyUser } from '../../slices/authSlice';

const HeroSection = () => {
    const dispatch = useDispatch();
    const tokenAuth = useSelector((state) => state.auth.token);
    const firstName = useSelector(state => state.auth.firstName);
    const lastName = useSelector(state => state.auth.lastName);

    const [isModifying, setIsModifying] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        firstName: '',
        lastName: '',
       })

    const modify = () => {
        if (isModifying) {
            setIsModifying(false);
        } else {
            setIsModifying(true);
        }
    }

    const submitHandlerModify = async (e) => {
        e.preventDefault();

        const modify = await dispatch(modifyUser({
            firstName:updatedUser.firstName ,
            lastName:updatedUser.lastName,
            token: tokenAuth
        }))
        setIsModifying(false);
      }; 

    if(isModifying) {
        return (
            <div className="header">
                <h1>Welcome back<br /></h1>
                <form onSubmit={submitHandlerModify}>
                    <div className='form-wrapper'>
                        <div className="input-wrapper">
                            <label htmlFor="firstNameUpdate">First name</label>
                            <input type="text" id="firstNameUpdate" placeholder={firstName} onChange={ (e) => setUpdatedUser({ ...updatedUser, firstName:e.target.value }) }/>
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="lastNameUpdate">Last name</label>
                            <input type="text" id="lastNameUpdate" placeholder={lastName} onChange={ (e) => setUpdatedUser({ ...updatedUser, lastName:e.target.value }) }/>
                        </div>
                    </div>
                    <div className='form-wrapper'>
                        <button type='submit' className="edit-button">Save</button>
                        <button type="button" className="edit-button" onClick={modify}>Cancel</button>
                    </div>
                </form>
            </div>
          )
    } else {
        return (
            <div className="header">
                <h1>Welcome back<br />{lastName} {firstName}</h1>
                <button type="button" className="edit-button" onClick={modify}>Edit Name</button>
            </div>
        )
    }
}

export default HeroSection