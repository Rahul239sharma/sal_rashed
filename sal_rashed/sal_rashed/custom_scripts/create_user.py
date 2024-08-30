import frappe
from frappe.utils.password import update_password

def create_user_for_employee():
    # Fetch all employees
    employees = frappe.get_all('Employee', fields=['name', 'employee_name'])

    for emp in employees:
        email = emp.get('name') + "@gmail.com"
        
        # Check if the user already exists
        user_exists = frappe.db.exists("User", email)
        if user_exists:
            continue
        try:
            user = frappe.get_doc({
                'doctype': 'User',
                'email': email,
                'first_name': emp.get('employee_name'),
                'enabled': 1,
                # 'user_type': 'Employee Self Service',
                'send_welcome_email':0
            })
            user.insert(ignore_permissions=True)

            employee = frappe.get_doc('Employee', emp.get('name'))
            employee.user_id = user.name
            employee.save(ignore_permissions=True)
            password = f"{emp.get('name')}1234"
            update_password(user.name, password)            
            frappe.db.commit()

        except frappe.exceptions.ValidationError as e:
            # Handle validation errors separately
            frappe.log_error(f"Validation error for employee {emp.get('name')}: {str(e)}", "Employee User Creation Error")
        except Exception as e:
            # Log any other errors that occur during user creation
            frappe.log_error(f"Error creating user for employee {emp.get('name')}: {str(e)}", "Employee User Creation Error")

def add_leave_approvers():
    departments_to_avoid = ["All Departments"]

    approvers = [
        {"approver": "3231@gmail.com"},
        {"approver": "3200@gmail.com"}
    ]

    departments = frappe.get_all('Department', fields=['name'])

    for department in departments:
        if department.name not in departments_to_avoid:
            department_doc = frappe.get_doc('Department', department.name)

            for approver in approvers:
                department_doc.append('leave_approvers', approver)

            department_doc.save()

    frappe.db.commit()

import frappe

def set_line_manager_as_leave_approver():
    employees = frappe.get_all('Employee', fields=['name', 'reports_to'])

    for employee in employees:
        if employee.reports_to:
            line_manager_doc = frappe.get_value('Employee', employee.reports_to, 'user_id')
            
            if line_manager_doc:
                employee_doc = frappe.get_doc('Employee', employee.name)

                employee_doc.leave_approver = line_manager_doc

                employee_doc.save(ignore_permissions=True)
                print( employee_doc.name)
        frappe.db.commit()