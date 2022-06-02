import React from "react";
import UserResults from "../components/layouts/UserResults";
import UserSearch from "../components/layouts/UserSearch";

function Home() {
  return (
    <div>
      <UserSearch />
      <UserResults />
    </div>
  );
}

export default Home;
