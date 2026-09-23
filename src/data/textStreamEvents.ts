export const ACTIONS = [
  "Trên đường hạ sơn lịch luyện,",
  "Sâu trong rừng trúc u tịnh,",
  "Tại một khe núi hoang vắng,",
  "Bên bờ suối linh khí dạt dào,",
  "Trong một phế tích cổ xưa,",
  "Lên đến đỉnh núi mây mù,",
  "Đi qua ngã ba sông linh thiêng,",
  "Ẩn mình trong động phủ xám,",
  "Đang lúc đi dạo quanh tông môn,",
  "Lạc vào một thung lũng sương mờ,",
  "Tại bờ bãi đá cổ ngàn năm,",
  "Men theo vách núi hiểm trở,",
  "Núp dưới bóng cổ thụ rậm rạp,",
  "Bên cạnh hồ nước đóng băng,",
  "Trên con đường mòn phủ đầy mêu xanh,",
];

// 100 sự kiện trung lập: không thay đổi tu vi, linh thạch hay linh thảo.
export const NEUTRAL_EVENTS = Array.from({ length: 100 }, (_, index) => ({
  text: [
    "ngắm mây trôi qua đỉnh núi, lòng thấy bình yên.",
    "nghe tiếng suối chảy, nghỉ chân một lát bên đường.",
    "gặp một đạo hữu lạ mặt và trao nhau lời chào.",
    "đi ngang qua một ngôi miếu cổ phủ đầy rêu xanh.",
    "thấy đàn chim linh bay về phương xa.",
    "dừng lại chỉnh trang y phục trước khi tiếp tục lên đường.",
    "quan sát dấu chân thú rừng rồi chọn lối khác để đi.",
    "ngồi dưới bóng cây, lặng lẽ nhìn nắng xuyên qua kẽ lá.",
    "nghe tiếng chuông tông môn vọng lại từ xa.",
    "bắt gặp một cơn gió mát thổi qua sơn cốc.",
  ][index % 10],
  // Dùng loại info để giao diện hiển thị trung tính và không tạo thông báo thưởng/phạt.
  type: "info",
  linhThach: 0,
  linhKhi: 0,
}));

// 50 sự kiện thu thập linh dược: 20 Linh Thảo, 15 Huyết Chi,
// 10 Băng Liên và 5 Long Đảm Thảo (tỷ lệ 40/30/20/10 trong nhóm linh dược).
const HERB_EVENTS = [
  ...Array.from({ length: 20 }, (_, index) => ({
    text: `hái được Linh Thảo non bên triền núi, thu hoạch ${(index % 3) + 2} cây. [+ ${(index % 3) + 2} Linh Thảo]`,
    type: "reward" as const,
    linhThach: 0,
    linhKhi: 0,
    linhThao: (index % 3) + 2,
  })),
  ...Array.from({ length: 15 }, (_, index) => ({
    text: `tìm thấy Huyết Chi đỏ thẫm trong khe đá, thu hoạch ${(index % 2) + 1} cây. [+ ${(index % 2) + 1} Huyết Chi]`,
    type: "reward" as const,
    linhThach: 0,
    linhKhi: 0,
    huyetChi: (index % 2) + 1,
  })),
  ...Array.from({ length: 10 }, (_, index) => ({
    text: `vượt qua sườn núi băng giá và hái được Băng Liên quý hiếm. [+ 1 Băng Liên]`,
    type: "reward" as const,
    linhThach: 0,
    linhKhi: 0,
    bangLien: 1,
  })),
  ...Array.from({ length: 5 }, (_, index) => ({
    text: `lần theo long khí dưới vực sâu và phát hiện Long Đảm Thảo trân quý. [+ 1 Long Đảm Thảo]`,
    type: "reward" as const,
    linhThach: 0,
    linhKhi: 0,
    longDamThao: 1,
  })),
];

