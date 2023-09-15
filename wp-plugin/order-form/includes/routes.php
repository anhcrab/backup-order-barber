<?php

include_once PLUGIN_ASPATH . 'includes/api_store.php';
include_once PLUGIN_ASPATH . 'includes/api_display.php';

add_action('rest_api_init', function () {
  register_rest_route('api', '/form', [
    'methods' => 'GET',
    'callback' => 'display_form',
    'permission_callback' => '__return_true',
  ]);

  register_rest_route('api', '/form', [
    'methods' => 'POST',
    'callback' => 'store_form',
    'permission_callback' => '__return_true',
  ]);

  register_rest_route('api', '/form-data', [
    'methods' => 'GET',
    'callback' => 'shop_data',
    'permission_callback' => '__return_true',
  ]);

  register_rest_route('api', '/branch', [
    'methods' => 'POST',
    'callback' => 'store_branch',
    'permission_callback' => '__return_true',
  ]);

  register_rest_route('api', '/technician', [
    'methods' => 'POST',
    'callback' => 'store_technician',
    'permission_callback' => '__return_true',
  ]);

  register_rest_route('api', '/service', [
    'methods' => 'POST',
    'callback' => 'store_service',
    'permission_callback' => '__return_true',
  ]);

  register_rest_route('api', '/service-branch', [
    'methods' => 'POST',
    'callback' => 'store_service_branch',
    'permission_callback' => '__return_true',
  ]);

  register_rest_route('api', '/branch', [
    'methods' => 'GET',
    'callback' => 'display_branch',
    'permission_callback' => '__return_true',
  ]);

  register_rest_route('api', '/technician', [
    'methods' => 'GET',
    'callback' => 'display_technician',
    'permission_callback' => '__return_true',
  ]);

  register_rest_route('api', '/service', [
    'methods' => 'GET',
    'callback' => 'display_service',
    'permission_callback' => '__return_true',
  ]);

  register_rest_route('api', '/service-branch', [
    'methods' => 'GET',
    'callback' => 'display_service_branch',
    'permission_callback' => '__return_true',
  ]);
});