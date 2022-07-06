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

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    birthday: '',
    picture: '',
    password: '',
    password2: ''
  })

  const { first_name, last_name, email, birthday, password, picture, password2 } = formData

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
      setFormData(prev => ({ ...prev, first_name: res.data.user.first_name }))
      setFormData(prev => ({ ...prev, last_name: res.data.user.last_name }))
      setFormData(prev => ({ ...prev, email: res.data.user.email }))
      setFormData(prev => ({ ...prev, birthday: res.data.user.birthday }))
      setFormData(prev => ({ ...prev, picture: res.data.user.picture }))
      setFormData(prev => ({ ...prev, password: '' }))
      setFormData(prev => ({ ...prev, password2: '' }))
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
      editUser(formData);
    }
  }

  const editUser = async (formData) => {
    try {
      const res = await axios.patch('http://localhost:3000/users/' + user.payload.id, formData, config);
      setLoading(true);
      dispatch(logout());

    } catch (err) {
      if (err.response.stauts === 500) {
        setLoading(false);
        console.log('Problem with the server');
      } else {
        setLoading(false);
        console.log(err.response.data);
      }
    }
  }



  if (loading) { return <Spinner /> }
  return (
    <>
    <div className='page-container'>
    <SectionHeader title={'My Profile'} />
    <div className='content-container'>
      <form onSubmit={onSubmit}>
        <div className='container-form-profile'>
          <div className="container-form-profile-033">                        
            {settings.url+picture && <img className="profile-picture" src={previewPic ? settings.url+picture : URL.createObjectURL(picture)}></img>}
              <label className='file-label-profile' htmlFor='file' >CHANGE AVATAR</label>
              <input
                id="file"
                className='input-file'
                type="file"
                accept="image/*"
                onChange={(e) => { setFormData(prev => ({ ...prev, picture: (e.target.files[0]) })); setPreviewPic(false) }}
              />
          </div>
          <div className="container-form-profile-066">
     
               
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
                      value={first_name}
                      onChange={onChange}
                    />
                  </div>
                  <div className='container-item'>
                    <label className='input-label'>Second Name</label>
                    <input
                      className='input-form'
                      type="text"
                      required
                      value={last_name}
                      name='last_name'
                      placeholder='Enter your last name'
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
                      value={email}
                      onChange={onChange}
                    />
                  </div>
                  <div className='container-item'>
                    <label className='input-label'>birthday</label>
                    <input
                      className='input-form'
                      type="date"
                      required
                      value={moment(birthday).format('yyyy-MM-DD')}
                      name='birthday'
                      placeholder='Enter your birth date'
                      onChange={onChange}
                    />
                  </div>
                  <div className='container-item'>
                    <label className='input-label'>Password</label>
                    <input
                      className='input-form'
                      type="password"
                      required
                      value={password}
                      name='password'
                      placeholder='Enter your password'
                      onChange={onChange}
                    />
                  </div>
                  <div className='container-item'>
                    <label className='input-label'>Repeat password</label>
                    <input
                      className='input-form'
                      type="password"
                      required
                      value={password2}
                      name='password2'
                      placeholder='Confirm your password'
                      onChange={onChange}
                    />
                  </div>

                  <div className='container-item'>
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
