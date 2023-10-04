import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../features/user/userSlice'
import Form from 'react-bootstrap/Form'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = (email, password) => {
    /*
        let userAuth = true
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
        .then(({user})=>{
            dispatch(setUser({
            email:user.email,
            id: user.uid,
            token: user.accessToken
            }))
            userAuth = true
        navigate("/", { replace: true })
        }).catch(userAuth = false)
        */
  }

  return (
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
  )
}

export { Login }
