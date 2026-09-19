import type { ElementId } from "@/lib/cultivation";
import { ELEMENT_INFO } from "@/lib/cultivation";

export interface AdventureReward {
  stones?: number;
  qiPct?: number; // tỷ lệ phần trăm so với linh khí cần để lên tầng
  herbId?: string;
  herbQty?: number;
  pillId?: "tukhi" | "phacanh" | "hotam" | "nguythan";
  pillQty?: number;
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

export interface QuizEventData {
  id: string;
  title: string;
  question: string;
  answers: string[];
  correctIndex: number;
  baseStones: number;
  baseQiPct: number;
  realmName: string;
}

type QuizQuestion = { question: string; answers: readonly [string, string, string, string]; correctIndex: number; stage: number };

const REALM_QUESTIONS: readonly (readonly [string, string])[] = [
  ["Tâm ma xuất hiện khi nào trong quá trình tu hành?", "Khi đạo tâm xuất hiện vết nứt hoặc khi vượt kiếp"],
  ["Luyện Khí kỳ tập trung chủ yếu vào điều gì?", "Dẫn khí nhập thể, gột rửa phàm căn"],
  ["Khi gặp ảo ảnh đồng môn hãm hại lúc nhập định, nên xử trí ra sao?", "Nhắm mắt thu hút linh khí, dùng Đạo tâm đập tan ảo ảnh"],
  ["Linh khí trong thiên hạ khởi nguồn từ đâu?", "Chuyển hóa từ Thiên Địa Bản Nguyên"],
  ["Đứng trước tà tu dụ dỗ ban công pháp cấp tốc, ngươi chọn gì?", "Giữ vững Đạo tâm, từ bỏ lối tắt nguy hiểm"],
  ["Đạo căn yếu kém muốn tiến xa cần dựa vào điều gì?", "Ý chí kiên định và cơ duyên"],
  ["Tẩy Tủy Đan có tác dụng chính là gì?", "Gột rửa tạp chất trong cơ thể, cải thiện căn cốt"],
  ["Linh Thạch Hạ Phẩm thường chứa loại năng lượng nào?", "Thiên địa linh khí sơ cấp"],
  ["Tâm ma đầu tiên của tu sĩ thường phát sinh từ đâu?", "Hận thù phàm tục và nỗi sợ chết"],
  ["Ý nghĩa thực sự của Bế Quan Tu Luyện là gì?", "Tập trung ngộ đạo và ngưng tụ linh lực"],
  ["Đại đạo Trúc Cơ cốt ở điểm nào?", "Xây nền đạo cơ vững chắc cho hành trình tu tiên"],
  ["Trúc Cơ Đan có vai trò quyết định gì?", "Hỗ trợ nén Khí thành Dịch, ngưng tụ Đạo Cơ"],
  ["Hình dáng Đạo Cơ hoàn hảo nhất thường gọi là gì?", "Thiên Phẩm Đạo Cơ"],
  ["Đạo Cơ xuất hiện vết nứt do đột phá thất bại nên làm gì?", "Dùng Ôn Dưỡng Đan tĩnh dưỡng và vá vết nứt"],
  ["Tu sĩ Trúc Cơ làm được gì mà Luyện Khí không làm được?", "Ngự kiếm phi hành và thọ nguyên tăng lên"],
  ["Khi gặp Thần Thức áp chế từ cao nhân, nên làm gì?", "Thu nhiễm thần thức, dùng ý chí chống đỡ"],
  ["Linh lực ở Trúc Cơ kỳ tồn tại dưới dạng nào?", "Dạng Dịch thể"],
  ["Chấp niệm lớn nhất cản trở Trúc Cơ thường là gì?", "Quyến luyến vinh hoa phú quý phàm tục"],
  ["Tam Thanh Trúc Cơ yêu cầu điều gì?", "Tinh - Khí - Thần hợp nhất"],
  ["Thọ nguyên trung bình của tu sĩ Trúc Cơ là bao nhiêu?", "200 - 300 năm"],
  ["Nhất Lạp Kim Đan Hạ Lạc Đồ nghĩa là gì?", "Ngưng tụ Kim Đan, chính thức thoát khỏi kiếp phàm nhân"],
  ["Phẩm cấp Kim Đan nào đại diện tu vi cao nhất?", "Nhất Phẩm Kim Đan hoặc Cửu Chuyển Kim Đan"],
  ["Thiên Kiếp Kim Đan thường xuất hiện dưới hình thức nào?", "Lôi Kiếp"],
  ["Tâm ma trong Lôi Kiếp Kim Đan gọi là gì?", "Tâm Ma Kiếp / Ảo Phong Ma"],
  ["Đặc điểm linh lực tu sĩ Kim Đan là gì?", "Cô đọng thành Kim Đan rắn chắc trong Đan Điền"],
  ["Kim Đan bị rạn nứt, nguy cơ lớn nhất là gì?", "Tu vi rơi rụng, Kim Đan vỡ nát tử vong"],
  ["Bổ Kim Đan có tác dụng chính là gì?", "Vá lại nếp rạn nứt trên Kim Đan"],
  ["Địa Mạch Kim Đan khác Thiên Mạch Kim Đan thế nào?", "Phẩm cấp và tiềm năng tiến cấp Nguyên Anh kém hơn"],
  ["Thần Thức Kim Đan có thể quét xa đến đâu?", "Hàng chục đến hàng trăm dặm"],
  ["Luyện Kim Đan yêu cầu điều gì khắt khe nhất?", "Đạo tâm kiên định chịu đựng Lôi Kiếp tôi luyện"],
  ["Nguyên Anh Kỳ đánh dấu bước ngoặt sinh mệnh nào?", "Đập tan Kim Đan, hóa thành Nguyên Anh"],
  ["Nguyên Anh có khả năng gì khi xác thịt bị hủy diệt?", "Xuất khiếu, tìm thân xác mới để Đoạt Xá"],
  ["Đoạt Xá có hạn chế lớn nhất là gì?", "Chỉ có thể đoạt xá giới hạn lần và khó đạt đỉnh phong cũ"],
  ["Tâm Ma Kiếp Nguyên Anh tấn công trực tiếp vào đâu?", "Thần Thức và Nguyên Hồn"],
  ["Thiên Kiếp Nguyên Anh thường có bao nhiêu luồng lôi kiếp?", "Tam Thập Lục hoặc Tứ Cửu Trọng Lôi Kiếp"],
  ["Nguyên Anh Phụ Thể dùng để làm gì?", "Tăng cường khả năng chiến đấu vượt cấp trong thời gian ngắn"],
  ["Nguyên Anh Tử Khí xảy ra khi nào?", "Nguyên Anh bị tà khí xâm nhập biến thành màu đen"],
  ["Tu sĩ Nguyên Anh có thọ nguyên khoảng bao nhiêu?", "1.000 - 2.000 năm"],
  ["Tịnh Hóa Nguyên Anh bằng nguyên liệu nào tốt nhất?", "Ngộ Đạo Trà và Định Thần Hương"],
  ["Nguyên Anh có thể thi triển thần thông nào?", "Di hình hoán vị, thu nhỏ đại địa"],
  ["Bản chất của Hóa Thần Kỳ là gì?", "Nguyên Anh dung hợp Thiên Địa Quy Tắc, cảm ngộ Ý Cảnh"],
  ["Điều kiện tiên quyết để bước vào Hóa Thần là gì?", "Ngộ ra ít nhất một loại Ý Cảnh hoặc Quy Tắc"],
  ["Hóa Thần tu sĩ thường hóa thân phàm nhân để làm gì?", "Trải nghiệm Hóa Thần Phàm Gian"],
  ["Ý Cảnh nào thuộc hàng chí cao?", "Sinh Tử, Không Gian và Luân Hồi Ý Cảnh"],
  ["Tâm Ma Hóa Thần thường biến thành hình dạng gì?", "Bản thể thứ hai đại diện mặt tối và chấp niệm"],
  ["Hóa Thần có thể thao túng thứ gì trong giao tranh?", "Năng lượng Thiên Địa Quy Tắc xung quanh"],
  ["Lĩnh Vực của tu sĩ Hóa Thần là gì?", "Không gian quy tắc riêng do tu sĩ làm chủ"],
  ["Hóa Thần Viên Mãn cần lĩnh ngộ gì để lên Luyện Hư?", "Hư Không Chi Đạo"],
  ["Thọ nguyên tu sĩ Hóa Thần đạt tới bao nhiêu?", "5.000 năm"],
  ["Hóa Thần rơi vào Tà Đạo, Ý Cảnh sẽ biến thành gì?", "Ma Vực hoặc Tà Ý Cảnh"],
  ["Ý nghĩa chữ Hư trong Luyện Hư là gì?", "Luyện Hóa Hư Không, biến thân thể nhập vào hư vô"],
  ["Luyện Hư bắt đầu tiếp xúc cấp độ thế giới nào?", "Linh Giới hoặc Thượng Giới Quy Tắc"],
  ["Gặp vết nứt không gian, tu sĩ Luyện Hư cần làm gì?", "Nhập Hư Không Quy Tắc để chống đỡ và di chuyển"],
  ["Tâm ma Luyện Hư nguy hiểm ở điểm nào?", "Làm tu sĩ vĩnh viễn lạc trong Hư Không"],
  ["Pháp Tướng Thiên Địa Luyện Hư có đặc điểm gì?", "Ngưng tụ khổng lồ hàng ngàn trượng mang uy áp quy tắc"],
  ["Luyện Hư khác Hóa Thần ở điểm cốt lõi nào?", "Luyện Hư dung hợp quy tắc vào thân thể"],
  ["Thánh Thể Hư Không giúp tu sĩ làm gì?", "Tự do đi lại trong hư không không sợ bão không gian"],
  ["Suy kiếp của tu sĩ Luyện Hư gọi là gì?", "Thiên Nhân Ngũ Suy"],
  ["Tu sĩ Luyện Hư có thọ nguyên khoảng bao nhiêu?", "10.000 năm"],
  ["Dung nạp Hư Không Linh Khí đòi hỏi điều gì?", "Đạo tâm thanh tĩnh không chút tạp niệm"],
  ["Hợp Thể Kỳ có nghĩa là gì?", "Thể Xác, Nguyên Anh và Thiên Địa Quy Tắc hợp làm một"],
  ["Sức mạnh tu sĩ Hợp Thể thay đổi ra sao?", "Nhất cử nhất động đều đại diện Thiên Địa Uy Áp"],
  ["Tâm Ma Kiếp Hợp Thể nguy hiểm nhất là gì?", "Nguyên Anh và Thân Xác nứt vỡ không thể dung hợp"],
  ["Phân Thân Thuật Hợp Thể khác biệt thế nào?", "Phân thân có chiến lực gần tương đương Bản Thể"],
  ["Độ Kiếp Hợp Thể cần vượt qua loại Lôi Kiếp nào?", "Lục Cửu hoặc Bát Thập Nhất Trọng Thiên Kiếp"],
  ["Vật phẩm bảo mệnh thường có của tu sĩ Hợp Thể là gì?", "Tiên Phù hoặc Thế Tử Phù"],
  ["Uy áp Hợp Thể đối với tu sĩ cấp thấp có thể làm gì?", "Khiến đối phương quỳ rạp, vỡ nát Đạo tâm"],
  ["Ngộ ra Đại Đạo Quy Tắc, tu sĩ Hợp Thể sẽ thế nào?", "Chạm tới ngưỡng cửa Đại Thừa Kỳ"],
  ["Thọ nguyên tu sĩ Hợp Thể khoảng bao nhiêu?", "20.000 - 30.000 năm"],
  ["Dung hợp Thân Xác và Nguyên Anh thất bại, kết cục là gì?", "Thân tử đạo tiêu, hóa thành tro bụi"],
  ["Tu sĩ Đại Thừa được tôn xưng là gì?", "Chân Nhân, Đôn Đại Đạo Giả hoặc Chuẩn Tiên"],
  ["Nhiệm vụ chính của tu sĩ Đại Thừa là gì?", "Chuyển hóa Linh lực thành Tiên Nguyên Lực, chuẩn bị Phi Thăng"],
  ["Đại Thừa khác các cảnh giới trước ở điểm nào?", "Đã chạm tới cực hạn của Hạ Giới"],
  ["Tâm Ma ở Đại Thừa Kỳ gọi là gì?", "Tiên Chấp Tâm Ma"],
  ["Linh lực Đại Thừa dần biến đổi thành gì?", "Tiên Nguyên Khí hoặc Tiên Chi Lực"],
  ["Đại chiến giữa hai tu sĩ Đại Thừa có thể dẫn đến gì?", "Vỡ nát không gian, diệt vong cả một đại lục"],
  ["Tu sĩ Đại Thừa có thể sống bao lâu ở Hạ Giới?", "Gần như vô tận, trên 50.000 năm cho tới Độ Kiếp"],
  ["Bảo vật tu sĩ Đại Thừa thường dùng cấp nào?", "Bán Tiên Khí hoặc Chuẩn Tiên Khí"],
  ["Trước Độ Kiếp để Phi Thăng, tu sĩ Đại Thừa cần gì?", "Tịnh hóa hoàn toàn Đạo tâm, đạt Viên Mãn tuyệt đối"],
  ["Lạc Tiên Kiếp xảy ra khi nào?", "Khi Ma tâm xâm nhập lúc chuyển hóa Tiên Nguyên"],
  ["Độ Kiếp Kỳ đại diện cho khoảnh khắc nào?", "Đón nhận Cửu Thiên Cửu Trọng Tiên Kiếp để Phi Thăng"],
  ["Cửu Cửu Trọng Lôi Kiếp có sức mạnh ra sao?", "Hủy diệt vạn vật, chỉ Đạo Tâm và Tiên Thể hoàn hảo mới sống sót"],
  ["Sau khi vượt qua Lôi Kiếp, hiện tượng gì xuất hiện?", "Tiên Quang Tiếp Dẫn từ Tiên Giới chiếu xuống"],
  ["Lôi Kiếp thất bại nhưng Nguyên Hồn sống sót, tu sĩ thành gì?", "Tán Tiên"],
  ["Tâm Ma cuối cùng trước Phi Thăng gọi là gì?", "Cửu Ung Tâm Ma Kiếp"],
  ["Chống lại Cửu Cửu Trọng Lôi Kiếp cần chuẩn bị gì?", "Tiên Trận, Chuẩn Tiên Khí, Tẩy Tâm Đan và Đạo Tâm bất biến"],
  ["Thân Tử Đạo Tiêu trong Độ Kiếp nghĩa là gì?", "Thân xác và thần thức bị thiên lôi đánh thành tro bụi"],
  ["Khi Tiên Quang Tiếp Dẫn xuất hiện, tu sĩ sẽ làm gì?", "Tái tạo cơ thể thành Tiên Thể, bước lên Tiên Giới"],
  ["Nghịch Thiên Cải Mệnh trong tu tiên có ý nghĩa gì?", "Vượt qua quy luật sinh lão bệnh tử để chứng Trường Sinh Tiên Đạo"],
  ["Tán Tiên phải đối mặt điều khủng khiếp nhất là gì?", "Bách Niên Tiên Kiếp ngày càng mạnh cho đến khi diệt vong"],
];

const WRONG_ANSWERS = ["Nuốt linh thạch để tăng cảnh giới", "Rời bỏ đạo tâm và chọn đường tắt", "Không liên quan đến tu hành"] as const;
const QUIZ_QUESTIONS: QuizQuestion[] = REALM_QUESTIONS.map(([question, correct], index) => ({
  question,
  answers: [correct, WRONG_ANSWERS[0], WRONG_ANSWERS[1], WRONG_ANSWERS[2]],
  correctIndex: 0,
  stage: Math.floor(index / 10),
}));

export function createQuizEvent(stage: number, realmName: string): QuizEventData {
  const realmQuestions = QUIZ_QUESTIONS.filter((question) => question.stage === Math.min(8, Math.max(0, stage)));
  const question = (realmQuestions[Math.floor(Math.random() * realmQuestions.length)] ?? QUIZ_QUESTIONS[0])!;
  const answers = [...question.answers];
  const correct = answers[question.correctIndex]!;
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j]!, answers[i]!];
  }
  return {
    id: `quiz-${Date.now()}`,
    title: "Khảo Tâm Ma · Thử Thách Tâm Cảnh",
    question: question.question,
    answers,
    correctIndex: answers.indexOf(correct),
    baseStones: 30 + stage * 18,
    baseQiPct: Math.min(0.35, 0.08 + stage * 0.015),
    realmName,
  };
}

