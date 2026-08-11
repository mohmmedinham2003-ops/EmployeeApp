function getAllEmployees() {

    fetch("https://api.freeprojectapi.com/api/EmployeeApp/GetEmployees").then(response => response.json()).then(result => {

        console.log(result);

        let employeeDetails = document.getElementById("tblEmployeeDetails");

        result.forEach(employee => {
            employeeDetails.innerHTML += `
            <tr>
                <td>${employee.employeeId}</td>
                <td>${employee.fullName}</td>
                <td>${employee.email}</td>
                <td>${employee.phone}</td>
                <td>${employee.gender}</td>
                <td>${employee.dateOfJoining}</td>
                <td>${employee.employeeType}</td>
                <td>${employee.salary}</td>
                <td>${employee.departmentName}</td>
                <td>${employee.designationName}</td>

            </tr>
            
            `

        });

    })
    .catch(error => {
        console.log(error);
        
    });


}

    getAllEmployees();  
