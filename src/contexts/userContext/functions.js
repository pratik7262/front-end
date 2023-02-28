

export const signUp = async (name,email,password,navigate) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password:password,
      }),
    });

    // console.log(response)

    const json = await response.json();
    console.log(json);
    if (json.success) {
      alert(json.responseMsg);
      navigate("/login");
    } else {
      alert(json.err);
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = async (email, password, navigate) => {
  const response = await fetch("http://localhost:5000/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const json = await response.json();

  if (json.success) {
    if (json.verified) {
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("userId", json.userId);

      navigate("/properties/sell");
      alert("Logged In Successfully");
      window.location.reload();
    } else {
      alert("Please Verify Your Email First");
    }
  } else {
    alert(json.err);
  }
};