const HERB_LABEL: Record<string, string> = {
  linhthao: "Linh Thảo",
  huyetchi: "Huyết Chi",
  bangnien: "Băng Liên",
  longdam: "Long Đảm Thảo",
};

const PILL_LABEL: Record<string, string> = {
  tukhi: "Tụ Khí Đan",
  phacanh: "Phá Cảnh Đan",
  hotam: "Hộ Tâm Đan",
  nguythan: "Ngưng Thần Đan",
};

// Phần thưởng vật phẩm chỉ được gắn ở nhánh rewards, không bao giờ ở penalties.
function outcomeTag(delta: AdventureReward | AdventurePenalty): string {
  const parts: string[] = [];
  if (delta.qiPct) {
    parts.push(`[${delta.qiPct > 0 ? "+" : "-"} ${Math.abs(Math.round(delta.qiPct * 100))}% tu vi]`);
  }
  const reward = delta as AdventureReward;
  if (reward.herbId && reward.herbQty) {
    parts.push(`[+ ${reward.herbQty} ${HERB_LABEL[reward.herbId] ?? "Linh Thảo"}]`);
  }
  if (reward.pillId && reward.pillQty) {
    parts.push(`[+ ${reward.pillQty} ${PILL_LABEL[reward.pillId]}]`);
  }
  return parts.length ? " " + parts.join(" ") : "";
}

