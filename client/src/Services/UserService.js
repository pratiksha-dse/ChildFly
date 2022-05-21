export default {
  addUser: (user) => {
    console.log("doing1");
    return fetch("/user/adduser", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
    // getUserdetails: () => {
    //   return fetch("/userdetail/userdetails").then((response) => {
    //     if (response.status !== 401) {
    //       return response.json().then((data) => data);
    //     } else return { message: { msgBody: "UnAuthorized", msgError: true } };
    //   });
    // }, 
  };
  