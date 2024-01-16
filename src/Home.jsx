import React, { useState, useEffect } from "react";
import DropdownList from "./Dropdownlist";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import "./App.css"; 

const Dropdown = () => {
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Fetch users from your API
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://dummyapi.online/api/users");
        const data = await response.json();
        setUsers(data || []); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowDropdown(value.length > 0);
  };

  const handleUserClick = (user) => {
    const updatedUsers = users.filter((u) => u !== user);
    setUsers(updatedUsers);
    setSelectedUsers([...selectedUsers, user]);
    setInputValue("");
    setShowDropdown(false);
  };

  const handleChipRemove = (user) => {
    const updatedSelectedUsers = selectedUsers.filter((u) => u !== user);
    setSelectedUsers(updatedSelectedUsers);
    setUsers([...users, user]);
  };

  return (
    <div className="dropdown-container">
      <h1>Add Users...</h1>
      <div className="input-container">
        <div className="chip-container">
          {selectedUsers.map((user) => (
            <div key={user.id} className="chip">
              <span><FontAwesomeIcon icon={faUser} />{user.name}</span>
              <button onClick={() => handleChipRemove(user)}>X</button>
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type to filter users"
          />
        </div>
      </div>
      {showDropdown && (
        <DropdownList
          items={users}
          inputValue={inputValue}
          onItemClick={handleUserClick}
        />
      )}
    </div>
  );
};

export default Dropdown;