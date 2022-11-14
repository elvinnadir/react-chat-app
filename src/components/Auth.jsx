import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import signInImage from '../assets/signup.jpg'

const cookies = new Cookies()

const initialState = {
    fullName: '',
    username: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    avatarURL: "",

}
const Auth = () => {
    const [isSignup, setIsSignup] = useState(initialState)
    const [form, setForm] = useState(true)


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { fullName, username, password, phoneNumber, avatarURL } = form

        const URL = 'http://localhost:5000/auth'

        const { data: { token, userId, hashedPassword } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
            username, password, fullName, phoneNumber, avatarURL
        })

        cookies.set('token', token)
        cookies.set('username', username)
        cookies.set('fullName', fullName)
        cookies.set('userId', userId)

        if (isSignup) {
            cookies.set('phoneNumber', phoneNumber)
            cookies.set('avatarURL', avatarURL)
            cookies.set('hashedPassword', hashedPassword)
        }
        window.location.reload()
    }

    return (
        <div className='auth__form-container'>
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{isSignup ? 'Sign up' : 'Sign in'}</p>
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input type="text"
                                    name="fullName"
                                    placeholder='Full Name'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="userName"> Username</label>
                            <input type="text"
                                name="userName"
                                placeholder='Username'
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone number</label>
                                <input type="number"
                                    name="phoneNumber"
                                    placeholder='Phone number'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}

                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input type="text"
                                    name="avatarURL"
                                    placeholder='Avatar URL'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                name="password"
                                placeholder='Password'
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password"
                                    name="confirmPassword"
                                    placeholder='Confirm Password'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? 'Sign up' : 'Sign in'} </button>
                        </div>
                    </form>
                    <div className='auth__form-container_fields-account'>
                        <p>
                            {isSignup
                                ? 'Already you have an account?'
                                : 'Dont have an account'
                            }
                            <span onClick={switchMode}>
                                {isSignup ? 'Sign in' : 'Sign up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="auth__form-container__image">
                <img src={signInImage} alt="sign in" />
            </div>
        </div>
    )
}

export default Auth
