// lib/format.ts

export function formatTHB(value: number): string {
  try {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    // fallback เผื่อ device ไม่รองรับ Intl แบบเต็ม
    return `฿${Math.round(value).toLocaleString('th-TH')}`;
  }
}
