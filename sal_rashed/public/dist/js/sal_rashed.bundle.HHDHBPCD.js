(() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

  // ../sal_rashed/sal_rashed/public/js/new_pos_post_order_summary.js
  function overridePOSSummary() {
    if (typeof erpnext !== "undefined" && typeof erpnext.PointOfSale !== "undefined" && typeof erpnext.PointOfSale.PastOrderSummary !== "undefined") {
      erpnext.PointOfSale.PastOrderSummary.prototype.get_condition_btn_map = function(after_submission) {
        if (after_submission)
          return [{ condition: true, visible_btns: ["Print Receipt", "New Order"] }];
        return [
          { condition: this.doc.docstatus === 0, visible_btns: ["Edit Order", "Delete Order"] },
          {
            condition: !this.doc.is_return && this.doc.docstatus === 1,
            visible_btns: ["Print Receipt", "Return"]
          },
          {
            condition: this.doc.is_return && this.doc.docstatus === 1,
            visible_btns: ["Print Receipt"]
          }
        ];
      };
    } else {
      setTimeout(overridePOSSummary, 100);
    }
  }
  overridePOSSummary();

  // ../sal_rashed/sal_rashed/public/js/new_pos_item_cart.js
  function overridePOSItemCart() {
    if (typeof erpnext !== "undefined" && typeof erpnext.PointOfSale !== "undefined" && typeof erpnext.PointOfSale.ItemCart !== "undefined") {
      erpnext.PointOfSale.ItemCart.prototype.render_customer_fields = function(after_submission) {
        const $customer_form = this.$customer_section.find(".customer-fields-container");
        const dfs = [
          {
            fieldname: "email_id",
            label: __("Email"),
            fieldtype: "Data",
            options: "email",
            placeholder: __("Enter customer's email")
          },
          {
            fieldname: "mobile_no",
            label: __("Phone Number"),
            fieldtype: "Data",
            placeholder: __("Enter customer's phone number")
          }
        ];
        const me = this;
        dfs.forEach((df) => {
          this[`customer_${df.fieldname}_field`] = frappe.ui.form.make_control({
            df: __spreadProps(__spreadValues({}, df), { onchange: handle_customer_field_change }),
            parent: $customer_form.find(`.${df.fieldname}-field`),
            render_input: true
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
                value: this.value
              },
              callback: (r) => {
                if (!r.exc) {
                  me.customer_info[this.df.fieldname] = this.value;
                  frappe.show_alert({
                    message: __("Customer contact updated successfully."),
                    indicator: "green"
                  });
                  frappe.utils.play_sound("submit");
                }
              }
            });
          }
        }
      };
    } else {
      setTimeout(overridePOSItemCart, 100);
    }
  }
  overridePOSItemCart();

  // ../sal_rashed/sal_rashed/public/js/new_pos_payment.js
  function overridePOSPayment() {
    if (typeof erpnext !== "undefined" && typeof erpnext.PointOfSale !== "undefined" && typeof erpnext.PointOfSale.Payment !== "undefined") {
      erpnext.PointOfSale.Payment.prototype.bind_events = function() {
        const me = this;
        this.$payment_modes.on("click", ".mode-of-payment", function(e) {
          const mode_clicked = $(this);
          if (!$(e.target).is(mode_clicked))
            return;
          const scrollLeft = mode_clicked.offset().left - me.$payment_modes.offset().left + me.$payment_modes.scrollLeft();
          me.$payment_modes.animate({ scrollLeft });
          const mode = mode_clicked.attr("data-mode");
          $(`.mode-of-payment-control`).css("display", "none");
          $(`.cash-shortcuts`).css("display", "none");
          me.$payment_modes.find(`.pay-amount`).css("display", "inline");
          me.$payment_modes.find(`.loyalty-amount-name`).css("display", "none");
          $(".mode-of-payment").removeClass("border-primary");
          if (mode_clicked.hasClass("border-primary")) {
            mode_clicked.removeClass("border-primary");
            me.selected_mode = "";
          } else {
            mode_clicked.addClass("border-primary");
            mode_clicked.find(".mode-of-payment-control").css("display", "flex");
            me.$payment_modes.find(`.${mode}-amount`).css("display", "none");
            me.$payment_modes.find(`.${mode}-name`).css("display", "inline");
            me.selected_mode = me[`${mode}_control`];
            me.selected_mode && me.selected_mode.$input.get(0).focus();
            me.auto_set_remaining_amount();
          }
        });
        frappe.ui.form.on("POS Invoice", "contact_mobile", (frm) => {
          var _a;
          const contact = frm.doc.contact_mobile;
          const request_button = $((_a = this.request_for_payment_field) == null ? void 0 : _a.$input[0]);
          if (contact) {
            request_button.removeClass("btn-default").addClass("btn-primary");
          } else {
            request_button.removeClass("btn-primary").addClass("btn-default");
          }
        });
        frappe.ui.form.on("POS Invoice", "coupon_code", (frm) => {
          if (frm.doc.coupon_code && !frm.applying_pos_coupon_code) {
            if (!frm.doc.ignore_pricing_rule) {
              frm.applying_pos_coupon_code = true;
              frappe.run_serially([
                () => frm.doc.ignore_pricing_rule = 1,
                () => frm.trigger("ignore_pricing_rule"),
                () => frm.doc.ignore_pricing_rule = 0,
                () => frm.trigger("apply_pricing_rule"),
                () => frm.save(),
                () => this.update_totals_section(frm.doc),
                () => frm.applying_pos_coupon_code = false
              ]);
            } else if (frm.doc.ignore_pricing_rule) {
              frappe.show_alert({
                message: __("Ignore Pricing Rule is enabled. Cannot apply coupon code."),
                indicator: "orange"
              });
            }
          }
        });
        this.setup_listener_for_payments();
        this.$payment_modes.on("click", ".shortcut", function() {
          const value = $(this).attr("data-value");
          me.selected_mode.set_value(value);
        });
        this.$component.on("click", ".submit-order-btn", () => {
          const doc = this.events.get_frm().doc;
          const paid_amount = doc.paid_amount;
          const items = doc.items;
          if (paid_amount == 0 || !items.length) {
            const message = items.length ? __("You cannot submit the order without payment.") : __("You cannot submit empty order.");
            frappe.show_alert({ message, indicator: "orange" });
            frappe.utils.play_sound("error");
            return;
          }
          this.events.submit_invoice();
        });
        frappe.ui.form.on("POS Invoice", "paid_amount", (frm) => {
          this.update_totals_section(frm.doc);
          const is_cash_shortcuts_invisible = !this.$payment_modes.find(".cash-shortcuts").is(":visible");
          this.attach_cash_shortcuts(frm.doc);
          !is_cash_shortcuts_invisible && this.$payment_modes.find(".cash-shortcuts").css("display", "grid");
          this.render_payment_mode_dom();
        });
        frappe.ui.form.on("POS Invoice", "loyalty_amount", (frm) => {
          const formatted_currency = format_currency(frm.doc.loyalty_amount, frm.doc.currency);
          this.$payment_modes.find(`.loyalty-amount-amount`).html(formatted_currency);
        });
        frappe.ui.form.on("Sales Invoice Payment", "amount", (frm, cdt, cdn) => {
          const default_mop = locals[cdt][cdn];
          const mode = default_mop.mode_of_payment.replace(/ +/g, "_").toLowerCase();
          if (this[`${mode}_control`] && this[`${mode}_control`].get_value() != default_mop.amount) {
            this[`${mode}_control`].set_value(default_mop.amount);
          }
        });
      };
    } else {
      setTimeout(overridePOSPayment, 100);
    }
  }
  overridePOSPayment();
})();
//# sourceMappingURL=sal_rashed.bundle.HHDHBPCD.js.map
