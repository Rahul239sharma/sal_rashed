from . import __version__ as app_version

app_name = "sal_rashed"
app_title = "Sal Rashed"
app_publisher = "hamza"
app_description = "Sal Rashed"
app_email = "hamza@resourcefactors.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/sal_rashed/css/sal_rashed.css"
app_include_js = ["sal_rashed.bundle.js"]
# app_include_js = "assets/sal_rashed/js/new_pos_post_order_summary.js"

# include js, css files in header of web template
# web_include_css = "/assets/sal_rashed/css/sal_rashed.css"
# web_include_js = "/assets/sal_rashed/js/sal_rashed.js"
# fixtures = [{"dt":"Project"}]
# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "sal_rashed/public/scss/website"
template_apps = ['sal_rashed', 'erpnext'] # apps order is important

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"dashboard-view" : "public/js/hr_dashboard.js"}
page_js = {"user-profile": "public/js/user_profile.js",}

# include js in doctype views
doctype_js = {
	"Employee": "public/js/employee.js"
}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "sal_rashed.utils.jinja_methods",
#	"filters": "sal_rashed.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "sal_rashed.install.before_install"
# after_install = "sal_rashed.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "sal_rashed.uninstall.before_uninstall"
# after_uninstall = "sal_rashed.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "sal_rashed.utils.before_app_install"
# after_app_install = "sal_rashed.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "sal_rashed.utils.before_app_uninstall"
# after_app_uninstall = "sal_rashed.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "sal_rashed.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
#	"*": {
#		"on_update": "method",
#		"on_cancel": "method",
#		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"sal_rashed.tasks.all"
#	],
#	"daily": [
#		"sal_rashed.tasks.daily"
#	],
#	"hourly": [
#		"sal_rashed.tasks.hourly"
#	],
#	"weekly": [
#		"sal_rashed.tasks.weekly"
#	],
#	"monthly": [
#		"sal_rashed.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "sal_rashed.install.before_tests"

# Overriding Methods
# ------------------------------
#
override_whitelisted_methods = {
	"hrms.hr.page.organizational_chart.organizational_chart.get_children": "sal_rashed.sal_rashed.custom_scripts.custom_organizational_chart.custom_get_children"
}
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "sal_rashed.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["sal_rashed.utils.before_request"]
# after_request = ["sal_rashed.utils.after_request"]

# Job Events
# ----------
# before_job = ["sal_rashed.utils.before_job"]
# after_job = ["sal_rashed.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"sal_rashed.auth.validate"
# ]
