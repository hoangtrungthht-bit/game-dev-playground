// Dữ liệu & logic lõi cho game tu tiên nhàn rỗi (idle cultivation RPG)

import { destinyLuck, destinyQiMult } from "@/lib/destinySeed";

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
  thuy: { name: "Thủy", hex: "#22D3EE", dark: true },
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
  {
    id: "thanh_moc_quyet",
    name: "Thanh Mộc Quyết",
    desc: "Tâm pháp nhập môn, hô hấp theo nhịp sinh trưởng của cây cối.",
    stones: 60,
    qiMult: 0.15,
    luck: 0,
  },
  {
    id: "viem_duong_cong",
    name: "Viêm Dương Công",
    desc: "Dẫn hỏa khí rèn kinh mạch, đột phá thêm phần chắc chắn.",
    stones: 120,
    qiMult: 0,
    luck: 0.03,
  },
  {
    id: "huyen_thuy_kinh",
    name: "Huyền Thủy Chân Kinh",
    desc: "Linh khí vận chuyển như dòng nước sâu, không ngừng nghỉ.",
    stones: 220,
    qiMult: 0.4,
    luck: 0,
  },
  {
    id: "cuu_chuyen_than",
    name: "Cửu Chuyển Kim Thân",
    desc: "Thân thể như kim cương, vững tâm khi nghịch chuyển thiên cơ.",
    stones: 350,
    qiMult: 0.1,
    luck: 0.06,
  },
  {
    id: "ngu_hanh_kinh",
    name: "Thái Nhất Ngũ Hành Kinh",
    desc: "Bí tịch thượng cổ, ngũ hành sinh khắc tuần hoàn bất tận.",
    stones: 800,
    qiMult: 0.6,
    luck: 0.08,
  },
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
  pendingAdventure: import("@/utils/adventureLogic").QuizEventData | null;
  failures: number;
  breakthroughs: number;
  log: LogEntry[];
  lastSeen: number;
  /** Thiên Mệnh Đạo Cốt: chuỗi 27 chữ số, 9 đoạn cho 9 đại cảnh giới */
  destinySeed: string | null;
  /** Thời điểm khai mệnh (tạo nhân vật) */
  createdAt: number;
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
    destinySeed: null,
    createdAt: 0,
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
  const destiny = destinyQiMult(s.destinySeed, s.realm);
  return base * art * man * buff * destiny;
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
  c += artifactOf(s.equipped)?.luck ?? 0;
  c += manualOf(s.equippedManual)?.luck ?? 0;
  c += Math.min(0.2, s.failures * 0.05);
  c += destinyLuck(s.destinySeed, s.realm);
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

