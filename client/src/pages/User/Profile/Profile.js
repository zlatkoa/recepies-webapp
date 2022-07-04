import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { register, reset, logout } from '../../../features/auth/authSlice'
import axios from 'axios';
import SectionHeader from '../../../components/elements/Section/Section'
import '../Create/Create.css';
import Spinner from '../../../components/elements/Spinner/Spinner'
import moment from 'moment';


function UserProfile() {
  const [loading, setLoading] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [profileFirstName, setProfileFirstName] = useState('');
  const [profileSecondName, setProfileSecondName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [profileBirthday, setProfileBirthday] = useState('');


  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    birthday: '',
    password: '',
    password2: ''
  })

  const { first_name, last_name, email, birthday, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )


  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }
  // console.log(user.token)
  // console.log(user.payload.id)
  // console.log(user.payload)
  // console.log(profileData);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/users/' + user.payload.id, config);
      setProfileFirstName(res.data.user.first_name)
      setProfileSecondName(res.data.user.last_name)
      setProfileEmail(res.data.user.email)
      setProfileBirthday(res.data.user.birthday)
      setIsDataFetched(true);
      setLoading(false);
    }
    getUser();
  }, []);



  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password != password2) {
      toast.error('Passwords do not match, please check your password')
    } else {
      const userData = {
        first_name,
        last_name,
        email,
        birthday,
        password
      }
      dispatch(register(userData))
    }
  }


  if (isLoading) { return <Spinner /> }
  return (
    <>
      <div className='page-container'>
        <SectionHeader title={'My Profile'} />
        <div className='content-container'>
          <div className='container-left-create'>
            Profile Picture
          </div>
          <div className='container-right-create'>
            <form onSubmit={onSubmit}>
              <div className='container-form'>
                <div className='container-form-left'>
                  <div className='container-item'>
                  </div>
                  <div className='container-item'>
                    <label className='input-label'>First Name</label>
                    <input
                      className='input-form'
                      type="text"
                      required
                      name='first_name'
                      placeholder='Enter your first name'
                      value={profileFirstName}
                      onChange={onChange}
                    />
                  </div>

                  <div className='container-item'>
                    <label className='input-label'>Email</label>
                    <input
                      className='input-form'
                      type="email"
                      required
                      name='email'
                      placeholder='Enter your email'
                      value={profileEmail}
                      onChange={onChange}
                    />
                  </div>
                  <div className='container-item'>
                    <label className='input-label'>Password</label>
                    <input
                      className='input-form'
                      type="password"
                      required
                      value={''}
                      name='password'
                      placeholder='Enter your password'
                      onChange={onChange}
                    />
                  </div>

                  <div className='container-item'>
                    <button type='submit' className='green-button'>Save</button>
                  </div>
                </div>

                <div className='container-form-right'>
                  <div className='container-item'>
                    <label className='input-label'>Second Name</label>
                    <input
                      className='input-form'
                      type="text"
                      required
                      value={profileSecondName}
                      name='last_name'
                      placeholder='Enter your last name'
                      onChange={onChange}
                    />
                  </div>
                  <div className='container-item'>
                    <label className='input-label'>birthday</label>
                    <input
                      className='input-form'
                      type="date"
                      required
                      value={moment(profileBirthday).format('yyyy-MM-DD')}
                      name='birthday'
                      placeholder='Enter your birth date'
                      onChange={onChange}
                    />
                  </div>
                  <div className='container-item'>
                    <label className='input-label'>Repeat password</label>
                    <input
                      className='input-form'
                      type="password"
                      required
                      value={''}
                      name='password2'
                      placeholder='Confirm your password'
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