// Các sự kiện có chỉ số, trong đó nhóm thu thập linh dược được ưu tiên.
export const EVENTS = [
  ...HERB_EVENTS,
  // ==========================================
  // I. CƠ DUYÊN & THU HOẠCH (100 Sự Kiện +Linh Thạch / +Linh Khí)
  // ==========================================
  {
    text: "nhặt được một mẩu Linh Thạch vụn ẩn dưới khe đá. [+ 15 Linh Thạch]",
    type: "reward",
    linhThach: 15,
    linhKhi: 0,
  },
  {
    text: "phát hiện một túi trữ vật bên đường. [+ 50 Linh Thạch]",
    type: "reward",
    linhThach: 50,
    linhKhi: 0,
  },
  {
    text: "ngồi thiền một canh giờ, ngộ ra chút ý niệm thiên địa. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 50,
  },
  {
    text: "gặp một vị thương nhân dạo, đổi chút vật phẩm lấy linh thạch. [+ 25 Linh Thạch]",
    type: "reward",
    linhThach: 25,
    linhKhi: 0,
  },
  {
    text: "vô tình chạm trán một con Yêu Lang nhỏ và dễ dàng đánh đuổi. [+ 5% tu vi] [+ 10 Linh Thạch]",
    type: "reward",
    linhThach: 10,
    linhKhi: 5,
  },
  {
    text: "tìm thấy một bình Thanh Dược Dịch bị bỏ rơi dưới gốc cây cổ thụ, ngươi chuyên tâm luyện hóa. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 10,
  },
  {
    text: "hái được quả Linh Chu Quả 50 năm, ngươi ăn vào thấy khí huyết dồi dào. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 10,
  },
  {
    text: "khai quật được một chiếc túi trữ vật cũ của tiền bối, ngươi luyện hóa đan dược thu được, còn có một ít linh thạch. [+ 10% tu vi] [+ 150 Linh Thạch]",
    type: "reward",
    linhThach: 150,
    linhKhi: 10,
  },
  {
    text: "uống được một ngụm suối Linh Tuyền tinh khiết. [+ 15% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 15,
  },
  {
    text: "nhặt được mảnh vỡ pháp bảo gỉ sét liền đem bán lấy ít linh thạch. [+ 30 Linh Thạch]",
    type: "reward",
    linhThach: 30,
    linhKhi: 0,
  },
  {
    text: "quan sát hai con yến hạc giao chiến, lĩnh hội được chút thân pháp. [+ 5% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 5,
  },
  {
    text: "được một vị sư huynh đồng môn chỉ điểm vài đường kiếm pháp, ngươi cảm ngộ 3 phần kiếm ý. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 10,
  },
  {
    text: "phát hiện mạch khoáng linh thạch lộ thiên,ngươi tranh thủ đào bới. [+ 340 Linh Thạch]",
    type: "reward",
    linhThach: 340,
    linhKhi: 0,
  },
  {
    text: "nhặt được lông vũ của Hỏa Phượng Yêu Thú, liền chuyên tâm luyện hóa. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 10,
  },
  {
    text: "giúp đỡ một nông dân tu tiên ngươi được biếu ít thảo dược. [+ 5% tu vi] ",
    type: "reward",
    linhThach: 1,
    linhKhi: 5,
  },
  {
    text: "bắt được một con Linh Cừu nhỏ mang về đổi phần thưởng. [+ 35 Linh Thạch]",
    type: "reward",
    linhThach: 35,
    linhKhi: 0,
  },
  {
    text: "nhìn chòm sao xoay chuyển đêm qua, tâm cảnh được gột rửa. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 10,
  },
  {
    text: "tìm thấy trận pháp ngụ ý cổ xưa, ngồi nghiên cứu cả 3 ngày cuối cùng ngươi cũng lĩnh ngộ đại thành. [+ 20% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 20,
  },
  {
    text: "vô tình hái được 1 cây Tuyết Liên trăm năm mọc trên đỉnh núi, đem bán ở quán ăn.  [+ 205 Linh Thạch]",
    type: "reward",
    linhThach: 205,
    linhKhi: 0,
  },
  {
    text: "đỡ đòn giúp một tán tu, người đó cảm tạ bằng linh thạch, nhưng ngươi cũng bị tổn thương nhẹ. [+ 45 Linh Thạch]",
    type: "reward",
    linhThach: 45,
    linhKhi: 0,
  },
  {
    text: "nhặt được một cuốn tàn đản công pháp bị rách góc rồi bế quan cảm ngộ suốt 3 ngày đêm. [+ 20% tu vi] ",
    type: "reward",
    linhThach: 0,
    linhKhi: 20,
  },
  {
    text: "bắt gặp linh miêu dẫn đường tới một kho báu nhỏ. [+ 260 Linh Thạch]",
    type: "reward",
    linhThach: 260,
    linhKhi: 0,
  },
  {
    text: "ngửi thấy mùi dược hương thanh tao, cảm giác thông suốt kinh mạch. [+ 5% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 5,
  },
  {
    text: "nhặt được một viên Linh Châu có công năng tụ khí, ngươi nhanh chóng hấp thụ linh khí trong đó. [+ 15% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 15,
  },
  {
    text: "tiêu diệt một bầy Độc Đạt hoang dại,bị thương nhẹ nhưng thu thập được mật độc bán giá cao. [- 5% tu vi] [+ 255 Linh Thạch]",
    type: "reward",
    linhThach: 255,
    linhKhi: -5,
  },
  {
    text: "thông qua kiểm tra thể chất, được trưởng lão ban thưởng chút linh thạch cùng 1 cuốn bí pháp nhập môn. [+ 30 Linh Thạch]",
    type: "reward",
    linhThach: 30,
    linhKhi: 0,
  },
  {
    text: "tìm thấy hốc đá nơi loài Linh Ô làm tổ, nhặt được trứng yêu thú, ngươi hấp thụ gần hoàn mãn thì yêu thú trở mẹ về nên phải tẩu thoát trước. [+ 10% tu vi] [+ 40 Linh Thạch]",
    type: "reward",
    linhThach: 40,
    linhKhi: 10,
  },
  {
    text: "ngắm nhìn cầu vồng ngũ sắc sau cơn mưa, ngộ ra quy luật Ngũ Hành. [+ 5% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 5,
  },
  {
    text: "nhặt được mảnh kiếm tủy mỏng do cao nhân để lại. [+ 15% tu vi] [+ 15 Linh Thạch]",
    type: "reward",
    linhThach: 15,
    linhKhi: 55,
  },
  {
    text: "vận may mỉm cười khi trúng thưởng tại phường buôn linh vật. [+ 270 Linh Thạch]",
    type: "reward",
    linhThach: 270,
    linhKhi: 0,
  },
  {
    text: "phát hiện vạt Huyết Đầm Thảo chín muộn, nhanh tay hái đầy túi rồi mang đổi ở chợ thôn nhỏ. [+ 100 Linh Thạch]",
    type: "reward",
    linhThach: 100,
    linhKhi: 0,
  },
  {
    text: "cơ duyên xảo hợp, ngươi được linh thú Quy Phụng nhả ra cho một viên nội đan nhỏ. [+ 20% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 20,
  },
  {
    text: "nhặt được vài đồng tiền cổ ngập tràn ngọc khí. [+ 5% tu vi] [+ 35 Linh Thạch]",
    type: "reward",
    linhThach: 35,
    linhKhi: 5,
  },
  {
    text: "may mắn gặp được tiểu động cảnh,người bế quan thiền định bên cạnh gốc Vạn Năng Linh Thụ suốt 5 ngày đêm, xuất quan tu vi tinh tiến . [+ 30% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 30,
  },
  {
    text: "giúp tông môn vận chuyển vật tư, thu về thù lao hậu hình. [+ 50 Linh Thạch]",
    type: "reward",
    linhThach: 50,
    linhKhi: 0,
  },
  {
    text: "tìm được bộ da Yêu Hổ nguyên vẹn. [+ 45 Linh Thạch]",
    type: "reward",
    linhThach: 45,
    linhKhi: 0,
  },
  {
    text: "nghe tiếng đàn tranh vọng lại từ xa, tâm trí thanh tĩnh, bất ngờ ngươi ngộ ra 1 tia kiếm ý. [+ 20% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 20,
  },
  {
    text: "hái được 3 cây nấm Linh Chi đỏ mọc trên thân cây mục, một phần để dành luyện đan, 2 phần ngươi đem bán ở dược thảo đường. [+ 300 Linh Thạch]",
    type: "reward",
    linhThach: 300,
    linhKhi: 0,
  },
  {
    text: "trúng đấu giá một mảnh bản đồ kho báu cổ, ngươi men theo lối dẫn đến được 1 động phủ đã cũ nát nhưng may mắn tìm được 1 túi trữ vật lớn của cao nhân để lại. [+ 10% tu vi] [+ 500 Linh Thạch]",
    type: "reward",
    linhThach: 500,
    linhKhi: 10,
  },
  {
    text: "hấp thụ một tia Tử Khí Đông Lai lúc bình minh, ngươi thâu nạp được phần linh khí to lớn. [+ 30% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 30,
  },
  {
    text: "phát hiện một hũ tiên tửu cất giấu dưới lòng đất ngàn năm, ngươi nhấp 1 ngụm, tu vi tiến bộ. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 10,
  },
  {
    text: "giải mã thành công một câu đố trên bia đá cổ, 1 luồng tàn hồn cao nhân để lại truyền vào ngươi luồng khí tức lớn, ngượi dụng thần thâu chấp. [+ 30% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 30,
  },
  {
    text: "thu nhặt được vảy Yêu Long trôi theo dòng suối, ngươi đem đổi với một tán tu.[+ 95 Linh Thạch]",
    type: "reward",
    linhThach: 95,
    linhKhi: 0,
  },
  {
    text: "thông qua thi đấu giao hữu đồng môn, nhận thưởng linh thạch và 1 bộ công pháp trung phẩm khích lệ. [+ 5% tu vi] [+ 125 Linh Thạch]",
    type: "reward",
    linhThach: 125,
    linhKhi: 5,
  },
  {
    text: "tìm thấy trận nhãn ẩn giấu trong pháp trận vô tình lạc vào, thu hoạch 1 cuốn công pháp và linh thạch phong ấn. [+ 10% tu vi] [+ 100 Linh Thạch]",
    type: "reward",
    linhThach: 100,
    linhKhi: 10,
  },
  {
    text: "vô tình cứu sống một chú Chim Lôi Điệp bị gãy cánh, ngươi được nó tặng 1 viên nội đan. [+ 15% tu vi] ",
    type: "reward",
    linhThach: 0,
    linhKhi: 15,
  },
  {
    text: "được linh khí của những giọt sương sớm rửa trôi phàm khí ô trược. [+ 15% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 15,
  },
  {
    text: "nhặt được một chiếc quạt xếp bằng trúc thần, khí thanh tịnh hòa vào tâm thể, người liền tĩnh tọa bế quan đột phá--->tu vi tinh tiến. [+ 15% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 15,
  },
  {
    text: "nhận nhiệm vụ trừ ma từ dân làng và hoàn thành xuất sắc, đoạt được bảo vật từ yêu thú cùng phần thưởng từ dân làng. [+ 10% tu vi] [+ 160 Linh Thạch]",
    type: "reward",
    linhThach: 160,
    linhKhi: 10,
  },
  {
    text: "tìm được một mỏ đồng linh mang đậm kim khí. [+ 135 Linh Thạch]",
    type: "reward",
    linhThach: 35,
    linhKhi: 20,
  },
  {
    text: "bắt gặp ảo ảnh tiên nhân múa kiếm, ngộ ra 1 tia kiếm ý. [+ 15% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 15,
  },
  {
    text: "nhặt được mảnh vỡ của Phượng Hoàng Ngọc Bội. [+ 20% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 20,
  },
  {
    text: "phát hiện ra hố sấm sét cũ có chứa Lôi Tinh Thạch. [+ 45 Linh Thạch]",
    type: "reward",
    linhThach: 45,
    linhKhi: 0,
  },
  {
    text: "trồng thử nghiệm thành công một khóm Linh Mộc, thu hoạch 1 phần đem bán, 1 phàn để hấp thụ linh khí. [+ 10% tu vi] [+ 115 Linh Thạch]",
    type: "reward",
    linhThach: 115,
    linhKhi: 10,
  },
  {
    text: "được lão đạo sĩ qua đường tặng một lá bùa may mắn, ngay sau đó ngộ ra nút thắt trong lần đột phá bất thành trước đó. [+ 20% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 20,
  },
  {
    text: "nhặt được túi linh thảo do đối thủ làm rơi khi tháo chạy. [+ 30 Linh Thạch]",
    type: "reward",
    linhThach: 30,
    linhKhi: 0,
  },
  {
    text: "hái được hoa Băng Nguyệt nở vào nửa đêm, ngươi mang bán giá cao nới dược đường.  [+ 150 Linh Thạch]",
    type: "reward",
    linhThach: 150,
    linhKhi: 0,
  },
  {
    text: "tiêu diệt một con Khái Thạch Yêu, lấy được lõi ngọc. [+ 15% tu vi] [+ 70 Linh Thạch]",
    type: "reward",
    linhThach: 70,
    linhKhi: 15,
  },
  {
    text: "học được mẹo thu nạp linh khí nhanh hơn từ sách cũ. [+ 5% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 5,
  },
  {
    text: "đào được mầm cây Nhân Sâm có hình dáng con người, cẩn thận trồng vào dược viên. [+ 5% tu vi] ",
    type: "reward",
    linhThach: 0,
    linhKhi: 5,
  },
  {
    text: "ngồi tĩnh tâm dưới chân thác nước, kinh mạch khai mở . [+ 15% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 15,
  },
  {
    text: "được tặng một chiếc lệnh bài giảm giá ở Vạn Bảo Các, ngươi mua hời được 3 món đồ vừa ý. [+ 80 Linh Thạch]",
    type: "reward",
    linhThach: 80,
    linhKhi: 0,
  },
  {
    text: "bắt được cá Linh Ngư ánh kim dưới lòng hồ, ngươi cùng vị tán tu đi cùng luyện hóa. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 10,
  },
  {
    text: "nhặt được mảnh ngọc ghi chép đan phương sơ cấp, ngươi vận dụng luyện một viên đan dược thành công. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 10,
  },
  {
    text: "tiêu diệt đám Rết Độc hoành hành, dân làng quyên góp linh thạch tạ ơn. [+ 50 Linh Thạch]",
    type: "reward",
    linhThach: 50,
    linhKhi: 0,
  },
  {
    text: "hút trọn linh khí từ một khối Hắc Diệu Thạch, tu vi được cuungr cố không ít. [+ 15% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 15,
  },
  {
    text: "tìm được một đôi bao tay bằng da Ma Bò siêu bền trong một hang động sâu. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 10,
  },
  {
    text: "thông qua luyện tập thể lực theo cuốn công pháp mới đoạt được, ngươi tăng cường độ dẻo dai. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 10,
  },
  {
    text: "nhặt được hồ lô Bách Niên Linh Dịch, ngươi lập tức thọ dụng và luyện hóa. [+ 20% tu vi] ",
    type: "reward",
    linhThach: 0,
    linhKhi: 20,
  },
  {
    text: "thu hoạch vạt nấm Hỏa Diệm tỏa nhiệt lượng. [+ 65 Linh Thạch]",
    type: "reward",
    linhThach: 65,
    linhKhi: 0,
  },
  {
    text: "bắt gặp hai ma tu tự tàn sát lẫn nhau, ngươi nấp kỹ không dám thở mạnh, tàn cuộc ngươi,nhặt tài nguyên bỏ lại. [+ 10% tu vi] [+ 90 Linh Thạch]",
    type: "reward",
    linhThach: 90,
    linhKhi: 10,
  },
  {
    text: "được chỉ dẫn vào một lối đi tắt an toàn qua hẻm núi, ngươi vấp phải 1 tảng linh thạch hấp thu lin khí đất trời. [+ 15% tu vi] ",
    type: "reward",
    linhThach: 0,
    linhKhi: 15,
  },
  {
    text: "tìm thấy mảnh Xuyên Sơn Giáp thượng phẩm,ngươi bán cho 1 tán tu hữu duyên. [+ 40 Linh Thạch]",
    type: "reward",
    linhThach: 40,
    linhKhi: 0,
  },
  {
    text: "lĩnh hội thành công một chiêu thức phòng thủ đơn giản. [+ 5% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 5,
  },
  {
    text: "được chưởng môn khen ngợi và ban chút tài nguyên tu luyện.[+ 50 Linh Thạch]",
    type: "reward",
    linhThach: 50,
    linhKhi: 0,
  },
  {
    text: "nhặt được viên Định Thần Đan do ai đó vô tình làm rơi trong hốc đấ, ngươi nhanh chóng đem về đông phủ luyện hóa. [+ 20% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 20,
  },
  {
    text: "hái được củ Cát Cánh 100 năm dạt dào sức sống, ngươi kết hợp thảo dược và thịt nấu thành đại bổ thang để gia tăng nguyên khí. [+ 15% tu vi] ",
    type: "reward",
    linhThach: 0,
    linhKhi: 15,
  },
  {
    text: "tiêu diệt một con Ma Dơi chuyên hút máu thú nuôi, mang xác nó bán cho vị tán tu luyện thuốc thu được ít linh thạch. [+ 30 Linh Thạch]",
    type: "reward",
    linhThach: 30,
    linhKhi: 0,
  },
  {
    text: "nhặt được mảnh bản đồ dẫn tới hang động tu tiên, ngươi háo hức tiến đến.Sau khi phá được kết giới phong ấn, tiến vào ngươi nhận được bộ truyền thừa công pháp cùng một nhẫn trữ vật đầy linh thạch. [+ 25% tu vi] [+ 825 Linh Thạch]",
    type: "reward",
    linhThach: 825,
    linhKhi: 25,
  },
  {
    text: "thu được lông cánh đuôi của Xạ Hương Điểu, ngươi đem bán lấy linh thạch.  [+ 35 Linh Thạch]",
    type: "reward",
    linhThach: 35,
    linhKhi: 0,
  },
  {
    text: "tịnh tâm nghe tiếng gió reo qua vách đá, xua tan mệt mỏi, tu vi cũng tinh tấn thêm. [+ 5% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 5,
  },
  {
    text: "nhặt được chuỗi hạt niệm Phật ngập tràn Phật khí, từng hơi thở ngươi đều hấp thụ được linh khí ấy, đó là kỳ duyên. [+ 20% tu vi] ",
    type: "reward",
    linhThach: 0,
    linhKhi: 20,
  },
  {
    text: "độ hóa thành công một linh hồn vất vưởng, nhận công đức. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 10,
  },
  {
    text: "tìm thấy kho lương thực bí mật của toán sơn tặc, ngươi khoắng sạch vào túi trữ vật.  [+ 565 Linh Thạch]",
    type: "reward",
    linhThach: 565,
    linhKhi: 0,
  },
  {
    text: "nhặt được linh cừu thạch có công năng giữ ấm, mùa lạnh này đỡ vất vả hơn. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 10,
  },
  {
    text: "thưởng thức chén trà thơm do đạo hữu pha tặng, thần trí minh mẫn,khai mở 1 nhánh mới trong tàn hồn tâm thức. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 10,
  },
  {
    text: "tìm được bộ lông cáo chín đuôi tuyệt đẹp. [+ 80 Linh Thạch]",
    type: "reward",
    linhThach: 80,
    linhKhi: 0,
  },
  {
    text: "phát hiện một giếng nước tích tụ linh khí ngàn năm, ngươi vội vàng uống mấy hớp, tâm trí minh mẫn sáng suốt, ngươi bế quan luyện hóa. [+ 25% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 25,
  },
  {
    text: "nhặt được chiếc sáo trúc có khả năng trấn tĩnh tâm ma. [+ 15% tu vi] ",
    type: "reward",
    linhThach: 0,
    linhKhi: 15,
  },
  {
    text: "tiêu diệt Ma Bọ Cạp ở vùng sa mạc, lấy được ngọc độc. [+ 15% tu vi] [+ 45 Linh Thạch]",
    type: "reward",
    linhThach: 45,
    linhKhi: 15,
  },
  {
    text: "nẵm dưới bãi cỏ vào đêm trăng sáng, ngươi vô tình ngộ được bí kíp hô hấp theo nhịp thở của tự nhiên. [+ 20% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 20,
  },
  {
    text: "được dẫn đường đến khu vực có nhiều linh thạch, ngươi tranh thủ tìm kiếm và thu thập. [+ 150 Linh Thạch]",
    type: "reward",
    linhThach: 150,
    linhKhi: 0,
  },
  {
    text: "nhặt được tấm thảm bay rách một góc. [+ 10% tu vi] [+ 40 Linh Thạch]",
    type: "reward",
    linhThach: 40,
    linhKhi: 10,
  },
  {
    text: "tìm thấy mảnh thiên thạch rớt xuống từ hư không chứa đựng 1 phần nhỏ bản nguyên đại đạo, ngươi nhanh chóng đem về động phủ dụng tâm nghiên cứu, sau 1 tuần cũng ngộ được 1 phần huyền cơ . [+ 40% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 40,
  },
  {
    text: "hấp thụ ánh sáng trăng rằm, kinh mạch sảng khoái, thân tâm nhẹ nhàng. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 70,
  },
  {
    text: "được ban tặng một túi trữ vật dung tích nhỏ.[+ 135 Linh Thạch]",
    type: "reward",
    linhThach: 135,
    linhKhi: 0,
  },
  {
    text: "phát hiện vạt dâu tiên ngọt lịm, ngươi vừa ăn vừa hái trữ.  [+ 20 Linh Thạch]",
    type: "reward",
    linhThach: 20,
    linhKhi: 0,
  },
  {
    text: "nhặt được mảnh xích sắt phong ấn ma thú cổ. [+ 20% tu vi] ",
    type: "reward",
    linhThach: 0,
    linhKhi: 20,
  },
  {
    text: "thu hoạch được Linh Quy Giáp dùng làm khiên. [+ 10% tu vi] ",
    type: "reward",
    linhThach: 0,
    linhKhi: 10,
  },
  {
    text: "nhận được sự chúc phúc từ các linh hồn tổ tiên. [+ 50% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 50,
  },

  // ==========================================
  // II. RỦI RO & TỔN THẤT (100 Sự Kiện -Linh Thạch / -Linh Khí)
  // ==========================================
  {
    text: "bị sương độc làm hoa mắt, ngươi phải vận công xua tan. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -15,
  },
  {
    text: "sơ ý trượt chân rớt mất một vài viên linh thạch. [- 10 Linh Thạch]",
    type: "penalty",
    linhThach: -10,
    linhKhi: 0,
  },
  {
    text: "tâm ma xao động nhẹ, mất chút thời gian điều hòa khí huyết. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -25,
  },
  {
    text: "vô tình bước nhầm vào bẫy rước họa của sơn tặc. [- 10% tu vi] [- 20 Linh Thạch]",
    type: "penalty",
    linhThach: -20,
    linhKhi: -10,
  },
  {
    text: "bị một con Hắc Ngưu sừng nhọn húc trúng, ngực ngươi nhói đau, phải dùng phù chú đề thoát thân. [- 20% tu vi] [- 20 Linh Thạch]",
    type: "penalty",
    linhThach: 20,
    linhKhi: -30,
  },
  {
    text: "mua nhầm linh dược giả của thương nhân lừa đảo. [- 30 Linh Thạch]",
    type: "penalty",
    linhThach: -30,
    linhKhi: 0,
  },
  {
    text: "bị trượt chân rơi xuống hồ băng đầy trược khí,khó khăn lắm ngươi mới thoát ra được-khí huyết ngưng trệ. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -15,
  },
  {
    text: "va chạm với Ma Tu hạ sơn, ngươi phải tốn sức thoát thân nhưng vẫn bị tổn thương . [- 25% tu vi] [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: -25,
  },
  {
    text: "lỡ tay làm vỡ một viên linh thạch khi đang luyện công. [- 5% tu vi] [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: -5,
  },
  {
    text: "bị luồng sát khí bí ẩn quấy nhiễu, kinh mạch ngươi bị rối loạn. [- 20% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -40,
  },
  {
    text: "bị đàn Ong Hút Mật tấn công, phải chạy trốn thục mạng. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -25,
  },
  {
    text: "làm rơi mất túi tiền xuống khe núi sâu. [- 25 Linh Thạch]",
    type: "penalty",
    linhThach: -25,
    linhKhi: 0,
  },
  {
    text: "bị chấn thương do tập luyện chiêu thức mới quá sức. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -45,
  },
  {
    text: "bị trộm mất một ít lương thực và linh thạch. [- 20 Linh Thạch]",
    type: "penalty",
    linhThach: -20,
    linhKhi: 0,
  },
  {
    text: "ăn lầm quả độc hoang dại, bụng đau quặn thắt, ngươi phải nhanh chóng điều tức+dùng tới viên đan dược giải độc mua đã lâu. [-5% tu vi] [- 20 Linh Thạch]",
    type: "penalty",
    linhThach: -20,
    linhKhi: -5,
  },
  {
    text: "vô tình kích hoạt cấm chế bảo vệ của động phủ cổ, ngươi bị giam trong đó suốt 2 ngày, may mắn đã tìm được mắt trận nhưng để phá nó cũng đã hao tổn tu vi. [- 10% tu vi] [- 10 Linh Thạch]",
    type: "penalty",
    linhThach: -10,
    linhKhi: -10,
  },
  {
    text: "bị ngã từ trên cây cao xuống, bong gân chân. [- 10% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -10,
  },
  {
    text: "bị 1 trận mưa đày uế khí làm hỏng trang phục tu tiên. [- 10% tu vi] [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: -10,
  },
  {
    text: "bị dao động bởi ảo ảnh ma quái, đạo tâm giảm sút. [- 20% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -20,
  },
  {
    text: "thua cược khi tham gia trò chơi may rủi. [- 35 Linh Thạch]",
    type: "penalty",
    linhThach: -35,
    linhKhi: 0,
  },
  {
    text: "bị gián đoạn khi đang bế quan do tiếng ồn lớn từ bên ngoài động phủ. [- 20% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -20,
  },
  {
    text: "vô tình làm phật ý vị sư huynh nóng tính và bị đánh phạt. [- 20% tu vi] [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: -20,
  },
  {
    text: "bị muỗi độc cắn khắp người, nổi ngứa khó chịu. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -15,
  },
  {
    text: "làm mất chìa khóa phòng bế quan, phải tốn linh thạch sửa. [- 20 Linh Thạch]",
    type: "penalty",
    linhThach: -20,
    linhKhi: 0,
  },
  {
    text: "ngươi bị sét hòn đánh trúng vai khi mưa giông đột ngột kéo tới. [- 25% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -25,
  },
  {
    text: "bị lừa mua linh cừu bệnh chết. [- 30 Linh Thạch]",
    type: "penalty",
    linhThach: -30,
    linhKhi: 0,
  },
  {
    text: "vận công sai hướng khiến máu tràn ra miệng, ngươi ngất đi-tu vi tổn hại. [- 30% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -30,
  },
  {
    text: "bị một con Yêu Đỉa bám vào chân hút máu. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -15,
  },
  {
    text: "đánh rơi mất ngọc bội hộ thân xuống sông. [- 40 Linh Thạch]",
    type: "penalty",
    linhThach: -40,
    linhKhi: 0,
  },
  {
    text: "bị gió độc quật ngã ngất xỉu trong vài phút, ngươi tỉnh lại thì thần trí và cơ thể đều rệu rã. [- 25% tu vi] ",
    type: "penalty",
    linhThach: -0,
    linhKhi: -25,
  },
  {
    text: "bị Hỏa Hồ cào rách tay. [- 20% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -20,
  },
  {
    text: "phải nộp phí qua đường cho nhóm xà phong vô lại. [- 25 Linh Thạch]",
    type: "penalty",
    linhThach: -25,
    linhKhi: 0,
  },
  {
    text: "bị khí lạnh ngấm vào xương khớp, ngươi đi đứng khó khăn. [- 10% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -10,
  },
  {
    text: "dùng nhầm linh dược quá hạn sử dụng, ngươi tổn hại tu vi, phải dùng 1 viên đan dược để giải độc. [- 15% tu vi] [- 10 Linh Thạch]",
    type: "penalty",
    linhThach: -10,
    linhKhi: -15,
  },
  {
    text: "bị đá rơi trúng đầu khi đi dưới vách núi, ngươi văng xa 10 trượng, gượng dậy di chuyển đến nơi an toàn. [- 42% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -20,
  },
  {
    text: "bị quấy rối bởi âm thanh của quỷ sai đêm, ngươi cố gắng thâu thần bế quan. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -15,
  },
  {
    text: "đánh mất một cuốn sách hướng dẫn nhập môn. [- 10% tu vi] [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: -10,
  },
  {
    text: "bị dị ứng với phấn hoa của Linh Cúc, ngươi ngứa ngáy khắp người, hô hấp khó khăn, may có viên đan dược giải độc. [- 15% tu vi]  [- 25 Linh Thạch]",
    type: "penalty",
    linhThach: -25,
    linhKhi: -15,
  },
  {
    text: "bị cướp mất một ít linh thạch khi đang đi một mình. [- 50 Linh Thạch]",
    type: "penalty",
    linhThach: -50,
    linhKhi: 0,
  },
  {
    text: "bị ảo giác dẫn lối đi lạc trong sương mù. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -15,
  },
  {
    text: "bị ma trùng cắn hỏng túi áo. [- 5% tu vi] [- 20 Linh Thạch]",
    type: "penalty",
    linhThach: -20,
    linhKhi: -5,
  },
  {
    text: "bị ảnh hưởng bởi trận pháp cuồng phong. [- 20% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -50,
  },
  {
    text: "trả giá quá cao khi mua nhu yếu phẩm. [- 30 Linh Thạch]",
    type: "penalty",
    linhThach: -30,
    linhKhi: 0,
  },
  {
    text: "bị ngã xuống bùn lầy trong 1 kết giới của ma tu, ngươi tiêu tốn nhiều tu vi để thoát ra, quần áo dơ bẩn phải kiếm quán trọ tắm giặt. [- 10% tu vi] [- 35 Linh Thạch]",
    type: "penalty",
    linhThach: -35,
    linhKhi: -10,
  },
  {
    text: "ngươi bị tiêu hao sức lực khi vượt qua đèo cao đầy sương giá. [- 10% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -10,
  },
  {
    text: "bị gián đoạn mạch suy nghĩ khi ngộ đạo. [- 30% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -30,
  },
  {
    text: "đánh vỡ bình chứa nước linh tuyền. [- 15% tu vi] [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: -15,
  },
  {
    text: "bị Yêu Báo vồ hụt nhưng bị thương ở vai. [- 25% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -25,
  },
  {
    text: "bị tốn chi phí chữa trị vết thương nhỏ. [- 25 Linh Thạch]",
    type: "penalty",
    linhThach: -25,
    linhKhi: 0,
  },
  {
    text: "bị kiệt sức vì đi bộ dưới trời nắng gắt, ngươi may mắn gặp một y giả ra tay tương trợ. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -15,
  },
  {
    text: "bị Ma Tu quấy phá làm mất tập trung, ngươi trúng tâm thuật ấn của hắn, may mắn có pháp khí hộ thân mới trốn thoát được. [- 35% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -35,
  },
  {
    text: "làm hỏng cán thanh kiếm khi luyện tập, phải tốn linh thạch để sửa chữa. [- 20 Linh Thạch]",
    type: "penalty",
    linhThach: -20,
    linhKhi: 0,
  },
  {
    text: "bị trúng hơi độc từ bãi phân yêu thú, ngươi nôn mửa suốt 2 ngày. [- 20% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -20,
  },
  {
    text: "bị thu phí đỗ thuyền tại bến sông khi đi tìm bí pháp. [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: 0,
  },
  {
    text: "theo chỉ thị tông môn : đi lịch luyện tiêu diệt ma thú trên Nhị Long Sơn.Trời tối, ngươi dừng lại nghỉ bên gốc cây, bị đám muỗi núi làm phiền cả đêm. [- 5% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -5,
  },
  {
    text: "bị giật mình bởi tiếng sấm lớn làm lệch khí huyết khi luỵện công. [- 30% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -30,
  },
  {
    text: "làm rơi đĩa thức ăn linh thực. [- 10 Linh Thạch]",
    type: "penalty",
    linhThach: -10,
    linhKhi: 0,
  },
  {
    text: "bị chó săn cấp yêu thú của đám cướp đuổi theo, ngươi gồng sức chống trả và thoát thân. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -15,
  },
  {
    text: "tốn tiền sửa lại đôi giày tu tiên bị rách sau khi đạp phải thanh kiếm gãy ẩn dưới đát. [- 20 Linh Thạch]",
    type: "penalty",
    linhThach: -20,
    linhKhi: 0,
  },
  {
    text: "bị nhiễm lạnh do nằm ngủ ngoài trời đêm. [- 5% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -5,
  },
  {
    text: "bị phạt linh thạch do vi phạm quy định tông môn. [- 40 Linh Thạch]",
    type: "penalty",
    linhThach: -40,
    linhKhi: 0,
  },
  {
    text: "bị một con Chim Lục cắn lén vào ngón tay, ngươi xoay người đánh nó chết tại chỗ thu được 1 viên nội đan nhỏ. [- 10% tu vi] [+ 40 Linh Thạch]",
    type: "penalty",
    linhThach: 40,
    linhKhi: -10,
  },
  {
    text: "bị hỏng đai lưng giữ linh thạch.  [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: -0,
  },
  {
    text: "ngươi kiệt sức do đẩy xe chuyển hàng cứu tế giúp người dân ở trấn ven sông vừa bị cơn lũ dữ quét qua. [- 10% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -10,
  },
  {
    text: "bị mất phương hướng trong rừng sâu, ngươi lạc đường suốt 2 ngày, thân thể mệt lả. [- 10% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -10,
  },
  {
    text: "ngươi bị bắt đền bù tiền do làm hỏng đồ đạc quán trọ. [- 35 Linh Thạch]",
    type: "penalty",
    linhThach: -35,
    linhKhi: 0,
  },
  {
    text: "bị ám ảnh bởi cơn ác mộng thiên kiếp, ngơi tỉnh dây trong hốt hoẳng tột độ, tu vi suy sụp. [- 30% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -30,
  },
  {
    text: "bị trầy xước da do đi qua bụi gai sắc. [- 5% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -5,
  },
  {
    text: "lỡ làm rớt mất lọ thuốc trị thương. [- 25 Linh Thạch]",
    type: "penalty",
    linhThach: -25,
    linhKhi: 0,
  },
  {
    text: "bị hoa mắt do nhìn trực tiếp vào mặt trời khi tập tu bộ công pháp Cửu Nhật Thiên Đồng chưa đúng cách. [- 10% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -10,
  },
  {
    text: "bị tổn thất tài nguyên do chuẩn bị sai nguyên liệu. [- 30 Linh Thạch]",
    type: "penalty",
    linhThach: -30,
    linhKhi: -0,
  },
  {
    text: "bị chuột cắn hỏng bao đựng linh thảo. [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: -0,
  },
  {
    text: "ngươi tốn công xua tan khói độc từ đám cháy cứu 6 người trong 1 gia đình ở ngoại thành Kinh Đô. [- 10% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -10,
  },
  {
    text: "bị trượt ngã xuống suối ướt hết người, lại bị con xà yêu trong hốc đá cắn lén. [- 15% tu vi] ",
    type: "penalty",
    linhThach: -0,
    linhKhi: -15,
  },
  {
    text: "ngươi bị chủ trọ tính tiền phòng giá đắt đỏ. [- 40 Linh Thạch]",
    type: "penalty",
    linhThach: -40,
    linhKhi: 0,
  },
  {
    text: "bị ma khí nhẹ tích tụ trong người. [- 5% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -5,
  },
  {
    text: "bị sứt mẻ thanh đoản đao, phải tốn tiền sửa chữa. [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: 0,
  },
  {
    text: "ngươi kiệt sức vì chạy trốn mưa đá quái lạ ở ngoại ô trấn Thanh Thành. [- 10% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -10,
  },
  {
    text: "ngươi bị đóng phạt vì quên nộp báo cáo lịch luyện hàng tháng cho tông môn. [- 25 Linh Thạch]",
    type: "penalty",
    linhThach: -25,
    linhKhi: 0,
  },
  {
    text: "bị tức ngực do hít phải khí lưu huỳnh. [- 35% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -35,
  },
  {
    text: "bị làm phiền khi đang ngủ trưa. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -15,
  },
  {
    text: "bị rơi mất tấm bản đồ vắt trên vai. [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: 0,
  },
  {
    text: "bị thương nhẹ do va chạm với bạn tập. [- 25% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -25,
  },
  {
    text: "bị mất tiền phí qua cầu. [- 10 Linh Thạch]",
    type: "penalty",
    linhThach: -10,
    linhKhi: 0,
  },
  {
    text: "bị tốn thời gian vòng đường xa tránh quái vật. [- 30% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -30,
  },
  {
    text: "bị tốn linh thạch mua nước uống đắt đỏ. [- 20 Linh Thạch]",
    type: "penalty",
    linhThach: -20,
    linhKhi: 0,
  },
  {
    text: "bị choáng váng do áp suất trên cao. [- 35% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -35,
  },
  { text: "bị đứt dây may giáp. [- 15 Linh Thạch]", type: "penalty", linhThach: -15, linhKhi: 0 },
  {
    text: "bị hao hụt năng lượng do duy trì lá chắn. [- 40% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -40,
  },
  {
    text: "bị nhầm lẫn đường đi tới chợ linh vật. [- 10% tu vi] [- 20 Linh Thạch]",
    type: "penalty",
    linhThach: -20,
    linhKhi: -10,
  },
  {
    text: "bị chuột rút khi đang bơi qua sông. [- 30% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -30,
  },
  {
    text: "bị mất một viên đá định hướng. [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: 0,
  },
  {
    text: "bị giảm sút tập trung do tiếng ve kêu. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -15,
  },
  {
    text: "bị rách tay do cứa vào vách đá sắc. [- 20% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -20,
  },
  {
    text: "bị phạt do đậu súc vật sai quy định. [- 25 Linh Thạch]",
    type: "penalty",
    linhThach: -25,
    linhKhi: 0,
  },
  {
    text: "bị tốn năng lượng xua đuổi ma hỏa. [- 35% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -35,
  },
  {
    text: "bị mất một ít dược liệu do sương ẩm. [- 10% tu vi] [- 20 Linh Thạch]",
    type: "penalty",
    linhThach: -20,
    linhKhi: -10,
  },
  {
    text: "bị sỏi đá chui vào giày gây đau chân. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -15,
  },
  {
    text: "bị tốn tiền xe ngựa đi về tông môn. [- 30 Linh Thạch]",
    type: "penalty",
    linhThach: -30,
    linhKhi: 0,
  },
  {
    text: "bị kiệt sức sau trận giông bão bất ngờ. [- 50% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -50,
  },
];

