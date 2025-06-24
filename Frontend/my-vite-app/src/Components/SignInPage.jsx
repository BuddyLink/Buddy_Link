import "./SignInPage.css"

const SignInPage = () => {
  return (
    <div className="SignInPage">
      <h1>Sign In</h1>
      <label>Email</label>
      <input type="email" placeholder="Enter email" />
      <label>Password</label>
      <input type="password" placeholder="Enter password" />
      <button>Sign In</button>
      <p>Not a Member</p>
      <button>Sign Up</button>
    </div>
  )
}

export default SignInPage;
