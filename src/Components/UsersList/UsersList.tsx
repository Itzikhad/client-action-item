import { useContext, useEffect, useState } from "react";
import "./UsersList.css";
import { UserContext } from "../../App";
import UserListItem from "./UserListItem";
import { User, Context } from "../../types";
import { Pagination } from "@mui/material";

type UserListProps = {
  users: User[];
  usersPerPage: number;
}

function UsersList(props: UserListProps) {

  const users: User[] = props.users;
  const context: Context|null = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState<number>(1);
  
  if (!users || !context || !users?.length) return (<div className="no-data">No data available</div>);
  
  let totalPages: number = Math.ceil(users.length/props.usersPerPage);
  let endIndex = pageNumber*props.usersPerPage;
  let startIndex = endIndex-props.usersPerPage;

  let currentUsers = users.slice(startIndex, endIndex)

  // useEffect(()=> {

  // }, [pageNumber])

  const handleItemClick = (user: User) => {
    context?.setSelectedUser(user);
  };

  return (
      <div className="user-list-container">
        <div className="list-header-container">
          <span className="list-header-primary">{`Users List`}</span>
        </div>
        <div className="user-list">
          {users.map((user: User, index: number) => (
            <UserListItem
              key={index}
              user={user}
              onItemClick={handleItemClick}
            />
          ))}
        </div>
        <Pagination count={totalPages} onChange={(event: React.ChangeEvent<unknown>, page: number) => setPageNumber(page)}/>
      </div>
  );
}

export default UsersList;
