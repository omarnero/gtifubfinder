import { createContext, useState, useReducer } from "react";
import githubReducer from "./GithubReducer";
import axios from "axios";
const GithubContext = createContext();
export const GithupProvider = (props) => {
  const github = axios.create({
    baseURL: process.env.REACT_APP_GITHUB_URL,
    headers: { Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}` },
  });
  const intialState = {
    users: [],
    user: {},
    loading: false,
  };
  const [state, dispatch] = useReducer(githubReducer, intialState);
  const [repos, setRepos] = useState([]);
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await github.get(`/search/users?${params}`);
    const { data } = response;
    const { items } = data;
    dispatch({
      type: "Git_user",
      payload: items,
    });
    console.log(state.users);
  };
  const setLoading = () => {
    dispatch({ type: "Set_loading" });
  };
  const clearUsers = () => {
    dispatch({ type: "Clear_user" });
  };
  const getUser = async (login) => {
    const response = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/users/${login}`,
      {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    const data = await response.json();

    dispatch({
      type: "Set_user",
      payload: data,
    });
  };
  const getRepos = async (login) => {
    const response = await github.get(`/users/${login}/repos`);
    const { data } = response;
    setRepos(data);
  };
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
        user: state.user,
        getUser,
        getRepos,
        repos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
