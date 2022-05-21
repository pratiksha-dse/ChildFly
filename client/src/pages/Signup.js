import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";
import Message from "../components/Message";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/signup-illustration.svg";
import logo from "images/logo_new.png";
import googleIconImageSrc from "images/google-icon.png";
import twitterIconImageSrc from "images/twitter-icon.png";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { ReactComponent as PhoneIcon } from "feather-icons/dist/icons/smartphone.svg";
import firebase from "./firebase";
import ReactDOM from "react-dom";
const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

// const SocialButtonsContainer = tw.div`flex flex-col items-center`;
// const SocialButton = styled.a`
//   ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
//   .iconContainer {
//     ${tw`bg-white p-2 rounded-full`}
//   }
//   .icon {
//     ${tw`w-4`}
//   }
//   .text {
//     ${tw`ml-4`}
//   }
// `;

// const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
// const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

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
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

const Register = (props) => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    univ: "",
    otp: "",
    cpassword: "",
  });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(false);
  const [showVB, setShowVB] = useState(true);
  const authContext = useContext(AuthContext);
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const nameEr = <h1>Name can not be empty.</h1>;
  const usernameEr = <h1>Please enter a valid username.</h1>;
  const emailEr = <h1>Please enter a valid email.</h1>;
  const pswdEr = (
    <h1>
      Password must be of length 7 to 16 containing only characters, digits,
      underscore and first character as a letter.
    </h1>
  );
  const cpswdEr = <h1>Confirm Password doesn't matches with Password.</h1>;
  const phoneEr = <h1>Please enter valid phone No.</h1>;
  const univEr = <h1>University can not be empty.</h1>;
  const otpEr = <h1>Please enter correct OTP.</h1>;
  const gen = <h1></h1>;
  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }

    return false;
  }
  function CheckPassword(pswd) {
    var passw = /^[A-Za-z]\w{7,14}$/;
    if (pswd.match(passw)) {
      return true;
    } else {
      return false;
    }
  }
  function CheckPhonenumber(phno) {
    var phoneno = /^\d{10}$/;
    if (phno.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  }
  var check = true;
  const validate = () => {
    if (!user.name) {
      check = false;
      ReactDOM.render(nameEr, document.getElementById("nameE"));
    }
    if (user.name) {
      ReactDOM.render(gen, document.getElementById("nameE"));
    }
    if (!user.username) {
      check = false;
      ReactDOM.render(usernameEr, document.getElementById("usernameE"));
      // usernameE = "invalid username";
    }
    if (user.username) {
      ReactDOM.render(gen, document.getElementById("usernameE"));
    }
    AuthService.register(user).then((data) => {
      const { message } = data;
      if (data.message.msgBody === "Username is already taken") {
        check = false;
        ReactDOM.render(
          <h1>Username is already taken.</h1>,
          document.getElementById("usernameE")
        );
      } else {
        ReactDOM.render(gen, document.getElementById("usernameE"));
      }
    });
    if (!ValidateEmail(user.email)) {
      check = false;
      ReactDOM.render(emailEr, document.getElementById("emailE"));
      //  emailE = "Email cannot be blank";
    }
    if (ValidateEmail(user.email)) {
      ReactDOM.render(gen, document.getElementById("emailE"));
      //  emailE = "Email cannot be blank";
    }
    if (!CheckPassword(user.password)) {
      check = false;
      ReactDOM.render(pswdEr, document.getElementById("pswdE"));
      // pswdE = "password cannot be blank";
    }
    if (CheckPassword(user.password)) {
      ReactDOM.render(gen, document.getElementById("pswdE"));
      // pswdE = "password cannot be blank";
    }
    if (user.cpassword !== user.password || !user.cpassword) {
      ReactDOM.render(cpswdEr, document.getElementById("cpswdE"));
      //cpaswdE = "Confirm Password does matches password";
    }
    if (user.cpassword === user.password) {
      ReactDOM.render(gen, document.getElementById("cpswdE"));
      //cpaswdE = "Confirm Password does matches password";
    }
    if (!CheckPhonenumber(user.phone)) {
      check = false;
      ReactDOM.render(phoneEr, document.getElementById("phoneE"));
      // phoneE = "Phone No cannot be blank";
    }
    if (CheckPhonenumber(user.phone)) {
      ReactDOM.render(gen, document.getElementById("phoneE"));
      // phoneE = "Phone No cannot be blank";
    }
    if (!user.univ) {
      check = false;
      ReactDOM.render(univEr, document.getElementById("univE"));
      // univE = "University cannot be blank";
    }
    if (user.univ) {
      ReactDOM.render(gen, document.getElementById("univE"));
      // univE = "University cannot be blank";
    }
    if (!user.otp & show) {
      check = false;
      ReactDOM.render(otpEr, document.getElementById("otpE"));
      // univE = "University cannot be blank";
    }
    if (user.otp & show) {
      ReactDOM.render(gen, document.getElementById("otpE"));
      // univE = "University cannot be blank";
    }
  };
  const resetForm = () => {
    setUser({
      name: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      univ: "",
      otp: "",
      cpassword: "",
    });
  };
  // const cpassword = "";
  const onSubmit = (e) => {
    // e.preventDefault();
    if (user.password === user.cpassword) {
      setUser({ ...user, phone: user.phone.substring(user.phone.length - 10) });
      AuthService.register(user).then((data) => {
        const { message } = data;
        setMessage(message);
        resetForm();
        AuthService.login(user).then((data) => {
          console.log(data);
          const { isAuthenticated, user, message } = data;
          if (isAuthenticated) {
            authContext.setUser(user);
            authContext.setIsAuthenticated(isAuthenticated);
            //props.history.push('/todos');
          } else setMessage(message);
        });
      });
    } else {
      alert("Passwords do not match");
    }
    console.log(message);
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
    const phoneNumber = "+91" + user.phone.substring(user.phone.length - 10);
    check = true;
    validate();
    if (check) {
      configureCaptcha();
      console.log(user.phone);
      console.log(phoneNumber);
      const appVerifier = window.recaptchaVerifier;
      console.log(appVerifier);
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          setShow(true);
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          console.log("OTP has been sent");

          // ...
        })
        .catch((error) => {
          // Error; SMS not sent
          // ...
          ReactDOM.render(
            <h1>Please reload and try using a different phone No</h1>,
            document.getElementById("phoneE")
          );
          console.log(error, "SMS not sent");
        });
    }
  };
  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = user.otp;
    check = true;
    validate();
    if (check) {
      console.log(code);
      if (!window.confirmationResult) setHide(false);
      window.confirmationResult
        .confirm(code)
        .then((result) => {
          // User signed in successfully.
          const user = result.user;
          console.log(JSON.stringify(user));
          alert("User is verified");
          onSubmit();
          setHide(true);
          setShow(false);
          setShowVB(false);
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
  const verifyButton = [
    <SubmitButton id="verify" onClick={onVerify}>
      <PhoneIcon className="icon" />
      <span className="text">Verify Phone No</span>
    </SubmitButton>,
  ];

  return (
    // <AnimationRevealPage dir="right">
    <Container>
      <Content>
        <IllustrationContainer>
          <IllustrationImage imageSrc={illustration} />
        </IllustrationContainer>
        <MainContainer>
          <LogoLink href="/">
            <LogoImage src={logo} />
          </LogoLink>
          <MainContent>
            <Heading>Sign Up for CapiBull</Heading>
            <FormContainer>
              <Form onSubmit={onSubmit}>
                <div id="sign-in-button"></div>
                <Input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={onChange}
                  placeholder="Name"
                  // required
                />
                <div id="nameE" style={{ fontSize: 12, color: "red" }}></div>
                <Input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={onChange}
                  placeholder="Username"
                  // required
                />
                <div
                  id="usernameE"
                  style={{ fontSize: 12, color: "red" }}
                ></div>
                <Input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={onChange}
                  placeholder="Email"
                  //  required
                />
                <div id="emailE" style={{ fontSize: 12, color: "red" }}></div>
                <Input
                  type="text"
                  name="univ"
                  value={user.univ}
                  onChange={onChange}
                  placeholder="University/College/Institute"
                  // required
                />
                <div id="univE" style={{ fontSize: 12, color: "red" }}></div>
                <Input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={onChange}
                  placeholder="Password"
                  // required
                />
                <div id="pswdE" style={{ fontSize: 12, color: "red" }}></div>
                <Input
                  type="password"
                  name="cpassword"
                  value={user.cpassword}
                  onChange={onChange}
                  placeholder="Confirm Password"
                  //   required
                />
                <div id="cpswdE" style={{ fontSize: 12, color: "red" }}></div>

                <Input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={onChange}
                  placeholder="Phone Number without country code."
                  //   required
                />
                <div id="phoneE" style={{ fontSize: 12, color: "red" }}></div>

                {verifyButton}
                {show ? otpForm : null}
                {/* <p tw="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by CapiBull's{" "}
                  <a href="/" tw="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a href="/" tw="border-b border-gray-500 border-dotted">
                    Privacy Policy
                  </a>
                </p> */}

                {/* <p tw="mt-8 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <a href="#login" tw="border-b border-gray-500 border-dotted">
                    Sign In
                  </a>
                </p> */}
              </Form>
            </FormContainer>
          </MainContent>
        </MainContainer>
      </Content>
    </Container>
    // {message ? <Message message={message} /> : null}
    // </AnimationRevealPage>
  );
};

export default Register;
