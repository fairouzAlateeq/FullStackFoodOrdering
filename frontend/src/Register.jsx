function Register() {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Register</h2>
        <form>
          <div>
            <label>Name:</label>
            <input type="text" placeholder="Your name" />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" placeholder="Enter email" />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" placeholder="Enter password" />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
  
  export default Register;
  