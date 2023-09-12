<?php

/**
 * Plugin Name: Order Form Plugin
 * Description: Adds a custom REST API endpoint to handle order form.
 * Version: 1.0
 * Author: ĐẶNG QUANG ANH.
 */
define('PLUGIN_ASPATH', plugin_dir_path(__FILE__));
define('PLUGIN_URI', plugin_dir_url(__FILE__));

/**
 * Activate the plugin.
 */
function order_form_activate()
{
  // tạo table để lưu trữ và truy xuất form data
  global $wpdb;
  $wpdb->query('CREATE TABLE services (service_id INT AUTO_INCREMENT, service_type VARCHAR(255), service_name VARCHAR(255), service_price INT, PRIMARY KEY (service_id));');
  $wpdb->query('CREATE TABLE branches (branch_id INT AUTO_INCREMENT, branch_name VARCHAR(255), PRIMARY KEY (branch_id));');
  $wpdb->query('CREATE TABLE technicians (technician_id INT AUTO_INCREMENT, technician_name VARCHAR(255), branch_id INT, PRIMARY KEY (technician_id), FOREIGN KEY (branch_id) REFERENCES branches(branch_id));');
  $wpdb->query('CREATE TABLE order_form (id INT AUTO_INCREMENT, phone VARCHAR(15), name VARCHAR(255), total_guest INT, branch_id INT, technician_id INT, service_id INT, date VARCHAR(100), time VARCHAR(6), note TEXT, total_price BIGINT, estimate_time VARCHAR(255), PRIMARY KEY (id), FOREIGN KEY (branch_id) REFERENCES branches(branch_id), FOREIGN KEY (technician_id) REFERENCES technicians(technician_id), FOREIGN KEY (service_id) REFERENCES services(service_id));');
  $wpdb->query('CREATE TABLE service_branch (service_id INT, branch_id INT, FOREIGN KEY (service_id) REFERENCES services(service_id), FOREIGN KEY (branch_id) REFERENCES branches(branch_id);');
}
register_activation_hook(__FILE__, 'order_form_activate');

require_once(PLUGIN_ASPATH . '/routes.php');