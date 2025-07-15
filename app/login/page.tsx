export default function Login() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input type="email" id="email" className="w-full p-2 rounded bg-gray-700" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input type="password" id="password" className="w-full p-2 rounded bg-gray-700" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          Login
        </button>
      </form>
    </div>
  )
}

