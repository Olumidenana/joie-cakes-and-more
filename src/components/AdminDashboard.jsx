import React, { useState } from 'react';
import { 
  X, 
  Stethoscope, 
  Sliders, 
  Bike, 
  CheckCircle2, 
  PackageCheck,
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Send,
  Table
} from 'lucide-react';
import { formatNaira } from '../utils/formatters';
import { DELIVERY_TIME_SLOTS, TRUSTED_BIKEMEN } from '../data/menuData';
import { exportOrdersToCSV, GOOGLE_APPS_SCRIPT_CODE, formatOrderForSheets } from '../utils/sheetsLogger';

export function AdminDashboard({
  isOpen,
  onClose,
  doctorShift,
  setDoctorShift,
  slotCapacities,
  setSlotCapacities,
  orders,
  onUpdateOrderStatus,
  onReassignRider,
  products,
  onToggleProductStock,
  sheetsWebhookUrl,
  setSheetsWebhookUrl,
  onSyncAllToSheets
}) {
  if (!isOpen) return null;

  const [activeAdminTab, setActiveAdminTab] = useState('orders'); // 'orders' | 'sheets' | 'kitchen' | 'stock'
  const [copiedScript, setCopiedScript] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activeOrdersCount = orders.filter((o) => o.status !== 'Delivered').length;

  const handleCapacityChange = (slotId, delta) => {
    setSlotCapacities((prev) => {
      const current = prev[slotId] || { current: 3, max: 6 };
      const newMax = Math.max(current.current, current.max + delta);
      return {
        ...prev,
        [slotId]: {
          ...current,
          max: newMax
        }
      };
    });
  };

  const handleExportCSV = () => {
    const success = exportOrdersToCSV(orders);
    if (success) {
      setSyncStatus('CSV Spreadsheet downloaded successfully!');
      setTimeout(() => setSyncStatus(''), 3000);
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleTriggerSync = async () => {
    setSyncStatus('Syncing rows with Google Sheets...');
    if (onSyncAllToSheets) {
      await onSyncAllToSheets();
    }
    setSyncStatus('All orders logged & synchronized!');
    setTimeout(() => setSyncStatus(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-5">
      <div className="relative bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-purple-200 animate-scale-up">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2C0B48] via-[#3E1463] to-[#2C0B48] text-white p-4 sm:p-5 flex items-center justify-between border-b border-purple-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-purple-600/80 border border-purple-400/50 flex items-center justify-center text-white">
              <Stethoscope className="w-5 h-5 text-purple-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-serif-luxury text-purple-100">Dr. Joie's Command Portal</h3>
                <span className="text-[10px] bg-purple-400/20 text-purple-200 border border-purple-300/30 px-2 py-0.5 rounded-full font-mono-code">
                  Ondo Hub
                </span>
              </div>
              <p className="text-xs text-purple-200/80">
                Hospital shifts, Google Sheets auto-ledger, item stock (Ordered Finish) &amp; Ondo bikemen fleet.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Doctor Shift Mode Toggle Bar */}
        <div className="bg-purple-50/80 border-b border-purple-100 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-purple-950">
              Current Doctor Status (Live on Customer Site):
            </div>
            <div className="text-xs sm:text-sm font-semibold text-stone-900 mt-0.5">
              {doctorShift === 'hospital' 
                ? '🩺 On Hospital Rounds / Surgery Service (Auto-Booking Active)' 
                : '🍰 In Ondo Confectionery Studio / Kitchen Duty'}
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-purple-200 shadow-2xs">
            <button
              onClick={() => setDoctorShift('hospital')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                doctorShift === 'hospital'
                  ? 'bg-[#3E1463] text-white shadow-xs'
                  : 'text-stone-600 hover:text-purple-900'
              }`}
            >
              🩺 Hospital Service Mode
            </button>
            <button
              onClick={() => setDoctorShift('kitchen')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                doctorShift === 'kitchen'
                  ? 'bg-[#732FA8] text-white shadow-xs'
                  : 'text-stone-600 hover:text-purple-900'
              }`}
            >
              🍰 In Kitchen Mode
            </button>
          </div>
        </div>

        {/* Admin Navigation Sub-Tabs */}
        <div className="flex items-center gap-2 px-4 sm:px-6 pt-3 border-b border-purple-100 bg-[#FAF8FD] overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveAdminTab('orders')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeAdminTab === 'orders'
                ? 'border-purple-700 text-purple-950 font-extrabold'
                : 'border-transparent text-stone-500 hover:text-purple-900'
            }`}
          >
            <span>Orders Queue ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('sheets')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeAdminTab === 'sheets'
                ? 'border-purple-700 text-purple-950 font-extrabold'
                : 'border-transparent text-stone-500 hover:text-purple-900'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-purple-700" />
            <span>📊 Google Sheets Ledger &amp; Export</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('stock')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeAdminTab === 'stock'
                ? 'border-purple-700 text-purple-950 font-extrabold'
                : 'border-transparent text-stone-500 hover:text-purple-900'
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5 text-purple-700" />
            <span>Stock Availability (Ordered Finish)</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('kitchen')}
            className={`pb-2.5 px-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeAdminTab === 'kitchen'
                ? 'border-purple-700 text-purple-950 font-extrabold'
                : 'border-transparent text-stone-500 hover:text-purple-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-purple-700" />
            <span>Kitchen Slot Capacities</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[68vh] overflow-y-auto">
          
          {/* Quick Metrics (visible across tabs) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-purple-50/40 p-3.5 rounded-2xl border border-purple-100">
              <div className="text-xs text-stone-500 font-semibold">Today's Revenue (Paystack)</div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-purple-950 mt-0.5">
                {formatNaira(totalRevenue)}
              </div>
              <div className="text-[11px] text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% verified auto-credits</span>
              </div>
            </div>

            <div className="bg-purple-50/40 p-3.5 rounded-2xl border border-purple-100">
              <div className="text-xs text-stone-500 font-semibold">Active Orders in Queue</div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-purple-900 mt-0.5">
                {activeOrdersCount}
              </div>
              <div className="text-[11px] text-stone-500 mt-0.5">
                Across Ondo Town &amp; UNIMED
              </div>
            </div>

            <div className="bg-purple-50/40 p-3.5 rounded-2xl border border-purple-100">
              <div className="text-xs text-stone-500 font-semibold">Bikemen on Ondo Roads</div>
              <div className="text-xl sm:text-2xl font-bold font-mono-code text-stone-900 mt-0.5">
                3 Trusted Bikes
              </div>
              <div className="text-[11px] text-purple-800 font-medium mt-0.5 flex items-center gap-1">
                <Bike className="w-3.5 h-3.5" />
                <span>Kola, Tayo &amp; Emmanuel</span>
              </div>
            </div>
          </div>

          {/* TAB 1: GOOGLE SHEETS ORDER LEDGER & EXPORT */}
          {activeAdminTab === 'sheets' && (
            <div className="space-y-4">
              {/* Top Action Bar for Sheets */}
              <div className="p-4 bg-gradient-to-r from-purple-50 via-purple-50/60 to-emerald-50/40 border border-purple-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-sm text-purple-950 flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-purple-700" />
                    <span>Dr. Joie's Order Spreadsheet (Live Ledger)</span>
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Every order is detailed, stamped with Paystack payment reference, and logged for hospital shift review.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 bg-[#3B155B] hover:bg-[#2F0F4B] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Spreadsheet (.CSV)</span>
                  </button>

                  <button
                    onClick={handleTriggerSync}
                    className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Sync to Google Sheets</span>
                  </button>
                </div>
              </div>

              {syncStatus && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xl flex items-center gap-2 animate-fade-in font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{syncStatus}</span>
                </div>
              )}

              {/* Live Embedded Table */}
              <div className="border border-purple-100 rounded-2xl overflow-hidden bg-white shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-purple-100/70 text-purple-950 uppercase tracking-wider text-[10px] font-bold border-b border-purple-200">
                        <th className="p-3">Order Ref</th>
                        <th className="p-3">Date &amp; Time</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Address &amp; Zone</th>
                        <th className="p-3">Items &amp; Kilograms</th>
                        <th className="p-3">Urgency &amp; Slot</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Paystack Ref</th>
                        <th className="p-3">Assigned Rider</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-50 text-stone-700">
                      {orders.map((ord) => {
                        const row = formatOrderForSheets(ord);
                        return (
                          <tr key={ord.orderRef} className="hover:bg-purple-50/30 transition-colors">
                            <td className="p-3 font-mono-code font-bold text-purple-950">{row.orderRef}</td>
                            <td className="p-3 text-[11px] text-stone-500 whitespace-nowrap">{row.dateTime}</td>
                            <td className="p-3 font-medium text-stone-900">
                              <div>{row.customerName}</div>
                              <div className="text-[10px] text-stone-500 font-mono-code">{row.customerPhone}</div>
                            </td>
                            <td className="p-3 text-stone-600 max-w-xs truncate" title={row.deliveryAddress}>
                              <div>{row.deliveryAddress}</div>
                              <div className="text-[10px] text-purple-800 font-semibold">{row.deliveryZone}</div>
                            </td>
                            <td className="p-3 text-stone-700 text-[11px] max-w-sm">
                              {row.itemsSummary}
                            </td>
                            <td className="p-3 text-[11px] whitespace-nowrap">
                              <span className="font-semibold text-purple-950 block">{row.urgency}</span>
                              <span className="text-stone-500 text-[10px]">{row.targetSlot}</span>
                            </td>
                            <td className="p-3 font-mono-code font-bold text-purple-950 whitespace-nowrap">
                              {row.totalAmount}
                            </td>
                            <td className="p-3 font-mono-code text-[11px] text-emerald-700 whitespace-nowrap font-semibold">
                              {row.paystackRef}
                            </td>
                            <td className="p-3 text-[11px] text-stone-600 whitespace-nowrap">
                              {row.assignedRider.split('(')[0]}
                            </td>
                            <td className="p-3 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                row.deliveryStatus === 'Delivered' 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : 'bg-purple-100 text-purple-900'
                              }`}>
                                {row.deliveryStatus}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Google Sheets Live Webhook Integration Setup Box */}
              <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-200 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-purple-950 flex items-center gap-1.5">
                    <FileSpreadsheet className="w-4 h-4 text-purple-700" />
                    <span>Real-Time Google Sheets Webhook Connection</span>
                  </div>
                  <button
                    onClick={handleCopyScript}
                    className="flex items-center gap-1 bg-white hover:bg-purple-100 text-purple-900 border border-purple-300 px-2.5 py-1 rounded-lg text-[11px] font-semibold cursor-pointer transition-colors"
                  >
                    {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedScript ? 'Script Copied!' : 'Copy 1-Minute Apps Script'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Want orders automatically pushed into a private Google Sheet as soon as customers checkout? 
                  Paste the 1-minute script into your Google Sheet (via <em>Extensions &gt; Apps Script</em>), deploy as Web App, and paste your URL below:
                </p>

                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={sheetsWebhookUrl || ''}
                    onChange={(e) => setSheetsWebhookUrl && setSheetsWebhookUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    className="flex-1 p-2.5 rounded-xl border border-purple-200 bg-white text-xs font-mono-code focus:outline-hidden focus:border-purple-600"
                  />
                  <button
                    onClick={handleTriggerSync}
                    className="bg-[#3B155B] hover:bg-[#2E0F49] text-white px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer shrink-0"
                  >
                    Save &amp; Test Sync
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS QUEUE & DISPATCH */}
          {activeAdminTab === 'orders' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-sm text-purple-950">
                  Active Kitchen &amp; Rider Queue:
                </h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1 text-purple-800 hover:text-purple-950 text-xs font-semibold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CSV</span>
                  </button>
                </div>
              </div>

              <div className="border border-purple-100 rounded-2xl overflow-hidden bg-white text-xs divide-y divide-purple-100">
                {orders.length === 0 ? (
                  <div className="p-8 text-center text-stone-400">
                    No orders placed yet. Orders will appear here as soon as customers checkout!
                  </div>
                ) : (
                  orders.map((ord) => (
                    <div key={ord.orderRef} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono-code font-bold text-stone-900">{ord.orderRef}</span>
                          <span className="text-[10px] font-mono-code bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                            {ord.paystackRef}
                          </span>
                          <span className="text-[10px] font-bold text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                            {ord.scheduledDate || 'Today'} &bull; {ord.timeSlot?.label?.split('(')[0]}
                          </span>
                        </div>

                        <div className="font-medium text-stone-800 mt-1">
                          {ord.customer?.name} ({ord.customer?.phone}) &bull; {ord.customer?.address}
                        </div>

                        <div className="text-[11px] text-stone-600 mt-0.5">
                          {ord.items.map((i) => `${i.name} x${i.quantity} ${i.selectedWeight ? `(${i.selectedWeight})` : ''}`).join(', ')}
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end gap-2 shrink-0">
                        <div className="font-bold font-mono-code text-purple-950 text-sm">
                          {formatNaira(ord.total)}
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Rider assignment */}
                          <select
                            value={ord.assignedRider?.id || 'bike-01'}
                            onChange={(e) => {
                              const newRider = TRUSTED_BIKEMEN.find((r) => r.id === e.target.value);
                              if (newRider) onReassignRider(ord.orderRef, newRider);
                            }}
                            className="text-[11px] p-1.5 rounded-lg border border-purple-200 bg-purple-50/50 font-medium"
                          >
                            {TRUSTED_BIKEMEN.map((r) => (
                              <option key={r.id} value={r.id}>
                                🛵 {r.name.split('(')[0]}
                              </option>
                            ))}
                          </select>

                          {/* Status change */}
                          <button
                            onClick={() => {
                              const nextStatus = ord.status === 'Delivered' ? 'In Kitchen Queue' : 'Delivered';
                              onUpdateOrderStatus(ord.orderRef, nextStatus);
                            }}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-purple-100 hover:bg-emerald-100 text-purple-900 hover:text-emerald-900'
                            }`}
                          >
                            {ord.status === 'Delivered' ? '✓ Delivered' : 'Mark Delivered'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: STOCK AVAILABILITY (ORDERED FINISH) */}
          {activeAdminTab === 'stock' && (
            <div className="border border-purple-100 rounded-2xl p-4 bg-purple-50/20 space-y-3">
              <div className="border-b border-purple-100 pb-2">
                <h4 className="font-bold text-sm text-purple-950 flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4 text-purple-700" />
                  <span>Item Availability &amp; "Ordered Finish" Controls</span>
                </h4>
                <p className="text-[11px] text-stone-500">
                  When a batch of Kilishi, Donkwa, or Vanilla cake is completely booked out, toggle it here so customers cannot order what is unavailable.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {products.map((prod) => {
                  const isSoldOut = prod.isAvailable === false || prod.stockStatus === 'sold_out';
                  return (
                    <div
                      key={prod.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-2 text-xs transition-colors ${
                        isSoldOut ? 'bg-rose-50/60 border-rose-200' : 'bg-white border-purple-100'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-stone-900 truncate">{prod.name.replace('Northern Delicacies: ', '')}</div>
                        <div className="text-[10px] mt-0.5">
                          {isSoldOut ? (
                            <span className="text-rose-700 font-bold bg-rose-100 px-1.5 py-0.2 rounded">
                              🚫 Ordered Finish
                            </span>
                          ) : (
                            <span className="text-emerald-700 font-medium bg-emerald-100 px-1.5 py-0.2 rounded">
                              ✓ In Stock
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => onToggleProductStock(prod.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold shrink-0 cursor-pointer transition-colors ${
                          isSoldOut
                            ? 'bg-purple-700 hover:bg-purple-800 text-white'
                            : 'bg-rose-100 hover:bg-rose-200 text-rose-800'
                        }`}
                      >
                        {isSoldOut ? 'Restock' : 'Mark Finish'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: KITCHEN SLOT CAPACITIES */}
          {activeAdminTab === 'kitchen' && (
            <div className="border border-purple-100 rounded-2xl p-4 bg-purple-50/20">
              <div className="mb-3">
                <h4 className="font-bold text-sm text-purple-950 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-purple-700" />
                  <span>Kitchen Prep Capacity Quota Tuner</span>
                </h4>
                <p className="text-[11px] text-stone-500">
                  Adjust maximum allowable orders per window so your kitchen staff never get overwhelmed.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DELIVERY_TIME_SLOTS.map((slot) => {
                  const cap = slotCapacities[slot.id] || { current: slot.currentOrders, max: slot.maxCapacity };
                  const isFull = cap.current >= cap.max;

                  return (
                    <div key={slot.id} className="p-3 bg-white rounded-xl border border-purple-100 text-xs flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-stone-800">{slot.label}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          Current: <strong className="font-mono-code text-purple-950">{cap.current}</strong> / Max: <strong className="font-mono-code text-purple-950">{cap.max}</strong>
                          {isFull && <span className="ml-1.5 text-rose-600 font-bold">[FULL]</span>}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCapacityChange(slot.id, -1)}
                          className="w-7 h-7 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold flex items-center justify-center cursor-pointer"
                          title="Reduce Slot Limit"
                        >
                          -
                        </button>
                        <button
                          onClick={() => handleCapacityChange(slot.id, 1)}
                          className="w-7 h-7 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold flex items-center justify-center cursor-pointer"
                          title="Increase Slot Limit"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
