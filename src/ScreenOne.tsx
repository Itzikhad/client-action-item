import { Button, TextField } from "@mui/material";
import { User } from "./types";
import UsersList from "./Components/UsersList/UsersList";
import {theme} from './App'
import './ScreenOne.css'

type ScreenOneProps = {
    handleSearchChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    getStocksHandler: (event: { preventDefault: () => void; }) => void;
    searchValue: string;
    filteredUsers: User[];
    users: User[];
}

const ScreenOne = (props: ScreenOneProps) => {
    return (
        <div className="screen-one-container">
            <div className="screen-one-header">
                <Button variant="contained" onClick={props.getStocksHandler} color="neutral" sx={{ margin: '5px', backgroundColor: '#757575' }}>
                    Get Users
                </Button>
                <TextField
                    // variant=''='contained'
                    color='neutral'
                    label="Search users"
                    value={props.searchValue}
                    onChange={props.handleSearchChange}
                    sx={{ margin: '5px', borderColor: '#64748B' }}
                />
            </div>
            <UsersList users={props.searchValue ? props.filteredUsers : props.users} usersPerPage={4} />
        </div>
    );
}

export default ScreenOne;