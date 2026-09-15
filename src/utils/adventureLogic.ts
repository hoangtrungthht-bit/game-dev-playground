import type { ElementId } from "@/lib/cultivation";
import { ELEMENT_INFO } from "@/lib/cultivation";

export interface AdventureReward {
  stones?: number;
  qiPct?: number; // tỷ lệ phần trăm so với linh khí cần để lên tầng
  herbId?: string;
  herbQty?: number;
  artifact?: boolean;
}

export interface AdventurePenalty {
  stones?: number;
  qiPct?: number;
}

export interface AdventureOption {
  text: string;
  winRate: number;
  reqElement?: ElementId; // yêu cầu linh căn ngũ hành cụ thể
  successText: string;
  failText: string;
  rewards: AdventureReward;
  penalties: AdventurePenalty;
}

export interface ModalEventData {
  id: string;
  title: string;
  description: string;
  option1: AdventureOption;
  option2: AdventureOption;
}

const EVENT_TEMPLATES: ModalEventData[] = [
  {
    id: "co_moc_thanh_linh",
    title: "Cổ Mộc Thanh Linh",
    description:
      "Trong rừng sâu, một gốc cổ mộc ngàn năm đột nhiên rung động. Linh khí mộc hệ cuồn cuộn tuôn ra, dường như đang thử thách ngươi.",
    option1: {
      text: "Dùng Mộc Linh Căn cảm ứng, hấp thụ linh khí tự nhiên",
      winRate: 0.85,
      reqElement: "moc",
      successText: "Cổ mộc công nhận, linh khí mộc hệ gột rửa kinh mạch.",
      failText: "Linh căn không hợp, cổ mộc rút lại linh khí.",
      rewards: { qiPct: 0.25, herbId: "linhthao", herbQty: 3 },
      penalties: { qiPct: -0.05 },
    },
    option2: {
      text: "Dùng tu vi cưỡng ép hấp thụ",
      winRate: 0.35,
      successText: "May mắn thành công, nhưng linh khí hỗn loạn.",
      failText: "Mộc khí phản phệ, ngươi bị thương nhẹ.",
      rewards: { qiPct: 0.12 },
      penalties: { qiPct: -0.12 },
    },
  },
  {
    id: "hoa_linh_dong",
    title: "Hỏa Linh Động",
    description:
      "Một hang động chứa đầy hỏa linh đột nhiên xuất hiện. Hỏa diễm không tanh thường, chỉ người có linh căn tương hợp mới có thể tiếp cận.",
    option1: {
      text: "Dùng Hỏa Linh Căn dung hợp hỏa linh",
      winRate: 0.8,
      reqElement: "hoa",
      successText: "Hỏa linh hợp nhất, tu vi tinh tiến.",
      failText: "Hỏa diễm quá mãnh liệt, ngươi phải lui ra.",
      rewards: { qiPct: 0.3, stones: 50 },
      penalties: { qiPct: -0.08, stones: -10 },
    },
    option2: {
      text: "Vận công chống chịu, từ từ tiến vào",
      winRate: 0.3,
      successText: "Nhờ kiên trì, ngươi thu được một tia hỏa linh.",
      failText: "Hỏa khí xâm nhập, ngươi bị thiêu đốt.",
      rewards: { qiPct: 0.1 },
      penalties: { qiPct: -0.18 },
    },
  },
  {
    id: "bang_tam_thach",
    title: "Băng Tâm Thạch",
    description:
      "Dưới đáy hồ băng, một khối Băng Tâm Thạch tỏa ra hàn khí. Ai chạm vào sẽ bị thử thách tâm trí.",
    option1: {
      text: "Dùng Thủy Linh Căn hòa vào hàn khí",
      winRate: 0.82,
      reqElement: "thuy",
      successText: "Hàn khí hóa thành linh dương, tâm trí thanh tịnh.",
      failText: "Hàn khí quá lạnh, ngươi bị đóng băng một phần chân khí.",
      rewards: { qiPct: 0.22, stones: 80 },
      penalties: { qiPct: -0.1 },
    },
    option2: {
      text: "Dùng tu vi phá băng lấy thạch",
      winRate: 0.28,
      successText: "Phá băng thành công, thu được Băng Tâm Thạch.",
      failText: "Phản lực băng phong đánh bay ngươi.",
      rewards: { stones: 120 },
      penalties: { qiPct: -0.15, stones: -20 },
    },
  },
  {
    id: "kim_khi_phong_bao",
    title: "Kim Khí Phong Bạo",
    description:
      "Trên đỉnh núi, một trận phong bạo kim khí đang cuộn trào. Trong đó ẩn chứa một kiện linh khí.",
    option1: {
      text: "Dùng Kim Linh Căn dẫn dắt kim khí",
      winRate: 0.78,
      reqElement: "kim",
      successText: "Kim khí quy thuận, linh khí sắc bén rèn luyện hộ thể.",
      failText: "Kim khí không phục, ngươi bị thương.",
      rewards: { qiPct: 0.2, artifact: true },
      penalties: { qiPct: -0.1 },
    },
    option2: {
      text: "Né tránh, chờ phong bạo tan",
      winRate: 0.45,
      successText: "Phong bạo tan đi, ngươi nhặt được linh thạch còn sót lại.",
      failText: "Bị kim khí quét trúng, ngươi bị thổ huyết.",
      rewards: { stones: 60 },
      penalties: { qiPct: -0.1, stones: -15 },
    },
  },
  {
    id: "tho_linh_mo",
    title: "Thổ Linh Mộ",
    description:
      "Một ngôi mộ cổ từ thời Thổ linh tông sụp đổ, lộ ra hầm ngầm chứa đầy linh thạch.",
    option1: {
      text: "Dùng Thổ Linh Căn cảm ứng địa mạch",
      winRate: 0.8,
      reqElement: "tho",
      successText: "Địa mạch hiện lối, ngươi thu được bảo tàng.",
      failText: "Địa mạch bất ổn, ngươi suýt bị vùi lấp.",
      rewards: { stones: 150, herbId: "huyetchi", herbQty: 2 },
      penalties: { stones: -20 },
    },
    option2: {
      text: "Đào bới bằng linh khí",
      winRate: 0.32,
      successText: "Đào được một hòm nhỏ.",
      failText: "Hầm ngầm sập, ngươi chạy thoát trong gang tấc.",
      rewards: { stones: 60 },
      penalties: { qiPct: -0.08, stones: -10 },
    },
  },
  {
    id: "yeu_thu_co_huyet",
    title: "Yêu Thú Cổ Huyết",
    description:
      "Một con yêu thú huyết mạch cổ xưa đang ngủ đông. Bên cạnh nó là một đóa huyết liên quý hiếm.",
    option1: {
      text: "Lẻn vào lấy huyết liên",
      winRate: 0.55,
      successText: "Yêu thú không phát hiện, ngươi thu được huyết liên.",
      failText: "Yêu thú tỉnh giấc, ngươi liều mạng chạy thoát.",
      rewards: { herbId: "huyetchi", herbQty: 4, stones: 30 },
      penalties: { qiPct: -0.15, stones: -25 },
    },
    option2: {
      text: "Đánh thức yêu thú chiến đấu",
      winRate: 0.22,
      successText: "Ngươi hạ gục yêu thú, thu được cổ huyết tinh hoa.",
      failText: "Yêu thú quá mạnh, ngươi bị trọng thương.",
      rewards: { qiPct: 0.2, artifact: true },
      penalties: { qiPct: -0.25, stones: -40 },
    },
  },
  {
    id: "tien_nhan_tan_hon",
    title: "Tiên Nhân Tàn Hồn",
    description:
      "Một tàn hồn của tiên nhân cổ xuất hiện, muốn truyền lại một bí pháp nhưng đòi hỏi tâm trí vững vàng.",
    option1: {
      text: "Tiếp nhận truyền thừa",
      winRate: 0.5,
      successText: "Tàn hồn hài lòng, ngươi được truyền bí pháp.",
      failText: "Tâm trí không đủ, ngươi bị phản phệ.",
      rewards: { qiPct: 0.2, stones: 100 },
      penalties: { qiPct: -0.1 },
    },
    option2: {
      text: "Kháng cự ảo cảnh bằng tu vi",
      winRate: 0.25,
      successText: "Ngươi phá ảo cảnh, tâm cảnh tăng tiến.",
      failText: "Ảo cảnh nuốt chửng, ngươi mất một phần thần thức.",
      rewards: { qiPct: 0.15 },
      penalties: { qiPct: -0.2 },
    },
  },
  {
    id: "cam_che_co_xua",
    title: "Cấm Chế Cổ Xưa",
    description:
      "Một cấm chế cổ xưa bao phủ một động phủ. Bên trong truyền ra ba động linh khí mạnh mẽ.",
    option1: {
      text: "Dùng Thủy Linh Căn tìm lỗ hổng cấm chế",
      winRate: 0.75,
      reqElement: "thuy",
      successText: "Cấm chế như nước chảy qua kẽ tay, ngươi tiến vào.",
      failText: "Cấm chế quá phức tạp, ngươi bị đẩy ra.",
      rewards: { artifact: true, stones: 80 },
      penalties: { qiPct: -0.08 },
    },
    option2: {
      text: "Cưỡng ép phá cấm chế",
      winRate: 0.2,
      successText: "Phá cấm thành công, nhưng động phủ sắp sụp đổ.",
      failText: "Cấm chế phản lực, ngươi bị trọng thương.",
      rewards: { stones: 200 },
      penalties: { qiPct: -0.22, stones: -30 },
    },
  },
];

export function rollModalEvent(rng: () => number): ModalEventData {
  return EVENT_TEMPLATES[Math.floor(rng() * EVENT_TEMPLATES.length)]!;
}

export function elementName(element: ElementId): string {
  return ELEMENT_INFO[element].name;
}
