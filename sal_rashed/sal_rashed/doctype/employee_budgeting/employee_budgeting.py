# Copyright (c) 2023, hamza and contributors
# For license information, please see license.txt


import frappe
from frappe.model.document import Document


class EmployeeBudgeting(Document):
	def validate(self):
		current_employees = frappe.db.count("Employee", {
			"custom_business_unit": self.business_unit, "custom_sector": self.sector,
			"department": self.department, "custom_section": self.section,
			"custom_sub_section": self.sub_section, "custom_unit": self.unit,
			"designation": self.designation, "status": "Active", "employment_type": ["!=", "Remote"]
		})
		self.current_employees = current_employees if current_employees else 0
		self.employees_gap = self.current_employees - self.total_budget
		self.employees_short = (self.employees_gap / self.total_budget) * 100 if self.total_budget else 0
