// Dữ liệu & logic lõi cho game tu tiên nhàn rỗi (idle cultivation RPG)

export type HerbId = "linhthao" | "huyetchi" | "bangnien" | "longdam";
export type PillId = "tukhi" | "phacanh" | "hotam" | "nguythan";

export interface Realm {
  name: string;
  levels: number;
  desc: string;
}

export const REALMS: Realm[] = [
  { name: "Luyện Khí", levels: 9, desc: "Dẫn khí nhập thể, gột rửa phàm căn." },
  { name: "Trúc Cơ", levels: 6, desc: "Xây nền đạo cơ, thọ nguyên tăng tiến." },
  { name: "Kim Đan", levels: 6, desc: "Ngưng khí thành đan, một bước lên tiên đồ." },
  { name: "Nguyên Anh", levels: 6, desc: "Đan vỡ anh sinh, thần hồn bất diệt." },
  { name: "Hóa Thần", levels: 6, desc: "Thần du thái hư, cảm ngộ pháp tắc." },
  { name: "Luyện Hư", levels: 6, desc: "Luyện hư hợp đạo, hư không tùy tâm." },
  { name: "Hợp Thể", levels: 6, desc: "Thân đạo hợp nhất, một niệm thiên địa." },
  { name: "Đại Thừa", levels: 9, desc: "Đỉnh phong nhân gian, chờ ngày phi thăng." },
  { name: "Độ Kiếp", levels: 9, desc: "Cửu thiên lôi kiếp, sinh tử nhất tuyến." },
];

export const TOTAL_STAGES = REALMS.reduce((s, r) => s + r.levels, 0);

export interface Herb {
  id: HerbId;
  name: string;
  tier: number;
}

export const HERBS: Herb[] = [
  { id: "linhthao", name: "Linh Thảo", tier: 1 },
  { id: "huyetchi", name: "Huyết Chi", tier: 2 },
  { id: "bangnien", name: "Băng Liên", tier: 3 },
  { id: "longdam", name: "Long Đảm Thảo", tier: 4 },
];

export interface Pill {
  id: PillId;
  name: string;
  desc: string;
  seconds: number;
  cost: Partial<Record<HerbId, number>>;
  stones: number;
}

export const PILLS: Pill[] = [
  {
    id: "tukhi",
    name: "Tụ Khí Đan",
    desc: "Uống vào lập tức thu được linh khí bằng 25% lượng cần cho tầng hiện tại.",
    seconds: 20,
    cost: { linhthao: 3 },
    stones: 10,
  },
  {
    id: "phacanh",
    name: "Phá Cảnh Đan",
    desc: "Tăng 25% tỉ lệ thành công cho lần đột phá kế tiếp.",
    seconds: 45,
    cost: { linhthao: 4, huyetchi: 2 },
    stones: 40,
  },
  {
    id: "hotam",
    name: "Hộ Tâm Đan",
    desc: "Giữ nguyên linh khí khi đột phá thất bại (dùng một lần).",
    seconds: 60,
    cost: { huyetchi: 3, bangnien: 1 },
    stones: 80,
  },
  {
    id: "nguythan",
    name: "Ngưng Thần Đan",
    desc: "Tốc độ hấp thu linh khí tăng gấp đôi trong 90 giây.",
    seconds: 90,
    cost: { bangnien: 2, longdam: 1 },
    stones: 150,
  },
];

export interface Artifact {
  id: string;
  name: string;
  rarity: "Phàm khí" | "Linh khí" | "Bảo khí" | "Tiên khí";
  mult: number;
  luck: number;
}

export const ARTIFACTS: Artifact[] = [
  { id: "moc_kiem", name: "Đào Mộc Kiếm", rarity: "Phàm khí", mult: 0.15, luck: 0 },
  { id: "tu_khi_bao", name: "Tụ Khí Bội", rarity: "Phàm khí", mult: 0.25, luck: 0.02 },
  { id: "thanh_van_bao", name: "Thanh Vân Pháp Bào", rarity: "Linh khí", mult: 0.5, luck: 0.03 },
  { id: "huyen_quy_giap", name: "Huyền Quy Giáp", rarity: "Linh khí", mult: 0.7, luck: 0.05 },
  { id: "lac_hon_chung", name: "Lạc Hồn Chung", rarity: "Bảo khí", mult: 1.2, luck: 0.06 },
  { id: "cuu_diep_lien", name: "Cửu Diệp Liên Đài", rarity: "Bảo khí", mult: 1.8, luck: 0.08 },
  { id: "thai_hu_kinh", name: "Thái Hư Bảo Kính", rarity: "Tiên khí", mult: 3.0, luck: 0.12 },
];

// ===== Linh Căn (Ngũ Hành) =====
export type ElementId = "kim" | "moc" | "thuy" | "hoa" | "tho";
export type GradeId = "cuc" | "thuong" | "trung" | "ha";

export interface SpiritRoot {
  element: ElementId;
  grade: GradeId;
}

