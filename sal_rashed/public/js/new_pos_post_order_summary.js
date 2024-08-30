function overridePOSSummary() {
    if (typeof erpnext !== 'undefined' &&
        typeof erpnext.PointOfSale !== 'undefined' &&
        typeof erpnext.PointOfSale.PastOrderSummary !== 'undefined') {
        
        erpnext.PointOfSale.PastOrderSummary.prototype.get_condition_btn_map = function(after_submission) {
            if (after_submission)
                return [{ condition: true, visible_btns: ["Print Receipt", "New Order"] }];
    
            return [
                { condition: this.doc.docstatus === 0, visible_btns: ["Edit Order", "Delete Order"] },
                {
                    condition: !this.doc.is_return && this.doc.docstatus === 1,
                    visible_btns: ["Print Receipt", "Return"],
                },
                {
                    condition: this.doc.is_return && this.doc.docstatus === 1,
                    visible_btns: ["Print Receipt"],
                },
            ];
        };
    } else {
        setTimeout(overridePOSSummary, 100);
    }
}
 overridePOSSummary();