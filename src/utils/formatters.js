// Utility helpers for Joie Cakes & More

export function formatNaira(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0
  }).format(amount).replace('NGN', '₦');
}

export function generateOrderRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand = '';
  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `JC-OND-${rand}`;
}

export function buildWhatsAppMessage(order) {
  const {
    orderRef,
    customer,
    items,
    total,
    deliveryOption,
    urgency,
    scheduledDate,
    timeSlot,
    paystackRef,
    assignedRider
  } = order;

  let lines = [
    `*✨ NEW ORDER LOGGED — JOIE CAKES & MORE ✨*`,
    `----------------------------------------`,
    `📌 *Order Ref:* ${orderRef}`,
    `👤 *Customer Name:* ${customer.name}`,
    `📞 *Phone Number:* ${customer.phone}`,
    `📍 *Delivery Address:* ${customer.address}`,
    `📍 *Ondo Zone:* ${deliveryOption?.name || 'Ondo Hub Pickup'}`,
    `----------------------------------------`,
    `🚨 *Urgency Level:* ${urgency === 'urgent' ? '⚡ URGENT FLASH DISPATCH (60-90 MINS)' : urgency === 'scheduled' ? '🕒 SCHEDULED TIME SLOT' : '📅 ADVANCE PRE-ORDER'}`,
    `📅 *Scheduled Date:* ${scheduledDate || 'Today'}`,
    `⏰ *Target Time Window:* ${timeSlot?.label || 'Next Available Slot'}`,
    `----------------------------------------`,
    `🛒 *ORDER SUMMARY & KILOGRAM LOG:*`
  ];

  items.forEach((item, idx) => {
    let itemDetail = `${idx + 1}. *${item.name}* x${item.quantity}`;
    if (item.selectedWeight) {
      itemDetail += ` [⚖️ *${item.selectedWeight}* - Spice: ${item.selectedSpice || 'Standard'} - Cut: ${item.selectedCut || 'Wafer'}]`;
    }
    if (item.selectedSize) {
      itemDetail += ` [📏 Size: ${item.selectedSize}]`;
    }
    if (item.customInscription) {
      itemDetail += ` [✍️ Inscription: "${item.customInscription}"]`;
    }
    itemDetail += ` — ${formatNaira(item.itemTotal)}`;
    lines.push(itemDetail);
  });

  lines.push(`----------------------------------------`);
  lines.push(`💵 *Total Paid via Paystack:* ${formatNaira(total)}`);
  lines.push(`💳 *Paystack Reference:* ${paystackRef || 'VERIFIED-ONLINE'}`);
  lines.push(`🛵 *Assigned Ondo Rider:* ${assignedRider?.name || 'Rider Kola (Bike 01)'} (${assignedRider?.phone || '+234 803 555 0192'})`);
  lines.push(`⏱️ *Estimated Delivery ETA:* ${assignedRider?.etaMinutes || 25} minutes`);
  lines.push(`----------------------------------------`);
  lines.push(`🩺 *Note for Dr. Joie:* This order was auto-logged & slot-reserved while you are on hospital service. Kitchen queue is notified!`);

  return encodeURIComponent(lines.join('\n'));
}