export const ELEMENTS: ElementId[] = ["kim", "moc", "thuy", "hoa", "tho"];

export const ELEMENT_INFO: Record<ElementId, { name: string; hex: string; dark: boolean }> = {
  kim: { name: "Kim", hex: "#F3F4F6", dark: false },
  moc: { name: "Mộc", hex: "#22C55E", dark: false },
  thuy: { name: "Thủy", hex: "#18181B", dark: true },
  hoa: { name: "Hỏa", hex: "#EF4444", dark: true },
  tho: { name: "Thổ", hex: "#EAB308", dark: false },
};

export const GRADE_INFO: Record<GradeId, { name: string; opacity: number; glow: boolean }> = {
  cuc: { name: "Cực Phẩm", opacity: 1, glow: true },
  thuong: { name: "Thượng Phẩm", opacity: 0.75, glow: false },
  trung: { name: "Trung Phẩm", opacity: 0.5, glow: false },
  ha: { name: "Hạ Phẩm", opacity: 0.25, glow: false },
};

// Hash FNV-1a trên chuỗi 6 số: kết quả xác định nhưng không thể đoán trước,
// chống spam "số đẹp" để câu linh căn cao.
export function hashSpiritRoot(digits: string): SpiritRoot {
  let h = 0x811c9dc5;
  const s = `linh-can:${digits}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  h = h >>> 0;
  const element = ELEMENTS[h % 5]!;
  const roll = (h >>> 5) % 100;
  const grade: GradeId = roll < 5 ? "cuc" : roll < 25 ? "thuong" : roll < 70 ? "trung" : "ha";
  return { element, grade };
}

export function rootTitle(root: SpiritRoot): string {
  return `${GRADE_INFO[root.grade].name} ${ELEMENT_INFO[root.element].name} Linh Căn`;
}

// ===== Công Pháp / Tâm pháp =====
export interface Manual {
  id: string;
  name: string;
  desc: string;
  stones: number;
  qiMult: number; // +% tốc độ tích lũy linh khí (thụ động khi trang bị)
  luck: number; // + tỉ lệ đột phá
}

export const MANUALS: Manual[] = [
  { id: "thanh_moc_quyet", name: "Thanh Mộc Quyết", desc: "Tâm pháp nhập môn, hô hấp theo nhịp sinh trưởng của cây cối.", stones: 60, qiMult: 0.15, luck: 0 },
  { id: "viem_duong_cong", name: "Viêm Dương Công", desc: "Dẫn hỏa khí rèn kinh mạch, đột phá thêm phần chắc chắn.", stones: 120, qiMult: 0, luck: 0.03 },
  { id: "huyen_thuy_kinh", name: "Huyền Thủy Chân Kinh", desc: "Linh khí vận chuyển như dòng nước sâu, không ngừng nghỉ.", stones: 220, qiMult: 0.4, luck: 0 },
  { id: "cuu_chuyen_than", name: "Cửu Chuyển Kim Thân", desc: "Thân thể như kim cương, vững tâm khi nghịch chuyển thiên cơ.", stones: 350, qiMult: 0.1, luck: 0.06 },
  { id: "ngu_hanh_kinh", name: "Thái Nhất Ngũ Hành Kinh", desc: "Bí tịch thượng cổ, ngũ hành sinh khắc tuần hoàn bất tận.", stones: 800, qiMult: 0.6, luck: 0.08 },
];

export function manualOf(id: string | null): Manual | undefined {
  return MANUALS.find((m) => m.id === id);
}

export interface LogEntry {
  id: number;
  text: string;
  kind: "info" | "good" | "bad" | "epic";
  time: number;
}

export interface GameState {
  name: string;
  gender: "nam" | "nu";
  root: SpiritRoot | null;
  manuals: string[];
  equippedManual: string | null;
  qi: number;
  realm: number;
  level: number;
  stones: number;
  herbs: Record<HerbId, number>;
  pills: Record<PillId, number>;
  artifacts: string[];
  equipped: string | null;
  brewing: { pill: PillId; endsAt: number } | null;
  buffUntil: number;
  exploringUntil: number;
  pendingAdventure: import("@/utils/adventureLogic").ModalEventData | null;
  failures: number;
  breakthroughs: number;
  log: LogEntry[];
  lastSeen: number;
}

export const SAVE_KEY = "tu-tien-save-v1";

export function newGame(): GameState {
  return {
    name: "Đạo Hữu Vô Danh",
    gender: "nam",
    root: null,
    manuals: [],
    equippedManual: null,
    qi: 0,
    realm: 0,
    level: 1,
    stones: 20,
    herbs: { linhthao: 5, huyetchi: 0, bangnien: 0, longdam: 0 },
    pills: { tukhi: 0, phacanh: 0, hotam: 0, nguythan: 0 },
    artifacts: [],
    equipped: null,
    brewing: null,
    buffUntil: 0,
    exploringUntil: 0,
    pendingAdventure: null,
    failures: 0,
    breakthroughs: 0,
    log: [
      {
        id: 1,
        text: "Ngươi ngồi xuống bồ đoàn, lần đầu dẫn linh khí nhập thể. Con đường trường sinh bắt đầu từ đây.",
        kind: "info",
        time: 0,
      },
    ],
    lastSeen: 0,
  };
}

export function stageIndex(s: Pick<GameState, "realm" | "level">): number {
  let n = 0;
  for (let i = 0; i < s.realm; i++) n += REALMS[i]!.levels;
  return n + (s.level - 1);
}

export function qiNeeded(s: Pick<GameState, "realm" | "level">): number {
  return Math.floor(60 * Math.pow(1.42, stageIndex(s)));
}

export function artifactOf(id: string | null): Artifact | undefined {
  return ARTIFACTS.find((a) => a.id === id);
}

export function qiRate(s: GameState, now: number): number {
  const stage = stageIndex(s);
  const base = 1 + stage * 0.9 + Math.pow(stage, 1.75) * 0.12;
  const art = 1 + (artifactOf(s.equipped)?.mult ?? 0);
  const man = 1 + (manualOf(s.equippedManual)?.qiMult ?? 0);
  const buff = now < s.buffUntil ? 2 : 1;
  return base * art * man * buff;
}

export function isMajor(s: Pick<GameState, "realm" | "level">): boolean {
  return s.level >= REALMS[s.realm]!.levels;
}

export function realmTitle(s: Pick<GameState, "realm" | "level">): string {
  const r = REALMS[s.realm]!;
  return `${r.name} tầng ${s.level}`;
}

export function breakthroughChance(s: GameState): number {
  const stage = stageIndex(s);
  const major = isMajor(s);
  let c = (major ? 0.55 : 0.92) - stage * 0.012;
  c += (artifactOf(s.equipped)?.luck ?? 0);
  c += manualOf(s.equippedManual)?.luck ?? 0;
  c += Math.min(0.2, s.failures * 0.05);
  if (s.pills.phacanh > 0) c += 0.25;
  return Math.max(0.15, Math.min(0.97, c));
}

export interface Encounter {
  text: string;
  kind: LogEntry["kind"];
  stones?: number;
  herb?: HerbId;
  herbQty?: number;
  qiPct?: number;
  artifact?: boolean;
}

export function rollEncounter(stage: number, rng: () => number): Encounter {
  const tierCap = Math.min(4, 1 + Math.floor(stage / 8));
  const herbPool = HERBS.filter((h) => h.tier <= tierCap);
  const herb = herbPool[Math.floor(rng() * herbPool.length)]!;
  const roll = rng();
  const gold = Math.floor((8 + stage * 6) * (0.6 + rng()));

  if (roll < 0.3)
    return {
      text: `Ngươi tìm được một khóm ${herb.name} mọc bên vách núi sương phủ.`,
      kind: "good",
      herb: herb.id,
      herbQty: 1 + Math.floor(rng() * 3),
    };
  if (roll < 0.5)
    return {
      text: `Đánh bại một con yêu thú lang thang, thu được ${gold} linh thạch.`,
      kind: "good",
      stones: gold,
    };
  if (roll < 0.62)
    return {
      text: "Ngươi lạc vào một sơn động cổ, cảm ngộ vết kiếm trên vách đá, linh khí trong người dâng trào.",
      kind: "good",
      qiPct: 0.2,
    };
  if (roll < 0.72)
    return {
      text: "Một tán tu bày quầy giữa rừng, ngươi đổi chút vật phẩm lấy dược liệu quý.",
      kind: "good",
      herb: herb.id,
      herbQty: 2,
      stones: -Math.min(gold, 20),
    };
  if (roll < 0.8)
    return {
      text: "Trúng mai phục của ma tu! Ngươi liều mạng chạy thoát nhưng khí tức tổn hao.",
      kind: "bad",
      qiPct: -0.15,
    };
  if (roll < 0.88)
    return {
      text: `Bị đám sơn tặc chặn đường, mất ${Math.floor(gold / 2)} linh thạch mua đường.`,
      kind: "bad",
      stones: -Math.floor(gold / 2),
    };
  if (roll < 0.96)
    return {
      text: "Ngươi ngồi thiền bên suối linh, một đêm trôi qua như chớp mắt.",
      kind: "info",
      qiPct: 0.1,
    };
  return {
    text: "Di tích thượng cổ hé mở! Trong quan tài ngọc có một kiện pháp bảo phong ấn.",
    kind: "epic",
    artifact: true,
    stones: gold * 2,
  };
}

export function fmt(n: number): string {
  if (n < 1000) return n.toFixed(n < 10 && !Number.isInteger(n) ? 1 : 0);
  const units = ["K", "M", "B", "T", "Kt", "Mt"];
  let i = -1;
  let v = n;
  while (v >= 1000 && i < units.length - 1) {
    v /= 1000;
    i++;
  }
  return `${v.toFixed(2)}${units[i]}`;
}
