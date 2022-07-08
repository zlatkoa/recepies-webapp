import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { register, reset, logout } from '../../../features/auth/authSlice'
import axios from 'axios';
import SectionHeader from '../../../components/elements/Section/Section'
import '../Create/Create.css';
import './Profile.css';
import Spinner from '../../../components/elements/Spinner/Spinner'
import moment from 'moment';
const settings = require('../../../settings/settings.json');

function UserProfile() {
  const [loading, setLoading] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [previewPic, setPreviewPic] = useState(true);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [picture, setPicture] = useState(null);
  const [password, setPassword] = useState(null);
  const [password2, setPassword2] = useState(null);
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

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const res = await axios.get('http://localhost:3000/users/' + user.payload.id, config);
      setFirstName(res.data.user.first_name);
      setLastName(res.data.user.last_name);
      setEmail(res.data.user.email);
      setBirthday(res.data.user.birthday);
      setPicture(res.data.user.picture);
      setIsDataFetched(true);
      setLoading(false);
    }
    getUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('birthday', birthday);
    formData.append('picture', picture);

    if (password === null) {
      editUser(formData);
      toast.success('Your user data is updated')
    } else {
      // Password regex check
      const pwdFilter = /^(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[\d|@#$!%*?&])[\p{L}\d@#$!%*?&]{8,96}$/gmu
      if (!pwdFilter.test(password)) {
        toast.error('Password must have one uppercase, lowercase, digit or special sign, and should be more than 8 characters');
      } else {
        if (password != password2) {
          toast.error('New password and password do not match, please check your password')
        } else {
          formData.append('password', password);
          editUser(formData);
          dispatch(logout());
          toast.success('Your password is changed, please log in with the new password')
        }
      }
    }
  }

  const editUser = async (formData) => {
    try {
      const res = await axios.patch('http://localhost:3000/users/' + user.payload.id, formData, config);
      setLoading(true);
      setLoading(false);

    } catch (err) {
      if (err.response.stauts === 500) {
        setLoading(false);
        toast.error(err.message)
        console.log('Problem with the server');
      } else {
        setLoading(false);
        console.log(err);
        toast.error(err.message)
      }
    }
  }

  if (loading) { return <Spinner /> }
  return (
    <>
      <div className='page-container'>
        <SectionHeader title={'My Profile'} />
        <div className='content-container-profile'>
          <form onSubmit={handleSubmit}>
            <div className='container-form-profile'>
              <div className="container-form-profile-033">
                {picture && <img className="profile-picture" src={previewPic ? settings.url + picture : URL.createObjectURL(picture)}></img>}
                <label className='file-label-profile' htmlFor='file' >CHANGE AVATAR</label>
                <input
                  id="file"
                  className='input-file'
                  type="file"
                  accept="image/*"
                  onChange={(e) => { setPicture(e.target.files[0]); setPreviewPic(false) }}
                />
              </div>
              <div className="container-form-profile-066">

                <div className='container-item-profile'>
                  <label className='input-label'>First Name</label>
                  <input
                    className='input-form'
                    type="text"
                    required
                    name='first_name'
                    placeholder='Enter your first name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className='container-item-profile'>
                  <label className='input-label'>Second Name</label>
                  <input
                    className='input-form'
                    type="text"
                    required
                    value={lastName}
                    name='last_name'
                    placeholder='Enter your last name'
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className='container-item-profile'>
                  <label className='input-label'>Email</label>
                  <input
                    className='input-form'
                    type="email"
                    required
                    name='email'
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='container-item-profile'>
                  <label className='input-label'>birthday</label>
                  <input
                    className='input-form'
                    type="date"
                    required
                    value={moment(birthday).format('yyyy-MM-DD')}
                    name='birthday'
                    placeholder='Enter your birth date'
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </div>
                <div className='container-item-profile'>
                  <label className='input-label'>New password</label>
                  <input
                    className='input-form'
                    type="password"
                    value={null}
                    name='password'
                    placeholder='Enter your new password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className='container-item-profile'>
                  <label className='input-label'>Confirm new password</label>
                  <input
                    className='input-form'
                    type="password"

                    value={null}
                    name='password2'
                    placeholder='Confirm your new password'
                    onChange={(e) => setPassword2(e.target.value)}
                  />
                </div>

                <div className='container-item-profile'>
                  <button type='submit' className='green-button'>Save</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
