// Copyright (c) 2023, hamza and contributors
// For license information, please see license.txt

frappe.ui.form.on('Employee Budgeting', {
	setup: function (frm) {
		frm.set_query("business_unit", function() {
			return {
				filters: {
					"company": frm.doc.company
				}
			};
		});

		frm.set_query("sector", function() {
			return {
				filters: {
					"company": frm.doc.company,
					"business_unit": frm.doc.business_unit
				}
			};
		});

		frm.set_query("department", function() {
			return {
				filters: {
					"company": frm.doc.company,
					"custom_sector": frm.doc.sector
				}
			};
		});

		frm.set_query("section", function() {
			return {
				filters: {
					"company": frm.doc.company,
					"department": frm.doc.department
				}
			};
		});

		frm.set_query("sub_section", function() {
			return {
				filters: {
					"company": frm.doc.company,
					"section": frm.doc.section
				}
			};
		});

		frm.set_query("unit", function() {
			return {
				filters: {
					"company": frm.doc.company,
					"sub_section": frm.doc.sub_section
				}
			};
		});
	},
	sector: function(frm) {
		frm.set_query("department", function() {
			return {
				filters: {
					"company": frm.doc.company,
					"custom_sector": frm.doc.sector
				}
			};
		});
	},
	department: function(frm) {
		frm.set_query("section", function() {
			return {
				filters: {
					"company": frm.doc.company,
					"department": frm.doc.department
				}
			};
		});
	},
	section: function(frm) {
		frm.set_query("sub_section", function() {
			return {
				filters: {
					"company": frm.doc.company,
					"section": frm.doc.section
				}
			};
		});
	}
});