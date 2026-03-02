// Copyright (c) 2021, Peter and contributors
// For license information, please see license.txt

frappe.ui.form.on("ZK Device", {
  refresh: function (frm) {
    frm.page.set_indicator(
      frm.doc.active ? __("Active") : __("Inactive"),
      frm.doc.active ? "green" : "red"
    );

    if (!frm.is_new()) {
      frm.add_custom_button(__("Get Logs"), function () {
        frm.events.get_device_logs(frm);
      }, __("Actions")).addClass("btn-primary");

      frm.add_custom_button(__("Sync Employee"), function () {
        frm.events.sync_employee(frm);
      }, __("Actions"));

      frm.add_custom_button(__("Get BioTime Devices"), function () {
        frappe.call({
          method: "zk_integration.zk.doctype.zk_device.zk_device.get_biotime_device_list",
          freeze: true,
          freeze_message: __("Fetching BioTime devices..."),
          callback: function () {
            frappe.show_alert({ message: __("BioTime devices synced"), indicator: "green" });
            frm.refresh();
          }
        });
      }, __("Actions"));

      // Connection status banner
      if (frm.doc.last_connection_error) {
        frm.dashboard.add_comment(
          __("Last connection error: ") + frm.doc.last_connection_error,
          "red",
          true
        );
      } else if (frm.doc.last_connection_time) {
        frm.dashboard.add_comment(
          __("Last connected: ") + frappe.datetime.str_to_user(frm.doc.last_connection_time),
          "green",
          true
        );
      }
    }

    // Inline CSS for a nicer form appearance
    if (!document.getElementById("zk-device-style")) {
      var style = document.createElement("style");
      style.id = "zk-device-style";
      style.textContent = `
        .form-section .section-head {
          font-weight: 700;
          font-size: 0.95rem;
          color: #1a73e8;
          letter-spacing: 0.03em;
          border-bottom: 2px solid #e3eeff;
          padding-bottom: 4px;
        }
        .zk-badge-in {
          background: #e6f4ea;
          color: #188038;
          border-radius: 4px;
          padding: 2px 10px;
          font-weight: 600;
          font-size: 0.85rem;
        }
        .zk-badge-out {
          background: #fce8e6;
          color: #c5221f;
          border-radius: 4px;
          padding: 2px 10px;
          font-weight: 600;
          font-size: 0.85rem;
        }
      `;
      document.head.appendChild(style);
    }
  },

  get_device_logs: function (frm) {
    frm.save();
    frappe.call({
      method: "get_device_log",
      doc: frm.doc,
      args: {
        show_progress: 1,
      },
      freeze: true,
      freeze_message: __("Fetching device logs, please wait..."),
      callback: function () {
        frappe.hide_progress();
        frappe.show_alert({ message: __("Logs fetched successfully"), indicator: "green" });
        frm.refresh();
      },
    });
  },

  sync_employee: function (frm) {
    frappe.call({
      method: "zk_integration.zk.doctype.zk_device.zk_device.sync_employee",
      freeze: true,
      freeze_message: __("Syncing employees..."),
      callback: function () {
        frappe.hide_progress();
        frappe.show_alert({ message: __("Employees synced"), indicator: "green" });
        frm.refresh();
      },
    });
  },
});