function bakeEvent(e: ModalEventData): ModalEventData {
  return {
    ...e,
    option1: {
      ...e.option1,
      successText: e.option1.successText + outcomeTag(e.option1.rewards),
      failText: e.option1.failText + outcomeTag(e.option1.penalties),
    },
    option2: {
      ...e.option2,
      successText: e.option2.successText + outcomeTag(e.option2.rewards),
      failText: e.option2.failText + outcomeTag(e.option2.penalties),
    },
  };
}

const BASE_EVENTS: ModalEventData[] = [
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
      rewards: { qiPct: 0.25, herbId: "linhthao", herbQty: 3, pillId: "tukhi", pillQty: 1 },
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
      rewards: { stones: 150, herbId: "huyetchi", herbQty: 2, pillId: "phacanh", pillQty: 1 },
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
      rewards: { herbId: "huyetchi", herbQty: 4, stones: 30, pillId: "hotam", pillQty: 1 },
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
      rewards: {},
      penalties: {},
    },
  },
  // ==========================================
  // 24 SỰ KIỆN KỲ NGỘ BỔ SUNG (tổng 32, tỷ lệ kích hoạt giữ nguyên 5%)
  // ==========================================
  {
    id: "duoc_lieu_vach_nui",
    title: "Dược Liêu Vách Núi",
    description:
      "Trên vách núi dựng đứng, một khóm dược liệu quý tỏa hương thơm ngát. Dưới đó là vực sâu nghìn trượng, một bước sai là thân bại danh liệt.",
    option1: {
      text: "Trèo lên hái dược liệu bằng thân pháp",
      winRate: 0.55,
      successText: "Thân pháp nhẹ nhàng, ngươi hái trọn khóm dược liệu quý.",
      failText: "Đá vụn sạt lở, ngươi suýt rơi xuống vực và vội leo lên tay không.",
      rewards: { herbId: "huyetchi", herbQty: 3, stones: 40 },
      penalties: { qiPct: -0.1 },
    },
    option2: {
      text: "Dùng Kim Linh Căn cắt băng đá tạo mỏm đứng",
      winRate: 0.75,
      reqElement: "kim",
      successText: "Kiếm khí chạm khắc vách đá, dược liệu nằm gọn trong tay.",
      failText: "Vách đá cứng quá, kiếm khí phản chấn làm ngươi đau tay.",
      rewards: { herbId: "bangnien", herbQty: 1, stones: 30 },
      penalties: { qiPct: -0.08, stones: -10 },
    },
  },
  {
    id: "hiet_chien_yeu_lang",
    title: "Yêu Lang Giao Chiến",
    description:
      "Một đàn Yêu Lang bạc đang vây hãm một thương nhân trên lối mòn. Mùi máu tươi lan tỏa, quyết chiến đã đến.",
    option1: {
      text: "Xông vào chiến đấu cứu thương nhân",
      winRate: 0.5,
      successText: "Đàn lang tan vỡ, thương nhân cảm tạ và tặng linh thạch.",
      failText: "Yêu lang quá đông, ngươi phải rút lui trong thương tích.",
      rewards: { stones: 120, herbId: "linhthao", herbQty: 2 },
      penalties: { qiPct: -0.15, stones: -20 },
    },
    option2: {
      text: "Ngồi xem, chỉ ra tay khi đàn lang mệt mỏi",
      winRate: 0.7,
      successText: "Nhân lúc hỗn loạn, ngươi nhặt được chiến lợi phẩm rơi vãi.",
      failText: "Yêu lang phát hiện ngươi đang trốn, cả đàn quay sang truy sát.",
      rewards: { stones: 60 },
      penalties: { qiPct: -0.12, stones: -25 },
    },
  },
  {
    id: "son_dong_kiem_y",
    title: "Kiếm Ý Sơn Động",
    description:
      "Trong một sơn động cổ, hàng trăm vết kiếm trên vách đá vẫn còn vang vọng kiếm ý sau nghìn năm. Nghe kỹ, tự nhiên lòng ngươi rung động.",
    option1: {
      text: "Ngồi tĩnh tâm cảm ngộ vết kiếm",
      winRate: 0.45,
      successText: "Khoảnh khắc tỏa sáng, ngươi lĩnh ngộ một tia kiếm ý cổ xưa!",
      failText: "Kiếm ý quá sâu, đầu ngươi ong ong phải rút lui.",
      rewards: { qiPct: 0.3, stones: 50 },
      penalties: { qiPct: -0.1 },
    },
    option2: {
      text: "Dùng Thủy Linh Căn dẫn linh khí động phủ vào thân",
      winRate: 0.7,
      reqElement: "thuy",
      successText: "Linh khí như nước cuộn vào kinh mạch, tu vi tiến thêm.",
      failText: "Linh khí động phủ phản kháng, ngươi bị đẩy ra khỏi động.",
      rewards: { qiPct: 0.18 },
      penalties: { qiPct: -0.08 },
    },
  },
  {
    id: "thuong_nhan_duoc",
    title: "Phường Dược Vật",
    description:
      "Một thương nhân dược liệu lang thang mời ngươi trao đổi: ngươi đưa linh thạch, hắn đưa bảo thảo hiếm có.",
    option1: {
      text: "Đổi linh thạch lấy Long Đảm Thảo",
      winRate: 0.6,
      successText: "Trao đổi viên mãn, dược liệu chất lượng tuyệt hảo.",
      failText: "Bị bán dược liệu giả, tiền mất tật mang.",
      rewards: { herbId: "longdam", herbQty: 1, stones: -80 },
      penalties: { stones: -100 },
    },
    option2: {
      text: "Đàm phán ép giá xuống",
      winRate: 0.4,
      successText: "Miệng lưỡi tài tình, thương nhân nhượng bộ giá rẻ bất ngờ.",
      failText: "Thương nhân bực tức bỏ đi, ngươi mất cả uy tín lẫn tiền cọc.",
      rewards: { herbId: "linhthao", herbQty: 3, stones: -30 },
      penalties: { stones: -50 },
    },
  },
  {
    id: "ma_tu_mai_phuc",
    title: "Mai Phục Ma Tu",
    description:
      "Bước qua rừng trúc, một toán ma tu bật ra mai phục! Khói đen cuộn trào, chúng rình mời linh khí trong người ngươi.",
    option1: {
      text: "Vận toàn chân khí chiến đấu xuyên phá",
      winRate: 0.45,
      successText: "Ma tu tan tác, ngươi thu hồi chiến lợi phẩm chúng cướp được!",
      failText: "Ma công hùng hậu, ngươi bị hút mất một phần linh khí.",
      rewards: { stones: 150, qiPct: 0.05 },
      penalties: { qiPct: -0.2, stones: -30 },
    },
    option2: {
      text: "Ném túi linh thạch làm mồi nhử rồi bỏ chạy",
      winRate: 0.75,
      successText: "Ma tu mải giành mồi, ngươi thoát thân chỉ thiệt ít.",
      failText: "Ma tu tham lam truy đuổi, ngươi mất thêm khí huyết khi chạy trốn.",
      rewards: { stones: -20 },
      penalties: { qiPct: -0.15, stones: -40 },
    },
  },
  {
    id: "son_block_duong",
    title: "Cự Thạch Chặn Đường",
    description:
      "Một tảng cự thạch ngàn tấn lăn xuống chặn ngang lối mòn. Quanh đi quẩn lại không có đường vòng, ngươi phải quyết định nhanh.",
    option1: {
      text: "Dùng Thổ Linh Căn làm cự thạch nhường đường",
      winRate: 0.8,
      reqElement: "tho",
      successText: "Địa mạch nghe theo, cự thạch lăn sang bên, đường mở toang.",
      failText: "Cự thạch bất động, ngươi hao tổn chân khí vô ích.",
      rewards: { stones: 20 },
      penalties: { qiPct: -0.1, stones: -15 },
    },
    option2: {
      text: "Thuê một nhóm tán tu khiêng đá",
      winRate: 0.6,
      successText: "Đá được dời, ngươi trả công xứng đáng và đi tiếp.",
      failText: "Nhóm tán tu đòi giá chát, túi linh thạch ngươi nhẹ hẳn.",
      rewards: { stones: -30 },
      penalties: { stones: -60 },
    },
  },
  {
    id: "thien_nhien_tinh_tam",
    title: "Tịnh Tâm Thiên Nhiên",
    description:
      "Một thác nước nhỏ chảy giữa rừng trúc, gió mang theo hương hoa. Ở đây linh khí trong lành hiếm thấy, thích hợp ngồi thiền.",
    option1: {
      text: "Ngồi thiền bên thác cả buổi chiều",
      winRate: 0.85,
      successText: "Tâm như nước lặng, linh khí dồi dào tràn vào kinh mạch.",
      failText: "Tiếng thác làm ngươi tán loạn, chỉ thu được chút ít.",
      rewards: { qiPct: 0.2 },
      penalties: { qiPct: 0.05 },
    },
    option2: {
      text: "Hái vài bông linh hoa quanh thác rồi đi tiếp",
      winRate: 0.65,
      successText: "Linh hoa hái được đầy tay, thơm ngát cả túi trữ vật.",
      failText: "Dẫm phải bùn lầy, ngươi vừa mất công vừa mất dược liệu.",
      rewards: { herbId: "linhthao", herbQty: 2 },
      penalties: { qiPct: -0.05, stones: -10 },
    },
  },
  {
    id: "di_tich_thuong_co",
    title: "Di Tích Thượng Cổ",
    description:
      "Một phế tích thượng cổ lộ ra khỏi lớp đất sau cơn mưa lớn. Trên cổng đá khắc hai chữ: 'Hữu duyên giả đắc'. Cơ duyên hay tử kiếp, chưa ai biết.",
    option1: {
      text: "Vào sâu khám phá phế tích",
      winRate: 0.3,
      successText: "Chỉ ngươi có duyên! Một kiện pháp bảo thượng cổ bay vào tay ngươi!",
      failText: "Cấm chế thượng cổ kích hoạt, ngươi phải bỏ mạng thoát thân.",
      rewards: { artifact: true, stones: 100 },
      penalties: { qiPct: -0.2, stones: -50 },
    },
    option2: {
      text: "Chỉ nhặt vài di vật ngoài rìa rồi rút",
      winRate: 0.85,
      successText: "Nhặt được vài linh thạch và mảnh ngọc cổ an toàn.",
      failText: "Dù chỉ đứng ngoài rìa, một tia cấm chế vẫn quét trúng ngươi.",
      rewards: { stones: 40 },
      penalties: { qiPct: -0.08 },
    },
  },
  {
    id: "hac_thi_dem",
    title: "Hắc Thị Ban Đêm",
    description:
      "Khi trăng lưỡi liềm mọc lên, một khu chợ đen hiện ra trong ngõ nhỏ. Nơi đây bán mọi thứ, kể cả những thứ không nên mua.",
    option1: {
      text: "Mua bí kíp không nguồn gốc",
      winRate: 0.45,
      successText: "Bí kíp thật! Ngươi học thêm một đoạn khẩu quyết tu luyện.",
      failText: "Hàng giả chứa ma khí, ngươi phải tốn công xua đuổi.",
      rewards: { qiPct: 0.15 },
      penalties: { qiPct: -0.12, stones: -40 },
    },
    option2: {
      text: "Bán bớt dược liệu dư cho thương nhân ma đạo",
      winRate: 0.7,
      successText: "Giá hắc thị hậu hĩ, túi linh thạch phình to.",
      failText: "Bị ma tu trêu giá, ngươi bị ép bán rẻ rồi bị đuổi ra.",
      rewards: { stones: 90 },
      penalties: { stones: -20 },
    },
  },
  {
    id: "thac_tu_khi",
    title: "Thác Tụ Khí",
    description:
      "Một dòng thác cao ngàn trượng, dưới chân thác tích tụ cả một hồ linh khí sền sệt như sữa. Nghe đồn thiền dưới thác ba ngày bằng tu luyện ba tháng.",
    option1: {
      text: "Ngồi dưới chân thác cho linh khí dội vào người",
      winRate: 0.5,
      successText: "Linh khí cuồn cuộn dội vào, kinh mạch rộng mở, tu vi nhảy vọt!",
      failText: "Dòng nước quá mãnh, ngươi bị cuốn trôi lên bờ trong uể oải.",
      rewards: { qiPct: 0.25 },
      penalties: { qiPct: -0.1 },
    },
    option2: {
      text: "Đựng nước linh hồ vào bình mang đi",
      winRate: 0.7,
      successText: "Một bình linh dịch quý giá, có thể đổi lấy nhiều linh thạch.",
      failText: "Bình bị áp lực nước nứt vỡ, linh dịch chảy hết.",
      rewards: { stones: 100 },
      penalties: { stones: -15 },
    },
  },
  {
    id: "ho_bang_ngu",
    title: "Hồ Băng Ngư Vương",
    description:
      "Dưới lớp băng dày của hồ núi tuyết, một con Linh Ngư Vương lấp lánh ánh kim bơi lượn. Bắt được nó, thập niên tu luyện không lo tài nguyên.",
    option1: {
      text: "Phá băng bắt ngư bằng tay không",
      winRate: 0.35,
      successText: "Linh Ngư Vương hoảng loạn lao vào lưới tay ngươi!",
      failText: "Ngư vương quẫy đuôi, ngươi ướt lạnh từ đầu tới chân.",
      rewards: { stones: 180, qiPct: 0.05 },
      penalties: { qiPct: -0.12 },
    },
    option2: {
      text: "Dùng Thủy Linh Căn sai khiến hồ nước bắt ngư",
      winRate: 0.8,
      reqElement: "thuy",
      successText: "Nước hồ ôm lấy ngư vương đưa lên bờ, nhẹ nhàng như trò đùa.",
      failText: "Ngư vương là linh vật có linh tính, kháng lại ý chí của ngươi.",
      rewards: { stones: 120, herbId: "bangnien", herbQty: 1 },
      penalties: { qiPct: -0.08 },
    },
  },
  {
    id: "tran_phap_co",
    title: "Trận Pháp Bát Quái",
    description:
      "Giữa trảng đá, một trận pháp bát quái cổ đang vận chuyển chậm rãi. Tâm trung ẩn chứa linh vật, nhưng bước nhầm ô là bị trận pháp nghiền nát.",
    option1: {
      text: "Quan sát quy luật rồi bước theo ô sinh",
      winRate: 0.55,
      successText: "Bước chuẩn từng ô, ngươi lấy được linh vật trung tâm!",
      failText: "Bước nhầm ô tử, trận pháp đánh ngươi văng ra ngoài.",
      rewards: { stones: 130, qiPct: 0.08 },
      penalties: { qiPct: -0.15, stones: -20 },
    },
    option2: {
      text: "Cưỡng ép phá trận bằng chân khí",
      winRate: 0.25,
      successText: "Trận pháp vỡ vụn, linh vật rơi vào tay ngươi.",
      failText: "Trận pháp phản phệ, chân khí của ngươi hao tổn nặng.",
      rewards: { artifact: true },
      penalties: { qiPct: -0.22 },
    },
  },
  {
    id: "dan_lao_quy",
    title: "Đan Lò Cũ Kỹ",
    description:
      "Một đan lò bỏ hoang vẫn còn nhiệt dư, bên trong có mùi đan dược thoang thoảng. Có thể lò còn sót một lò đan cuối cùng chưa ai lấy.",
    option1: {
      text: "Thử mở nắp đan lò lấy đan",
      winRate: 0.6,
      successText: "Lò đan nguyên vẹn, vài viên đan dược nằm im trong đó!",
      failText: "Đan đã hóa độc khí, ngươi hít phải phải vận công xua tan.",
      rewards: { stones: 70, qiPct: 0.1 },
      penalties: { qiPct: -0.15 },
    },
    option2: {
      text: "Tháo linh thạch nguồn nhiệt của lò mang đi",
      winRate: 0.8,
      successText: "Linh thạch lò vẫn tốt, bán được giá cao.",
      failText: "Nhiệt lò bùng lên, ngươi bị bỏng nhẹ khi tháo rời.",
      rewards: { stones: 60 },
      penalties: { qiPct: -0.05, stones: -10 },
    },
  },
  {
    id: "linh_thu_con",
    title: "Linh Thú Con Bơ Vơ",
    description:
      "Một con linh thú con lông bạc nằm cuộn tròn bên xác mẫu thú. Nó rên rỉ yếu ớt, đôi mắt ngập nước nhìn ngươi.",
    option1: {
      text: "Cho thú con ăn dược liệu và chăm sóc",
      winRate: 0.75,
      successText: "Thú con hồi phục, khẽ cọ đầu vào người ngươi như cảm tạ.",
      failText: "Thú con quá yếu, chỉ giữ được chút sức rồi lặng lẽ ngủ forever.",
      rewards: { qiPct: 0.12, stones: 30 },
      penalties: { qiPct: -0.05 },
    },
    option2: {
      text: "Bỏ mặc, tranh thủ lục soát tổ linh thú",
      winRate: 0.6,
      successText: "Tổ linh thú để lại không ít tài nguyên đáng giá.",
      failText: "Linh khí hộ thể của mẫu thú còn sót lại, đánh ngươi văng xa.",
      rewards: { stones: 90 },
      penalties: { qiPct: -0.12 },
    },
  },
  {
    id: "mo_co_thuong",
    title: "Mộ Cổ Thương Sinh",
    description:
      "Một ngôi mộ cổ chôn vùi cả một thời đại, bia đá khắc chữ 'Thương sinh bình đẳng'. Sương trắng quanh mộ không tan dù nắng gắt.",
    option1: {
      text: "Kính cẩn quỳ lạy rồi mới vào thăm",
      winRate: 0.7,
      successText: "Lòng thành cảm động, một tia linh khí phúc mộc nhập thể.",
      failText: "Sương mộ lạnh lẽo ngấm vào xương, ngươi run cầm cập.",
      rewards: { qiPct: 0.18, stones: 40 },
      penalties: { qiPct: -0.08 },
    },
    option2: {
      text: "Đào mộ lấy tài nguyên ngay lập tức",
      winRate: 0.35,
      successText: "Mộ chứa nhiều linh thạch tùy táng, ngươi thu lợi lớn!",
      failText: "Uy áp của mộ chủ trấn xuống, ngươi bỏ chạy trắng tay.",
      rewards: { stones: 160 },
      penalties: { qiPct: -0.15, stones: -30 },
    },
  },
  {
    id: "rung_suong_ma",
    title: "Rừng Sương Mộ Khí",
    description:
      "Một khu rừng bao trùm bởi sương mộ màu tím nhạt. Trong sương, bóng đen lờ lờ di chuyển, tiếng thở dài vẳng lại khắp nơi.",
    option1: {
      text: "Cầm đèn pháp khí rẽ sương đi xuyên rừng",
      winRate: 0.5,
      successText: "Đèn xua tan mộ khí, ngươi cắt ngắn đường và tìm thấy linh dược!",
      failText: "Mộ khí quá nặng, ngươi đi vòng vòng và kiệt sức.",
      rewards: { herbId: "longdam", herbQty: 1 },
      penalties: { qiPct: -0.18 },
    },
    option2: {
      text: "Vòng ra ngoài, đi đường dài an toàn",
      winRate: 0.85,
      successText: "Đường xa nhưng bình an, tiện tay hái vài cây linh thảo ven đường.",
      failText: "Trên đường vòng vẫn gặp yêu thú nhỏ quấy phá.",
      rewards: { herbId: "linhthao", herbQty: 1 },
      penalties: { qiPct: -0.05 },
    },
  },
  {
    id: "trai_tien_nhan",
    title: "Trại Tu Sĩ Thất Tiêu",
    description:
      "Một trại tu sĩ bị bỏ hoang đột ngột: nồi cơm còn ấm, pháp khí còn treo. Chỉ có vết ma khí đen kịt trên tường là báo hiệu điều chẳng lành.",
    option1: {
      text: "Lục soát trại lấy tài nguyên",
      winRate: 0.55,
      successText: "Trại chứa không ít linh thạch và dược liệu bỏ lại.",
      failText: "Ma khí ẩn trong trại quấn lấy ngươi, phải phí chân khí xua đuổi.",
      rewards: { stones: 110, herbId: "linhthao", herbQty: 2 },
      penalties: { qiPct: -0.15 },
    },
    option2: {
      text: "Truy theo dấu vết để cứu tu sĩ bị bắt",
      winRate: 0.4,
      successText: "Cứu người thành công, các tu sĩ cảm tạ bằng kho tài sản của trại!",
      failText: "Dấu vết dẫn vào ổ ma đạo, ngươi phải rút lui bị thương.",
      rewards: { stones: 200, qiPct: 0.05 },
      penalties: { qiPct: -0.18, stones: -20 },
    },
  },
  {
    id: "kiem_trung",
    title: "Kiếm Trủng Vạn Kiếm",
    description:
      "Một thung lũng cắm đầy ngàn thanh kiếm gỉ, mỗi thanh đều chứa ý chí chủ nhân xưa. Gió thổi qua, cả thung lũng ngân vang tiếng kiếm minh.",
    option1: {
      text: "Cầu kiếm, để kiếm chọn chủ",
      winRate: 0.35,
      successText: "Một thanh cổ kiếm bay vào tay ngươi, tự nhận chủ!",
      failText: "Ngàn kiếm cùng minh chói tai, ngươi bị kiếm khí cắt nhẹ.",
      rewards: { artifact: true },
      penalties: { qiPct: -0.1 },
    },
    option2: {
      text: "Nhặt mảnh kiếm gỉ bán ve chai",
      winRate: 0.9,
      successText: "Một đống mảnh kiếm cổ, thương nhân trả giá hậu hĩnh.",
      failText: "Mảnh kiếm vụn vụn bể, không đáng bao nhiêu.",
      rewards: { stones: 50 },
      penalties: { stones: -5 },
    },
  },
  {
    id: "hoa_duyet_ban",
    title: "Hoa Dị Bản Nửa Đêm",
    description:
      "Đêm trăng tròn, một đóa hoa thất sắc nở rộ trong chớp mắt. Tương truyền đóa hoa này nở mỗi trăm năm một lần, cánh hoa có thể luyện đan thượng phẩm.",
    option1: {
      text: "Hái cánh hoa ngay khi nở rộ",
      winRate: 0.5,
      successText: "Cánh hoa còn phảng phất linh khí, trân quý vô giá!",
      failText: "Hoa khép lại trước khi ngươi chạm tới, chỉ còn hương thơm.",
      rewards: { herbId: "bangnien", herbQty: 2 },
      penalties: { qiPct: -0.05 },
    },
    option2: {
      text: "Ngồi thiền hấp thụ hoa hương thay vì hái",
      winRate: 0.65,
      successText: "Hoa hương nhập thể, tâm cảnh thanh tịnh tu vi tăng.",
      failText: "Hoa hương quá nồng, ngươi choáng váng ngất lịm một chốc.",
      rewards: { qiPct: 0.2 },
      penalties: { qiPct: -0.1 },
    },
  },
  {
    id: "dau_gia_linh_vat",
    title: "Đấu Giá Linh Vật",
    description:
      "Vạn Bảo Các khai mạc phiên đấu giá, vật cuối cùng là một túi trữ vật không ai biết bên trong chứa gì. Giá khởi điểm rất thấp.",
    option1: {
      text: "Trả giá cao giành túi trữ vật",
      winRate: 0.4,
      successText: "Túi trữ vật mở ra: tài sản bên trong gấp nhiều lần số tiền bỏ ra!",
      failText: "Bên trong chỉ toàn rác rưởi, ngươi thua trắng.",
      rewards: { stones: 180, artifact: true },
      penalties: { stones: -120 },
    },
    option2: {
      text: "Chỉ đứng xem, lén học mấy chiêu phào giá",
      winRate: 0.8,
      successText: "Học được vài bí quyết thẩm định, sau này mua hàng không sợ hớ.",
      failText: "Bị quản事 phát hiện, bị mời ra ngoài giữa chừng.",
      rewards: { stones: 25 },
      penalties: { stones: -15 },
    },
  },
  {
    id: "long_mac_dat",
    title: "Long Mạch Động Đất",
    description:
      "Mặt đất rung chuyển, một nhánh long mạch ngầm trồi lên làm linh khí nơi đây đặc quánh như sương. Cơ hội ngàn năm có một!",
    option1: {
      text: "Ngồi ngay trên long mạch tu luyện",
      winRate: 0.55,
      successText: "Long khí cuồn cuộn nhập thể, tu vi dâng trào như thủy triều!",
      failText: "Long khí quá bạo, kinh mạch ngươi chịu không nổi phải dừng.",
      rewards: { qiPct: 0.3 },
      penalties: { qiPct: -0.12 },
    },
    option2: {
      text: "Đào lấy vài khối long linh thạch",
      winRate: 0.7,
      successText: "Long linh thạch trân quý, đủ đổi một món pháp khí nhỏ.",
      failText: "Long mạch thu hồi, đất khép lại nuốt mất dụng cụ của ngươi.",
      rewards: { stones: 140 },
      penalties: { stones: -35 },
    },
  },
  {
    id: "dao_huu_giao_dich",
    title: "Đạo Hữu Cầu Giao Dịch",
    description:
      "Một đạo hữu gầy gò chặn đường ngươi, mời trao đổi: hắn cần dược liệu, ngươi cần tài nguyên. Vẻ ngoài hắn ẩn hiện sát khí mong manh.",
    option1: {
      text: "Trao đổi ngay, tin người trước",
      winRate: 0.65,
      successText: "Giao dịch xuôi chèo mát mái, cả hai đều vừa lòng.",
      failText: "Đạo hữu nhận hàng rồi biến mất trong chớp mắt, lừa đảo!",
      rewards: { stones: 100 },
      penalties: { stones: -20, qiPct: -0.03 },
    },
    option2: {
      text: "Yêu cầu ký đạo tâm thề trước khi giao dịch",
      winRate: 0.5,
      successText: "Đạo tâm thề lập, giao dịch tuyệt đối an toàn và hậu hĩ.",
      failText: "Hắn từ chối thề và nổi sát khí, hai bên bất hòa bỏ đi.",
      rewards: { stones: 130, herbId: "huyetchi", herbQty: 1 },
      penalties: { qiPct: -0.05 },
    },
  },
  {
    id: "cuu_tinh_lien_tru",
    title: "Lôi Kiếp Dư Ba",
    description:
      "Nơi đây vừa xảy ra một cơn thiên kiếp, đất nứt đá toé, tàn dư lôi điện vẫn chập chờn trên không. Linh thạch kiếp hậu nằm rải rác.",
    option1: {
      text: "Lao vào nhặt linh thạch kiếp hậu",
      winRate: 0.45,
      successText: "Linh thạch kiếp chứa lôi khí tinh thuần, giá trị gấp bội!",
      failText: "Tàn lôi giáng xuống, ngươi bị điện giật bốc khói.",
      rewards: { stones: 170, qiPct: 0.05 },
      penalties: { qiPct: -0.2 },
    },
    option2: {
      text: "Vận công hấp thụ tàn dư lôi điện luyện thể",
      winRate: 0.4,
      successText: "Lôi luyện thân thể, gân cốt cường tráng khác thường!",
      failText: "Lôi khí nghịch tấu, ngươi rung rinh ngã xuống miệng phun bọt.",
      rewards: { qiPct: 0.22 },
      penalties: { qiPct: -0.18, stones: -15 },
    },
  },
  {
    id: "quy_vu_dong",
    title: "Quỷ Vũ Đêm Mưa",
    description:
      "Đêm mưa, tiếng khóc nữ nhi vọng từ ngôi đình hoang. Ngọn đèn trong đình bập bùng, ma khí nhẹ nhàng nhưng không dễ chịu.",
    option1: {
      text: "Độ hóa oan hồn bằng chân khí chính đạo",
      winRate: 0.6,
      successText: "Oan hồn siêu thoát, nhả ra một viên hồn ngọc cảm tạ.",
      failText: "Oan hồn oán khí quá nặng, ngươi bị ám khí quấn vào người.",
      rewards: { stones: 90, qiPct: 0.08 },
      penalties: { qiPct: -0.15 },
    },
    option2: {
      text: "Né ngay lập tức, không dính dáng",
      winRate: 0.9,
      successText: "Ngươi đi vòng qua đình hoang, bình an vô sự.",
      failText: "Dù né nhanh, một tia ám khí vẫn chạm vào lưng ngươi.",
      rewards: { stones: 10 },
      penalties: { qiPct: -0.06 },
    },
  },
];

