import { useState, useEffect, createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UsersList from './Components/UsersList/UsersList';
import { User, Context } from './types';
import { Button, Grid, TextField } from '@mui/material';
import UserProfile from './Components/UserProfile/UserProfile';
import Pagination from './Components/Pagination'



export const UserContext = createContext<Context | null>(null);
type userQuery = {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    },
    location: {
        street: {
            number: string;
            name: string;
        },
        city: string;
        state: string;
        country: string;
        postcode: string;
        coordinates: {
            latitude: string;
            longitude: string;
        },
        timezone: {
            offset: string;
            description: string;
        }
    }
    email: string;
    login: {
        uuid: string;
        username: string;
        password: string;
        salt: string;
        md5: string;
        sha1: string;
        sha256: string;
    },
    dob: {
        date: string;
        age: number;
    },
    registered: {
        date: string;
        age: number;
    },
    phone: string;
    cell: string;
    id: {
        name: string;
        value: string;
    },
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    },
    nat: string;
}


function App() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User>(null)
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const getStocksHandler = (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    console.log("getStocksHandler")
    // event.stopPropagation()
    const url = 'https://randomuser.me/api/?results=10';
    axios.get(url)
      .then((response) => {
        console.log("response.data.results", response.data.results)

        const users_arr: User[] = response.data.results.map((user: userQuery, index: number) => {
          const age: number = user.dob.age;
          const year: string = user.dob.date.split('-')[0];
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
        setFilteredUsers([]);
      })
      .catch((error) => {
        console.log("error fetching users:", error)
      })

  };

  const handleSearch = () => {
    // Filter users based on the search argument
    const filtered: User[] = !users ? [] : users.filter((user: User) => {
      let first = user ? user.first_name.toLowerCase() : ''
      let last = user ? user.last_name.toLowerCase() : ''
      let str = first+' '+last;
      let includes = str.includes(searchValue.toLowerCase());
      return includes
    }
    );
    setFilteredUsers(filtered);
    // setSelectedUser(null)
  };

  const handleUpdatedUser = (updatedUser: User | null) => {
    const updatedUsers: User[] = !users ? [] : users.map((user: User) =>
      user?.id === updatedUser?.id ? updatedUser : user
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
    event.preventDefault()
    // event.stopPropagation()
    // console.log("event.target.value", event.target.value)
    setSearchValue(event.target.value)
  }

  const handleBack = () => {
    setSelectedUser(null);
  };

  const paginate = (pageNum: number) => {
    setPageNumber(pageNum)
  }

  return (
    <UserContext.Provider value={{ users, selectedUser, setSelectedUser }}>
      <div className="App">
        <div style={{ justifyContent: 'center', alignContent: 'center', padding: '2px', height: '30%', overflow: 'auto' }}>
          <Button variant="contained" onClick={getStocksHandler} sx={{ margin: '15px', backgroundColor: '#757575' }}>
            Get Users
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
          <div style={{ padding: "5px", margin: '5px', justifyContent: 'center', display: 'flex', alignItems: 'center', width: '60%', }}>
            <UserProfile user={selectedUser} onUpdateClick={handleUpdatedUser} onBack={handleBack} />
            {/* <Pagination postsPerPage={3} totalPosts={10} paginate={paginate}/> */}
          </div>
      </div>
    </UserContext.Provider >
  );
}

export default App;
