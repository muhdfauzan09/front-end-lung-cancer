import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <>
      <div className="text-center pt-56">
        <h1 className="text-red-500 font-bold text-7xl">401</h1>
        <p className="mt-6 font-semibold text-2xl">Your Not Authorized</p>
        <div className="mt-10">
          <Link to="/login">
            <button
              type="button"
              className="bg-blue-800 p-3 rounded-lg text-white font-bold"
            >
              LOGIN
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotAuthorized;
