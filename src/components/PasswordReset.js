import React, { useState } from "react";
import axios from "axios";
import logopassword from "../media/passwordreset.png";
import "../css/PasswordReset.css";

const PasswordResetPage = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(1);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleTokenChange = (e) => setToken(e.target.value);
  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleRequestReset = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }

    axios
      .post("http://localhost:8080/api/requestPasswordReset", { email })
      .then((response) => {
        alert("A token has been sent to your email.");
        setStep(2);
      })
      .catch((error) => {
        setErrorMessage("There was an error requesting the password reset!");
      });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!token || !newPassword || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    axios
      .post("http://localhost:8080/api/resetPassword", {
        token,
        newPassword,
        confirmPassword,
      })
      .then((response) => {
        alert("Password updated successfully!");
        window.location.href = "/login";
      })
      .catch((error) => {
        setErrorMessage("There was an error resetting the password!");
      });
  };

  return (
    <div className="passwordreset">
      <button className="go-back-button" onClick={() => window.history.back()}>
        Go Back
      </button>
      <div className="flex-container-pw">
        <img src={logopassword} alt="Logo" className="logo-pw" />
        <div className="pw-container">
          <h1 className="h1styles">Let's Reset Your Password</h1>
          {step === 1 ? (
            <form id="request-reset-form" onSubmit={handleRequestReset}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label-pw">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control-pw"
                  id="exampleInputEmail1"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              <div className="button-container-pw">
                <button type="submit" className="btn reset-button">
                  Get Token
                </button>
              </div>
            </form>
          ) : (
            <form id="reset-password-form" onSubmit={handleResetPassword}>
              <div className="mb-3">
                <label htmlFor="exampleInputToken1" className="form-label-pw">
                  Token
                </label>
                <input
                  type="text"
                  className="form-control-pw"
                  id="exampleInputToken1"
                  value={token}
                  onChange={handleTokenChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputNewPassword1"
                  className="form-label-pw"
                >
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control-pw"
                  id="exampleInputNewPassword1"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputConfirmPassword1"
                  className="form-label-pw"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="form-control-pw"
                  id="exampleInputConfirmPassword1"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </div>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              <div className="button-container-pw">
                <button type="submit" className="btn reset-button">
                  Reset Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
