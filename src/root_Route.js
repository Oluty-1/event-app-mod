//__________________Authentication_________________
const Auth = require("./api/Authentication/Auth");
const Login = require("./api/Authentication/Login");
const Logout = require("./api/Authentication/Logout");
const Register = require("./api/Authentication/Register");

//___________________Car______________________
const CreateEvent = require("./api/Event/CreateEvent");
const GetOneEvent = require("./api/Event/GetOneEvent");
const UpdateEvent = require("./api/Event/UpdateEvent");
const DeleteEvent = require("./api/Event/DeleteEvent");
const GetMyEvents = require("./api/Event/GetMyEvents");

//********************************************************** */
//********************************************************** */

const rootRoute = (app) => {
  //__________________Authentication_________________
  app.use(Auth);
  app.use(Login);
  app.use(Logout);
  app.use(Register);

  //___________________Car______________________
  app.use(CreateEvent);
  app.use(GetOneEvent);
  app.use(UpdateEvent);
  app.use(DeleteEvent);
  app.use(GetMyEvents);
};

module.exports = rootRoute;
