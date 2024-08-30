frappe.pages["user-profile"].on_page_load = function (wrapper) {
    frappe.require("user_profile_controller.bundle.js", () => {
        let user_profile = new frappe.ui.UserProfile(wrapper);
        user_profile.show();

        function checkAndRemoveButton() {
            let button = $('button:contains("Change User")');
            if (button.length) {
                button.remove();
            } else {
                requestAnimationFrame(checkAndRemoveButton);
            }
        }
        checkAndRemoveButton();
    });
};
