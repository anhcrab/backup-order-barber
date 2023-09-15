<?php

// if uninstall.php is not called by WordPress, die
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

$option_name = 'wporg_option';

delete_option($option_name);

// for site options in Multisite
delete_site_option($option_name);

// drop a custom database table
global $wpdb;
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}order_form");
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}technicians");
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}branches");
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}services");
