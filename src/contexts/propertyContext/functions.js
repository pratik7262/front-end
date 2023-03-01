import axios from "axios";

export const addProperty = async (formData,setDisabled) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/property/addproperty",
      formData,
      {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    if (res.data.success) {
      alert(res.data.responseMsg);
      window.location.reload();
      setDisabled(false);
    }
  } catch (error) {
    alert("Plaese Fill All The Fields Properly");
    setDisabled(false);
  }
};
