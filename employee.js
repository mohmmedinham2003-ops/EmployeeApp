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

              <td>
                    <div>
                        <button class="btn btn-warning"
                            onclick="editEmployee(${employee.employeeId})">
                            Edit
                        </button>
                        <button class="btn btn-danger"
                            onclick="deleteEmployee(${employee.employeeId})">
                            Delete
                        </button>
                    </div>
                </td>



            </tr>
            
            `

        });

    })
        .catch(error => {
            console.log(error);

        });


}

getAllEmployees();


function getDepartments() {

    fetch("https://api.freeprojectapi.com/api/EmployeeApp/GetDepartments").then(response => response.json()).then(result => {

        console.log(result);
        let departmentSelect = document.getElementById("drpDepartment");

        result.forEach(department => {
            departmentSelect.innerHTML += `
                <option value="${department.departmentId}">
                ${department.departmentName}
                </option>
                
                `

        });

    })
        .catch(error => {
            console.log(error);


        });
}
getDepartments();


function getDesignation() {

    let departmentId = document.getElementById("drpDepartment").value;

    fetch(`https://api.freeprojectapi.com/api/EmployeeApp/GetDesignationsByDeptId?deptId=${departmentId}`)
        .then(response => response.json())
        .then(result => {

            console.log(result);

            let designationDetails = document.getElementById("drpDesignation");

            designationDetails.innerHTML = `<option value="">Select Designation</option>`;

            result.forEach(designation => {

                designationDetails.innerHTML += `
                    <option value="${designation.designationId}">
                        ${designation.designationName}
                    </option>
                `;

            });

        })
        .catch(error => {
            console.log(error);
        });
}

function createEmployee() {
    let employee = {
        fullName: document.getElementById("txtEmpFullName").value,

        email: document.getElementById("txtEmpEmail").value,

        phone: document.getElementById("txtEmpPhone").value,

        gender: document.getElementById("drpGender").value,

        dateOfJoining: document.getElementById("txtDateOfJoining").value,

        departmentId: Number(document.getElementById("drpDepartment").value),

        designationId: Number(document.getElementById("drpDesignation").value),

        employeeType: document.getElementById("drpEmployeeType").value,

        salary: Number(document.getElementById("txtSalary").value)

    };

    console.log(employee);

    fetch("https://api.freeprojectapi.com/api/EmployeeApp/CreateEmployee", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(employee)

    })
        .then(response => response.json()).then(result => {
            console.log(result);

            alert("Employee Created Successfully!");

        });

}


function updateEmployee() {

    let employee = {
        employeeId: 8402,
        fullName: "Ahmed Updated",
        email: "ahmed@gmail.com",
        phone: "0771234567",
        gender: "Male",
        dateOfJoining: "2026-08-12T00:00:00",
        departmentId: 1,
        designationId: 1,
        employeeType: "Permanent",
        salary: 60000
    };

    fetch("https://api.freeprojectapi.com/api/EmployeeApp/UpdateEmployee?id=8402", {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(employee)

    })
        .then(response => response.json())
        .then(result => {

            console.log(result);

        })
        .catch(error => {

            console.log(error);

        });
}
updateEmployee();