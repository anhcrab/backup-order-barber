<?php
add_action('init', 'register_order_form');
add_action('admin_menu', 'order_form_admin_template');
add_action('admin_enqueue_script', 'order_form_enqueue');
function register_order_form()
{
  add_filter('plugin_action_links_' . plugin_basename(__FILE__), 'order_form_display_link');
}

function order_form_enqueue()
{

}

function order_form_admin_template()
{
  add_menu_page('Orders Plugin', 'Orders', 'manage_options', 'order_form_plugin', 'order_form_admin_index', 'dashicons-store', 4);
}

function order_form_admin_index()
{
  require_once PLUGIN_ASPATH . 'admin/admin.php';
}

function order_form_display_link($links)
{
  $display_link = '<a href="options-general.php?page=order_form_plugin">View</a>';
  array_push($links, $display_link);
  return $links;
}