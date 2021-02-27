import React, { useState, useEffect } from "react";
import TablePage from "./pages/table/TablePage";
import Loader from "./components/Loader";

function App() {
  const [userData, setUserData] = useState({ data: [], isLoading: true });

  // Fetch data from JSON placeholder API, we parce some certain data and formatted it to suitable object
  // to reach our purpose
  useEffect(() => {
    fetch(
      "https://randomuser.me/api/?results=150&inc=gender,name,dob,email&nat=gb"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const formattedUserData = data.results.map((item) => {
          const name = item.name.first;
          const surname = item.name.last;
          const age = item.dob.age;
          const sex = item.gender;
          const mail = item.email;
          return { name, surname, age, sex, mail };
        });
        setUserData({ data: formattedUserData, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        setUserData({ isLoading: false });
      });
  }, []);

  if (userData.isLoading) return <Loader />;
  return (
    <div className="container-md">
      <div className="content vw-70">
        <TablePage data={userData.data} />
      </div>
    </div>
  );
}

export default App;
