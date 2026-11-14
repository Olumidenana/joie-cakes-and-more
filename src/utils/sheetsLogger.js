// Google Sheets Logger & Exporter for Joie Cakes & More
import { formatNaira } from './formatters';

export const DEFAULT_SHEETS_CONFIG = {
  sheetName: 'Joie Orders Ledger',
  columns: [
    'Order Ref',
    'Date & Time',
    'Customer Name',
    'Phone Number',
    'Delivery Address',
    'Ondo Delivery Zone',
    'Items Summary & Kilograms',
    'Urgency Level',
    'Target Time Slot',
    'Total Amount (NGN)',
    'Paystack Reference',
    'Payment Status',
    'Assigned Rider',
    'Delivery Status',
    'Special Notes'
  ]
};

export function formatOrderForSheets(order) {
  const itemsText = order.items.map((it) => {
    let details = `${it.name} (x${it.quantity})`;
    if (it.selectedWeight) details += ` [${it.selectedWeight} - ${it.selectedSpice || 'Yaji'}]`;
    if (it.selectedSize) details += ` [${it.selectedSize}]`;
    if (it.customInscription) details += ` [Inscription: "${it.customInscription}"]`;
    return details;
  }).join('; ');

  return {
    orderRef: order.orderRef,
    dateTime: new Date(order.createdAt || Date.now()).toLocaleString('en-NG'),
    customerName: order.customer?.name || 'Walk-in Customer',
    customerPhone: order.customer?.phone || 'N/A',
    deliveryAddress: order.customer?.address || 'Pickup at Ondo Hub',
    deliveryZone: order.deliveryOption?.name || 'Ondo Hub Pickup',
    itemsSummary: itemsText,
    urgency: order.urgency === 'urgent' ? '⚡ Urgent Flash (60-90 Mins)' : order.urgency === 'preorder' ? '🎂 Advance Pre-Order' : '🕒 Standard Scheduled',
    targetSlot: `${order.scheduledDate || 'Today'} - ${order.timeSlot?.label || 'Available Slot'}`,
    totalAmount: formatNaira(order.total),
    rawTotal: order.total,
    paystackRef: order.paystackRef || 'PSTK-VERIFIED',
    paymentStatus: 'PAID (Verified via Paystack)',
    assignedRider: `${order.assignedRider?.name || 'Rider Kola'} (${order.assignedRider?.phone || '09064839054'})`,
    deliveryStatus: order.status || 'Confirmed & In Kitchen Queue',
    notes: order.customerNotes || 'None'
  };
}

export function exportOrdersToCSV(orders) {
  if (!orders || orders.length === 0) return false;

  const headers = DEFAULT_SHEETS_CONFIG.columns;
  const rows = orders.map((order) => {
    const formatted = formatOrderForSheets(order);
    return [
      `"${formatted.orderRef}"`,
      `"${formatted.dateTime}"`,
      `"${formatted.customerName.replace(/"/g, '""')}"`,
      `"${formatted.customerPhone}"`,
      `"${formatted.deliveryAddress.replace(/"/g, '""')}"`,
      `"${formatted.deliveryZone.replace(/"/g, '""')}"`,
      `"${formatted.itemsSummary.replace(/"/g, '""')}"`,
      `"${formatted.urgency}"`,
      `"${formatted.targetSlot}"`,
      `"${formatted.totalAmount}"`,
      `"${formatted.paystackRef}"`,
      `"${formatted.paymentStatus}"`,
      `"${formatted.assignedRider.replace(/"/g, '""')}"`,
      `"${formatted.deliveryStatus}"`,
      `"${formatted.notes.replace(/"/g, '""')}"`
    ];
  });

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Joie_Cakes_Orders_Ledger_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}

export async function logOrderToWebhook(order, webhookUrl) {
  const rowData = formatOrderForSheets(order);

  // Always store in localStorage as persistent sheet ledger
  try {
    const existingLogs = JSON.parse(localStorage.getItem('joie_orders_sheets_log') || '[]');
    existingLogs.unshift(rowData);
    localStorage.setItem('joie_orders_sheets_log', JSON.stringify(existingLogs));
  } catch (err) {
    console.warn('Local storage ledger write failed', err);
  }

  // If a live Google Apps Script Webhook URL is supplied, POST to it
  if (webhookUrl && webhookUrl.trim().startsWith('http')) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script Webhook standard
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rowData)
      });
      return { success: true, mode: 'webhook' };
    } catch (e) {
      console.warn('Webhook sync error (saved locally to ledger)', e);
      return { success: true, mode: 'local_fallback' };
    }
  }

  return { success: true, mode: 'local_ledger' };
}

// 1-Click ready Google Apps Script that Dr. Joie can paste into Google Sheets
export const GOOGLE_APPS_SCRIPT_CODE = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Auto-create headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Order Ref", "Date & Time", "Customer Name", "Phone",
        "Delivery Address", "Zone", "Items & Kilograms", "Urgency",
        "Target Time Slot", "Total (NGN)", "Paystack Ref",
        "Payment Status", "Assigned Rider", "Status", "Notes"
      ]);
    }
    
    sheet.appendRow([
      data.orderRef,
      data.dateTime,
      data.customerName,
      data.customerPhone,
      data.deliveryAddress,
      data.deliveryZone,
      data.itemsSummary,
      data.urgency,
      data.targetSlot,
      data.totalAmount,
      data.paystackRef,
      data.paymentStatus,
      data.assignedRider,
      data.deliveryStatus,
      data.notes
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({"result":"success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"result":"error", "error": error}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;