const EVENT_TEMPLATES: ModalEventData[] = [
  ...BASE_EVENTS.map(bakeEvent),
  ...createExpandedAdventureEvents(),
];

function createExpandedAdventureEvents(): ModalEventData[] {
  const templates: Array<{
    id: string;
    title: string;
    description: string;
    reqElement?: ElementId;
    good: string;
    bad: string;
    goodReward: AdventureReward;
    badPenalty: AdventurePenalty;
    firstText: string;
    secondText: string;
    secondWin: number;
    secondReward: AdventureReward;
    secondPenalty: AdventurePenalty;
  }> = [
    {
      id: "cao_nhan_truyen_thu_cong_phap",
      title: "Cao Nhân Truyền Thụ Công Pháp",
      description: "Một cao nhân ẩn thế xuất hiện bên suối, nguyện truyền công pháp nếu ngươi vượt qua thử thách tâm cảnh.",
      good: "Cao nhân gật đầu, công pháp tinh diệu lưu chuyển trong thức hải.",
      bad: "Tâm cảnh dao động, chân khí phản phệ khiến kinh mạch đau nhức.",
      goodReward: { qiPct: 0.25 }, badPenalty: { qiPct: -0.1 },
      firstText: "Giữ tâm bất động tiếp nhận truyền thừa", secondText: "Dùng linh thạch xin cao nhân chỉ điểm",
      secondWin: 0.55, secondReward: { qiPct: 0.12, stones: -80 }, secondPenalty: { qiPct: -0.05, stones: -40 },
    },
    {
      id: "nhan_phap_bao_hiếm", title: "Nhận Pháp Bảo Hiếm",
      description: "Một pháp bảo hiếm bị phong ấn trong khe núi, linh quang chớp tắt như đang tìm chủ nhân.",
      good: "Pháp bảo nhận chủ, linh lực hộ thể tăng lên.", bad: "Phong ấn bật ngược, ngươi bị pháp lực đánh lui.",
      goodReward: { artifact: true, stones: 80 }, badPenalty: { qiPct: -0.12, stones: -20 },
      firstText: "Dùng thần thức thử nhận chủ", secondText: "Phá phong ấn bằng linh thạch",
      secondWin: 0.45, secondReward: { artifact: true }, secondPenalty: { qiPct: -0.18, stones: -60 },
    },
    {
      id: "ky_ngo_ma_thu", title: "Kỳ Ngộ Ma Thú",
      description: "Một ma thú cổ đại bị thương nằm bên đường, đôi mắt đỏ rực nhưng chưa mất lý trí.",
      good: "Ma thú trao cho ngươi một giọt tinh huyết, khí tức bỗng tăng mạnh.", bad: "Ma tính bùng nổ, ngươi phải chật vật tránh móng vuốt.",
      goodReward: { qiPct: 0.2, stones: 60 }, badPenalty: { qiPct: -0.15, stones: -30 },
      firstText: "Dùng dược liệu chữa trị cho ma thú", secondText: "Thu phục ma thú bằng uy áp",
      secondWin: 0.35, secondReward: { artifact: true, qiPct: 0.1 }, secondPenalty: { qiPct: -0.22, stones: -45 },
    },
    {
      id: "cho_den_bi_mat", title: "Chợ Đen Bí Mật",
      description: "Sau bức tường đổ, một chợ đen bí mật mở cửa. Hàng hóa rẻ bất thường và người bán che kín mặt.",
      good: "Ngươi mua được món hàng thật, giao dịch đem lại lợi ích lớn.", bad: "Hàng giả phát nổ, linh thạch mất sạch một phần.",
      goodReward: { stones: 140 }, badPenalty: { stones: -100, qiPct: -0.05 },
      firstText: "Mua hộp hàng niêm phong", secondText: "Bán linh dược cho chủ chợ",
      secondWin: 0.7, secondReward: { stones: 90 }, secondPenalty: { stones: -35 },
    },
    {
      id: "bi_quyet_co_dai", title: "Bí Quyết Cổ",
      description: "Trên vách đá có khắc một bí quyết cổ, từng nét chữ tỏa ra uy áp của một thời đại đã mất.",
      good: "Ngươi lĩnh ngộ được tinh túy, tu vi tăng trưởng rõ rệt.", bad: "Ý cảnh cổ xưa quá mạnh, thần thức bị chấn thương.",
      goodReward: { qiPct: 0.3 }, badPenalty: { qiPct: -0.16 },
      firstText: "Tĩnh tâm lĩnh ngộ toàn bộ văn tự", secondText: "Chép lại bí quyết rồi đổi lấy linh thạch",
      secondWin: 0.65, secondReward: { stones: 110, qiPct: 0.08 }, secondPenalty: { qiPct: -0.08, stones: -20 },
    },
    {
      id: "tranh_chap_mon_phai", title: "Tranh Chấp Môn Phái",
      description: "Hai môn phái đang tranh giành một linh tuyền. Cả hai cùng mời ngươi đứng về phía mình.",
      good: "Ngươi phân xử công bằng, hai bên tặng linh thạch và dược liệu.", bad: "Tranh chấp bùng nổ, dư ba pháp thuật làm ngươi bị thương.",
      goodReward: { stones: 160, herbId: "linhthao", herbQty: 2 }, badPenalty: { qiPct: -0.14, stones: -40 },
      firstText: "Đứng ra làm người hòa giải", secondText: "Chọn môn phái mạnh hơn để trợ chiến",
      secondWin: 0.5, secondReward: { stones: 180, qiPct: 0.05 }, secondPenalty: { qiPct: -0.2, stones: -50 },
    },
  ];

  const variants = [
    ["Linh Tuyền", "Một linh tuyền", "linh khí tinh thuần", "moc" as ElementId],
    ["Cổ Động", "Một cổ động", "di vật thất truyền", "tho" as ElementId],
    ["Thiên Hồ", "Một thiên hồ", "hàn khí mênh mang", "thuy" as ElementId],
    ["Hỏa Vực", "Một hỏa vực", "hỏa linh cuồng bạo", "hoa" as ElementId],
    ["Kiếm Các", "Một kiếm các", "kiếm ý sắc bén", "kim" as ElementId],
    ["Mê Cảnh", "Một mê cảnh", "ảo quang kỳ dị", undefined],
    ["Vân Hải", "Một vân hải", "vân khí dày đặc", undefined],
    ["Tử Trúc Lâm", "Một tử trúc lâm", "mộc khí xanh biếc", "moc" as ElementId],
    ["Lôi Đài", "Một lôi đài", "lôi quang rền vang", undefined],
    ["Dược Cốc", "Một dược cốc", "hương thuốc nồng đậm", "moc" as ElementId],
    ["Băng Cung", "Một băng cung", "băng linh lạnh buốt", "thuy" as ElementId],
    ["Kim Sơn", "Một kim sơn", "kim khí dày đặc", "kim" as ElementId],
    ["Ma Uyên", "Một ma uyên", "ma khí đen kịt", undefined],
    ["Tinh Đài", "Một tinh đài", "tinh quang rực rỡ", undefined],
    ["Hoang Mạc", "Một hoang mạc", "địa khí khô nóng", "tho" as ElementId],
    ["Vạn Bảo Các", "Một vạn bảo các", "bảo quang lấp lánh", undefined],
  ] as const;

  return templates.flatMap((template, templateIndex) =>
    variants.map((variant, variantIndex) => {
      const [place, article, phenomenon, element] = variant;
      const reqElement = templateIndex % 2 === 0 ? element ?? template.reqElement : template.reqElement;
      const id = `${template.id}_${variantIndex + 1}`;
      return {
        id,
        title: `${template.title} — ${place}`,
        description: `${template.description} ${article} xuất hiện trước mặt, ${phenomenon} bao phủ bốn phía.`,
        option1: {
          text: template.firstText,
          winRate: 0.72,
          ...(reqElement ? { reqElement } : {}),
          successText: `${template.good}${template.goodReward.qiPct ? ` [+ ${Math.round(template.goodReward.qiPct * 100)}% tu vi]` : ""}`,
          failText: `${template.bad}${template.badPenalty.qiPct ? ` [- ${Math.abs(template.badPenalty.qiPct) * 100}% tu vi]` : ""}`,
          rewards: template.goodReward,
          penalties: template.badPenalty,
        },
        option2: {
          text: template.secondText,
          winRate: template.secondWin,
          successText: `${template.good}${template.secondReward.qiPct ? ` [+ ${Math.round(template.secondReward.qiPct * 100)}% tu vi]` : ""}`,
          failText: `${template.bad}${template.secondPenalty.qiPct ? ` [- ${Math.abs(template.secondPenalty.qiPct) * 100}% tu vi]` : ""}`,
          rewards: template.secondReward,
          penalties: template.secondPenalty,
        },
      };
    }),
  );
}

export function rollModalEvent(rng: () => number): ModalEventData {
  return EVENT_TEMPLATES[Math.floor(rng() * EVENT_TEMPLATES.length)]!;
}

export function elementName(element: ElementId): string {
  return ELEMENT_INFO[element].name;
}
