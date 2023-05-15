
const buttons = document.querySelectorAll(".button");
const contentArea = document.querySelector(".content-area");

buttons.forEach((button) => {
button.addEventListener("click", () => {
    contentArea.innerHTML = ``
    //SEE AL THE USER//-----------------------------------------------------button---------
    if (button.id === "getallusers"){
        fetch(`http://localhost:3001/users/`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
            if(nestedPropWithSpaces === "password"){
                let hiddenValue = document.createTextNode("*******");
                const nestedValueCell = row.insertCell();
                nestedValueCell.appendChild(hiddenValue);
            } else if(nestedPropWithSpaces === "report" && jsonObj[prop][nestedProp] === null) {
                const nestedValue = document.createTextNode("");
                const nestedValueCell = row.insertCell();
                nestedValueCell.appendChild(nestedValue);
            } else{
                const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
                const nestedValueCell = row.insertCell();
                nestedValueCell.appendChild(nestedValue);
            }
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
            
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed to see users : " + error.message;
            contentArea.appendChild(message);
        });
    }else if (button.id === "addnewuser") {//-----------------------------------------------------button---------
        const form = document.createElement("form");
        form.id = "user-form";
        form.innerHTML = 
            `<b>Add New User</b><br><br>
            <label for="first_name">First Name:</label>
            <input type="text" id="first_name" name="first_name"><br>
            <label for="last_name">Last Name:</label>
            <input type="text" id="last_name" name="last_name"><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email"><br>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username"><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password"><br>
            <label for="phone_number">Phone Number:</label>
            <input type="tel" id="phone_number" name="phone_number"><br>
            <label for="admin_id">Admin ID:</label>
            <input type="number" id="admin_id" name="admin_id"><br>
            <label for="id_number">ID Number:</label>
            <input type="text" id="id_number" name="id_number"><br>
            <label for="rental_counter">Rental Counter:</label>
            <input type="number" id="rental_counter" name="rental_counter"><br>
            <label for="banned">Banned:
            <input type="checkbox" id="banned" name="banned"><br>
            <span class="slider round"></span>
            </label>
            <label for="user_type_id">User Type ID:</label>
            <input type="number" id="user_type_id" name="user_type_id"><br>

            <button type="submit">Submit</button>
            `
        ;
        contentArea.appendChild(form);

        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const formDataObj = Object.fromEntries(formData.entries());

            fetch("http://localhost:3001/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObj)
            })
            .then(response => {
                if (response.ok) {
                return response.json();
                } else {
                throw new Error("Something went wrong");
                }
            })
            .then(data => {
                const message = document.createElement("p");
                message.textContent = "Succesufuly Added New User";
                contentArea.appendChild(message);
            })
            .catch(error => {
                const message = document.createElement("p");
                message.textContent = "Failed to add user to database! "+ error.message;
                contentArea.appendChild(message);
            });
    });
        

    }else if (button.id === "getuser") {//-----------------------------------------------------button---------
        const form2 = document.createElement("form");
        form2.id = "user_id";
        form2.innerHTML = `
        <b>Get User by Id</b><br><br>
        <label for="user_id">User ID:
            <input type="number" id="user_id" name="user_id"><br>
            <button type="submit" >Submit</button>
            </label>
        <p></p>
        `;
        contentArea.appendChild(form2);

        const form = document.getElementById("user_id");

        form.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch(`http://localhost:3001/users/${formData.get("user_id")}`, {
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);
            let counter = 0;
            for (let prop in jsonObj) {
              counter++;
              const div = document.createElement("div");
              const label = document.createElement("label");
              let myLabel = label.textContent;
              let propWithSpaces = prop.replace(/_/g, " ");
              myLabel += `${counter}- ${propWithSpaces}: `;
              
              label.textContent = myLabel;
              div.appendChild(label);

              if(propWithSpaces === "password"){
                let hiddenValue = document.createTextNode("*******");
                div.appendChild(hiddenValue);
              } else {
                const value = document.createTextNode(jsonObj[prop]);
                div.appendChild(value);
              } 
              contentArea.appendChild(div);
              
            }
            
        })
        .catch(error => {
            console.error(error);
            console.log("button not!")
            const message = document.createElement("p");
            message.textContent = "Failed to see user from database: " ;
            contentArea.innerHTML = `<p></p>`
            contentArea.appendChild(message);
        });
        });
        
   //-----------------------------------------------------button-------------------------------------------------
    }else if (button.id === "updateuserinfo") {
            const form = document.createElement("form");
            form.id = "user_id";
            form.innerHTML = `
            <b>Update User Information</b><br><br>
              <label for="user_id">User ID:
                <input type="number" id="user_id_input" name="user_id"><br>
                <button type="submit" >Submit</button>
              </label>
              <p></p>
            `;
            contentArea.appendChild(form);
          
            const updateForm = document.createElement("form");
            updateForm.id = "update_user_info";
            contentArea.appendChild(updateForm);
          
            const formForUserId = document.getElementById("user_id");
            formForUserId.addEventListener("submit", function(event) {
              event.preventDefault();
              const formData = new FormData(formForUserId);
              const userId = formData.get("user_id");
          
              // First fetch to get the user info
                fetch(`http://localhost:3001/users/${userId}`,{
                    method: "GET"
                    })
              
                .then(response => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    throw new Error("Something went wrong");
                  }
                })
                .then(data => {

                  updateForm.innerHTML = "";
          
                  for (let prop in data) {
                    const div = document.createElement("div");
                    const label = document.createElement("label");
                    let myLabel = label.textContent;
                    let propWithSpaces = prop.replace(/_/g, " ");
                    //first_name, last_name, email, username, phone_number, user_type_id
                    if (propWithSpaces === "password") {
                    }else if (propWithSpaces === "user id") {
                    }else if (propWithSpaces === "rental counter") {
                    }else if (propWithSpaces === "admin id") {
                    }else if (propWithSpaces === "id number") {
                    }else if (propWithSpaces === "banned") {
                    }else if (propWithSpaces === "email") {
                        myLabel += `${propWithSpaces}: `;
                        label.textContent = myLabel;
                        div.appendChild(label);
                        const input = document.createElement("input");
                        input.type = "email";
                        input.name = prop;
                        input.value = data[prop];
                        div.appendChild(input);
                    }else if (propWithSpaces === "phone_number") {
                        myLabel += `${propWithSpaces}: `;
                        label.textContent = myLabel;
                        div.appendChild(label);
                        const input = document.createElement("input");
                        input.type = "tel";
                        input.name = prop;
                        input.value = data[prop];
                        div.appendChild(input);
                    }else if (propWithSpaces === "user_type_id") {
                        myLabel += `${propWithSpaces}: `;
                        label.textContent = myLabel;
                        div.appendChild(label);
                        const input = document.createElement("input");
                        input.type = "number";
                        input.name = prop;
                        input.value = data[prop];
                        div.appendChild(input);
                    }
                    else {
                        myLabel += `${propWithSpaces}: `;
                        label.textContent = myLabel;
                        div.appendChild(label);
                        const input = document.createElement("input");
                        input.type = "text";
                        input.name = prop;
                        input.value = data[prop];
                        div.appendChild(input);
                    }
                    updateForm.appendChild(div);
                  }

                  const updateButton = document.createElement("button");
                  updateButton.type = "submit";
                  updateButton.textContent = "Update User Info";
                  updateForm.appendChild(updateButton);

                  updateForm.addEventListener("submit", function(event) {
                    event.preventDefault();
                    const formData = new FormData(updateForm);
                    const formDataObj = Object.fromEntries(formData.entries());
                    fetch(`http://localhost:3001/users/${userId}`, {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(formDataObj)
                    })
                    .then(response => {
                      if (response.ok) {
                        return response.json();
                      } else {
                        throw new Error("Something went wrong");
                      }
                    })
                    .then(data => {
                        const message = document.createElement("p");
                        message.textContent = "Succesufuly Updated User Information";
                        contentArea.appendChild(message);
                    })
                    .catch(error => {
                      console.error(error);
                    });
                  });
                })
                .catch(error => {
                    const message = document.createElement("p");
                    message.textContent = "Failed to update user : " + error.message;
                    contentArea.appendChild(message);
                });
            });
    }else if (button.id === "resetuserpassword") {
            const form = document.createElement("form");
            form.id = "user_id";
            form.innerHTML = `
            <b>Reset User Password</b><br><br>
              <label for="user_id">User ID:
                <input type="number" id="user_id_input" name="user_id"><br>
                <button type="submit" >Submit</button>
              </label>
              <p></p>
            `;
            contentArea.appendChild(form);
          
            const updateForm = document.createElement("form");
            updateForm.id = "update_user_info";
            contentArea.appendChild(updateForm);
          
            const formForUserId = document.getElementById("user_id");
            formForUserId.addEventListener("submit", function(event) {
              event.preventDefault();
              const formData = new FormData(formForUserId);
              const userId = formData.get("user_id");
          
              fetch(`http://localhost:3001/users/${userId}`)
                .then(response => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    throw new Error("Something went wrong");
                  }
                })
                .then(data => {
                  updateForm.innerHTML = "";

                  for (let prop in data) {
                    const div = document.createElement("div");
                    const label = document.createElement("label");
                    let myLabel = label.textContent;
                    //first_name, last_name, email, username, phone_number, user_type_id

                    if (prop === "password") {
                        myLabel += `${"new_password"}: `;
                        label.textContent = myLabel;
                        div.appendChild(label);
                        const input = document.createElement("input");
                        input.type = "password";
                        input.name = "new_password";
                        input.value = data[prop];
                        div.appendChild(input);
                    }
                    updateForm.appendChild(div);
                  }
                  const updateButton = document.createElement("button");
                  updateButton.type = "submit";
                  updateButton.textContent = "Update User Info";
                  updateForm.appendChild(updateButton);
                  updateForm.addEventListener("submit", function(event) {
                    event.preventDefault();
                    const formData = new FormData(updateForm);
                    const formDataObj = Object.fromEntries(formData.entries());
                    fetch(`http://localhost:3001/users/${userId}/reset-password`, {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(formDataObj)
                    })
                    .then(response => {
                      if (response.ok) {
                        return response.json();
                      } else {
                        throw new Error("Something went wrong");
                      }
                    })
                    .then(data => {
                        const message = document.createElement("p");
                        message.textContent = "Succesufuly Reseted User Password";
                        contentArea.appendChild(message);
                    })
                    .catch(error => {
                      console.error(error);
                    });
                  });
                })
                .catch(error => {
                    const message = document.createElement("p");
                    message.textContent = "Failed to reset user password : " + error.message;
                    contentArea.appendChild(message);
                });
            });
    }else if (button.id === "getuserslist") {
        const form2 = document.createElement("form");
        form2.id = "user_id";
        form2.innerHTML = `
        <b>Get User List</b><br><br>
        <label for="user_id">User ID:
            <input type="number" id="user_id" name="user_id"><br>
            <button type="submit" >Submit</button>
            </label>
        <p></p>
        `;
        contentArea.appendChild(form2);

        const form = document.getElementById("user_id");

        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = new FormData(form);

            fetch(`http://localhost:3001/users/${formData.get("user_id")}/lists`, {
                method: "GET"
            })
            .then(response => {
                if (response.ok) {
                return response.json();
                } else {
                throw new Error("Something went wrong");
                }
            })
            .then(data => {
                const pre = document.createElement("pre");
                pre.textContent = JSON.stringify(data, null, 2);
                const jsonObj = JSON.parse(pre.textContent);
                
                for (let i = 0; i < jsonObj.length; i++) {
                  const div = document.createElement("div");
                  div.textContent = `${i + 1}- list id: ${jsonObj[i].list_id} | \t user id: ${jsonObj[i].user_id} | \t list name: ${jsonObj[i].list_name}`;
                  contentArea.appendChild(div);
                }
            })
            .catch(error => {
                console.error(error);
                console.log("button not!")
                const message = document.createElement("p");
                message.textContent = "Failed to see get user list: " ;
                contentArea.innerHTML = `<p></p>`
                contentArea.appendChild(message);
            });
        });
         
    }else if (button.id === "addnewlist") {
        const form2 = document.createElement("form");
        form2.id = "user_id";
        form2.innerHTML = `
        <b>Add User a New List</b><br><br>
        <p>Please Select an User</p>
            <label for="user_id">User ID:
            <input type="number" id="user_id" name="user_id"><br>
            </label>
        <p>List Name: </p>
            <label for="list_name">List Name:</label>
            <input type="text" id="list_name" name="list_name"><br>
            <button type="submit">Submit</button>
            
        <p></p>
        `;
        contentArea.appendChild(form2);

        const form = document.getElementById("user_id");

        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = new FormData(form);

            fetch(`http://localhost:3001/users/${formData.get("user_id")}/lists`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ list_name: formData.get("list_name") })
            })
            .then(response => {
                if (response.ok) {
                return response.json();
                } else {
                throw new Error("Something went wrong");
                }
            })
            .then(data => {
                const message = document.createElement("p");
                message.textContent = "Sucessufuly Added a New List to User";
                contentArea.appendChild(message);
            })
            .catch(error => {
                const message = document.createElement("p");
                message.textContent = "Failed to add  list" ;
                contentArea.innerHTML = `<p></p>`
                contentArea.appendChild(message);
            });
        });
