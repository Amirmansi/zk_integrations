frappe.listview_settings["Device Log"] = {
  onload: function (listview) {
    listview.page.add_action_item(__("Create Employee Checkin"), function () {
      create_employee_checkin(listview);
    });
    listview.page.add_action_item(__("Get Logs"), function () {
      get_active_device_logs(listview);
    });
    listview.page.add_action_item(__("Sync Employee"), function () {
      sync_employee(listview);
    });
  },
  // Color-code IN (green) and OUT (red) rows
  get_indicator: function (doc) {
    if (doc.type === "IN") {
      return [__("IN"), "green", "type,=,IN"];
    } else if (doc.type === "OUT") {
      return [__("OUT"), "red", "type,=,OUT"];
    }
  },
  formatters: {
    type: function (value) {
      if (value === "IN") {
        return `<span style="background:#e6f4ea;color:#188038;border-radius:4px;padding:2px 10px;font-weight:700;">${value}</span>`;
      } else if (value === "OUT") {
        return `<span style="background:#fce8e6;color:#c5221f;border-radius:4px;padding:2px 10px;font-weight:700;">${value}</span>`;
      }
      return value;
    }
  }
};
var get_active_device_logs = function (listview) {
  const method =
    "zk_integration.zk.doctype.zk_device.zk_device.get_active_device_logs";
  frappe.call({
    method: method,
    freeze: true,
    freeze_message: __("Fetching device logs..."),
    callback: function (r) {
      frappe.show_alert({ message: __("Logs fetched"), indicator: "green" });
      listview.refresh();
    },
  });
};
var sync_employee = function (listview) {
  const method = "zk_integration.zk.doctype.zk_device.zk_device.sync_employee";
  frappe.call({
    method: method,
    freeze: true,
    freeze_message: __("Syncing employees..."),
    callback: function (r) {
      frappe.show_alert({ message: __("Employees synced"), indicator: "green" });
      listview.refresh();
    },
  });
};
var create_employee_checkin = function (listview) {
  const method =
    "zk_integration.zk.doctype.device_log.device_log.create_employee_checkin";
  frappe.call({
    method: method,
    freeze: true,
    freeze_message: __("Creating employee check-ins..."),
    callback: function (r) {
      frappe.show_alert({ message: __("Employee check-ins created"), indicator: "green" });
      listview.refresh();
    },
  });
};
