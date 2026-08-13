let selectedEmployeeId = 0;

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
                    <div class="d-inline-flex gap-2">
                        <button class="btn btn-warning"
                            onclick="getEmployeeById(${employee.employeeId})">
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
        employeeId: selectedEmployeeId,

        fullName: document.getElementById("txtEmpFullName").value,
        email: document.getElementById("txtEmpEmail").value,
        phone: document.getElementById("txtEmpPhone").value,
        gender: document.getElementById("drpGender").value,
        dateOfJoining: document.getElementById("txtDateOfJoining").value,

        departmentId: Number(
            document.getElementById("drpDepartment").value
        ),

        designationId: Number(
            document.getElementById("drpDesignation").value
        ),

        employeeType: document.getElementById("drpEmployeeType").value,

        salary: Number(
            document.getElementById("txtSalary").value
        )
    };

    console.log("Updating Employee ID:", selectedEmployeeId);
    console.log("Employee Data:", employee);

    fetch(`https://api.freeprojectapi.com/api/EmployeeApp/UpdateEmployee?id=${selectedEmployeeId}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(employee)

    })
    .then(response => {

        console.log("Status:", response.status);

        if (response.ok) {
            alert("Employee Updated Successfully!!!");
            location.reload();
        } else {
            alert("Failed to update employee");
        }

    })
    .catch(error => {

        console.log(error);
        alert("Something went wrong");

    });
}

function getEmployeeById(employeeId) {

    selectedEmployeeId = employeeId;

    console.log("Selected Employee ID:", selectedEmployeeId);

    fetch(`https://api.freeprojectapi.com/api/EmployeeApp/${employeeId}`)
        .then(response => response.json())
        .then(result => {

            console.log(result);

            document.getElementById("txtEmpFullName").value =
                result.fullName;

            document.getElementById("txtEmpEmail").value =
                result.email;

            document.getElementById("txtEmpPhone").value =
                result.phone;

            document.getElementById("drpGender").value =
                result.gender;

            document.getElementById("txtDateOfJoining").value =
                result.dateOfJoining.split("T")[0];

            document.getElementById("drpDepartment").value =
                result.departmentId;

            document.getElementById("drpEmployeeType").value =
                result.employeeType;

            document.getElementById("txtSalary").value =
                result.salary;


            // Load designations for this department
            fetch(`https://api.freeprojectapi.com/api/EmployeeApp/GetDesignationsByDeptId?deptId=${result.departmentId}`)
                .then(response => response.json())
                .then(designations => {

                    let designationDetails =
                        document.getElementById("drpDesignation");

                    designationDetails.innerHTML =
                        `<option value="">Select Designation</option>`;

                    designations.forEach(designation => {

                        designationDetails.innerHTML += `
                            <option value="${designation.designationId}">
                                ${designation.designationName}
                            </option>
                        `;

                    });

                    // NOW select the employee's designation
                    designationDetails.value =
                        result.designationId;

                });

        })
        .catch(error => {
            console.log(error);
        });
}


function deleteEmployee(employeeId) {

    fetch(`https://api.freeprojectapi.com/api/EmployeeApp/DeleteEmployee?id=${employeeId}`, {
        method: "DELETE"
    })
        .then(response => {

            if (response.ok) {

                alert("Employee Deleted Successfully!");


            } else {

                alert("Failed to delete employee");

            }

        })
        .catch(error => {

            console.log(error);
            alert("Something went wrong");

        });
}