//-----------------------------------------------------usertype button---------------------------------------------
    }else  if (button.id === "usertype1") {
        fetch(`http://localhost:3001/user-types/`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");

            const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
            const nestedValueCell = row.insertCell();
            nestedValueCell.appendChild(nestedValue);
              
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
    }else if (button.id === "usertype2") {
        const form = document.createElement("form");
        form.id = "user-form";
        form.innerHTML = 
            `<b>Add New User Type</b><br><br>
            <label for="type_name">Type Name:</label>
            <input type="text" id="type_name" name="type_name"><br>

            <label for="max_extratime">Maximum Extra Time:</label>
            <input type="number" id="max_extratime" name="max_extratime" value="5"><br>
            <label for="max_rental">Maximum Item Rent:</label>
            <input type="number" id="max_rental" name="max_rental" value="5"><br>
            <label for="max_reservation_day">Maximum Reservation Day:</label>
            <input type="number" id="max_reservation_day" name="max_reservation_day" value="3"><br>
            <label for="penalty_fee">Penalty Fee:</label>
            <input type="number" id="penalty_fee" name="penalty_fee" value="1"><br>
            <label for="rental_time">Rental Time:</label>
            <input type="number" id="rental_time" name="rental_time" value="25"><br>

            <button type="submit">Submit</button>
            `
        ;
        contentArea.appendChild(form);

        form.addEventListener("submit", function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            const formDataObj = Object.fromEntries(formData.entries());
            fetch("http://localhost:3001/user-types/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObj)
            })
            .then(response => {
                if (response.ok) {
                return response.json();
                } else {
                throw new Error("Something went wrong");
                }
            })
            .then(data => {
                const message = document.createElement("p");
                message.textContent = "Sucessufly Added New User Type";
                contentArea.appendChild(message);
            })
            .catch(error => {
                const message = document.createElement("p");
                message.textContent = "Failed to add UserType to database! "+ error.message;
                contentArea.appendChild(message);
            });
    });

    }else if (button.id === "usertype3") {
            const form = document.createElement("form");
            form.id = "user_id";
            form.innerHTML = `
                <b>Delete User Type</b><br><br>
                <label for="user_type_id">Type ID:</label>
                <input type="number" id="user_type_id" name="user_type_id"><br>

                <button type="submit">Submit</button>
            `;
            contentArea.appendChild(form);
            
            
            form.addEventListener("submit", function(event) {
                event.preventDefault();
                const formData = new FormData(form);
                const formDataObj = Object.fromEntries(formData.entries());
                fetch(`http://localhost:3001/user-types/${formData.get("user_type_id")}`, {
                    method: "DELETE"
                })
                .then(response => {
                    if (response.ok) {
                    return response.json();
                    } else {
                    throw new Error("No response for fe request");
                    }
                })
                .then(data => {
                    const message = document.createElement("p");
                    message.textContent = "Sucessufuly Deleted User Type";
                    contentArea.appendChild(message);
                })
                .catch(error => {
                    console.error(error);
                    message.textContent = "Failed to delete UserType to database! "+ error.message;
                    contentArea.appendChild(message);
                });
            });
    }else if (button.id === "usertype4") {
        const form = document.createElement("form");
            form.id = "user_id";
            form.innerHTML = `
                <b>Update User Type</b><br><br>
                <label for="user_type_id">Type ID:</label>
                <input type="number" id="user_type_id" name="user_type_id"><br>
                <label for="type_name">Type Name:</label>
                <input type="text" id="type_name" name="type_name"><br>
                <label for="max_extratime">Maximum Extra Time:</label>
                <input type="number" id="max_extratime" name="max_extratime" value="5"><br>
                <label for="max_rental">Maximum Item Rent:</label>
                <input type="number" id="max_rental" name="max_rental" value="5"><br>
                <label for="max_reservation_day">Maximum Reservation Day:</label>
                <input type="number" id="max_reservation_day" name="max_reservation_day" value="3"><br>
                <label for="penalty_fee">Penalty Fee:</label>
                <input type="number" id="penalty_fee" name="penalty_fee" value="1"><br>
                <label for="rental_time">Rental Time:</label>
                <input type="number" id="rental_time" name="rental_time" value="25"><br>
                
                <button type="submit">Submit</button>
            `;
            contentArea.appendChild(form);            
            form.addEventListener("submit", function(event) {
                event.preventDefault();
                const formData = new FormData(form);
                const formDataObj = Object.fromEntries(formData.entries());
                fetch(`http://localhost:3001/user-types/${formData.get("user_type_id")}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formDataObj)
                })
                .then(response => {
                    if (response.ok) {
                    return response.json();
                    } else {
                    throw new Error("Something went wrong");
                    }
                })
                .then(data => {
                    const message = document.createElement("p");
                    message.textContent = "Sucessfuly Updated User Type";
                    contentArea.appendChild(message);
                })
                .catch(error => {
                    console.error(error);
                    message.textContent = "Failed to add UserType to database! "+ error.message;
                    contentArea.appendChild(message);
                });
            });  
    }
//-----------------------------------------------------shelf button---------------------------------------------
else if (button.id === "shelf1") {
    fetch(`http://localhost:3001/shelves/`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");

            const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
            const nestedValueCell = row.insertCell();
            nestedValueCell.appendChild(nestedValue);
              
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
  
}else if (button.id === "shelf2") {
    const form = document.createElement("form");
        form.id = "add-shlef";
        form.innerHTML = 
            `<b>Add New Shelf</b><br><br>
            <label for="shelf_code">Shelf Code:</label>
            <input type="text" id="shelf_code" name="shelf_code"><br>
            <button type="submit">Submit</button>
            `
        ;
        contentArea.appendChild(form);

        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const formDataObj = Object.fromEntries(formData.entries());

            fetch(`http://localhost:3001/shelves/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObj)
            })
            .then(response => {
                if (response.ok) {
                return response.json();
                } else {
                throw new Error("Something went wrong");
                }
            })
            .then(data => {
                const message = document.createElement("p");
                message.textContent = "Successfuly Add New Shelf";
                contentArea.appendChild(message);
            })
            .catch(error => {
                const message = document.createElement("p");
                message.textContent = "Failed to add Shelf to database! "+ error.message;
                contentArea.appendChild(message);
            });
    });
     
    
}else if (button.id === "shelf3") {
    const form = document.createElement("form");
            form.id = "sheld_id";
            form.innerHTML = `
                <b>Delete Shelf</b><br><br>
                <label for="shelf_id">Type ID:</label>
                <input type="number" id="shelf_id" name="shelf_id"><br>

                <button type="submit">Submit</button>
            `;
            contentArea.appendChild(form);
            
            
            form.addEventListener("submit", function(event) {
                event.preventDefault();
                const formData = new FormData(form);
                const formDataObj = Object.fromEntries(formData.entries());
                fetch(`http://localhost:3001/shelves/${formData.get("shelf_id")}`, {
                    method: "DELETE"
                })
                .then(response => {
                    if (response.ok) {
                    return response.json();
                    } else {
                    throw new Error("No response for fe request");
                    }
                })
                .then(data => {
                    const di = document.createElement("div");
                    di.textContent = "Shelf successfully deleted!";
                    contentArea.appendChild(di);
                })
                .catch(error => {
                    console.error(error);
                    message.textContent = "Failed to delete shelf to database! "+ error.message;
                    contentArea.appendChild(message);
                });
            });
     
    
}else if (button.id === "shelf4") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Add New Branch</b><br><br>
    <label for="shelf_id">Shelf ID:</label>
    <input type="number" id="shelf_id" name="shelf_id"><br>

    <label for="branch_code">Branch Code:</label>
    <input type="text" id="branch_code" name="branch_code"><br>

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/shelves/${formData.get("shelf_id")}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObj)
    })
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
        })
        .then((data) => {
            const message = document.createElement("p");
            message.textContent = "Sucessfuly Added New Branch";
            contentArea.appendChild(message);
        })
        .catch((error) => {
        const message = document.createElement("p");
        message.textContent = "Failed to add Branch to database! " + error.message;
        contentArea.appendChild(message);
        });
    });

    
}//-----------------------------------------------------rentals button-----------------------------------------------------
else if (button.id === "rental1") {
    fetch(`http://localhost:3001/rentals/`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");

            const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
            const nestedValueCell = row.insertCell();
            nestedValueCell.appendChild(nestedValue);
              
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
}else if (button.id === "rental2") {
    const form2 = document.createElement("form");
    form2.id = "user_id";
    form2.innerHTML = `
    <b>Get the item rental at that time</b><br><br>
    <label for="user_id">User ID:
        <input type="number" id="user_id" name="user_id"><br>
        <button type="submit" >Submit</button>
        </label>
    <p></p>
    `;
    contentArea.appendChild(form2);

    const form = document.getElementById("user_id");

    form.addEventListener("submit", function(event) {
    event.preventDefault();

    const formData = new FormData(form);

    fetch(`http://localhost:3001/rentals/${formData.get("user_id")}`, {
        method: "GET"
    })
    .then(response => {
        if (response.ok) {
        
        return response.json();
        } else {
        
        throw new Error("Something went wrong");
        }
    })
    .then(data => {
        const pre = document.createElement("pre");
        pre.textContent = JSON.stringify(data, null, 2);
        const jsonObj = JSON.parse(pre.textContent);

        const table = document.createElement("table");
        let row = table.insertRow();
        let counter = 0;
        const nestedCell = row.insertCell();
        for (let nestedProp in jsonObj[0]) {
            const nestedLabel = document.createElement("label");
            let nestedLabelContent = nestedLabel.textContent;
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
            nestedLabelContent += `${nestedPropWithSpaces}`;
            nestedLabel.textContent = nestedLabelContent;
            const nestedCell = row.insertCell();
            nestedCell.appendChild(nestedLabel);
        }
        row = table.insertRow();
        for (let prop in jsonObj) {
        counter++;
        const label = document.createElement("label");
        let myLabel = label.textContent;
        myLabel += `${counter}-`;
        label.textContent = myLabel;
        const cell = row.insertCell();
        cell.appendChild(label);
        for (let nestedProp in jsonObj[prop]) {
        const nestedLabel = document.createElement("label"); 
        let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");

        const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
        const nestedValueCell = row.insertCell();
        nestedValueCell.appendChild(nestedValue);
          
        }
        row = table.insertRow();
        }
        contentArea.appendChild(table);
        
    })
    .catch(error => {
        console.error(error);
        console.log("button not!")
        const message = document.createElement("p");
        message.textContent = "Failed to see user from database: " ;
        contentArea.innerHTML = `<p></p>`
        contentArea.appendChild(message);
    });
    });
     
}else if (button.id === "rental3"){
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Add New Rental</b><br><br>
    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>

    <label for="user_id">User ID:</label>
    <input type="number" id="user_id" name="user_id"><br>

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/rentals/${formData.get("item_id")}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObj)
    })
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
        })
        .then((data) => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Added New Rental";
            contentArea.appendChild(message);
        })
        .catch((error) => {
        const message = document.createElement("p");
        message.textContent = "Failed to Update Rental in database! " + error.message;
        contentArea.appendChild(message);
        });
    });
     
}else if (button.id === "rental4") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Add New Rental</b><br><br>
    <label for="shelf_id">Item ID:</label>
    <input type="number" id="shelf_id" name="shelf_id"><br>

    <label for="user_id">User ID:</label>
    <input type="number" id="user_id" name="user_id"><br>

    <label for="admin_id">Admin ID:</label>
    <input type="number" id="admin_id" name="admin_id"><br>

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/shelves/${formData.get("shelf_id")}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObj)
    })
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
        })
        .then((data) => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Added New Rental";
            contentArea.appendChild(message);
        })
        .catch((error) => {
        const message = document.createElement("p");
        message.textContent = "Failed to add Rental to database! " + error.message;
        contentArea.appendChild(message);
        });
    });

     
}
//-----------------------------------------------------return button-----------------------------------------------------
else if (button.id === "return1") {
    fetch(`http://localhost:3001/returns/`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");

            const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
            const nestedValueCell = row.insertCell();
            nestedValueCell.appendChild(nestedValue);
              
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
}else if (button.id === "return2") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Finish the Rental Process</b><br><br>
    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>
    <label for="description">Description:</label>
    <input type="text" id="description" name="description"><br>
    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/returns/${formData.get("item_id")}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj)
        })
        
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Finished the Rental Process";
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
    }); 
    



     
}
//-----------------------------------------------------list button---------------------------------------------

