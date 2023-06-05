import { useContext } from "react";
import "./UsersList.css";
import { UserContext } from "../../App";
import UserListItem from "./UserListItem";
import { User, Context } from "../../types";

function UsersList(props: { users: User[] | null; }) {

  const users: User[]|null = props.users;
  const context: Context|null = useContext(UserContext);
  if (!users || !context) return (<div className="no-data">No data available</div>);
  const handleItemClick = (user: User) => {
    context?.setSelectedUser(user);
  };

  return (
      <div className="user-list-container">
        <div className="list-header-container">
          <span className="list-header-primary">{`Users List`}</span>
        </div>
        <div className="user-list">
          {users && users.map((user: User, index: number) => (
            <UserListItem
              key={index}
              user={user}
              onItemClick={handleItemClick}
            />
          ))}
        </div>
      </div>
  );
}

export default UsersList;
