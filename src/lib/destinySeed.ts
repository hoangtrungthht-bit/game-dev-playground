// Thiên Mệnh Đạo Cốt — hạt giống vận mệnh 27 chữ số, chia thành 9 đoạn 3 chữ số
// tương ứng 9 đại cảnh giới trên Đăng Tiên Lộ.

import type { SpiritRoot } from "@/lib/cultivation";

export const SEED_LENGTH = 27;
export const SEGMENT_COUNT = 9;
export const SEGMENT_SIZE = 3;

function fnv1a(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Sinh chuỗi 27 chữ số xác định (deterministic) từ 6 số khai mệnh, thời điểm
 * tạo nhân vật, linh căn và giới tính. Luôn trả về đúng 27 ký tự [0-9].
 */
export function generateDestinySeed(
  digits: string,
  createdAt: number,
  root: SpiritRoot | null,
  gender: "nam" | "nu",
): string {
  const base = (digits.replace(/\D/g, "") || "000000").padEnd(6, "0").slice(0, 6);
  const rootKey = root ? `${root.element}-${root.grade}` : "vo-linh-can";
  const salt = `thien-menh:${base}:${createdAt}:${rootKey}:${gender}`;

  let out = "";
  let h = fnv1a(salt);
  for (let i = 0; i < SEED_LENGTH; i++) {
    h = fnv1a(`${salt}:${i}:${h}`);
    // trộn thêm chữ số gốc để 6 số khai mệnh thực sự ảnh hưởng kết quả
    const mixed = (h >>> 3) + Number(base[i % 6]) * (i + 7);
    out += String(mixed % 10);
  }
  return out;
}

/** Tách chuỗi 27 số thành 9 đoạn, mỗi đoạn đúng 3 chữ số. */
export function seedSegments(seed: string | null | undefined): string[] {
  if (!seed || seed.length < SEED_LENGTH) return [];
  const segments: string[] = [];
  for (let i = 0; i < SEGMENT_COUNT; i++) {
    segments.push(seed.slice(i * SEGMENT_SIZE, i * SEGMENT_SIZE + SEGMENT_SIZE));
  }
  return segments;
}

export interface SegmentBuff {
  /** +% tốc độ hấp thu linh khí */
  qiBonus: number;
  /** + tỉ lệ đột phá */
  luckBonus: number;
  /** hạt giống sự kiện gắn với đoạn này */
  eventSeed: number;
}

export function segmentBuff(segment: string): SegmentBuff {
  const n = Number(segment) || 0;
  const sum = segment.split("").reduce((a, d) => a + Number(d), 0);
  return {
    qiBonus: Math.round((0.01 + (sum / 27) * 0.05) * 1000) / 1000,
    luckBonus: Math.round((n % 7) * 0.002 * 1000) / 1000,
    eventSeed: n,
  };
}

/** Số đoạn đã mở khóa: cảnh giới hiện tại (index) + 1. */
export function unlockedSegmentCount(realm: number): number {
  return Math.max(1, Math.min(SEGMENT_COUNT, realm + 1));
}

/** Tổng hệ số linh khí cộng thêm từ các đoạn đã mở khóa. */
export function destinyQiMult(seed: string | null | undefined, realm: number): number {
  const segments = seedSegments(seed);
  if (segments.length === 0) return 1;
  const unlocked = segments.slice(0, unlockedSegmentCount(realm));
  return 1 + unlocked.reduce((sum, s) => sum + segmentBuff(s).qiBonus, 0);
}

/** Tổng tỉ lệ đột phá cộng thêm từ các đoạn đã mở khóa. */
export function destinyLuck(seed: string | null | undefined, realm: number): number {
  const segments = seedSegments(seed);
  if (segments.length === 0) return 0;
  return segments
    .slice(0, unlockedSegmentCount(realm))
    .reduce((sum, s) => sum + segmentBuff(s).luckBonus, 0);
}
