import React, { useState, useContext } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/login-illustration.svg";
import logo from "images/2-removebg-preview.png";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { ReactComponent as PhoneIcon } from "feather-icons/dist/icons/smartphone.svg";
import AuthService from "../Services/AuthService";
import Message from "../components/Message";
import { AuthContext } from "../Context/AuthContext";
import firebase from "./firebase";
import { SplitButton } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";

import ReactDOM from "react-dom";
const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-20 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

const Login = (props) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    phone: "",
    otp: "",
  });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);
  const resetForm = () => {
    setUser({
      username: "",
      password: "",
      phone: "",
      otp: "",
    });
  };
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(true);
  const [showVB, setShowVB] = useState(false);
  const [pwd, setpwd] = useState(true);

  const usernameEr = <h1>Please enter registerred username.</h1>;
  const pswdEr = <h1>Please enter valid password.</h1>;
  const phoneEr = <h1>Please enter registerred Phone No.</h1>;
  const otpEr = <h1>Please enter correct OTP.</h1>;
  const gen = <h1></h1>;
  var check = true;
  const validate = () => {
    if (!user.username) {
      check = false;
      ReactDOM.render(usernameEr, document.getElementById("usernameE"));
    }
    if (user.username) {
      ReactDOM.render(gen, document.getElementById("usernameE"));
    }
    if (!user.password) {
      check = false;
      ReactDOM.render(pswdEr, document.getElementById("pswdE"));
    }
    if (user.password) {
      ReactDOM.render(gen, document.getElementById("pswdE"));
    }
    if (!user.phone & !pwd) {
      check = false;
      ReactDOM.render(phoneEr, document.getElementById("phoneE"));
    }
    if (user.phone & !pwd) {
      ReactDOM.render(gen, document.getElementById("phoneE"));
    }
    if (!user.otp & show) {
      check = false;
      ReactDOM.render(otpEr, document.getElementById("otpE"));
    }
    if (user.otp & show) {
      ReactDOM.render(gen, document.getElementById("otpE"));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    check = true;
    validate();
    if (check) {
      setUser({ ...user, phone: user.phone.substring(user.phone.length - 10) });
      AuthService.login(user).then((data) => {
        console.log(data);
        const { isAuthenticated, user, message } = data;
        if (isAuthenticated) {
          authContext.setUser(user);
          authContext.setIsAuthenticated(isAuthenticated);
          //props.history.push('/todos');
        } else {
          ReactDOM.render(
            <h1>Please enter valid credentials.</h1>,
            document.getElementById("pswdE")
          );
          setMessage(message);
        }
      });
    }
  };
  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("Recaptcha verified");
          onVerify();
        },
        defaultCountry: "IN",
      }
    );
  };
  const onVerify = (e) => {
    e.preventDefault();

    check = true;
    validate();
    if (check) {
      alert("alert");
      configureCaptcha();
      setShow(true);
      console.log(user.phone);
      const phoneNumber = "+91" + user.phone.substring(user.phone.length - 10);
      console.log(phoneNumber);
      const appVerifier = window.recaptchaVerifier;
      console.log(appVerifier);
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("OTP has been sent");
          // ...
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          console.log(error, "SMS not sent");
        });
    }
  };
  const onSubmitOTP = (e) => {
    e.preventDefault();
    check = true;
    validate();
    if (check) {
      const code = user.otp;
      console.log(code);
      if (!window.confirmationResult) setHide(false);
      window.confirmationResult
        .confirm(code)
        .then((result) => {
          // User signed in successfully.
          // const user = result.user;
          console.log(JSON.stringify(user));
          alert("User is verified");
          authContext.setUser(user);
          authContext.setIsAuthenticated(true);
          setHide(true);
          setShow(false);
          setShowVB(false);
          setpwd(true);
          // ...
        })
        .catch((error) => {
          // setHide(false);
          console.log(error, "Not verified");
          // User couldn't sign in (bad verification code?)
          // ...
        });
    }
  };
  const Submit = [
    <>
      {" "}
      <SubmitButton id="submit" onClick={onSubmit}>
        <LoginIcon className="icon" />
        <span className="text">Log In</span>
      </SubmitButton>
    </>,
  ];
  const verifyButton = [
    <SubmitButton id="verify" onClick={onVerify}>
      <PhoneIcon className="icon" />
      <span className="text">Verify Phone No.</span>
    </SubmitButton>,
  ];
  const pwdForm = [
    <Input
      type="password"
      name="password"
      value={user.password}
      onChange={onChange}
      placeholder="Password"
    />,
    <div id="pswdE" style={{ fontSize: 12, color: "red" }}></div>,
  ];
  const phoneForm = [
    <Input
      type="tel"
      name="phone"
      value={user.phone}
      onChange={onChange}
      placeholder="Phone Number"
    />,
    <div id="phoneE" style={{ fontSize: 12, color: "red" }}></div>,
  ];
  const otpForm = [
    <>
      <Input
        type="tel"
        name="otp"
        value={user.otp}
        onChange={onChange}
        placeholder="O.T.P. Number"
      />
      <div id="otpE" style={{ fontSize: 12, color: "red" }}></div>
      <SubmitButton type="submit" onClick={onSubmitOTP}>
        <SignUpIcon className="icon" />
        <span className="text">Submit O.T.P. Number</span>
      </SubmitButton>
    </>,
  ];
  const handleFailure = (result) => {
    alert(result);
  };
  const handleLogin = (result) => {
    AuthService.login({ token: result.tokenId }).then((data) => {
      console.log(data);
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        //props.history.push('/todos');
      } else {
        alert(message.msgBody);
        setMessage(message);
      }
    });
  };
  return (
    // <AnimationRevealPage>
    <Container>
      <Content>
        <MainContainer>
          <GoogleLogin
            clientId="373151948151-7ucdilvhgce7u17fv2s1vs67bbvjesh3.apps.googleusercontent.com"
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
          />
          <LogoLink href="#">
            <LogoImage src={logo} />
          </LogoLink>
          <MainContent>
            <Heading>Log In To CapiBull</Heading>
            <FormContainer>
              {/* <SocialButtonsContainer>
                {socialButtons.map((socialButton, index) => (
                  <SocialButton key={index} href={socialButton.url}>
                    <span className="iconContainer">
                      <img src={socialButton.iconImageSrc} className="icon" alt=""/>
                    </span>
                    <span className="text">{socialButton.text}</span>
                  </SocialButton>
                ))}
              </SocialButtonsContainer> 
               <DividerTextContainer>
                <DividerText>Or Sign in with your e-mail</DividerText>
              </DividerTextContainer>*/}
              <Form onSubmit={onSubmit}>
                <div id="sign-in-button"></div>
                <Input
                  type="text"
                  name="username"
                  onChange={onChange}
                  placeholder="Username"
                />
                <div
                  id="usernameE"
                  style={{ fontSize: 12, color: "red" }}
                ></div>

                {/* <Input 
                type="password" 
                name="password" 
                onChange={onChange} 
                placeholder="Password" 
                /> */}
                {pwd ? pwdForm : phoneForm}
                <p tw="mt-6 text-xs text-gray-600 text-center">
                  <button
                    onClick={() => {
                      setpwd(!pwd);
                      setShowVB(!showVB);
                      setHide(!hide);
                      // resetForm();
                    }}
                    tw="border-b border-gray-500 border-dotted"
                  >
                    {pwd ? "Login via OTP" : "Login via Password"}
                  </button>
                </p>
                {showVB ? verifyButton : null}
                {show ? otpForm : null}
                {hide ? Submit : null}
              </Form>
              {/* <p tw="mt-8 text-sm text-gray-600 text-center">
                Dont have an account?{" "}
                <a href="#register" tw="border-b border-gray-500 border-dotted">
                  Sign Up
                </a>
              </p> */}
            </FormContainer>
          </MainContent>
        </MainContainer>
        <IllustrationContainer>
          <IllustrationImage imageSrc={illustration} />
        </IllustrationContainer>
      </Content>
    </Container>
    // {/* {message ? <Message message={message}/> : null} */}
    // {/* </AnimationRevealPage> */}
  );
};

export default Login;
