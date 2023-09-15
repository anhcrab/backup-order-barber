<?php
function display_form($request)
{
  global $wpdb;
  $result = $wpdb->get_results('SELECT * FROM order_form');
  return rest_ensure_response($result);
}

function shop_data($request)
{
  global $wpdb;
  $result = [];
  $branches = $wpdb->get_results('SELECT * FROM branches');
  $technicians = $wpdb->get_results('SELECT * FROM technicians');
  foreach ($branches as $branch) {
    $techs = [];
    $services = [];
    $branch_id = $branch->branch_id;
    foreach ($technicians as $tech) {
      if ($tech->branch_id === $branch->branch_id) {
        array_push($techs, $tech);
      }
    }
    $serves = $wpdb->get_results("SELECT * FROM service_branch WHERE branch_id = '$branch_id'");
    foreach ($serves as $serve) {
      array_push($services, $wpdb->get_results("SELECT * FROM services WHERE service_id = '{$serve->service_id}'")[0]);
    }
    array_push($result, [
      'branch' => $branch,
      'technicians' => $techs,
      'services' => $services,
    ]);
  }
  return rest_ensure_response($result);
}

function display_branch()
{
  global $wpdb;
  return rest_ensure_response($wpdb->get_results('SELECT * FROM branches'));
}

function display_technician()
{
  global $wpdb;
  return rest_ensure_response($wpdb->get_results('SELECT * FROM technicians'));

}

function display_service()
{
  global $wpdb;
  return rest_ensure_response($wpdb->get_results('SELECT * FROM services'));

}

function display_service_branch()
{
  global $wpdb;
  return rest_ensure_response($wpdb->get_results('SELECT * FROM service_branch'));
}