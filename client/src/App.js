import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to hujo.
        </p>
        <a
          className="App-link"
          href="/auth/google"
        >
          Sign in with Google
        </a>
        <a
          className="App-link"
          href="/api/current_user"
        >
          Check user
        </a>
        <a
          className="App-link"
          href="/api/logout"
        >
          Logout
        </a>
      </header>
    </div>
  );
}

export default App;
