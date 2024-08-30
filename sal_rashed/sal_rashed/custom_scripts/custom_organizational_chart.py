import frappe
from frappe.query_builder.functions import Count,Sum


@frappe.whitelist()
def custom_get_children(parent=None, company=None, exclude_node=None):
    filters = [["status", "=", "Active"]]
    if company and company != "All Companies":
        filters.append(["company", "=", company])

    if parent and company and parent != company:
        filters.append(["reports_to", "=", parent])
    else:
        filters.append(["reports_to", "=", ""])

    if exclude_node:
        filters.append(["name", "!=", exclude_node])

    employees = frappe.get_all(
        "Employee",
        fields=[
            "employee_name as name",
            "name as id",
            "lft",
            "rgt",
            "reports_to",
            "image",
            "custom_employee_cost as custom_title",
            "department",
            "designation"
        ],
        filters=filters,
        order_by="name",
    )
    for employee in employees:
        parts = employee['name'].split()
        formatted_parts = []
        for i in range(0, len(parts), 2):
            formatted_parts.append(' '.join(parts[i:i+2]))
        employee['name']='<br>'.join(formatted_parts)
        employee['name']=employee['name']+"<br>"+"Emp No : "+employee['id'] 
        if employee["department"]:  
            employee["name"] = employee['name'] + "<br><span style='font-size: small;'>" + employee["department"] + "</span>"
        if employee["designation"]:  
            employee["name"] = employee['name'] + "<br><span style='font-size: small;'>" +"Title: "+employee["designation"] + "</span>"
        employee.connections = custom_get_connections(employee.id, employee.lft, employee.rgt)
        employee.expandable = bool(employee.connections)

        total_cost=0
        cost=get_all_connection_cost(employee["id"], employee["lft"], employee["rgt"])
        if cost:
            total_cost=total_cost+cost
        if employee['custom_title']:
           total_cost=total_cost+employee['custom_title']
        employee["name"] = employee['name'] + "<br><span style='font-size: small;'>" +"Cost: " +str(total_cost)+ "</span>"

    return employees


def custom_get_connections(employee: str, lft: int, rgt: int) -> int:
	Employee = frappe.qb.DocType("Employee")
	query = (
		frappe.qb.from_(Employee)
		.select(Count(Employee.name))
		.where((Employee.lft > lft) & (Employee.rgt < rgt) & (Employee.status == "Active"))
	).run()

	return query[0][0]

def get_all_connection_cost(employee: str, lft: int, rgt: int) -> tuple:
    employees = frappe.db.get_all(
        "Employee",
        filters={
            "lft": [">", lft],
            "rgt": ["<", rgt],
            "status": "Active"
        },
        fields=["name", "custom_employee_cost"]
    )
    total_cost = sum(employee.get('custom_employee_cost', 0) for employee in employees)

    return total_cost