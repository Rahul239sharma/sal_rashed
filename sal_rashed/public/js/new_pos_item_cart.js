function overridePOSItemCart() {
    if (typeof erpnext !== 'undefined' &&
        typeof erpnext.PointOfSale !== 'undefined' &&
        typeof erpnext.PointOfSale.ItemCart !== 'undefined') {
        
        erpnext.PointOfSale.ItemCart.prototype.render_customer_fields = function(after_submission) {
            const $customer_form = this.$customer_section.find(".customer-fields-container");

            const dfs = [
                {
                    fieldname: "email_id",
                    label: __("Email"),
                    fieldtype: "Data",
                    options: "email",
                    placeholder: __("Enter customer's email"),
                },
                {
                    fieldname: "mobile_no",
                    label: __("Phone Number"),
                    fieldtype: "Data",
                    placeholder: __("Enter customer's phone number"),
                },
                // {
                //     fieldname: "loyalty_program",
                //     label: __("Loyalty Program"),
                //     fieldtype: "Link",
                //     options: "Loyalty Program",
                //     placeholder: __("Select Loyalty Program"),
                // },
                // {
                //     fieldname: "loyalty_points",
                //     label: __("Loyalty Points"),
                //     fieldtype: "Data",
                //     read_only: 1,
                // },
            ];
    
            const me = this;
            dfs.forEach((df) => {
                this[`customer_${df.fieldname}_field`] = frappe.ui.form.make_control({
                    df: { ...df, onchange: handle_customer_field_change },
                    parent: $customer_form.find(`.${df.fieldname}-field`),
                    render_input: true,
                });
                this[`customer_${df.fieldname}_field`].set_value(this.customer_info[df.fieldname]);
            });
    
            function handle_customer_field_change() {
                const current_value = me.customer_info[this.df.fieldname];
                const current_customer = me.customer_info.customer;
    
                if (this.value && current_value != this.value && this.df.fieldname != "loyalty_points") {
                    frappe.call({
                        method: "erpnext.selling.page.point_of_sale.point_of_sale.set_customer_info",
                        args: {
                            fieldname: this.df.fieldname,
                            customer: current_customer,
                            value: this.value,
                        },
                        callback: (r) => {
                            if (!r.exc) {
                                me.customer_info[this.df.fieldname] = this.value;
                                frappe.show_alert({
                                    message: __("Customer contact updated successfully."),
                                    indicator: "green",
                                });
                                frappe.utils.play_sound("submit");
                            }
                        },
                    });
                }
            }
        };
    } else {
        setTimeout(overridePOSItemCart, 100);
    }

}
overridePOSItemCart();