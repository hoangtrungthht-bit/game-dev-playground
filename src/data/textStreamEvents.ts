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
    text: "tìm thấy một bình Thanh Dược Dịch bị bỏ rơi dưới gốc cây cổ thụ. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 10,
  },
  {
    text: "hái được quả Linh Chu Quả 50 năm, ăn vào thấy khí huyết dồi dào. [+ 30% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 30,
  },
  {
    text: "khai quật được một chiếc túi trữ vật cũ của tiền bối. [+ 10% tu vi] [+ 150 Linh Thạch]",
    type: "reward",
    linhThach: 150,
    linhKhi: 10,
  },
  {
    text: "uống được một ngụm suối Linh Tuyền tinh khiết. [+ 15% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 45,
  },
  {
    text: "nhặt được mảnh vỡ pháp bảo gỉ sét đem bán lấy linh thạch. [+ 30 Linh Thạch]",
    type: "reward",
    linhThach: 30,
    linhKhi: 0,
  },
  {
    text: "quan sát hai con yến hạc giao chiến, lĩnh hội chút thân pháp. [+ 15% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 15,
  },
  {
    text: "được một vị sư huynh đồng môn chỉ điểm vài đường kiếm pháp. [+ 15% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 15,
  },
  {
    text: "phát hiện mạch khoáng linh thạch lộ thiên, tranh thủ đào bới. [+ 340 Linh Thạch]",
    type: "reward",
    linhThach: 340,
    linhKhi: 0,
  },
  {
    text: "nhặt được lông vũ của Hỏa Phượng Yêu Thú. [+ 10% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 10,
  },
  {
    text: "giúp đỡ một nông dân tu tiên và được biếu ít thảo dược. [+ 5% tu vi] ",
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
    text: "nhìn chòm sao xoay chuyển đêm qua, tâm cảnh được gột rửa. [+ 15% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 15,
  },
  {
    text: "tìm thấy trận pháp ngụ ý cổ xưa, ngồi nghiên cứu cả buổi cuối cùng cũng lĩnh ngộ. [+ 20% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 20,
  },
  {
    text: "thu hoạch được vạt Tuyết Liên mọc trên đỉnh núi, đem bán ở quán ăn.  [+ 105 Linh Thạch]",
    type: "reward",
    linhThach: 105,
    linhKhi: 0,
  },
  {
    text: "đỡ đòn giúp một tán tu, người đó cảm tạ bằng linh thạch. [+ 45 Linh Thạch]",
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
    text: "bắt gặp linh miêu dẫn đường tới một kho báu nhỏ. [+ 60 Linh Thạch]",
    type: "reward",
    linhThach: 60,
    linhKhi: 0,
  },
  {
    text: "ngửi thấy mùi dược hương thanh tao, cảm giác thông suốt kinh mạch. [+ 5% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 5,
  },
  {
    text: "nhặt được một viên Linh Châu có công năng tụ khí. [+ 20% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 20,
  },
  {
    text: "tiêu diệt một bầy Độc Đạt hoang dại,bị thương nhẹ nhưng thu thập được mật độc bán giá cao. [- 10% tu vi] [+ 255 Linh Thạch]",
    type: "reward",
    linhThach: 255,
    linhKhi: -10,
  },
  {
    text: "thông qua kiểm tra thể chất, được trưởng lão ban thưởng chút linh thạch. [+ 30 Linh Thạch]",
    type: "reward",
    linhThach: 30,
    linhKhi: 0,
  },
  {
    text: "tìm thấy hốc đá nơi loài Linh Ô làm tổ, nhặt được trứng yêu thú. [+ 10% tu vi] [+ 40 Linh Thạch]",
    type: "reward",
    linhThach: 40,
    linhKhi: 10,
  },
  {
    text: "ngắm nhìn cầu vồng ngũ sắc sau cơn mưa, ngộ ra quy luật Ngũ Hành. [+ 70% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 70,
  },
  {
    text: "nhặt được kiếm tủy mỏng do cao nhân để lại. [+ 55% tu vi] [+ 15 Linh Thạch]",
    type: "reward",
    linhThach: 15,
    linhKhi: 55,
  },
  {
    text: "vận may mỉm cười khi trúng thưởng tại phường buôn linh vật. [+ 70 Linh Thạch]",
    type: "reward",
    linhThach: 70,
    linhKhi: 0,
  },
  {
    text: "phát hiện vạt Huyết Đầm Thảo chín muộn. [+ 45% tu vi] [+ 10 Linh Thạch]",
    type: "reward",
    linhThach: 10,
    linhKhi: 45,
  },
  {
    text: "được linh thú quy phụng nhả ra một viên nội đan nhỏ. [+ 60% tu vi] [+ 25 Linh Thạch]",
    type: "reward",
    linhThach: 25,
    linhKhi: 60,
  },
  {
    text: "nhặt được vài đồng tiền cổ ngập tràn ngọc khí. [+ 15% tu vi] [+ 35 Linh Thạch]",
    type: "reward",
    linhThach: 35,
    linhKhi: 15,
  },
  {
    text: "thiền định bên cạnh gốc Vạn Năng Linh Thụ. [+ 80% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 80,
  },
  {
    text: "giúp tông môn vận chuyển vật tư, thu về thù lao hậu hình. [+ 10% tu vi] [+ 50 Linh Thạch]",
    type: "reward",
    linhThach: 50,
    linhKhi: 10,
  },
  {
    text: "tìm được bộ da Yêu Hổ nguyên vẹn. [+ 5% tu vi] [+ 45 Linh Thạch]",
    type: "reward",
    linhThach: 45,
    linhKhi: 5,
  },
  {
    text: "nghe tiếng đàn tranh vọng lại từ xa, tâm trí thanh tĩnh bất ngờ. [+ 40% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 40,
  },
  {
    text: "hái được nấm Linh Chi đỏ mọc trên thân cây mục. [+ 50% tu vi] [+ 10 Linh Thạch]",
    type: "reward",
    linhThach: 10,
    linhKhi: 50,
  },
  {
    text: "trúng đấu giá một mảnh bản đồ kho báu cổ. [+ 20% tu vi] [+ 30 Linh Thạch]",
    type: "reward",
    linhThach: 30,
    linhKhi: 20,
  },
  {
    text: "hấp thụ một tia Tử Khí Đông Lai lúc bình minh. [+ 90% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 90,
  },
  {
    text: "phát hiện một hũ tiên tửu cất giấu dưới lòng đất ngàn năm. [+ 65% tu vi] [+ 20 Linh Thạch]",
    type: "reward",
    linhThach: 20,
    linhKhi: 65,
  },
  {
    text: "giải mã thành công một câu đố trên bia đá cổ. [+ 30% tu vi] [+ 40 Linh Thạch]",
    type: "reward",
    linhThach: 40,
    linhKhi: 30,
  },
  {
    text: "thu nhặt được vảy Yêu Long trôi theo dòng suối. [+ 25% tu vi] [+ 65 Linh Thạch]",
    type: "reward",
    linhThach: 65,
    linhKhi: 25,
  },
  {
    text: "thông qua thi đấu giao hữu đồng môn, nhận thưởng khích lệ. [+ 25% tu vi] [+ 25 Linh Thạch]",
    type: "reward",
    linhThach: 25,
    linhKhi: 25,
  },
  {
    text: "tìm thấy trận nhãn ẩn giấu, thu hoạch linh thạch phong ấn. [+ 10% tu vi] [+ 80 Linh Thạch]",
    type: "reward",
    linhThach: 80,
    linhKhi: 10,
  },
  {
    text: "vô tình cứu sống một chú Chim Lôi Điệp bị gãy cánh. [+ 45% tu vi] [+ 5 Linh Thạch]",
    type: "reward",
    linhThach: 5,
    linhKhi: 45,
  },
  {
    text: "được linh khí của giọt sương sớm rửa trôi phàm trần. [+ 35% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 35,
  },
  {
    text: "nhặt được một chiếc quạt xếp bằng trúc thần. [+ 15% tu vi] [+ 30 Linh Thạch]",
    type: "reward",
    linhThach: 30,
    linhKhi: 15,
  },
  {
    text: "nhận nhiệm vụ trừ ma từ dân làng và hoàn thành xuất sắc. [+ 30% tu vi] [+ 60 Linh Thạch]",
    type: "reward",
    linhThach: 60,
    linhKhi: 30,
  },
  {
    text: "tìm được một mỏ đồng linh mang đậm kim khí. [+ 20% tu vi] [+ 35 Linh Thạch]",
    type: "reward",
    linhThach: 35,
    linhKhi: 20,
  },
  {
    text: "bắt gặp ảo ảnh tiên nhân múa kiếm, ngộ ra kiếm ý. [+ 85% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 85,
  },
  {
    text: "nhặt được mảnh vỡ của Phượng Hoàng Ngọc Bội. [+ 40% tu vi] [+ 50 Linh Thạch]",
    type: "reward",
    linhThach: 50,
    linhKhi: 40,
  },
  {
    text: "phát hiện ra hố sấm sét cũ có chứa Lôi Tinh Thạch. [+ 35% tu vi] [+ 45 Linh Thạch]",
    type: "reward",
    linhThach: 45,
    linhKhi: 35,
  },
  {
    text: "trồng thử nghiệm thành công một khóm Linh Mộc. [+ 30% tu vi] [+ 15 Linh Thạch]",
    type: "reward",
    linhThach: 15,
    linhKhi: 30,
  },
  {
    text: "được lão đạo sĩ qua đường tặng một lá bùa may mắn. [+ 20% tu vi] [+ 20 Linh Thạch]",
    type: "reward",
    linhThach: 20,
    linhKhi: 20,
  },
  {
    text: "nhặt được túi linh thảo do đối thủ làm rơi khi tháo chạy. [+ 40% tu vi] [+ 30 Linh Thạch]",
    type: "reward",
    linhThach: 30,
    linhKhi: 40,
  },
  {
    text: "hái được hoa Băng Nguyệt nở vào nửa đêm. [+ 60% tu vi] [+ 10 Linh Thạch]",
    type: "reward",
    linhThach: 10,
    linhKhi: 60,
  },
  {
    text: "tiêu diệt một con Khái Thạch Yêu, lấy được lõi ngọc. [+ 15% tu vi] [+ 70 Linh Thạch]",
    type: "reward",
    linhThach: 70,
    linhKhi: 15,
  },
  {
    text: "học được mẹo thu nạp linh khí nhanh hơn từ sách cũ. [+ 50% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 50,
  },
  {
    text: "đào được mầm cây Nhân Sâm có hình dáng con người. [+ 75% tu vi] [+ 25 Linh Thạch]",
    type: "reward",
    linhThach: 25,
    linhKhi: 75,
  },
  {
    text: "ngồi tĩnh tâm dưới chân thác nước, kinh mạch mở rộng. [+ 65% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 65,
  },
  {
    text: "được tặng một chiếc lệnh bài giảm giá ở Vạn Bảo Các. [+ 40 Linh Thạch]",
    type: "reward",
    linhThach: 40,
    linhKhi: 0,
  },
  {
    text: "bắt được cá Linh Ngư ánh kim dưới lòng hồ. [+ 45% tu vi] [+ 20 Linh Thạch]",
    type: "reward",
    linhThach: 20,
    linhKhi: 45,
  },
  {
    text: "nhặt được mảnh ngọc ghi chép đan phương sơ cấp. [+ 20% tu vi] [+ 30 Linh Thạch]",
    type: "reward",
    linhThach: 30,
    linhKhi: 20,
  },
  {
    text: "tiêu diệt đám Rết Độc hoành hành, dân làng quyên góp linh thạch tạ ơn. [+ 10% tu vi] [+ 50 Linh Thạch]",
    type: "reward",
    linhThach: 50,
    linhKhi: 10,
  },
  {
    text: "hút trọn linh khí từ một khối Hắc Diệu Thạch. [+ 70% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 70,
  },
  {
    text: "tìm được một đôi bao tay bằng da Ma Bò siêu bền. [+ 15% tu vi] [+ 35 Linh Thạch]",
    type: "reward",
    linhThach: 35,
    linhKhi: 15,
  },
  {
    text: "thông qua luyện tập thể lực, tăng cường độ dẻo dai. [+ 40% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 40,
  },
  {
    text: "nhặt được hồ lô chứa linh dịch thanh tẩy thể chất. [+ 80% tu vi] [+ 10 Linh Thạch]",
    type: "reward",
    linhThach: 10,
    linhKhi: 80,
  },
  {
    text: "thu hoạch vạt nấm Hỏa Diệm tỏa nhiệt lượng. [+ 50% tu vi] [+ 15 Linh Thạch]",
    type: "reward",
    linhThach: 15,
    linhKhi: 50,
  },
  {
    text: "bắt gặp hai ma tu tự tàn sát lẫn nhau, nhặt tài nguyên bỏ lại. [+ 30% tu vi] [+ 90 Linh Thạch]",
    type: "reward",
    linhThach: 90,
    linhKhi: 30,
  },
  {
    text: "được chỉ dẫn vào một lối đi tắt an toàn qua hẻm núi. [+ 25% tu vi] [+ 15 Linh Thạch]",
    type: "reward",
    linhThach: 15,
    linhKhi: 25,
  },
  {
    text: "tìm thấy mảnh giáp bảo hộ cổ gãy nhẹ. [+ 10% tu vi] [+ 40 Linh Thạch]",
    type: "reward",
    linhThach: 40,
    linhKhi: 10,
  },
  {
    text: "lĩnh hội thành công một chiêu thức phòng thủ đơn giản. [+ 45% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 45,
  },
  {
    text: "được chưởng môn khen ngợi và ban chút tài nguyên tu luyện. [+ 50% tu vi] [+ 50 Linh Thạch]",
    type: "reward",
    linhThach: 50,
    linhKhi: 50,
  },
  {
    text: "nhặt được viên Định Thần Đan do ai đó vô tình làm rơi. [+ 60% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 60,
  },
  {
    text: "hái được củ Cát Cánh 100 năm dạt dào sức sống. [+ 55% tu vi] [+ 20 Linh Thạch]",
    type: "reward",
    linhThach: 20,
    linhKhi: 55,
  },
  {
    text: "tiêu diệt một con Ma Dơi chuyên hút máu thú nuôi. [+ 20% tu vi] [+ 30 Linh Thạch]",
    type: "reward",
    linhThach: 30,
    linhKhi: 20,
  },
  {
    text: "nhặt được mảnh bản đồ dẫn tới hang động tu tiên. [+ 25% tu vi] [+ 25 Linh Thạch]",
    type: "reward",
    linhThach: 25,
    linhKhi: 25,
  },
  {
    text: "thu được lông cánh đuôi của Xạ Hương Điểu. [+ 15% tu vi] [+ 35 Linh Thạch]",
    type: "reward",
    linhThach: 35,
    linhKhi: 15,
  },
  {
    text: "tịnh tâm nghe tiếng gió reo qua vách đá, xua tan mệt mỏi. [+ 35% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 35,
  },
  {
    text: "nhặt được chuỗi hạt niệm Phật ngập tràn Phật khí. [+ 40% tu vi] [+ 30 Linh Thạch]",
    type: "reward",
    linhThach: 30,
    linhKhi: 40,
  },
  {
    text: "độ hóa thành công một linh hồn vất vưởng, nhận công đức. [+ 60% tu vi] [+ 10 Linh Thạch]",
    type: "reward",
    linhThach: 10,
    linhKhi: 60,
  },
  {
    text: "tìm thấy kho lương thực bí mật của toán sơn tặc. [+ 10% tu vi] [+ 65 Linh Thạch]",
    type: "reward",
    linhThach: 65,
    linhKhi: 10,
  },
  {
    text: "nhặt được linh cừu thạch có công năng giữ ấm. [+ 20% tu vi] [+ 20 Linh Thạch]",
    type: "reward",
    linhThach: 20,
    linhKhi: 20,
  },
  {
    text: "thưởng thức chén trà thơm do đạo hữu pha tặng. [+ 30% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 30,
  },
  {
    text: "tìm được bộ lông cáo chín đuôi tuyệt đẹp. [+ 80 Linh Thạch]",
    type: "reward",
    linhThach: 80,
    linhKhi: 0,
  },
  {
    text: "phát hiện một giếng nước tích tụ linh khí ngàn năm. [+ 95% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 95,
  },
  {
    text: "nhặt được chiếc sáo trúc có khả năng trấn tĩnh tâm ma. [+ 35% tu vi] [+ 25 Linh Thạch]",
    type: "reward",
    linhThach: 25,
    linhKhi: 35,
  },
  {
    text: "tiêu diệt Ma Bọ Cạp ở vùng sa mạc, lấy được ngọc độc. [+ 25% tu vi] [+ 45 Linh Thạch]",
    type: "reward",
    linhThach: 45,
    linhKhi: 25,
  },
  {
    text: "học được bí kíp hô hấp theo nhịp thở của tự nhiên. [+ 50% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 50,
  },
  {
    text: "được dẫn đường đến khu vực có nhiều linh thảo. [+ 45% tu vi] [+ 15 Linh Thạch]",
    type: "reward",
    linhThach: 15,
    linhKhi: 45,
  },
  {
    text: "nhặt được tấm thảm bay rách một góc. [+ 10% tu vi] [+ 40 Linh Thạch]",
    type: "reward",
    linhThach: 40,
    linhKhi: 10,
  },
  {
    text: "tìm thấy mảnh thiên thạch rớt xuống từ hư không. [+ 40% tu vi] [+ 60 Linh Thạch]",
    type: "reward",
    linhThach: 60,
    linhKhi: 40,
  },
  {
    text: "hấp thụ ánh sáng trăng rằm, kinh mạch sảng khoái. [+ 70% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 70,
  },
  {
    text: "được ban tặng một túi trữ vật dung tích nhỏ. [+ 15% tu vi] [+ 35 Linh Thạch]",
    type: "reward",
    linhThach: 35,
    linhKhi: 15,
  },
  {
    text: "phát hiện vạt dâu tiên ngọt lịm. [+ 50% tu vi] [+ 10 Linh Thạch]",
    type: "reward",
    linhThach: 10,
    linhKhi: 50,
  },
  {
    text: "nhặt được mảnh xích sắt phong ấn ma thú cổ. [+ 20% tu vi] [+ 50 Linh Thạch]",
    type: "reward",
    linhThach: 50,
    linhKhi: 20,
  },
  {
    text: "thu hoạch được Linh Quy Giáp dùng làm khiên. [+ 30% tu vi] [+ 45 Linh Thạch]",
    type: "reward",
    linhThach: 45,
    linhKhi: 30,
  },
  {
    text: "nhận được sự chúc phúc từ các linh hồn tổ tiên. [+ 100% tu vi]",
    type: "reward",
    linhThach: 0,
    linhKhi: 100,
  },

  // ==========================================
  // II. RỦI RO & TỔN THẤT (100 Sự Kiện -Linh Thạch / -Linh Khí)
  // ==========================================
  {
    text: "bị sương độc làm hoa mắt, phải vận công xua tan. [- 15% tu vi]",
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
    text: "tâm ma xao động nhẹ, mất chút thời gian điều hòa khí huyết. [- 25% tu vi]",
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
    text: "bị một con Hắc Ngưu sừng nhọn húc trúng, ngực hơi nhói đau. [- 30% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -30,
  },
  {
    text: "mua nhầm linh dược giả của thương nhân lừa đảo. [- 30 Linh Thạch]",
    type: "penalty",
    linhThach: -30,
    linhKhi: 0,
  },
  {
    text: "bị ngấm nước lạnh dưới hồ băng, khí huyết ngưng trệ. [- 20% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -20,
  },
  {
    text: "va chạm với Ma Tu hạ sơn, phải tốn sức thoát thân. [- 35% tu vi] [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: -35,
  },
  {
    text: "lỡ tay làm vỡ một viên linh thạch khi đang luyện công. [- 5% tu vi] [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: -5,
  },
  {
    text: "bị luồng sát khí bí ẩn quấy nhiễu, kinh mạch rối loạn. [- 40% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -40,
  },
  {
    text: "bị đàn Ong Hút Mật tấn công, phải chạy trốn thục mạng. [- 25% tu vi]",
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
    text: "bị chấn thương do tập luyện chiêu thức mới quá sức. [- 45% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -45,
  },
  {
    text: "bị trộm mất một ít lương thực và linh thạch. [- 5% tu vi] [- 20 Linh Thạch]",
    type: "penalty",
    linhThach: -20,
    linhKhi: -5,
  },
  {
    text: "ăn lầm quả độc hoang dại, bụng đau quặn thắt. [- 35% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -35,
  },
  {
    text: "vô tình kích hoạt cấm chế bảo vệ của động phủ cổ. [- 30% tu vi] [- 10 Linh Thạch]",
    type: "penalty",
    linhThach: -10,
    linhKhi: -30,
  },
  {
    text: "bị ngã từ trên cây cao xuống, bong gân chân. [- 20% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -20,
  },
  {
    text: "bị mưa axit làm hỏng trang phục tu tiên. [- 10% tu vi] [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: -10,
  },
  {
    text: "bị dao động bởi ảo ảnh ma quái, đạo tâm giảm sút. [- 50% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -50,
  },
  {
    text: "thua cược khi tham gia trò chơi may rủi. [- 35 Linh Thạch]",
    type: "penalty",
    linhThach: -35,
    linhKhi: 0,
  },
  {
    text: "bị gián đoạn khi đang bế quan do tiếng ồn lớn. [- 40% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -40,
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
    text: "bị sét hòn đánh trúng vai khi mưa giông. [- 55% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -55,
  },
  {
    text: "bị lừa mua linh cừu bệnh chết. [- 30 Linh Thạch]",
    type: "penalty",
    linhThach: -30,
    linhKhi: 0,
  },
  {
    text: "vận công sai hướng khiến máu tràn ra miệng. [- 60% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -60,
  },
  {
    text: "bị một con Yêu Đỉa bám vào chân hút máu. [- 25% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -25,
  },
  {
    text: "đánh rơi mất ngọc bội hộ thân xuống sông. [- 40 Linh Thạch]",
    type: "penalty",
    linhThach: -40,
    linhKhi: 0,
  },
  {
    text: "bị gió độc quật ngã ngất xỉu trong vài phút. [- 35% tu vi] [- 5 Linh Thạch]",
    type: "penalty",
    linhThach: -5,
    linhKhi: -35,
  },
  { text: "bị Hỏa Hồ cào rách tay. [- 20% tu vi]", type: "penalty", linhThach: 0, linhKhi: -20 },
  {
    text: "phải nộp phí qua đường cho nhóm xà phong vô lại. [- 25 Linh Thạch]",
    type: "penalty",
    linhThach: -25,
    linhKhi: 0,
  },
  {
    text: "bị khí lạnh ngấm vào xương khớp. [- 30% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -30,
  },
  {
    text: "dùng nhầm linh dược quá hạn sử dụng. [- 25% tu vi] [- 10 Linh Thạch]",
    type: "penalty",
    linhThach: -10,
    linhKhi: -25,
  },
  {
    text: "bị đá rơi trúng đầu khi đi dưới vách núi. [- 40% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -40,
  },
  {
    text: "bị quấy rối bởi âm thanh của quỷ sai đêm. [- 35% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -35,
  },
  {
    text: "đánh mất một cuốn sách hướng dẫn nhập môn. [- 10% tu vi] [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: -10,
  },
  {
    text: "bị dị ứng với phấn hoa của Linh Cúc. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -15,
  },
  {
    text: "bị cướp mất một ít linh thạch khi đang đi một mình. [- 50 Linh Thạch]",
    type: "penalty",
    linhThach: -50,
    linhKhi: 0,
  },
  {
    text: "bị ảo giác dẫn lối đi lạc trong sương mù. [- 45% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -45,
  },
  {
    text: "bị ma trùng cắn hỏng túi áo. [- 5% tu vi] [- 20 Linh Thạch]",
    type: "penalty",
    linhThach: -20,
    linhKhi: -5,
  },
  {
    text: "bị ảnh hưởng bởi trận pháp cuồng phong. [- 50% tu vi]",
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
    text: "bị ngã xuống bùn lầy, tốn công làm sạch. [- 20% tu vi] [- 5 Linh Thạch]",
    type: "penalty",
    linhThach: -5,
    linhKhi: -20,
  },
  {
    text: "bị tiêu hao sức lực khi vượt qua đèo cao. [- 30% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -30,
  },
  {
    text: "bị gián đoạn mạch suy nghĩ khi ngộ đạo. [- 40% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -40,
  },
  {
    text: "đánh vỡ bình chứa nước linh tuyền. [- 15% tu vi] [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: -15,
  },
  {
    text: "bị Yêu Báo vồ hụt nhưng bị thương ở vai. [- 35% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -35,
  },
  {
    text: "bị tốn chi phí chữa trị vết thương nhỏ. [- 25 Linh Thạch]",
    type: "penalty",
    linhThach: -25,
    linhKhi: 0,
  },
  {
    text: "bị kiệt sức vì đi bộ dưới trời nắng gắt. [- 25% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -25,
  },
  {
    text: "bị Ma Tu quấy phá làm mất tập trung. [- 45% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -45,
  },
  {
    text: "làm hỏng cán kiếm gỗ khi luyện tập. [- 20 Linh Thạch]",
    type: "penalty",
    linhThach: -20,
    linhKhi: 0,
  },
  {
    text: "bị trúng hơi độc từ bãi phân yêu thú. [- 20% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -20,
  },
  {
    text: "bị thu phí đỗ đỗ thuyền tại bến sông. [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: 0,
  },
  {
    text: "bị tốn năng lượng để xua đuổi muỗi núi. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -15,
  },
  {
    text: "bị giật mình bởi tiếng sấm lớn làm lệch khí huyết. [- 30% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -30,
  },
  {
    text: "làm rơi đĩa thức ăn linh thực. [- 10% tu vi] [- 10 Linh Thạch]",
    type: "penalty",
    linhThach: -10,
    linhKhi: -10,
  },
  {
    text: "bị chó săn của cướp đuổi theo. [- 25% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -25,
  },
  {
    text: "bị tốn tiền sửa lại đôi giày tu tiên bị rách. [- 20 Linh Thạch]",
    type: "penalty",
    linhThach: -20,
    linhKhi: 0,
  },
  {
    text: "bị nhiễm lạnh do nằm ngủ ngoài trời đêm. [- 35% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -35,
  },
  {
    text: "bị phạt linh thạch do vi phạm quy định tông môn. [- 40 Linh Thạch]",
    type: "penalty",
    linhThach: -40,
    linhKhi: 0,
  },
  {
    text: "bị một con Chim Lục cắn vào ngón tay. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -15,
  },
  {
    text: "bị hỏng đai lưng giữ linh thạch. [- 5% tu vi] [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: -5,
  },
  {
    text: "bị kiệt sức do đẩy xe hàng giúp người dân. [- 20% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -20,
  },
  {
    text: "bị mất phương hướng trong rừng sâu. [- 30% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -30,
  },
  {
    text: "bị đền bù tiền do làm hỏng đồ đạc quán trọ. [- 35 Linh Thạch]",
    type: "penalty",
    linhThach: -35,
    linhKhi: 0,
  },
  {
    text: "bị ám ảnh bởi cơn ác mộng thiên kiếp. [- 50% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -50,
  },
  {
    text: "bị trầy xước da do đi qua bụi gai sắc. [- 15% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -15,
  },
  {
    text: "lỡ làm rớt mất lọ thuốc trị thương. [- 25 Linh Thạch]",
    type: "penalty",
    linhThach: -25,
    linhKhi: 0,
  },
  {
    text: "bị hoa mắt do nhìn trực tiếp vào mặt trời. [- 20% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -20,
  },
  {
    text: "bị tổn thất tài nguyên do chuẩn bị sai nguyên liệu. [- 10% tu vi] [- 30 Linh Thạch]",
    type: "penalty",
    linhThach: -30,
    linhKhi: -10,
  },
  {
    text: "bị chuột cắn hỏng bao đựng linh thảo. [- 15% tu vi] [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: -15,
  },
  {
    text: "bị tốn công xua tan khói độc từ đám cháy. [- 25% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -25,
  },
  {
    text: "bị trượt ngã xuống suối ướt hết người. [- 20% tu vi] [- 5 Linh Thạch]",
    type: "penalty",
    linhThach: -5,
    linhKhi: -20,
  },
  {
    text: "bị tính tiền phòng trọ giá đắt đỏ. [- 40 Linh Thạch]",
    type: "penalty",
    linhThach: -40,
    linhKhi: 0,
  },
  {
    text: "bị ma khí nhẹ tích tụ trong người. [- 45% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -45,
  },
  {
    text: "bị sứt mẻ thanh đoản đao. [- 15 Linh Thạch]",
    type: "penalty",
    linhThach: -15,
    linhKhi: 0,
  },
  {
    text: "bị kiệt sức vì chạy trốn mưa đá. [- 30% tu vi]",
    type: "penalty",
    linhThach: 0,
    linhKhi: -30,
  },
  {
    text: "bị đóng phạt vì quên nộp báo cáo tuần. [- 25 Linh Thạch]",
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