// Sinh đúng 1,000 biến thể: 60% trung lập và 40% có thay đổi tài nguyên.
export function generate1000TextEvents() {
  const total = 1000;
  const neutralCount = Math.round(total * 0.6);
  const list: Array<{
    id: string;
    message: string;
    type: string;
    baseLinhThach: number;
    baseLinhKhi: number;
    linhThao: number;
    huyetChi: number;
    bangLien: number;
    longDamThao: number;
  }> = [];

  for (let i = 0; i < total; i++) {
    const isNeutral = i < neutralCount;
    const act = ACTIONS[Math.floor(Math.random() * ACTIONS.length)]!;
    const source = isNeutral ? NEUTRAL_EVENTS : EVENTS;
    const evt = source[Math.floor(Math.random() * source.length)]! as {
      text?: string;
      type: string;
      linhThach: number;
      linhKhi: number;
      linhThao?: number;
      huyetChi?: number;
      bangLien?: number;
      longDamThao?: number;
    };
    const variance = isNeutral ? 1 : Math.floor(Math.random() * 3) + 1;

    list.push({
      id: `text_evt_${i + 1}`,
      message: `${act} ngươi ${evt.text}`,
      type: evt.type,
      baseLinhThach: evt.linhThach * variance,
      baseLinhKhi: evt.linhKhi * variance,
      linhThao: (evt.linhThao ?? 0) * variance,
      huyetChi: (evt.huyetChi ?? 0) * variance,
      bangLien: (evt.bangLien ?? 0) * variance,
      longDamThao: (evt.longDamThao ?? 0) * variance,
    });
  }

  // Trộn sau khi chia nhóm để tỷ lệ vẫn chính xác nhưng thứ tự không đoán trước.
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i]!, list[j]!] = [list[j]!, list[i]!];
    ("");
  }

  return list;
}

export const TEXT_STREAM_EVENTS = generate1000TextEvents();
