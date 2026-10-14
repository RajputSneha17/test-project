import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  MapPin,
  User,
  Phone,
  House,
  LoaderCircle,
  CheckCircle,
} from "lucide-react";

const FillAddress = ({ url }) => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    receiverName: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    houseNumber: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pinCode: "",
    instructions: "",
  });

  useEffect(() => {
    const checkLink = async () => {
      if (!token) {
        setMessage("Address link is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${url}/FriendAddress/address-share/${token}`,
        );

        setValid(response.data.valid === true);
        if (response.data.valid !== true) {
          setMessage(
            response.data.message ||
              "This address link is invalid, expired, or already used.",
          );
        }
      } catch (error) {
        setValid(false);
        setMessage(
          error.response?.data?.message ||
            "This link is invalid, expired, or already used.",
        );
      } finally {
        setLoading(false);
      }
    };

    checkLink();
  }, [token, url]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) return;

    setSubmitting(true);

    try {
      const response = await axios.post(
        `${url}/FriendAddress/address-share/${token}/submit`,
        formData,
      );

      setValid(false);

      await Swal.fire({
        icon: "success",
        title: "Address submitted!",
        text:
          response.data.message || "The address has been saved successfully.",
        confirmButtonColor: "#15803d",
      });

      setMessage(
        "Address submitted successfully. This link cannot be used again.",
      );
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Unable to submit",
        text:
          error.response?.data?.message ||
          "The link may have expired or already been used. Please ask the sender for a new link.",
        confirmButtonColor: "#15803d",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-green-200 bg-green-50/70 px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100";

  const fields = [
    {
      name: "receiverName",
      label: "Receiver's Full Name",
      placeholder: "Enter full name",
      required: true,
      icon: User,
    },
    {
      name: "mobileNumber",
      label: "Mobile Number",
      placeholder: "10-digit mobile number",
      required: true,
      icon: Phone,
      type: "tel",
    },
    {
      name: "alternateMobileNumber",
      label: "Alternate Mobile Number",
      placeholder: "Optional alternate number",
      icon: Phone,
      type: "tel",
    },
    {
      name: "houseNumber",
      label: "House / Flat / Building",
      placeholder: "House number, flat, building",
      required: true,
      icon: House,
    },
    {
      name: "street",
      label: "Street / Colony / Area",
      placeholder: "Street, colony or area",
      required: true,
      icon: MapPin,
    },
    {
      name: "landmark",
      label: "Landmark",
      placeholder: "Nearby landmark (optional)",
      icon: MapPin,
    },
    {
      name: "city",
      label: "City",
      placeholder: "Enter city",
      required: true,
      icon: MapPin,
    },
    {
      name: "state",
      label: "State",
      placeholder: "Enter state",
      required: true,
      icon: MapPin,
    },
    {
      name: "pinCode",
      label: "PIN Code",
      placeholder: "6-digit PIN code",
      required: true,
      icon: MapPin,
      type: "text",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f2f8ed] px-4">
        <div className="text-center">
          <LoaderCircle
            className="mx-auto mb-3 animate-spin text-green-700"
            size={38}
          />
          <p className="text-sm text-green-900">Checking address link...</p>
        </div>
      </div>
    );
  }

  if (!valid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f2f8ed] px-4">
        <div className="w-full max-w-md rounded-3xl border border-green-200 bg-[#e6f1dc] p-8 text-center shadow-sm">
          <MapPin className="mx-auto mb-4 text-red-600" size={44} />
          <h1 className="text-2xl font-bold text-gray-900">
            Address Link Unavailable
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            {message || "This link cannot be used."}
          </p>
          <p className="mt-4 text-sm text-gray-600">
            Please contact the person who shared this link and ask them to
            generate a new one.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f8ed] px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-700 text-white">
            <MapPin size={28} />
          </div>

          <h1 className="text-3xl font-bold text-green-950">
            Delivery Address
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Fill in the details below so your order can be delivered to the
            correct address.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-green-200 bg-[#e6f1dc] p-5 shadow-sm sm:p-8"
        >
          <div className="mb-6 rounded-xl border border-green-200 bg-[#d9eaca] p-4">
            <p className="text-sm font-semibold text-green-950">
              <CheckCircle className="mr-2 inline" size={17} />
              One-time address link
            </p>
            <p className="mt-1 text-xs leading-5 text-green-900">
              Submit your address once. After successful submission, this link
              cannot be used again.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {fields.map((field) => {
              const FieldIcon = field.icon;

              return (
                <div
                  key={field.name}
                  className={
                    field.name === "houseNumber" ||
                    field.name === "street" ||
                    field.name === "landmark"
                      ? "sm:col-span-2"
                      : ""
                  }
                >
                  <label
                    htmlFor={field.name}
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    {field.label}
                    {field.required && (
                      <span className="ml-1 text-red-600">*</span>
                    )}
                  </label>

                  <div className="relative">
                    <FieldIcon
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-green-700"
                      size={17}
                    />

                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type || "text"}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required || false}
                      maxLength={
                        field.name === "mobileNumber" ||
                        field.name === "alternateMobileNumber"
                          ? 10
                          : field.name === "pinCode"
                            ? 6
                            : undefined
                      }
                      pattern={
                        field.name === "mobileNumber" ||
                        field.name === "alternateMobileNumber"
                          ? "[6-9][0-9]{9}"
                          : field.name === "pinCode"
                            ? "[0-9]{6}"
                            : undefined
                      }
                      title={
                        field.name === "mobileNumber" ||
                        field.name === "alternateMobileNumber"
                          ? "Enter a valid 10-digit Indian mobile number."
                          : field.name === "pinCode"
                            ? "Enter a 6-digit PIN code."
                            : undefined
                      }
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5">
            <label
              htmlFor="instructions"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Delivery Instructions (Optional)
            </label>

            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows={3}
              maxLength={500}
              placeholder="Any special instructions for delivery..."
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3.5 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <LoaderCircle className="animate-spin" size={19} />
                Submitting Address...
              </>
            ) : (
              <>
                <CheckCircle size={19} />
                Submit Delivery Address
              </>
            )}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-gray-500">
          Please check your address details before submitting.
        </p>
      </div>
    </div>
  );
};

export default FillAddress;
