import "./App.css";

function App() {
  return (
      <div className="container">
        {
          2 + 2 === 5
            ? <h1>Login</h1>
            : <h1>Home</h1>
        }
      </div>
  );
}

export default App;
