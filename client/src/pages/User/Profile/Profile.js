import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../../../components/elements/Spinner/Spinner'
import { register, reset, logout } from '../../../features/auth/authSlice'

function ProfilePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isError, message, isLoading } = useSelector((state) => state.auth)
  

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/user/login')
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='container'>
      
    </div>
 
  )
}

export default ProfilePage
