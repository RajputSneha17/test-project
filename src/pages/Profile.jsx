import { useState } from "react";
import axios from "axios";
import { User, Mail, Phone, MapPin, Pencil, Save, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { UserX } from "lucide-react";

const Profile = ({ url }) => {
  const [edit, setEdit] = useState(false);
  const token = localStorage.getItem("token");

  const defaultUser = {
    username: "",
    mobileNumber: "",
    address: {
      email: "",
      houseNumber: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
      landmark: "",
    },
  };

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      return defaultUser;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      return parsedUser && typeof parsedUser === "object"
        ? parsedUser
        : defaultUser;
    } catch (error) {
      console.warn("Invalid saved user data", error);
      return defaultUser;
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNumber") {
      const mobileValue = value.replace(/\D/g, "").slice(0, 10);

      setUser((prev) => ({
        ...prev,
        mobileNumber: mobileValue,
      }));

      return;
    }

    if (
      [
        "email",
        "houseNumber",
        "street",
        "city",
        "state",
        "pinCode",
        "landmark",
      ].includes(name)
    ) {
      setUser((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(`${url}/user/update`, user, {
        headers: {
          token,
        },
      });

      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);

      await Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: data.message,
        confirmButtonColor: "#000",
      });

      setEdit(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Profile?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      window.location.href = "/";
    }
  };

  if (!token) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center">
            <UserX className="w-10 h-10 text-orange-500" />
          </div>

          <h2 className="text-2xl font-bold mt-6">You're Not Registered</h2>

          <p className="text-gray-500 mt-3 leading-7">
            It looks like you don't have an account yet. Please register or log
            in to access your profile and manage your information.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              to="/register"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black text-white flex items-center justify-center text-3xl sm:text-4xl font-bold flex-shrink-0">
              {user.username?.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold break-words">
                {user.username}
              </h1>

              <p className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 mt-3 text-sm sm:text-base break-all">
                <Phone size={16} className="flex-shrink-0" />
                {user.mobileNumber}
              </p>

              <p className="flex items-center justify-center sm:justify-start gap-2 text-gray-500 mt-2 text-sm sm:text-base break-all">
                <Mail size={16} className="flex-shrink-0" />
                {user.address?.email || "No Email"}
              </p>
            </div>
          </div>

          {!edit ? (
            <button
              onClick={() => setEdit(true)}
              className="mt-6 md:mt-0 flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl"
            >
              <Pencil size={18} />
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="mt-6 md:mt-0 flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              <Save size={18} />
              Save Changes
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">
          <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-500">Full Name</label>

              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                disabled={!edit}
                className={`w-full mt-2 rounded-xl border p-3 ${
                  edit ? "border-black" : "bg-gray-100 border-transparent"
                }`}
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Mobile Number</label>

              <input
                type="text"
                name="mobileNumber"
                value={user.mobileNumber}
                onChange={handleChange}
                disabled={!edit}
                maxLength={10}
                className={`w-full mt-2 rounded-xl border p-3 ${
                  edit ? "border-black" : "bg-gray-100 border-transparent"
                }`}
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Email</label>

              <input
                type="email"
                name="email"
                value={user.address?.email || ""}
                onChange={handleChange}
                disabled={!edit}
                className={`w-full mt-2 rounded-xl border p-3 ${
                  edit ? "border-black" : "bg-gray-100 border-transparent"
                }`}
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">House Number</label>

              <input
                type="text"
                name="houseNumber"
                value={user.address?.houseNumber || ""}
                onChange={handleChange}
                disabled={!edit}
                className={`w-full mt-2 rounded-xl border p-3 ${
                  edit ? "border-black" : "bg-gray-100 border-transparent"
                }`}
              />
            </div>
            <div>
              <label className="text-sm text-gray-500">Street</label>

              <input
                type="text"
                name="street"
                value={user.address?.street || ""}
                onChange={handleChange}
                disabled={!edit}
                className={`w-full mt-2 rounded-xl border p-3 ${
                  edit ? "border-black" : "bg-gray-100 border-transparent"
                }`}
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">City</label>

              <input
                type="text"
                name="city"
                value={user.address?.city || ""}
                onChange={handleChange}
                disabled={!edit}
                className={`w-full mt-2 rounded-xl border p-3 ${
                  edit ? "border-black" : "bg-gray-100 border-transparent"
                }`}
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">State</label>

              <input
                type="text"
                name="state"
                value={user.address?.state || ""}
                onChange={handleChange}
                disabled={!edit}
                className={`w-full mt-2 rounded-xl border p-3 ${
                  edit ? "border-black" : "bg-gray-100 border-transparent"
                }`}
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Pin Code</label>

              <input
                type="text"
                name="pinCode"
                value={user.address?.pinCode || ""}
                onChange={handleChange}
                disabled={!edit}
                className={`w-full mt-2 rounded-xl border p-3 ${
                  edit ? "border-black" : "bg-gray-100 border-transparent"
                }`}
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-500">Landmark</label>

              <input
                type="text"
                name="landmark"
                value={user.address?.landmark || ""}
                onChange={handleChange}
                disabled={!edit}
                className={`w-full mt-2 rounded-xl border p-3 ${
                  edit ? "border-black" : "bg-gray-100 border-transparent"
                }`}
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-500 flex items-center gap-2">
                <MapPin size={16} />
                Complete Address
              </label>

              <div className="mt-2 bg-gray-100 rounded-xl p-4 text-gray-700">
                {user.address?.houseNumber}, {user.address?.street},
                <br />
                {user.address?.city}, {user.address?.state} -{" "}
                {user.address?.pinCode}
                <br />
                Landmark: {user.address?.landmark}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-10">
            {edit ? (
              <button
                onClick={() => setEdit(false)}
                className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
            >
              <Trash2 size={18} />
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