else if (button.id === "list1") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Get Item's List</b><br><br>
    <label for="list_id">Item ID:</label>
    <input type="number" id="list_id" name="list_id"><br>

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/lists/${formData.get("list_id")}`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");

            const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
            const nestedValueCell = row.insertCell();
            nestedValueCell.appendChild(nestedValue);
              
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
    });
}else if (button.id === "list2") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Delete list</b><br><br>
    <label for="list_id">List ID:</label>
    <input type="number" id="list_id" name="list_id"><br>

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/lists/${formData.get("list_id")}`,{
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const message = document.createElement("p");
            message.textContent = "Successfuly Deleted list";
            contentArea.appendChild(message);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed to delete List : " + error.message;
            contentArea.appendChild(message);
        });
    });
     
}else if (button.id === "list3") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Update List Name</b><br><br>
    <label for="list_id">List ID:</label>
    <input type="number" id="list_id" name="list_id"><br>

    <label for="new_name">New Name:</label>
    <input type="text" id="new_name" name="new_name"><br>

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/lists/${formData.get("list_id")}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObj)
    })
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
        })
        .then((data) => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Updated Rental Information";
            contentArea.appendChild(message);
        })
        .catch((error) => {
        const message = document.createElement("p");
        message.textContent = "Failed to Update Rental in database! " + error.message;
        contentArea.appendChild(message);
        });
    });


}else if (button.id === "list4") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Add Item to Item List</b><br><br>
    <label for="list_id">List ID:</label>
    <input type="number" id="list_id" name="list_id"><br>

    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/lists/${formData.get("list_id")}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObj)
    })
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
        })
        .then((data) => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Added Item to Item List";
            contentArea.appendChild(message);
        })
        .catch((error) => {
            const message = document.createElement("p");
            message.textContent = "Failed to Add Item to Item List! " + error.message;
            contentArea.appendChild(message);
        });
    });
     
}else if (button.id === "list5") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Delete Item from List</b><br><br>
    <label for="list_id">List ID:</label>
    <input type="number" id="list_id" name="list_id"><br>

    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/lists/${formData.get("list_id")}/items`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObj)
    })
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
        })
        .then((data) => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Deleted Item from List";
            contentArea.appendChild(message);
        })
        .catch((error) => {
            const message = document.createElement("p");
            message.textContent = "Failed to Delete Item from List! " + error.message;
            contentArea.appendChild(message);
        });
    });
     
}
//-----------------------------------------------------admin button---------------------------------------------
else if (button.id === "admin1") {
    fetch(`http://localhost:3001/admins/`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                if(nestedPropWithSpaces === "password"){
                    let hiddenValue = document.createTextNode("*******");
                    const nestedValueCell = row.insertCell();
                    nestedValueCell.appendChild(hiddenValue);
                }else{
                    const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
                    const nestedValueCell = row.insertCell();
                    nestedValueCell.appendChild(nestedValue);
                }
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
}else if (button.id === "admin2") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Add New Admin</b><br><br>
    <label for="first_name">First Name:</label>
    <input type="text" id="first_name" name="first_name"><br>
    <label for="last_name">Last Name:</label>
    <input type="text" id="last_name" name="last_name"><br>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email"><br>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username"><br>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password"><br>
    <label for="phone_number">Phone Number:</label>
    <input type="tel" id="phone_number" name="phone_number"><br>

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/admins/`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObj)
    })
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
        })
        .then((data) => {
            const message = document.createElement("p");
            message.textContent = "Succesuful to Add New Admin";
            contentArea.appendChild(message);
        })
        .catch((error) => {
            const message = document.createElement("p");
            message.textContent = "Failed to Add Item to Item List! " + error.message;
            contentArea.appendChild(message);
        });
    });
     
}else if (button.id === "admin3") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Update Admin Information</b><br><br>
    <label for="admin_id">Admin ID:</label>
    <input type="number" id="admin_id" name="admin_id"><br>
    <label for="first_name">First Name:</label>
    <input type="text" id="first_name" name="first_name"><br>
    <label for="last_name">Last Name:</label>
    <input type="text" id="last_name" name="last_name"><br>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email"><br>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username"><br>
    <label for="phone_number">Phone Number:</label>
    <input type="tel" id="phone_number" name="phone_number"><br>
    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
        fetch(`http://localhost:3001/admins/${formData.get("admin_id")}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj)
        })
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
        })
        .then((data) => {
            const message = document.createElement("p");
            message.textContent = "Admin information updated successfully.";
            contentArea.appendChild(message);
        })
        .catch((error) => {
            const message = document.createElement("p");
            message.textContent = "Failed to Admin information updated successfully.! " + error.message;
            contentArea.appendChild(message);
        });
    });
     
}else if (button.id === "admin4") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Update Admin Password</b><br><br>
    <label for="admin_id">Admin ID:</label>
    <input type="number" id="admin_id" name="admin_id"><br>
    <label for="new_password">Password:</label>
    <input type="password" id="new_password" name="new_password"><br>
    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/admins/${formData.get("admin_id")}/reset-password`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObj)
    })
        .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong");
        }
        })
        .then((data) => {
            const message = document.createElement("p");
            message.textContent = "Admin password updated successfully.";
            contentArea.appendChild(message);
        })
        .catch((error) => {
            const message = document.createElement("p");
            message.textContent = "Failed Update Admin Password! " + error.message;
            contentArea.appendChild(message);
        });
    });
     
}
//-----------------------------------------------------item button---------------------------------------------
else if (button.id === "item1") {
    fetch(`http://localhost:3001/items/`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");

            const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
            const nestedValueCell = row.insertCell();
            nestedValueCell.appendChild(nestedValue);
              
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
}else if (button.id === "item2") {
    fetch(`http://localhost:3001/items/avaliables/`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");

            const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
            const nestedValueCell = row.insertCell();
            nestedValueCell.appendChild(nestedValue);
              
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed to see AVALIABLE ITEM : " + error.message;
            contentArea.appendChild(message);
        });
    
}else if (button.id === "item3") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Get Item</b><br><br>
    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/items/${formData.get("item_id")}`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");

            const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
            const nestedValueCell = row.insertCell();
            nestedValueCell.appendChild(nestedValue);
              
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
    });
    
}else if (button.id === "item4") {
    const form = document.createElement("form");
        form.id = "add-shlef";
        form.innerHTML = 
            `<b>Add New Multimedia Item</b><br><br>
            <form id="book-form">
            <label for="item_name">Item Name:</label>
            <input type="text" id="item_name" name="item_name"><br>

            <label for="publication_date">Publication Date:</label>
            <input type="date" id="publication_date" name="publication_date"><br>

            <label for="publisher_name">Publisher Name:</label>
            <input type="text" id="publisher_name" name="publisher_name"><br>

            <label for="language_name">Language Name:</label>
            <input type="text" id="language_name" name="language_name"><br>

            <label for="branch_id">Branch ID:</label>
            <input type="number" id="branch_id" name="branch_id"><br>

            <label for="admin_id">Admin ID:</label>
            <input type="number" id="admin_id" name="admin_id"><br>

            <label for="barcode">Barcode:</label>
            <input type="text" id="barcode" name="barcode"><br>

            <label for="size">Size:</label>
            <input type="number" id="size" name="size"><br>

            <label for="serie_name">Serie Name:</label>
            <input type="text" id="serie_name" name="serie_name"><br>

            <label for="genre_id">Genre ID:</label>
            <input type="number" id="genre_id" name="genre_id"><br>

            <label for="status">Status:</label>
            <select id="status" name="status">
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="lost">Lost</option>reserved
                <option value="maintenance">Maintenance</option>
                <option value="reserved">Reserved</option>
            </select><br>


            <button type="submit">Add Book</button>
            </form>
            `
        ;
        contentArea.appendChild(form);

        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const formDataObj = Object.fromEntries(formData.entries());

            fetch(`http://localhost:3001/items/multimedia`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObj)
            })
            .then(response => {
                if (response.ok) {
                return response.json();
                } else {
                throw new Error("Something went wrong");
                }
            })
            .then(data => {
                const message = document.createElement("p");
                message.textContent = "Successfuly Added New Multimedia Item";
                contentArea.appendChild(message);
            })
            .catch(error => {
                const message = document.createElement("p");
                message.textContent = "Failed to Add Multimedia Item to database! "+ error.message;
                contentArea.appendChild(message);
            });
    });
    

}else if (button.id === "item5") {
    const form = document.createElement("form");
        form.id = "add-shlef";
        form.innerHTML = 
            `<b>Add New Periodical Item</b><br><br>
            <label for="item_name">Item Name:</label>
            <input type="text" id="item_name" name="item_name" required><br>
          
            <label for="publication_date">Publication Date:</label>
            <input type="date" id="publication_date" name="publication_date" required><br>
          
            <label for="publisher_name">Publisher Name:</label>
            <input type="text" id="publisher_name" name="publisher_name" required><br>
          
            <label for="language_name">Language Name:</label>
            <input type="text" id="language_name" name="language_name" required><br>
          
            <label for="branch_id">Branch ID:</label>
            <input type="number" id="branch_id" name="branch_id" required><br>
          
            <label for="admin_id">Admin ID:</label>
            <input type="number" id="admin_id" name="admin_id" required><br>
          
            <label for="barcode">Barcode:</label>
            <input type="text" id="barcode" name="barcode" required><br>
          
            <label for="frequency">Frequency:</label>
            <select id="frequency" name="frequency">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Monthly</option>
            </select><br>
          
            <label for="volume_number">Volume Number:</label>
            <input type="number" id="volume_number" name="volume_number"><br>
          
            <label for="genre_id">Genre ID:</label>
            <input type="number" id="genre_id" name="genre_id" required><br>
          
            <label for="serie_name">Serie Name:</label>
            <input type="text" id="serie_name" name="serie_name"><br>
          
            <label for="living">Living:</label>
            <input type="checkbox" id="living" name="living"><br>

            <label for="status">Status:</label>
            <select id="status" name="status">
                <option value="available">Available</option>
                <option value="rented">Rented</option>
                <option value="lost">Lost</option>
                <option value="maintenance">Maintenance</option>
                <option value="reserved">Reserved</option>

            </select><br>


            <button type="submit">Add Book</button>
            </form>
            `
        ;
        contentArea.appendChild(form);

        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const formDataObj = Object.fromEntries(formData.entries());

            fetch(`http://localhost:3001/items/periodical`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObj)
            })
            .then(response => {
                if (response.ok) {
                return response.json();
                } else {
                throw new Error("Something went wrong");
                }
            })
            .then(data => {
                const message = document.createElement("p");
                message.textContent = "Successfuly Added New Periodical Item";
                contentArea.appendChild(message);
            })
            .catch(error => {
                const message = document.createElement("p");
                message.textContent = "Failed to Add Periodical Item to database! "+ error.message;
                contentArea.appendChild(message);
            });
    });
    
}else if (button.id === "item6") {
    const form = document.createElement("form");
        form.id = "add-shlef";
        form.innerHTML = 
            `<b>Add New Nonperiodical Item</b><br><br>
            <label for="item_name">Item Name:</label>
            <input type="text" id="item_name" name="item_name"><br>
            
            <label for="publication_date">Publication Date:</label>
            <input type="date" id="publication_date" name="publication_date"><br>
            
            <label for="publisher_name">Publisher Name:</label>
            <input type="text" id="publisher_name" name="publisher_name"><br>
            
            <label for="language_name">Language Name:</label>
            <input type="text" id="language_name" name="language_name"><br>
            
            <label for="branch_id">Branch ID:</label>
            <input type="number" id="branch_id" name="branch_id"><br>
            
            <label for="admin_id">Admin ID:</label>
            <input type="number" id="admin_id" name="admin_id"><br>
            
            <label for="barcode">Barcode:</label>
            <input type="text" id="barcode" name="barcode"><br>
            
            <label for="seri_name">Seri Name:</label>
            <input type="text" id="seri_name" name="seri_name"><br>
            
            <label for="genre_id">Genre ID:</label>
            <input type="number" id="genre_id" name="genre_id"><br>
            
            <label for="status">Status:</label>
            <input type="text" id="status" name="status"><br>
            
            <label for="author_first_name">Author First Name:</label>
            <input type="text" id="author_first_name" name="author_first_name"><br>
            
            <label for="author_last_name">Author Last Name:</label>
            <input type="text" id="author_last_name" name="author_last_name"><br>
            
            <label for="author_nationality">Author Nationality:</label>
            <input type="text" id="author_nationality" name="author_nationality"><br>
            
            <label for="isbn">ISBN:</label>
            <input type="number" id="isbn" name="isbn"><br>
            
            <label for="edition">Edition:</label>
            <input type="number" id="edition" name="edition"><br>
            
            <label for="page_number">Page Number:</label>
            <input type="number" id="page_number" name="page_number"><br>

            <button type="submit">Submit</button>
            `
        ;
        contentArea.appendChild(form);

        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const formDataObj = Object.fromEntries(formData.entries());

            fetch(`http://localhost:3001/items/nonperiodical`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObj)
            })
            .then(response => {
                if (response.ok) {
                return response.json();
                } else {
                throw new Error("Something went wrong");
                }
            })
            .then(data => {
                const message = document.createElement("p");
                message.textContent = "Successfuly Added New Nonperiodical Item";
                contentArea.appendChild(message);
            })
            .catch(error => {
                const message = document.createElement("p");
                message.textContent = "Failed to Add Nonperiodical Item to database! "+ error.message;
                contentArea.appendChild(message);
            });
    });
    
}else if (button.id === "item7") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Delete Item</b><br><br>
    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/items/${formData.get("item_id")}`,{
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const message = document.createElement("p");
            message.textContent = "Successfuly Deleted Item";
            contentArea.appendChild(message);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
    });
      
}else if (button.id === "item8") {
    const form = document.createElement("form");
        form.id = "add-shlef";
        form.innerHTML = 
            `<b>Rate the Item</b><br><br>
            <label for="item_id">Item ID:</label>
            <input type="number" id="item_id" name="item_id" required><br>

            <label for="user_id">User Id:</label>
            <input type="number" id="user_id" name="user_id" required><br>
            
            <label for="rate">Rate:</label>
            <input type="number" id="rate" name="rate" min="1" max="10" required> <br>
            
            <button type="submit">Submit</button>
            </form>
            `
        ;
        contentArea.appendChild(form);

        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const formData = new FormData(form);
            const formDataObj = Object.fromEntries(formData.entries());

            fetch(`http://localhost:3001/items/${formData.get("item_id")}/rate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDataObj)
            })
            .then(response => {
                if (response.ok) {
                return response.json();
                } else {
                throw new Error("The user is not allowed to rate this item");
                }
            })
            .then(data => {
                const message = document.createElement("p");
                message.textContent = data;
                contentArea.appendChild(message);
            })
            .catch(error => {
                const message = document.createElement("p");
                message.textContent = "Failed to Rate Item! "+ error.message;
                contentArea.appendChild(message);
            });
    });
     
}else if (button.id === "item9") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Get Item Total Rate</b><br><br>
    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/items/${formData.get("item_id")}/rate`,{
            method: "GET"
        })
        
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = data;
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
    });  
      
}else if (button.id === "item10") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Update the Rate</b><br><br>
    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>
    <label for="user_id">User Id:</label>
    <input type="number" id="user_id" name="user_id" required><br>
    <label for="rate">Rate:</label>
    <input type="number" id="rate" name="rate" min="1" max="10" required> <br>
    
    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/items/${formData.get("item_id")}/rate`,{
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj)
        })
        
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Updated the Rate";
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed to Update the Rate: " + error.message;
            contentArea.appendChild(message);
        });
    });  
       
}else if (button.id === "item11") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Update the Multi Media Item</b><br><br>
    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>
    
    <label for="item-name">Item Name:</label>
    <input type="text" id="item-name" name="item_name"><br>
  
    <label for="publication-date">Publication Date:</label>
    <input type="date" id="publication-date" name="publication_date"><br>
  
    <label for="publisher-name">Publisher Name:</label>
    <input type="text" id="publisher-name" name="publisher_name"><br>
  
    <label for="language-name">Language:</label>
    <input type="text" id="language-name" name="language_name"><br>
  
    <label for="branch-id">Branch ID:</label>
    <input type="number" id="branch-id" name="branch_id"><br>
  
    <label for="barcode">Barcode:</label>
    <input type="text" id="barcode" name="barcode"><br>
  
    <label for="size">Size:</label>
    <input type="number" id="size" name="size"><br>
  
    <label for="serie-name">Serie Name:</label>
    <input type="text" id="serie-name" name="serie_name"><br>
  
    <label for="genre-id">Genre ID:</label>
    <input type="number" id="genre-id" name="genre_id"><br>

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/items/${formData.get("item_id")}/multimedia`,{
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj)
        })
        
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Updated the Multi Media Item";
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed to Update the Multi Media Item: " + error.message;
            contentArea.appendChild(message);
        });
    });  
}else if (button.id === "item12") {
    contentArea.innerHTML = ``;
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Update the Periodical Item</b><br><br>
    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>
    <label for="item_name">Item Name:</label>
    <input type="text" id="item_name" name="item_name"><br>

    <label for="publication_date">Publication Date:</label>
    <input type="date" id="publication_date" name="publication_date"><br>

    <label for="publisher_name">Publisher Name:</label>
    <input type="text" id="publisher_name" name="publisher_name"><br>

    <label for="language_name">Language Name:</label>
    <input type="text" id="language_name" name="language_name"><br>

    <label for="branch_id">Branch ID:</label>
    <input type="number" id="branch_id" name="branch_id"><br>

    <label for="barcode">Barcode:</label>
    <input type="text" id="barcode" name="barcode"><br>

    <label for="frequency">Frequency:</label>
    <input type="text" id="frequency" name="frequency"><br>

    <label for="volume_number">Volume Number:</label>
    <input type="number" id="volume_number" name="volume_number"><br>

    <label for="genre_id">Genre ID:</label>
    <input type="number" id="genre_id" name="genre_id"><br>

    <label for="serie_name">Serie Name:</label>
    <input type="text" id="serie_name" name="serie_name"><br>

    <label for="living">Living:</label>
    <input type="checkbox" id="living" name="living"><br><br>
    
    
    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/items/${formData.get("item_id")}/periodical`,{
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj)
        })
        
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Updated the Periodical Item";
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed to Update the Periodical Item: " + error.message;
            contentArea.appendChild(message);
        });
    });  
}else if (button.id === "item13") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Update the Nonperiodical Item</b><br><br>
    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>

    <label for="item_name">Item Name:</label>
    <input type="text" id="item_name" name="item_name"><br>

    <label for="publication_date">Publication Date:</label>
    <input type="date" id="publication_date" name="publication_date"><br>

    <label for="publisher_name">Publisher Name:</label>
    <input type="text" id="publisher_name" name="publisher_name"><br>

    <label for="language_name">Language Name:</label>
    <input type="text" id="language_name" name="language_name"><br>

    <label for="branch_id">Branch ID:</label>
    <input type="number" id="branch_id" name="branch_id"><br>

    <label for="barcode">Barcode:</label>
    <input type="text" id="barcode" name="barcode"><br>

    <label for="serie_name">Serie Name:</label>
    <input type="text" id="serie_name" name="serie_name"><br>

    <label for="genre_id">Genre ID:</label>
    <input type="number" id="genre_id" name="genre_id"><br>

    <label for="status">Status:</label>
    <input type="text" id="status" name="status"><br>

    <label for="author_first_name">Author First Name:</label>
    <input type="text" id="author_first_name" name="author_first_name"><br>

    <label for="author_last_name">Author Last Name:</label>
    <input type="text" id="author_last_name" name="author_last_name"><br>

    <label for="author_nationality">Author Nationality:</label>
    <input type="text" id="author_nationality" name="author_nationality"><br>

    <label for="isbn">ISBN:</label>
    <input type="text" id="isbn" name="isbn"><br>

    <label for="edition">Edition:</label>
    <input type="number" id="edition" name="edition"><br>

    <label for="page_number">Page Number:</label>
    <input type="number" id="page_number" name="page_number"><br>
    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/items/${formData.get("item_id")}/nonperiodical`,{
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj)
        })
        
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Updated the Nonperiodical Item";
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed to Update the Nonperiodical Item: " + error.message;
            contentArea.appendChild(message);
        });
    });  
}
//-----------------------------------------------------maintanace button---------------------------------------------
else if (button.id === "maintanace1") {
    fetch(`http://localhost:3001/items/maintenance/current`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");

            const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
            const nestedValueCell = row.insertCell();
            nestedValueCell.appendChild(nestedValue);
              
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
    
}else if (button.id === "maintanace2") {
    fetch(`http://localhost:3001/items/maintenance/history`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");

            const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
            const nestedValueCell = row.insertCell();
            nestedValueCell.appendChild(nestedValue);
              
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });    
}else if (button.id === "maintanace3") {
    
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Add Maintenance Process</b><br><br>
    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>

    <label for="admin_id">Admin ID:</label>
    <input type="number" id="admin_id" name="admin_id"><br>
    
    <label for="description">Description:</label>
    <input type="text" id="description" name="description"><br>

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/items/maintenance/current/${formData.get("item_id")}`,{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj)
        })
        
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Added Maintenance Process";
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed to Add Maintenance Process: " + error.message;
            contentArea.appendChild(message);
        });
    });  


}else if (button.id === "maintanace4") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Add Maintenance History</b><br><br>
    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>

    <label for="admin_id">Admin ID:</label>
    <input type="number" id="admin_id" name="admin_id"><br>

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/items/maintenance/history/${formData.get("item_id")}`,{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj)
        })
        
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Added Maintenance History";
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed to Add Maintenance History: " + error.message;
            contentArea.appendChild(message);
        });
    });  
   
}
//-----------------------------------------------------lost button---------------------------------------------
else if (button.id === "lost1") {
    fetch(`http://localhost:3001/items/lost`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");

            const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
            const nestedValueCell = row.insertCell();
            nestedValueCell.appendChild(nestedValue);
              
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });   
}else if (button.id === "lost2") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Add New Lost Item</b><br><br>
    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>

    <label for="admin_id">Admin ID:</label>
    <input type="number" id="admin_id" name="admin_id"><br>
    

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/items/lost/${formData.get("item_id")}`,{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj)
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Added New Lost Item";
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
    });  
    
}else if (button.id === "lost3") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Delete Lost Item Record</b><br><br>
    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>


    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/items/lost/${formData.get("item_id")}`,{
            method: "DELETE"
        })
        
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Deleted Lost Item Record";
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
    });  
}
//-----------------------------------------------------genre button---------------------------------------------

