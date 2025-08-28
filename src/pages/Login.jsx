function Login({ setLoggedIn }) {
  function handleLogin(e) {
    e.preventDefault();
    setLoggedIn(true);
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Login</h1>
      <form onSubmit={handleLogin} className="space-y-3">
        <input type="text" placeholder="Username" className="w-full p-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
export default Login;