/** Dữ liệu sự kiện đầy đủ; mỗi câu là một kết quả hoàn chỉnh, không ghép chuỗi. */
const ADVENTURE_EVENT_RECORDS: Encounter[] = [
  {
    text: "Cao nhân bên thác bạc truyền cho ngươi một đoạn tâm pháp thất truyền. [+ 15% tu vi]",
    kind: "epic",
    qiPct: 0.15,
  },
  {
    text: "Bí cảnh cổ mở cửa, ngươi lĩnh hội được quy luật vận hành linh khí. [+ 20% tu vi]",
    kind: "good",
    qiPct: 0.2,
  },
  {
    text: "Tranh chấp môn phái kết thúc, trưởng lão thưởng cho ngươi linh thạch. [+ 30 Linh Thạch]",
    kind: "good",
    stones: 30,
  },
  {
    text: "Chợ đen trong thành bán rẻ một viên linh đan hữu ích. [- 12 Linh Thạch]",
    kind: "good",
    stones: -12,
  },
  {
    text: "Kỳ ngộ ma thú dẫn ngươi tới một bụi linh thảo phát sáng. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Di tích kiếm tu để lại kiếm ý trong tâm thần của ngươi. [+ 12% tu vi]",
    kind: "epic",
    qiPct: 0.12,
  },
  {
    text: "Động phủ đan sư mở kho thuốc cho người hữu duyên. [+ 3 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 3,
  },
  {
    text: "Đoàn thương buôn thuê ngươi hộ tống qua sa mạc và trả công hậu hĩnh. [+ 45 Linh Thạch]",
    kind: "good",
    stones: 45,
  },
  {
    text: "Hồ linh tuyền giúp ngươi tẩy luyện kinh mạch trong chốc lát. [+ 10% tu vi]",
    kind: "good",
    qiPct: 0.1,
  },
  {
    text: "Lôi đài tu sĩ trao phần thưởng cho người giữ vững ba hiệp. [+ 25 Linh Thạch]",
    kind: "good",
    stones: 25,
  },
  {
    text: "Mê cung cổ thú khiến ngươi tìm được lối ra cùng một nhánh linh thảo. [+ 1 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 1,
  },
  {
    text: "Thuyền bay lạc hướng đưa ngươi tới một đảo mây đầy linh khí. [+ 18% tu vi]",
    kind: "good",
    qiPct: 0.18,
  },
  {
    text: "Vườn linh dược nghìn năm hé lộ một luống cỏ non quý giá. [+ 4 Linh Thảo]",
    kind: "epic",
    herb: "linhthao",
    herbQty: 4,
  },
  {
    text: "Sứ giả tiên môn thử lòng ngươi rồi ban thưởng túi linh thạch. [+ 60 Linh Thạch]",
    kind: "epic",
    stones: 60,
  },
  {
    text: "Mảnh vỡ pháp bảo thiên ngoại cộng hưởng với linh căn của ngươi. [+ 25% tu vi]",
    kind: "epic",
    qiPct: 0.25,
    artifact: true,
  },
  {
    text: "Cổ mộ ma đạo phát ra ma âm làm tâm cảnh của ngươi chao đảo. [- 10% tu vi]",
    kind: "bad",
    qiPct: -0.1,
  },
  {
    text: "Một lão giả câu cá chỉ cho ngươi đường vận khí chính xác. [+ 8% tu vi]",
    kind: "good",
    qiPct: 0.08,
  },
  {
    text: "Ngươi cứu đệ tử bị nạn và nhận được túi linh thạch cảm tạ. [+ 35 Linh Thạch]",
    kind: "good",
    stones: 35,
  },
  {
    text: "Dưới gốc cổ tùng, ngươi phát hiện một cây linh thảo vừa chín. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Một thương nhân chợ đen đổi linh thảo lấy pháp quyết rẻ tiền. [+ 1 Linh Thảo]",
    kind: "info",
    herb: "linhthao",
    herbQty: 1,
  },
  {
    text: "Yêu lang canh giữ khe núi khiến ngươi phải bỏ lại túi tiền để thoát thân. [- 20 Linh Thạch]",
    kind: "bad",
    stones: -20,
  },
  {
    text: "Ma tu phục kích giữa đường làm ngươi mất đi một phần tu vi. [- 12% tu vi]",
    kind: "bad",
    qiPct: -0.12,
  },
  {
    text: "Bí cảnh sụp đổ, ngươi chỉ kịp nhặt một nhánh thuốc xanh. [+ 1 Linh Thảo]",
    kind: "info",
    herb: "linhthao",
    herbQty: 1,
  },
  {
    text: "Môn phái thắng trận chia chiến lợi phẩm cho người ngoài cuộc. [+ 50 Linh Thạch]",
    kind: "good",
    stones: 50,
  },
  {
    text: "Cao nhân thử thách đạo tâm bằng một trận cờ và ngươi lĩnh hội được nhiều điều. [+ 14% tu vi]",
    kind: "good",
    qiPct: 0.14,
  },
  {
    text: "Pháp bảo hiếm trôi dạt vào bờ sông, ngươi may mắn nhặt được. [+ 70 Linh Thạch]",
    kind: "epic",
    stones: 70,
    artifact: true,
  },
  {
    text: "Ma thú bị thương dẫn ngươi tới hang đá có linh thảo mọc dày. [+ 3 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 3,
  },
  {
    text: "Ngươi thắng một cuộc đấu giá chợ đen nhưng phải trả giá cao. [- 40 Linh Thạch]",
    kind: "info",
    stones: -40,
  },
  {
    text: "Bí tịch cổ ghi lại một thức luyện khí giúp căn cơ vững chắc hơn. [+ 16% tu vi]",
    kind: "epic",
    qiPct: 0.16,
  },
  {
    text: "Kiếm tu đồng hành tặng ngươi linh thạch vì đã chỉ đường. [+ 22 Linh Thạch]",
    kind: "good",
    stones: 22,
  },
  {
    text: "Độc vụ trong rừng làm kinh mạch nghẽn tạm thời. [- 8% tu vi]",
    kind: "bad",
    qiPct: -0.08,
  },
  {
    text: "Ngươi tìm thấy linh thảo dưới lớp tuyết chưa tan. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Một tán tu mời ngươi luận đạo và giúp ngươi hiểu thêm về đột phá. [+ 11% tu vi]",
    kind: "info",
    qiPct: 0.11,
  },
  {
    text: "Ngươi hộ tống xe thuốc qua đèo và được trả bằng linh thạch. [+ 38 Linh Thạch]",
    kind: "good",
    stones: 38,
  },
  {
    text: "Tranh chấp hai tông môn nổ ra, dư chấn khiến ngươi bị thương. [- 9% tu vi]",
    kind: "bad",
    qiPct: -0.09,
  },
  {
    text: "Một tiểu đội săn thú chia cho ngươi chiến lợi phẩm là linh thảo. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Ngươi mua được bản đồ bí cảnh từ chợ đen và phát hiện túi tiền đã vơi. [- 18 Linh Thạch]",
    kind: "info",
    stones: -18,
  },
  {
    text: "Cổ chung vang lên giữa đêm, đạo âm giúp thần niệm của ngươi sáng tỏ. [+ 13% tu vi]",
    kind: "good",
    qiPct: 0.13,
  },
  {
    text: "Ma tu đốt kho hàng, ngươi mất một phần linh thạch trong lúc chạy nạn. [- 28 Linh Thạch]",
    kind: "bad",
    stones: -28,
  },
  {
    text: "Một con hồ ly ma thú dẫn ngươi tới bãi linh thảo ven suối. [+ 3 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 3,
  },
  {
    text: "Ngươi giúp trưởng lão sửa trận pháp và được truyền một tầng khẩu quyết. [+ 17% tu vi]",
    kind: "epic",
    qiPct: 0.17,
  },
  {
    text: "Người thắng lôi đài tặng ngươi phần thưởng vì trận đấu đẹp mắt. [+ 42 Linh Thạch]",
    kind: "good",
    stones: 42,
  },
  {
    text: "Cửa đá bí cảnh khép lại quá nhanh, ngươi bị trận lực làm hao tổn căn cơ. [- 7% tu vi]",
    kind: "bad",
    qiPct: -0.07,
  },
  {
    text: "Ngươi hái được linh thảo bên miệng núi lửa trước khi dung nham dâng lên. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Cao nhân vô danh ban cho ngươi một viên linh thạch để khích lệ chí hướng. [+ 15 Linh Thạch]",
    kind: "good",
    stones: 15,
  },
  {
    text: "Bí tịch cổ bị nguyền rủa làm ngươi lĩnh hội sai một đoạn khẩu quyết. [- 11% tu vi]",
    kind: "bad",
    qiPct: -0.11,
  },
  {
    text: "Môn phái nhỏ mời ngươi dự lễ và tặng một giỏ linh thảo. [+ 4 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 4,
  },
  {
    text: "Chợ đen đổi tin tình báo lấy linh thạch của ngươi. [- 25 Linh Thạch]",
    kind: "info",
    stones: -25,
  },
  {
    text: "Ma thú hộ pháp nhận ngươi làm bạn đồng hành trong một đoạn đường. [+ 9% tu vi]",
    kind: "good",
    qiPct: 0.09,
  },
  {
    text: "Ngươi đoạt được hòm thưởng sau khi phá giải trận pháp cổ. [+ 55 Linh Thạch]",
    kind: "epic",
    stones: 55,
  },
  {
    text: "Kiếp khí còn sót lại trong di tích làm linh khí của ngươi tán loạn. [- 13% tu vi]",
    kind: "bad",
    qiPct: -0.13,
  },
  {
    text: "Một nữ tu trả ơn bằng linh thảo sau khi ngươi cứu nàng khỏi vực sâu. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Ngươi nghe cao nhân giảng đạo suốt một canh giờ và đột nhiên thông suốt. [+ 19% tu vi]",
    kind: "epic",
    qiPct: 0.19,
  },
  {
    text: "Đội buôn nhờ ngươi giải quyết cướp đường rồi chia tiền công. [+ 32 Linh Thạch]",
    kind: "good",
    stones: 32,
  },
  {
    text: "Cướp đường giả dạng tán tu lấy đi túi linh thạch của ngươi. [- 35 Linh Thạch]",
    kind: "bad",
    stones: -35,
  },
  {
    text: "Ma thú non đánh rơi một hạt giống linh thảo trước chân ngươi. [+ 1 Linh Thảo]",
    kind: "info",
    herb: "linhthao",
    herbQty: 1,
  },
  {
    text: "Ngươi phá giải câu đố trên bia đá và nhận được truyền thừa luyện thể. [+ 15% tu vi]",
    kind: "epic",
    qiPct: 0.15,
  },
  {
    text: "Tranh chấp môn phái lắng xuống nhờ lời khuyên của ngươi, các bên cùng thưởng công. [+ 48 Linh Thạch]",
    kind: "good",
    stones: 48,
  },
  {
    text: "Một luồng ma khí từ giếng cổ đánh trúng hộ thể linh lực. [- 10% tu vi]",
    kind: "bad",
    qiPct: -0.1,
  },
  {
    text: "Ngươi tìm được linh thảo trong chiếc rương bỏ hoang ở sơn động. [+ 3 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 3,
  },
  {
    text: "Chủ nhân chợ đen giới thiệu khách quý mua pháp bảo của ngươi. [+ 65 Linh Thạch]",
    kind: "epic",
    stones: 65,
    artifact: true,
  },
  {
    text: "Cao nhân chỉ cách quan tưởng nhật nguyệt khiến tinh thần ngươi mạnh lên. [+ 12% tu vi]",
    kind: "good",
    qiPct: 0.12,
  },
  {
    text: "Bí cảnh cổ ban thưởng cho người đầu tiên chạm vào bia ngọc. [+ 75 Linh Thạch]",
    kind: "epic",
    stones: 75,
  },
  {
    text: "Ngươi vô tình phá hỏng cấm chế của tông môn và phải đền linh thạch. [- 30 Linh Thạch]",
    kind: "bad",
    stones: -30,
  },
  {
    text: "Ma thú sừng bạc bảo vệ ngươi khỏi độc xà rồi để lại linh thảo. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Ngươi luyện hóa linh hỏa trong lò cổ và tu vi tăng tiến rõ rệt. [+ 21% tu vi]",
    kind: "epic",
    qiPct: 0.21,
  },
  {
    text: "Môn phái tổ chức phát chẩn sau thiên tai và chia cho ngươi linh thạch. [+ 27 Linh Thạch]",
    kind: "good",
    stones: 27,
  },
  {
    text: "Một trận mưa sao băng phá tan túi thuốc, ngươi mất linh thảo dự trữ. [- 1 Linh Thảo]",
    kind: "bad",
    herb: "linhthao",
    herbQty: -1,
  },
  {
    text: "Ngươi mua bản sao bí tịch cổ với giá phải chăng tại chợ đen. [- 16 Linh Thạch]",
    kind: "good",
    stones: -16,
  },
  {
    text: "Đạo hữu cũ mời ngươi cùng ngồi thiền bên hồ sen. [+ 10% tu vi]",
    kind: "good",
    qiPct: 0.1,
  },
  {
    text: "Ma tu cắt đứt linh mạch của con đường khiến ngươi hao phí linh thạch vòng xa. [- 14 Linh Thạch]",
    kind: "bad",
    stones: -14,
  },
  {
    text: "Ngươi thuần phục một con ma thú nhỏ và nhận được cỏ thuốc nó cất giữ. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Truyền thừa phù đạo giúp ngươi điều khiển linh lực tinh tế hơn. [+ 14% tu vi]",
    kind: "good",
    qiPct: 0.14,
  },
  {
    text: "Một vị hộ pháp trả công bằng túi linh thạch sau khi ngươi báo tin. [+ 36 Linh Thạch]",
    kind: "good",
    stones: 36,
  },
  {
    text: "Trận pháp hộ sơn phản chấn làm ngươi tổn thương kinh mạch. [- 8% tu vi]",
    kind: "bad",
    qiPct: -0.08,
  },
  {
    text: "Ngươi hái linh thảo trên vách đá rồi an toàn trở về. [+ 3 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 3,
  },
  {
    text: "Bí cảnh cổ mở kho vũ khí, ngươi đổi được một pháp bảo hiếm. [+ 90 Linh Thạch]",
    kind: "epic",
    stones: 90,
    artifact: true,
  },
  {
    text: "Cao nhân truyền cho ngươi bí quyết hô hấp của hạc tiên. [+ 18% tu vi]",
    kind: "epic",
    qiPct: 0.18,
  },
  {
    text: "Hai môn phái hòa giải và nhờ ngươi chuyển thư thưởng công. [+ 24 Linh Thạch]",
    kind: "good",
    stones: 24,
  },
  {
    text: "Kẻ buôn lậu tráo hàng ở chợ đen khiến ngươi mất tiền oan. [- 22 Linh Thạch]",
    kind: "bad",
    stones: -22,
  },
  {
    text: "Ma thú lưng đá dẫn ngươi đến một mạch linh thảo ẩn dưới rễ cây. [+ 4 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 4,
  },
  {
    text: "Ngươi lĩnh ngộ thế kiếm từ bóng trăng phản chiếu trên hồ. [+ 16% tu vi]",
    kind: "good",
    qiPct: 0.16,
  },
  {
    text: "Một thương hội tặng tiền thưởng vì ngươi phát hiện hàng giả. [+ 58 Linh Thạch]",
    kind: "good",
    stones: 58,
  },
  {
    text: "Cấm địa thức tỉnh, áp lực vô hình làm ngươi hao tổn tu vi. [- 15% tu vi]",
    kind: "bad",
    qiPct: -0.15,
  },
  {
    text: "Ngươi phát hiện ba cây linh thảo sau tảng đá có khắc phù văn. [+ 3 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 3,
  },
  {
    text: "Người canh bí cảnh trả lại tiền đặt cọc và tặng thêm phần thưởng. [+ 44 Linh Thạch]",
    kind: "good",
    stones: 44,
  },
  {
    text: "Lão giả chợ đen nhận ra huyết mạch đặc biệt của ngươi và chỉ điểm. [+ 13% tu vi]",
    kind: "epic",
    qiPct: 0.13,
  },
  {
    text: "Ngươi bị cuốn vào cuộc tranh chấp pháp bảo và phải bồi thường. [- 33 Linh Thạch]",
    kind: "bad",
    stones: -33,
  },
  {
    text: "Ma thú tuyết đưa ngươi tới khe núi mọc đầy linh thảo. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Cổ mộ kiếm tu trao cho ngươi một tia kiếm ý trước khi tan biến. [+ 22% tu vi]",
    kind: "epic",
    qiPct: 0.22,
  },
  {
    text: "Môn phái địa phương mời ngươi làm khách và tặng quà gặp mặt. [+ 29 Linh Thạch]",
    kind: "good",
    stones: 29,
  },
  {
    text: "Linh thú trông coi cửa động nổi giận, ngươi phải bỏ lại tiền mãi lộ. [- 17 Linh Thạch]",
    kind: "bad",
    stones: -17,
  },
  {
    text: "Ngươi thu hoạch linh thảo bên dòng suối ngầm trước khi nước dâng. [+ 1 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 1,
  },
  {
    text: "Bí tịch cổ tự lật trang và ghi dấu một pháp môn vào thần thức ngươi. [+ 20% tu vi]",
    kind: "epic",
    qiPct: 0.2,
  },
  {
    text: "Chủ quán trà nghe chuyện phiêu lưu rồi tặng ngươi túi tiền nhỏ. [+ 12 Linh Thạch]",
    kind: "good",
    stones: 12,
  },
  {
    text: "Ma khí trong sương đêm làm ngươi lạc đường và tiêu hao linh lực. [- 9% tu vi]",
    kind: "bad",
    qiPct: -0.09,
  },
  {
    text: "Một ma thú hiền lành đổi linh thảo lấy thức ăn của ngươi. [+ 2 Linh Thảo]",
    kind: "info",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Cao nhân truyền thụ cách dẫn lôi nhập thể an toàn. [+ 17% tu vi]",
    kind: "epic",
    qiPct: 0.17,
  },
  {
    text: "Ngươi tìm thấy kho cất giấu của đoàn buôn thất lạc. [+ 52 Linh Thạch]",
    kind: "epic",
    stones: 52,
  },
  {
    text: "Tranh chấp môn phái khiến ngươi đứng nhầm phe và bị phạt tiền. [- 26 Linh Thạch]",
    kind: "bad",
    stones: -26,
  },
  {
    text: "Linh thảo mọc trên mai ma thú được ngươi cẩn thận thu hái. [+ 3 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 3,
  },
  {
    text: "Ngươi ngồi thiền dưới thác nước và nghe thấy tiếng gọi của đại đạo. [+ 15% tu vi]",
    kind: "good",
    qiPct: 0.15,
  },
  {
    text: "Chợ đen tổ chức đấu giá kín, món đồ ngươi bán được giá tốt. [+ 47 Linh Thạch]",
    kind: "good",
    stones: 47,
  },
  {
    text: "Bí cảnh cổ nuốt mất túi linh thạch khi ngươi vượt qua cổng đá. [- 31 Linh Thạch]",
    kind: "bad",
    stones: -31,
  },
  {
    text: "Ngươi cứu ma thú non khỏi bẫy và được nó dẫn đến linh thảo. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Một vị trưởng lão giải thích điểm yếu của bình cảnh tu luyện. [+ 12% tu vi]",
    kind: "good",
    qiPct: 0.12,
  },
  {
    text: "Thợ rèn pháp bảo thưởng tiền sau khi ngươi tìm được quặng quý. [+ 41 Linh Thạch]",
    kind: "good",
    stones: 41,
  },
  {
    text: "Ma tu gieo độc vào trận bàn khiến căn cơ của ngươi bị thương. [- 14% tu vi]",
    kind: "bad",
    qiPct: -0.14,
  },
  {
    text: "Ngươi đổi một tấm bản đồ lấy hai nhánh linh thảo của người hái thuốc. [+ 2 Linh Thảo]",
    kind: "info",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Pháp bảo hiếm chọn ngươi làm chủ và tỏa ra linh quang rực rỡ. [+ 80 Linh Thạch]",
    kind: "epic",
    stones: 80,
    artifact: true,
  },
  {
    text: "Cao nhân giấu mặt dạy ngươi cách giữ tâm giữa phong ba. [+ 11% tu vi]",
    kind: "good",
    qiPct: 0.11,
  },
  {
    text: "Môn phái thắng lợi mở kho thưởng cho tất cả người góp sức. [+ 62 Linh Thạch]",
    kind: "epic",
    stones: 62,
  },
  {
    text: "Chợ đen bán phải hàng giả khiến ngươi tốn tiền sửa chữa. [- 19 Linh Thạch]",
    kind: "bad",
    stones: -19,
  },
  {
    text: "Ma thú ba mắt để lại một bông linh thảo sau khi được ngươi chữa thương. [+ 1 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 1,
  },
  {
    text: "Ngươi phá vỡ ảo cảnh bí cảnh và nhìn thấy chân ý của bản thân. [+ 23% tu vi]",
    kind: "epic",
    qiPct: 0.23,
  },
  {
    text: "Thương nhân phương xa trả công bằng túi linh thạch vì ngươi dẫn đường. [+ 34 Linh Thạch]",
    kind: "good",
    stones: 34,
  },
  {
    text: "Cuộc đấu giữa hai tông phái làm mặt đất rung chuyển dưới chân ngươi. [- 6% tu vi]",
    kind: "bad",
    qiPct: -0.06,
  },
  {
    text: "Ngươi tìm thấy linh thảo trong hốc cây do chim linh tha hạt về. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Bí tịch cổ giúp ngươi sửa lại một sai lầm trong nền tảng tu luyện. [+ 18% tu vi]",
    kind: "epic",
    qiPct: 0.18,
  },
  {
    text: "Một lữ khách biếu ngươi linh thạch sau khi nghe ngươi kể chuyện. [+ 21 Linh Thạch]",
    kind: "info",
    stones: 21,
  },
  {
    text: "Ma khí từ pháp bảo vỡ làm thần trí ngươi đau nhói. [- 12% tu vi]",
    kind: "bad",
    qiPct: -0.12,
  },
  {
    text: "Ngươi gom được linh thảo trong khu vườn bỏ hoang của một tiên gia. [+ 4 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 4,
  },
  {
    text: "Cao nhân truyền thụ khẩu quyết đột phá ngay trước lúc hoàng hôn. [+ 24% tu vi]",
    kind: "epic",
    qiPct: 0.24,
  },
  {
    text: "Ngươi tìm thấy hòm linh thạch dưới nền miếu cổ. [+ 68 Linh Thạch]",
    kind: "epic",
    stones: 68,
  },
  {
    text: "Tranh chấp môn phái kéo dài khiến ngươi phải mua thuốc chữa thương. [- 13 Linh Thạch]",
    kind: "bad",
    stones: -13,
  },
  {
    text: "Ma thú khổng lồ rời hang, để lại luống linh thảo chưa ai chạm tới. [+ 3 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 3,
  },
  {
    text: "Ngươi tĩnh tọa trước bia cổ và cảm nhận được nhịp thở của trời đất. [+ 15% tu vi]",
    kind: "good",
    qiPct: 0.15,
  },
  {
    text: "Người bán chợ đen trả thêm tiền vì món hàng của ngươi có dấu ấn cổ. [+ 39 Linh Thạch]",
    kind: "good",
    stones: 39,
  },
  {
    text: "Cấm chế bí cảnh hút mất linh lực của ngươi trong lúc tháo chạy. [- 16% tu vi]",
    kind: "bad",
    qiPct: -0.16,
  },
  {
    text: "Một con ma thú nhỏ dẫn ngươi tới gốc cây mọc linh thảo. [+ 1 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 1,
  },
  {
    text: "Bí tịch cổ hoàn chỉnh giúp ngươi nhìn thấy con đường tu hành rộng mở. [+ 26% tu vi]",
    kind: "epic",
    qiPct: 0.26,
  },
  {
    text: "Môn phái cảm ơn ngươi vì giữ lời thề và trao thưởng xứng đáng. [+ 57 Linh Thạch]",
    kind: "good",
    stones: 57,
  },
  {
    text: "Kẻ địch trong tranh chấp môn phái đòi phí hòa giải quá cao. [- 37 Linh Thạch]",
    kind: "bad",
    stones: -37,
  },
  {
    text: "Ngươi thu hoạch linh thảo từ mỏm đá được ánh trăng chiếu sáng. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Cao nhân cầm tay chỉ việc, giúp ngươi vượt qua nút thắt lâu ngày. [+ 20% tu vi]",
    kind: "epic",
    qiPct: 0.2,
  },
  {
    text: "Pháp bảo hiếm trong bí cảnh mở kho năng lượng và để lại linh thạch. [+ 73 Linh Thạch]",
    kind: "epic",
    stones: 73,
    artifact: true,
  },
  {
    text: "Ngươi bị ma thú truy đuổi qua đầm lầy và mất một phần tu vi. [- 10% tu vi]",
    kind: "bad",
    qiPct: -0.1,
  },
  {
    text: "Người hái thuốc tặng ngươi linh thảo vì đã bảo vệ họ khỏi yêu thú. [+ 3 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 3,
  },
  {
    text: "Chợ đen giới thiệu ngươi tới một khách hàng hào phóng. [+ 46 Linh Thạch]",
    kind: "good",
    stones: 46,
  },
  {
    text: "Ngươi nghe tiếng chuông cổ và lĩnh ngộ cách tuần hoàn đại chu thiên. [+ 17% tu vi]",
    kind: "good",
    qiPct: 0.17,
  },
  {
    text: "Ma tu phá trận hộ thân khiến ngươi phải bỏ tiền mua phù cứu mạng. [- 24 Linh Thạch]",
    kind: "bad",
    stones: -24,
  },
  {
    text: "Bí cảnh cổ để lại hạt giống linh thảo trong lòng bàn tay ngươi. [+ 1 Linh Thảo]",
    kind: "info",
    herb: "linhthao",
    herbQty: 1,
  },
  {
    text: "Trưởng lão hai phái cùng công nhận công lao của ngươi sau cuộc tranh chấp. [+ 53 Linh Thạch]",
    kind: "epic",
    stones: 53,
  },
  {
    text: "Ngươi nhập định dưới mưa sao, tu vi âm thầm tiến thêm một bước. [+ 13% tu vi]",
    kind: "good",
    qiPct: 0.13,
  },
  {
    text: "Cổ thú tỉnh giấc làm ngươi hoảng loạn, tâm cảnh bị tổn thương. [- 9% tu vi]",
    kind: "bad",
    qiPct: -0.09,
  },
  {
    text: "Ngươi tìm được linh thảo trong chiếc bình ngọc của một động phủ cũ. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Một cao nhân trao đổi pháp quyết lấy linh thạch rồi mỉm cười rời đi. [- 15 Linh Thạch]",
    kind: "info",
    stones: -15,
  },
  {
    text: "Kỳ ngộ ma thú khiến ngươi hiểu được tiếng gọi của vạn vật. [+ 19% tu vi]",
    kind: "epic",
    qiPct: 0.19,
  },
  {
    text: "Ngươi bán chiến lợi phẩm ở chợ đen và thu về khoản lời bất ngờ. [+ 64 Linh Thạch]",
    kind: "good",
    stones: 64,
  },
  {
    text: "Bí cảnh khép lại ngay khi ngươi bước vào, dư chấn làm mất một phần căn cơ. [- 11% tu vi]",
    kind: "bad",
    qiPct: -0.11,
  },
  {
    text: "Tranh chấp môn phái kết thúc bằng lễ kết minh và giỏ linh thảo. [+ 4 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 4,
  },
  {
    text: "Ngươi được mời ngồi thiền trong trận tụ linh của tiên môn. [+ 22% tu vi]",
    kind: "epic",
    qiPct: 0.22,
  },
  {
    text: "Thương hội thưởng linh thạch vì ngươi vạch trần kẻ buôn hàng cấm. [+ 49 Linh Thạch]",
    kind: "good",
    stones: 49,
  },
  {
    text: "Ma thú canh cửa đòi phí qua đường khiến túi tiền của ngươi nhẹ đi. [- 18 Linh Thạch]",
    kind: "bad",
    stones: -18,
  },
  {
    text: "Ngươi nhặt được một bó linh thảo sau trận mưa linh khí. [+ 3 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 3,
  },
  {
    text: "Cao nhân giúp ngươi ổn định khí hải trước khi rời núi. [+ 16% tu vi]",
    kind: "good",
    qiPct: 0.16,
  },
  {
    text: "Pháp bảo hiếm phát hiện chủ nhân xứng đáng và để lại kho báu. [+ 85 Linh Thạch]",
    kind: "epic",
    stones: 85,
    artifact: true,
  },
  {
    text: "Một luồng ma phong xuyên qua hộ thể khiến ngươi suy yếu. [- 7% tu vi]",
    kind: "bad",
    qiPct: -0.07,
  },
  {
    text: "Bí tịch cổ chỉ dẫn tới vách núi có linh thảo nở hoa. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Chợ đen tổ chức phiên giao dịch may mắn, ngươi bán được món đồ cũ. [+ 31 Linh Thạch]",
    kind: "good",
    stones: 31,
  },
  {
    text: "Ngươi tham gia cuộc luận đạo của các tông môn và khai mở tâm nhãn. [+ 18% tu vi]",
    kind: "good",
    qiPct: 0.18,
  },
  {
    text: "Cổ thú phá tan lều trại, ngươi phải trả tiền sửa lại pháp khí. [- 27 Linh Thạch]",
    kind: "bad",
    stones: -27,
  },
  {
    text: "Một ma thú biết ơn đưa ngươi tới bãi linh thảo bên suối. [+ 3 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 3,
  },
  {
    text: "Ngươi nhận được lời truyền thụ cuối cùng của một cao nhân sắp phi thăng. [+ 28% tu vi]",
    kind: "epic",
    qiPct: 0.28,
  },
  {
    text: "Môn phái trao thưởng vì ngươi giữ bí mật trong thời điểm nguy cấp. [+ 37 Linh Thạch]",
    kind: "good",
    stones: 37,
  },
  {
    text: "Bí cảnh ma đạo làm thần thức ngươi đau đớn và hao hụt tu vi. [- 14% tu vi]",
    kind: "bad",
    qiPct: -0.14,
  },
  {
    text: "Ngươi tìm thấy linh thảo quý giữa trận đồ đã phai màu. [+ 4 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 4,
  },
  {
    text: "Chủ nhân chợ đen tặng ngươi linh thạch vì giữ đúng giao kèo. [+ 26 Linh Thạch]",
    kind: "good",
    stones: 26,
  },
  {
    text: "Ngươi ngộ đạo khi nhìn ma thú vượt qua dòng thác ngược. [+ 15% tu vi]",
    kind: "epic",
    qiPct: 0.15,
  },
  {
    text: "Một cuộc tranh chấp khiến pháp bảo của ngươi sứt mẻ, phải tốn tiền sửa chữa. [- 36 Linh Thạch]",
    kind: "bad",
    stones: -36,
  },
  {
    text: "Linh thảo trong bí cảnh tự bay vào túi trữ vật của ngươi. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Cao nhân trao cho ngươi bản đồ tu luyện và một lời khuyên quý giá. [+ 21% tu vi]",
    kind: "epic",
    qiPct: 0.21,
  },
  {
    text: "Ngươi phá khóa kho cổ và tìm được một túi linh thạch đầy. [+ 59 Linh Thạch]",
    kind: "epic",
    stones: 59,
  },
  {
    text: "Ma tu đột kích từ bóng tối khiến khí hải của ngươi chấn động. [- 10% tu vi]",
    kind: "bad",
    qiPct: -0.1,
  },
  {
    text: "Ngươi đổi tin tình báo ở chợ đen lấy một nhánh linh thảo. [+ 1 Linh Thảo]",
    kind: "info",
    herb: "linhthao",
    herbQty: 1,
  },
  {
    text: "Tranh chấp môn phái được hóa giải, chưởng môn hai bên cùng trao thưởng. [+ 71 Linh Thạch]",
    kind: "epic",
    stones: 71,
  },
  {
    text: "Ngươi tĩnh tâm bên linh tuyền, từng tia linh khí thấm vào kinh mạch. [+ 12% tu vi]",
    kind: "good",
    qiPct: 0.12,
  },
  {
    text: "Cửa đá cổ sập xuống làm vỡ túi thuốc mà ngươi mang theo. [- 1 Linh Thảo]",
    kind: "bad",
    herb: "linhthao",
    herbQty: -1,
  },
  {
    text: "Ma thú hộ tống ngươi qua vùng nguy hiểm rồi biến mất trong mây. [+ 10% tu vi]",
    kind: "good",
    qiPct: 0.1,
  },
  {
    text: "Ngươi bán bản đồ bí cảnh cho thương nhân và nhận đủ tiền công. [+ 43 Linh Thạch]",
    kind: "good",
    stones: 43,
  },
  {
    text: "Bí tịch cổ thức tỉnh vào nửa đêm, truyền thẳng một tầng công pháp. [+ 27% tu vi]",
    kind: "epic",
    qiPct: 0.27,
  },
  {
    text: "Kẻ xấu trong chợ đen tráo túi khiến ngươi mất một khoản linh thạch. [- 29 Linh Thạch]",
    kind: "bad",
    stones: -29,
  },
  {
    text: "Ngươi hái được linh thảo trên thân cây ma thú cổ đại. [+ 3 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 3,
  },
  {
    text: "Cao nhân thử căn cơ rồi ban lời chúc trước khi rời đi. [+ 9% tu vi]",
    kind: "good",
    qiPct: 0.09,
  },
  {
    text: "Môn phái gửi linh thạch cảm tạ vì ngươi cứu được đệ tử nội môn. [+ 56 Linh Thạch]",
    kind: "good",
    stones: 56,
  },
  {
    text: "Dư chấn tranh chấp môn phái làm ngươi thất thủ và hao tổn tu vi. [- 8% tu vi]",
    kind: "bad",
    qiPct: -0.08,
  },
  {
    text: "Bí cảnh cổ ban cho ngươi một giỏ linh thảo sau khi vượt qua thử thách. [+ 4 Linh Thảo]",
    kind: "epic",
    herb: "linhthao",
    herbQty: 4,
  },
  {
    text: "Ngươi hoàn thành giao dịch chợ đen an toàn và được trả thêm thù lao. [+ 28 Linh Thạch]",
    kind: "good",
    stones: 28,
  },
  {
    text: "Kỳ ngộ ma thú đánh thức huyết mạch ngủ yên trong người ngươi. [+ 24% tu vi]",
    kind: "epic",
    qiPct: 0.24,
  },
  {
    text: "Ma tu cướp mất phí lộ hành của ngươi giữa con đường vắng. [- 23 Linh Thạch]",
    kind: "bad",
    stones: -23,
  },
  {
    text: "Ngươi lấy được linh thảo cuối cùng trong động phủ trước khi trận pháp đóng lại. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Cao nhân truyền thụ pháp môn giữ lửa giúp tu vi tiến bộ ổn định. [+ 15% tu vi]",
    kind: "good",
    qiPct: 0.15,
  },
  {
    text: "Bí cảnh cổ thưởng cho ngươi hòm báu sau khi phá giải mê trận. [+ 66 Linh Thạch]",
    kind: "epic",
    stones: 66,
  },
  {
    text: "Ngươi bị cuốn vào trận chiến pháp bảo và mất một phần linh lực. [- 13% tu vi]",
    kind: "bad",
    qiPct: -0.13,
  },
  {
    text: "Ma thú canh vườn cho phép ngươi lấy một nhánh linh thảo làm lễ vật. [+ 1 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 1,
  },
  {
    text: "Ngươi rời chợ đen với món lời lớn nhờ chọn đúng hàng thật. [+ 54 Linh Thạch]",
    kind: "good",
    stones: 54,
  },
  {
    text: "Một vị tiền bối chỉ ra nơi bế tắc trong công pháp của ngươi. [+ 14% tu vi]",
    kind: "good",
    qiPct: 0.14,
  },
  {
    text: "Môn phái thất bại đổ lỗi cho người ngoài, ngươi phải nộp phí rời đi. [- 32 Linh Thạch]",
    kind: "bad",
    stones: -32,
  },
  {
    text: "Ngươi tìm thấy linh thảo mọc quanh bộ xương của cổ thú. [+ 3 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 3,
  },
  {
    text: "Bí tịch cổ giúp ngươi nhìn thấu một tầng ảo thuật. [+ 16% tu vi]",
    kind: "epic",
    qiPct: 0.16,
  },
  {
    text: "Chợ đen mở cửa phiên cuối ngày và thương nhân trả thưởng cho khách quen. [+ 33 Linh Thạch]",
    kind: "good",
    stones: 33,
  },
  {
    text: "Ma khí trong cổ mộ ép ngươi lùi bước, căn cơ chịu tổn thương. [- 11% tu vi]",
    kind: "bad",
    qiPct: -0.11,
  },
  {
    text: "Một ma thú lông trắng để lại linh thảo trước cửa lều của ngươi. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Cao nhân dạy ngươi cách mượn thế núi sông để tu luyện. [+ 19% tu vi]",
    kind: "epic",
    qiPct: 0.19,
  },
  {
    text: "Tranh chấp môn phái kết thúc bằng một hiệp ước có tiền bồi thường. [+ 61 Linh Thạch]",
    kind: "good",
    stones: 61,
  },
  {
    text: "Ngươi mua bùa hộ thân ở chợ đen nhưng giá bị nâng lên. [- 10 Linh Thạch]",
    kind: "info",
    stones: -10,
  },
  {
    text: "Bí cảnh cổ để lộ luống linh thảo sau khi ngươi xoay đúng bia đá. [+ 3 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 3,
  },
  {
    text: "Kỳ ngộ ma thú giúp ngươi hiểu thêm về sức mạnh của huyết mạch. [+ 18% tu vi]",
    kind: "good",
    qiPct: 0.18,
  },
  {
    text: "Ngươi nhận được linh thạch từ người qua đường sau khi cứu họ khỏi yêu thú. [+ 40 Linh Thạch]",
    kind: "good",
    stones: 40,
  },
  {
    text: "Đợt truy sát của ma tu khiến ngươi phải bỏ lại một phần hành trang. [- 21 Linh Thạch]",
    kind: "bad",
    stones: -21,
  },
  {
    text: "Cây linh thảo cổ nở hoa đúng lúc ngươi đi qua thung lũng. [+ 4 Linh Thảo]",
    kind: "epic",
    herb: "linhthao",
    herbQty: 4,
  },
  {
    text: "Ngươi ngồi thiền trước cửa bí cảnh và đạt được sự tĩnh lặng hiếm có. [+ 15% tu vi]",
    kind: "good",
    qiPct: 0.15,
  },
  {
    text: "Cao nhân xác nhận ngươi có duyên với tiên đạo và tặng túi linh thạch. [+ 63 Linh Thạch]",
    kind: "epic",
    stones: 63,
  },
  {
    text: "Cổ thú gầm vang làm tâm thần ngươi dao động trong giây lát. [- 10% tu vi]",
    kind: "bad",
    qiPct: -0.1,
  },
  {
    text: "Ngươi gom linh thảo từ bờ vực rồi dùng dây mây leo lên an toàn. [+ 2 Linh Thảo]",
    kind: "good",
    herb: "linhthao",
    herbQty: 2,
  },
  {
    text: "Chợ đen đổi được tin quý, nhưng ngươi phải trả một khoản phí nhỏ. [- 11 Linh Thạch]",
    kind: "info",
    stones: -11,
  },
  {
    text: "Môn phái tặng ngươi linh thạch sau khi ngươi đứng ra làm chứng công bằng. [+ 51 Linh Thạch]",
    kind: "good",
    stones: 51,
  },
  {
    text: "Bí tịch cổ hòa vào thần thức và mở ra một con đường tu luyện mới. [+ 25% tu vi]",
    kind: "epic",
    qiPct: 0.25,
  },
  {
    text: "Ma thú phá trận khiến linh thảo trong túi của ngươi bị dập nát. [- 1 Linh Thảo]",
    kind: "bad",
    herb: "linhthao",
    herbQty: -1,
  },
  {
    text: "Ngươi hoàn thành chuyến đi cuối cùng qua bí cảnh và nhận kho báu. [+ 88 Linh Thạch]",
    kind: "epic",
    stones: 88,
  },
];

/** Flat pool used by the adventure roll: one complete sentence per entry. */
export const ADVENTURE_EVENTS_128: string[] = ADVENTURE_EVENT_RECORDS.slice(0, 128).map(
  (event) => event.text,
);

export const ENCOUNTER_EVENTS: Encounter[] = ADVENTURE_EVENT_RECORDS.slice(0, 128);
export const ENCOUNTER_TEMPLATES = ENCOUNTER_EVENTS;

export function rollEncounter(_stage: number, rng: () => number): Encounter {
  const text = ADVENTURE_EVENTS_128[Math.floor(rng() * ADVENTURE_EVENTS_128.length)]!;
  return ENCOUNTER_EVENTS.find((event) => event.text === text)!;
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
