"use client";

import React from "react";
import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

// Styled Components
const MainContainer = styled.div`
  background: linear-gradient(to bottom, #e0f7f3, #f0f8f7);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Logo = styled.img`
  position: absolute;
  top: 5px;
  left: 10px;
  width: 100px;
  height: auto;
`;

const Container = styled.div`
  background-color: #f0f8f7;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: absolute;
  top: 18%;
  left: 20%;
  overflow: hidden;
  width: 60vw;
  max-width: 100%;
  min-height: 400px;
`;

const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  ${(props) =>
    !props.signingIn
      ? `
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
    `
      : null}
`;

const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0;
  width: 50%;
  z-index: 2;
  ${(props) => (!props.signingIn ? "transform: translateX(100%);" : null)}
`;

const Form = styled.form`
  background-color: #f0f8f7;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: normal;
  font-size: 40px;
  margin: 0;
  color: #2b6777;
`;

const PanelTitle = styled.h1`
  font-weight: bold;
  margin: 0;
  color: #f0f8f7;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 8px 0;
`;

const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  width: 100%;
`;

const Select = styled.select`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  width: 100%;
  cursor: pointer;
  font-size: 14px;
  color: #333;
`;

const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #2b6777;
  background-color: #2b6777;
  color: #f0f8f7;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
`;

const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
`;

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
  ${(props) => (!props.signingIn ? "transform: translateX(-100%);" : null)}
`;

const Overlay = styled.div`
  background: #2b6777;
  background-repeat: no-repeat;
  background-size: cover;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
  ${(props) => (!props.signingIn ? "transform: translateX(50%);" : null)}
`;

const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;

const LeftOverlayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${(props) => (!props.signingIn ? "transform: translateX(0);" : null)}
`;

const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${(props) => (!props.signingIn ? "transform: translateX(20%);" : null)}
`;

const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;

const Snackbar = styled.div`
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  min-width: 250px;
  margin-left: -125px;
  background-color: ${(props) =>
    props.severity === "success" ? "#2b6777" : "#f44336"};
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;
  font-size: 17px;
`;

const Loader = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;

const Dot = styled.div`
  background-color: #2b6777;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 3px;
  display: inline-block;
  animation: ${Loader} 0.6s infinite ease-in-out both;
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PasswordToggle = styled.span`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #888;
`;

const login = () => {
  const navigate = useNavigate(); 
  const [signIn, toggle] = React.useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userRole, setUserRole] = useState("student"); // student or hr

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Store user role in localStorage for persistence
    localStorage.setItem('userRole', userRole);
    // Route based on user role
    if (userRole === 'hr') {
      navigate('/hr-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      console.log("Please enter a valid email address.");
      setSnackbarMessage("Please enter a valid email address.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      console.log("Passwords do not match.");
      setSnackbarMessage("Passwords do not match.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);

    navigate('/resume')
  };

  return (
    <MainContainer>
      {/* <Logo src="data:image/png;base64,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" alt="Logo" /> */}
      <Container>
        <SignUpContainer signingIn={signIn}>
          <Form onSubmit={handleSignup}>
            <Title>Create Account</Title>
            <InputContainer>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordToggle
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "👁️" : "🙈"}
              </PasswordToggle>
            </InputContainer>
            <InputContainer>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </InputContainer>
            <Button disabled={loading}>Sign Up</Button>
          </Form>
        </SignUpContainer>
        <SignInContainer signingIn={signIn}>
          <Form onSubmit={handleLogin}>
            <Title>Sign In</Title>
            <InputContainer>
              <Select value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="hr">HR</option>
              </Select>
            </InputContainer>
            <InputContainer>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <Input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordToggle
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "👁️" : "🙈"}
              </PasswordToggle>
            </InputContainer>
            <Anchor href="#">Forgot your password?</Anchor>
            <Button disabled={loading}>Sign In</Button>
          </Form>
        </SignInContainer>
        <OverlayContainer signingIn={signIn}>
          <Overlay signingIn={signIn}>
            <LeftOverlayPanel signingIn={signIn}>
              <PanelTitle>Welcome Back!</PanelTitle>
              <Paragraph>
                To keep connected with us please login with your personal info
              </Paragraph>
              <GhostButton onClick={() => toggle(true)}>Sign In</GhostButton>
            </LeftOverlayPanel>
            <RightOverlayPanel signingIn={signIn}>
              <PanelTitle>Hello, Friend!</PanelTitle>
              <Paragraph>
                Enter your personal details and start journey with us
              </Paragraph>
              <GhostButton onClick={() => toggle(false)}>Sign Up</GhostButton>
            </RightOverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
      {loading && (
        <Dots>
          <Dot />
          <Dot />
          <Dot />
        </Dots>
      )}
      <Snackbar open={snackbarOpen} severity={snackbarSeverity}>
        {snackbarMessage}
      </Snackbar>
    </MainContainer>
  );
};

export default login;