import frappe
import requests
from erpnext.selling.doctype.sales_order.sales_order import make_delivery_note,make_sales_invoice

@frappe.whitelist()
def create_delivery_note_from_sales_order(sales_order_name):
    data=make_delivery_note(sales_order_name)
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"token 0b00bf013ad6e4b:0a136c47586e0da"
    }
    url = f"{frappe.utils.get_url()}/api/resource/Delivery Note"
    response = requests.post(url, json=data.as_dict(), headers=headers)
    dn_name = response.json()['data']['name']
    submit_url = f"{frappe.utils.get_url()}/api/resource/Delivery Note/{dn_name}"
    submit_response = requests.put(submit_url, json={"docstatus": 1}, headers=headers)


# @frappe.whitelist()
# def create_sales_invoice_from_sales_order(sales_order_name):
#     data=make_sales_invoice(sales_order_name)
#     headers = {
#         "Accept": "application/json",
#         "Content-Type": "application/json",
#         "Authorization": f"token 0b00bf013ad6e4b:0a136c47586e0da"
#     }
#     url = f"{frappe.utils.get_url()}/api/resource/Sales Invoice"
#     response = requests.post(url, json=data.as_dict(), headers=headers)
#     dn_name = response.json()['data']['name']
#     submit_url = f"{frappe.utils.get_url()}/api/resource/Sales Invoice/{dn_name}"
#     submit_response = requests.put(submit_url, json={"docstatus": 1}, headers=headers)    