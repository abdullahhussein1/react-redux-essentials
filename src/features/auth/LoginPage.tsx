import { useNavigate } from "react-router-dom";

import { useGetUsersQuery, useLoginUserMutation } from "../api/apiSlice";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "./authSlice";

interface LoginPageFormFields extends HTMLFormControlsCollection {
  username: HTMLSelectElement;
}
interface LoginPageFormElements extends HTMLFormElement {
  readonly elements: LoginPageFormFields;
}

export const LoginPage = () => {
  const { data: users = [] } = useGetUsersQuery();
  const [login] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<LoginPageFormElements>) => {
    e.preventDefault();

    const username = e.currentTarget.elements.username.value;
    try {
      await login(username).unwrap();
      dispatch(setUser(username));
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Welcome to Tweeter!</h2>
      <h3>Please log in:</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">User:</label>
        <select id="username" name="username" required>
          <option value=""></option>
          {usersOptions}
        </select>
        <button>Log In</button>
      </form>
    </section>
  );
};