else if (button.id === "genre1") {
    fetch(`http://localhost:3001/genres/`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");

            const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
            const nestedValueCell = row.insertCell();
            nestedValueCell.appendChild(nestedValue);
              
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
}else if (button.id === "genre2") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Add New Genre</b><br><br>
    <label for="genre_name">Genre Name:</label>
    <input type="text" id="genre_name" name="genre_name"><br>
    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/items/genres/`,{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj)
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Added New Genre";
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
    });  
     
}
//-----------------------------------------------------branches button---------------------------------------------

else if (button.id === "branch1") {
    fetch(`http://localhost:3001/branches/`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");

            const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
            const nestedValueCell = row.insertCell();
            nestedValueCell.appendChild(nestedValue);
              
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
}else if (button.id === "branch2") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Delete Lost Item Record</b><br><br>
    <label for="branch_id">Item ID:</label>
    <input type="number" id="branch_id" name="branch_id"><br>


    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/branches/${formData.get("branch_id")}`,{
            method: "DELETE"
        })
        
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Deleted Lost Item Record";
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
    });  
     
}
//-----------------------------------------------------reservations button---------------------------------------------

else if (button.id === "reservation1") {
    fetch(`http://localhost:3001/reservations/`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");

            const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
            const nestedValueCell = row.insertCell();
            nestedValueCell.appendChild(nestedValue);
              
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
}else if (button.id === "reservation2") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Get Item Reservation Informations</b><br><br>
    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>

    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/reservations/${formData.get("item_id")}`,{
            method: "GET"
        })
        
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Geted Item Reservation Informations";
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
    });  
     
}else if (button.id === "reservation3") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Add New Reservation</b><br><br>
    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>
    <label for="user_id">User ID:</label>
    <input type="number" id="user_id" name="user_id"><br>
    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/reservations/${formData.get("item_id")}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj)
        })
        
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Added New Reservation";
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
    });  
     
}else if (button.id === "reservation4") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Delete Reservation</b><br><br>
    <label for="item_id">Item ID:</label>
    <input type="number" id="item_id" name="item_id"><br>
    <label for="user_id">User ID:</label>
    <input type="number" id="user_id" name="user_id"><br>
    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/reservations/${formData.get("item_id")}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj)
        })
        
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Deleted Reservation";
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
    });  
     
}
//-----------------------------------------------------bans button---------------------------------------------

else if (button.id === "ban1") {
    fetch(`http://localhost:3001/bans/`,{
            method: "GET"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {     
            const pre = document.createElement("pre");
            pre.textContent = JSON.stringify(data, null, 2);
            const jsonObj = JSON.parse(pre.textContent);

            const table = document.createElement("table");
            let row = table.insertRow();
            let counter = 0;
            const nestedCell = row.insertCell();
            for (let nestedProp in jsonObj[0]) {
                const nestedLabel = document.createElement("label");
                let nestedLabelContent = nestedLabel.textContent;
                let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");
                nestedLabelContent += `${nestedPropWithSpaces}`;
                nestedLabel.textContent = nestedLabelContent;
                const nestedCell = row.insertCell();
                nestedCell.appendChild(nestedLabel);
            }
            row = table.insertRow();
            for (let prop in jsonObj) {
            counter++;
            const label = document.createElement("label");
            let myLabel = label.textContent;
            myLabel += `${counter}-`;
            label.textContent = myLabel;
            const cell = row.insertCell();
            cell.appendChild(label);
            for (let nestedProp in jsonObj[prop]) {
            const nestedLabel = document.createElement("label"); 
            let nestedPropWithSpaces = nestedProp.replace(/_/g, " ");

            const nestedValue = document.createTextNode(jsonObj[prop][nestedProp]);
            const nestedValueCell = row.insertCell();
            nestedValueCell.appendChild(nestedValue);
              
            }
            row = table.insertRow();
            }
            contentArea.appendChild(table);
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
}else if (button.id === "ban2") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Ban User</b><br><br>
    <label for="user_id">User ID:</label>
    <input type="number" id="user_id" name="user_id"><br>

    <label for="admin_id">Admin ID:</label>
    <input type="number" id="admin_id" name="admin_id"><br>

    <label for="report">Report:</label>
    <input type="text" id="report" name="report"><br>
    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/bans/${formData.get("user_id")}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataObj)
        })
        
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Baned User";
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
    }); 
    
}else if (button.id === "ban3") {
    const form = document.createElement("form");
    form.id = "user_id";
    form.innerHTML = `
    <b>Unban User</b><br><br>
    <label for="user_id">User ID:</label>
    <input type="number" id="user_id" name="user_id"><br>

   
    <button type="submit">Submit</button>
    `;
    contentArea.appendChild(form);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3001/bans/${formData.get("user_id")}`,{
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
            
            return response.json();
            } else {
            
            throw new Error("Something went wrong");
            }
        })
        .then(data => {
            const message = document.createElement("p");
            message.textContent = "Successfuly Unbaned User";
            contentArea.appendChild(message);
      
        })
        .catch(error => {
            const message = document.createElement("p");
            message.textContent = "Failed: " + error.message;
            contentArea.appendChild(message);
        });
    }); 
}
});

});