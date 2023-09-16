<?php

/**
 * Plugin Name: Order Form Plugin
 * Description: Adds a custom REST API endpoint to handle order form.
 * Version: 1.0
 * Author: TERUS Tech.
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
  // Tạo bảng services
  $wpdb->query('CREATE TABLE services (service_id INT AUTO_INCREMENT, service_type VARCHAR(255) NULL, service_name VARCHAR(255) NULL, service_price INT NULL, service_time INT NULL, PRIMARY KEY (service_id));');

  // Tạo bảng branches
  $wpdb->query('CREATE TABLE branches (branch_id INT AUTO_INCREMENT, branch_name VARCHAR(255) NULL, PRIMARY KEY (branch_id));');

  // Tạo bảng technicians
  $wpdb->query('CREATE TABLE technicians (technician_id INT AUTO_INCREMENT, technician_name VARCHAR(255) NULL, branch_id INT NOT NULL, PRIMARY KEY (technician_id), FOREIGN KEY (branch_id) REFERENCES branches(branch_id));');

  // Tạo bảng order_form
  $wpdb->query('CREATE TABLE order_form (id INT AUTO_INCREMENT, phone VARCHAR(15) NULL, name VARCHAR(255) NULL, total_guest INT NULL, branch_id INT NOT NULL, technician_id INT NOT NULL, service TEXT NULL, date VARCHAR(100) NULL, time VARCHAR(6) NULL, note TEXT NULL, total_price BIGINT NULL, estimate_time VARCHAR(255) NULL, PRIMARY KEY (id), FOREIGN KEY (branch_id) REFERENCES branches(branch_id), FOREIGN KEY (technician_id) REFERENCES technicians(technician_id));');

  // Tạo bảng service_branch
  $wpdb->query('CREATE TABLE service_branch (service_id INT NOT NULL, branch_id INT NOT NULL, FOREIGN KEY (service_id) REFERENCES services(service_id), FOREIGN KEY (branch_id) REFERENCES branches(branch_id));');
}

register_activation_hook(__FILE__, 'order_form_activate');

include_once PLUGIN_ASPATH . 'includes/includes.php';