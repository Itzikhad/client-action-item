import { useState, useEffect, createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UsersList from './Components/UsersList/UsersList';
import { User, Context } from './types';
import { Button, Grid, TextField } from '@mui/material';
import UserProfile from './Components/UserProfile/UserProfile';


export const UserContext = createContext<Context | null>(null);

function App() {
  const [users, setUsers] = useState<User[] | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);

  const getStocksHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    console.log("getStocksHandler")
    // event.stopPropagation()
    const url = 'https://randomuser.me/api/?results=10';
    axios.get(url)
      .then((response) => {
        // console.log("response", response.data.results);
        let age: number = response.data.results[0].registered.age;
        let year: string = response.data.results[0].registered.date.split('-')[0];

        const users_arr: User[] = response.data.results.map((user: any, index: number) => {
          const addr = {
            street_number: user.location.street.number,
            street_name: user.location.street.name,
            city: user.location.city,
            state: user.location.state,
            country: user.location.country,
          }
          return {
            id: index,
            profile_img_url: user.picture.large,
            profile_thumbnail_url: user.picture.thumbnail,
            title: user.name.title,
            first_name: user.name.first,
            last_name: user.name.last,
            gender: user.gender,
            address: addr,
            email: user.email,
            phone: user.phone,
            age: age,
            year: year,
            show: true,
          }
        })
        setUsers([...users_arr])
      })
      .catch((error) => {
        console.log("error fetching users:", error)
      })

  };

  // useEffect(() => {
  //   // console.log("inside App useEffect")
  //   const url = 'https://randomuser.me/api/?results=10';
  //   axios.get(url)
  //     .then((response) => {
  //       // console.log("response", response.data.results);
  //       let age: number= response.data.results[0].registered.age;
  //       let year: string = response.data.results[0].registered.date.split('-')[0];

  //       const users_arr: User[] = response.data.results.map((user: any, index: number) => {
  //         const addr = {
  //           street_number: user.location.street.number,
  //           street_name: user.location.street.name,
  //           city: user.location.city,
  //           state: user.location.state,
  //           country: user.location.country,
  //         }
  //         return {
  //           id: index,
  //           profile_img_url: user.picture.large,
  //           profile_thumbnail_url: user.picture.thumbnail,
  //           title: user.name.title,
  //           first_name: user.name.first,
  //           last_name: user.name.last,
  //           gender: user.gender,
  //           address: addr,
  //           email: user.email,
  //           phone: user.phone,
  //           age: age,
  //           year: year,
  //         }
  //       })
  //       setUsers([...users_arr])
  //     })
  //     .catch((error) => {
  //       console.log("error fetching users:", error)
  //     })
  // }, [])

  const handleSearch = () => {
    // Filter users based on the search argument
    const filtered: User[] = !users ? [] : users.filter((user: User) => {
      let includes = user?.first_name.toLowerCase().includes(searchValue.toLowerCase());
      return includes
    }
    );
    setFilteredUsers(filtered);
    // setSelectedUser(null)
  };

  const handleUpdatedUser = (updatedUser: User | null) => {
    const updatedUsers: User[] | null = !users ? null : users.map((user: User) =>
      user.id === updatedUser?.id ? updatedUser : user
    );
    const filtered: User[] = !users ? [] : users.filter((user: User) => {
      let includes = user?.first_name.toLowerCase().includes(searchValue.toLowerCase());
      return includes
    }
    );
    setFilteredUsers([]);
    setSearchValue("");
    if (updatedUsers) setUsers(updatedUsers);
    if (updatedUser) setSelectedUser(updatedUser);
    // handleSearch()

  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // event.preventDefault()
    // event.stopPropagation()
    // console.log("event.target.value", event.target.value)
    setSearchValue(event.target.value)
  }

  const handleBack = () => {
    setSelectedUser(null);
  };

  return (
    <UserContext.Provider value={{ users, selectedUser, setSelectedUser }}>
      <div className="App">
        {!selectedUser ? (<div style={{ justifyContent: 'center', alignContent: 'center', padding: '2px', height: '30%', overflow: 'auto' }}>
          <Button variant="contained" onClick={getStocksHandler} sx={{ margin: '15px', backgroundColor: '#757575' }}>
            Get Stocks
          </Button>
          <div>
            <TextField
              label="Search users"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <Button variant="contained" onClick={handleSearch} sx={{ margin: '5px', backgroundColor: '#757575', fontSize: "12px" }}>
              Search By First Name
            </Button>
          </div>
          <UsersList users={filteredUsers && filteredUsers.length > 0 ? filteredUsers : users} />
        </div>
        ) : (
          <Grid item xs={8} sx={{ padding: "5px", margin: '5px', justifyContent: 'center' }}>
            <UserProfile user={selectedUser} onUpdateClick={handleUpdatedUser} onBack={handleBack} />
          </Grid>)}
      </div>
    </UserContext.Provider >
  );
}

export default App;
