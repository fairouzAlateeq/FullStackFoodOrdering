function Login() {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Login</h2>
        <form>
          <div>
            <label>Email:</label>
            <input type="email" placeholder="Enter email" />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" placeholder="Enter password" />
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
  
  export default Login;

  