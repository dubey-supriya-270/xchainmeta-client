import jwtDecode from "jwt-decode";

// user name validation method
export const isEmailValid = (email: string) => {
  //returns true if the email matches the regex for a valid email else returns false
  return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-])+\.([A-Za-z]{2,4})$/.test(
    email
  );
};

//password validation method
export const isPasswordValid = (password: string) => {
  //return true if the length of the password is more than or equal to 8 characters else returns false
  return password.length >= 8;
};

// Function to validate JWT
export const isJWTValid = () => {
  // Get the token from local storage and check if it exists
  const token = localStorage.getItem("XCHAINMETA:token");
  if (!token) {
    throw new Error("No JWT available in the local storage");
  }

  // Decode the token
  const decodedToken: any = jwtDecode(token);
  if (decodedToken.userEmail) {
    // Check if the token is still valid
    if (Date.now() >= decodedToken.exp * 1000) {
      throw new Error("Token has expired");
    }
    // If decoded token has the id, return it
    return decodedToken;
  } else {
    // Throw an error if the decoded token is invalid
    throw new Error("Unable to decode JWT");
  }
};
