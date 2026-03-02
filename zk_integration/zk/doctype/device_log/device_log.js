// Copyright (c) 2021, Peter and contributors
// For license information, please see license.txt

frappe.ui.form.on('Device Log', {
	refresh: function (frm) {
		// Color-code the type field badge
		if (frm.doc.type) {
			var color = frm.doc.type === "IN" ? "#188038" : "#c5221f";
			var bg = frm.doc.type === "IN" ? "#e6f4ea" : "#fce8e6";
			setTimeout(function () {
				frm.fields_dict["type"].$input_wrapper.find(".control-value, .like-disabled-input").css({
					"color": color,
					"background": bg,
					"font-weight": "700",
					"border-radius": "4px",
					"padding": "2px 10px",
					"display": "inline-block"
				});
			}, 300);
		}
	}
});
