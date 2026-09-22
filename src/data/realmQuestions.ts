export interface RealmQuestionItem {
  stageGroup: number; // 0: Nhóm đầu, 1: Nhóm giữa, 2: Nhóm cuối
  question: string;
  correct: string;
  wrongs: [string, string, string];
}

export const REALM_QUESTIONS_DATABASE: Record<string, RealmQuestionItem[]> = {
  // ==========================================
  // 1. LUYỆN KHÍ KỲ
  // ==========================================
  "Luyện Khí Kỳ": [
    // --- Nhóm 0 ---
    {
      stageGroup: 0,
      question: "Vừa bước chân vào con đường tu tiên, cảm nhận linh khí mỏng manh, tâm trí dễ sinh ra ý định gì nhất?",
      correct: "Kiên nhẫn đả thông kinh mạch từng bước, hiểu rằng tu hành không thể nóng vội.",
      wrongs: [
        "Nghi ngờ bản thân thiếu khuyết linh căn, chi bằng chuyển hướng luyện thể để bù đắp.",
        "Cho rằng phương pháp nạp khí của tông môn có vấn đề, nên tự ý cải biên công pháp.",
        "Tiết kiệm từng chút linh khí, giữ lại dùng dần thay vì mạo hiểm đả thông đại chu thiên."
      ]
    },
    {
      stageGroup: 0,
      question: "Lần đầu tiên luyện hóa linh thạch thất bại, khí huyết nghịch lưu, đạo hữu nên làm gì?",
      correct: "Thu hồi thần thức, tĩnh tọa điều tức để ổn định lại đan điền.",
      wrongs: [
        "Tăng gấp đôi lượng linh thạch hấp thụ để bù đắp phần hao hụt vừa qua.",
        "Dùng ngoại lực châm cứu huyệt vị để ép dòng linh lực quay về quỹ đạo.",
        "Tạm ngưng tu luyện vài năm để cơ thể tự phục hồi nguyên khí hoàn toàn."
      ]
    },
    {
      stageGroup: 0,
      question: "Nhìn thấy đồng môn nhập môn cùng lúc đã đột phá tầng tiếp theo, tâm lý xuất hiện sự ghen tị, cách giải quyết?",
      correct: "Xem đó là động lực để cố gắng, mỗi người có cơ duyên và nhịp điệu riêng.",
      wrongs: [
        "Cho rằng họ dùng bàng môn tả đạo, cần báo cáo lên chấp pháp đường điều tra.",
        "Tự cô lập bản thân, tránh xa mọi giao tiếp để không bị ảnh hưởng tâm trạng.",
        "Chuyển sang tu luyện ngày đêm không nghỉ để nhanh chóng san lấp khoảng cách."
      ]
    },
    // --- Nhóm 1 ---
    {
      stageGroup: 1,
      question: "Bế quan suốt mấy tháng nhưng tu vi giậm chân tại chỗ, ảo ảnh cô độc bắt đầu xâm chiếm tâm trí:",
      correct: "Nhìn thấu cô độc là con đường phải trải qua của kẻ mạnh, kiên định đạo tâm.",
      wrongs: [
        "Biện minh rằng đại đạo vô tình nhưng tình người sâu nặng, nên tìm bạn đồng tu để chia sẻ.",
        "Tự nhủ cảnh giới này đã là giới hạn của bản thân, an phận thủ thường là thượng sách.",
        "Cho rằng thiếu vắng đan dược hỗ trợ nên mới bế tắc, cần mạo hiểm ra ngoại sơn tìm kiếm."
      ]
    },
    {
      stageGroup: 1,
      question: "Gặp phải bình phong linh khí, cảm giác như có bức tường vô hình chặn lại không cho tiến bước:",
      correct: "Quan sát lại quy luật vận hành của công pháp, tìm điểm khuyết thiếu để phá.",
      wrongs: [
        "Đổi sang tu luyện một môn công pháp khác cấp cao hơn để dễ dàng vượt qua.",
        "Dùng huyết dịch của chính mình để kích thích tiềm năng bộc phát nhất thời.",
        "Thuận theo tự nhiên, khi nào duyên tới tường tự khắc phá, không cần cưỡng cầu."
      ]
    },
    {
      stageGroup: 1,
      question: "Tâm ma hóa thành hình bóng người thân đã khuất, trách mắng đạo hữu bỏ bê gia đình để đi tu:",
      correct: "Hiểu rõ sinh ly tử biệt là quy luật phàm trần, tâm như chỉ thủy không dao động.",
      wrongs: [
        "Tự nhủ tu thành tiên đạo rồi sẽ quay về nghịch chuyển thời gian cứu người thân.",
        "Xem đó là lời cảnh tỉnh từ nhân quả, cần lập bài vị cúng bái mỗi ngày để chuộc lỗi.",
        "Lấy việc phụng sự chúng sinh trong tông môn làm hình thức bù đắp cho gia tộc."
      ]
    },
    // --- Nhóm 2 ---
    {
      stageGroup: 2,
      question: "Đến ngưỡng cửa đại viên mãn Luyện Khí, tâm ma hiện nguyên hình dụ dỗ buông bỏ để đổi lấy sự trường thọ giả tạo ở phàm gian:",
      correct: "Cự tuyệt dứt khoát, chí hướng của ta là đại đạo trường sinh, quyết không lùi bước.",
      wrongs: [
        "Cân nhắc việc kết hợp cả hai: hưởng thụ vinh hoa phú quý rồi lúc già hãy tu tiếp.",
        "Cho rằng làm một bậc hiền triết ở phàm gian cũng là một hình thức nhập thế tu đạo.",
        "Do dự vì sợ hãi kiếp nạn phía trước, xem việc lui về phàm gian là một lối thoát an toàn."
      ]
    },
    {
      stageGroup: 2,
      question: "Cảm giác sợ hãi thiên kiếp hoặc lôi kiếp sắp tới bắt đầu nảy sinh trong tiềm thức:",
      correct: "Thiên kiếp là thử thách tôi luyện cốt nhục, ta chuẩn bị tâm lý đón nhận.",
      wrongs: [
        "Tìm kiếm các loại pháp bảo phòng thủ thượng hạng để hoàn toàn triệt tiêu uy lực lôi kiếp.",
        "Cho rằng đạo tâm chưa đủ thì không nên miễn cưỡng độ kiếp, cứ trì hoãn thêm trăm năm.",
        "Tin rằng tích lũy công đức bằng việc làm việc thiện có thể miễn trừ hoàn toàn thiên kiếp."
      ]
    },
    {
      stageGroup: 2,
      question: "Tâm ma tạo ra ảo cảnh tòa bảo khổng lồ với vô số linh bảo nhưng yêu cầu phải tự phế một nửa tu vi hiện tại:",
      correct: "Ngoại vật chỉ là mây bay, tự tay tu luyện ra mới là chân chính thuộc về mình.",
      wrongs: [
        "Chấp nhận phế tu vi vì nghĩ số linh bảo đó đủ để tu luyện lại nhanh gấp bội.",
        "Thương lượng với tâm ma chỉ phế một phần tư để đổi lấy một nửa bảo vật.",
        "Cho rằng cơ duyên lớn thường đi kèm mạo hiểm lớn, đánh đổi là xứng đáng."
      ]
    },
    {
      stageGroup: 2,
      question: "Khoảnh khắc chuẩn bị dung hợp linh khí để bước qua ngưỡng cửa tiếp theo, tâm cảnh đột ngột trống rỗng, mất phương hướng:",
      correct: "Hít sâu một hơi, tâm tưởng hướng về sơ tâm thuở ban đầu bước vào tiên môn.",
      wrongs: [
        "Tạm gác việc đột phá, tìm kiếm các điển tịch cổ để tìm hiểu nguyên nhân trống rỗng.",
        "Cho rằng đây là dấu hiệu cảnh báo của thiên đạo, nên lập tức dừng lại.",
        "Dùng sự phẫn nộ và khao khát chiến thắng để lấp đầy khoảng trống trong tâm trí."
      ]
    }
  ],

  // ==========================================
  // 2. TRÚC CƠ KỲ
  // ==========================================
  "Trúc Cơ Kỳ": [
    // --- Nhóm 0 ---
    {
      stageGroup: 0,
      question: "Khi bắt đầu đúc tòa đạo cơ, linh lực trong kinh mạch bắt đầu xung đột dữ dội, nguyên nhân cốt lõi là gì?",
      correct: "Do nền tảng Luyện Khí chưa vững chắc, tạp chất trong kinh mạch chưa được luyện sạch.",
      wrongs: [
        "Do linh thạch dùng để đột phá có phẩm chất không đồng đều.",
        "Do xung khắc giữa thiên địa linh khí và công pháp bản mệnh.",
        "Do thời khắc chọn để đúc đạo cơ không hợp với thiên can địa chi."
      ]
    },
    {
      stageGroup: 0,
      question: "Tâm ma hiện lên hình ảnh một vị trưởng lão từng coi thường mình, kích động ta tìm đến báo thù ngay lập tức:",
      correct: "Thù hận chỉ là gánh nặng cho đạo tâm, chờ khi đại thành ta sẽ đường đường chính chính giải quyết.",
      wrongs: [
        "Dùng danh nghĩa đại đạo để trừng phạt kẻ tiểu nhân, ra tay trước để chiếm tiên cơ.",
        "Âm thầm ghi khắc vào sinh tử mộc, đợi có thực lực sẽ dùng thủ đoạn tương tự trả lại.",
        "Chuyển hóa phẫn nộ thành áp lực tu luyện, nhưng trong lòng vẫn canh cánh mối hận."
      ]
    },
    {
      stageGroup: 0,
      question: "Cảm giác linh khí hóa lỏng trong đan điền quá nặng nề, ép chặt vào tâm thần gây đau đớn:",
      correct: "Kiên trì dùng thần thức dung hợp, thích nghi với sự thay đổi chất của linh lực.",
      wrongs: [
        "Phân tán bớt linh lực ra các kinh mạch phụ để giảm áp lực cho đan điền.",
        "Dùng đan dược an thần để làm dịu cảm giác đau đớn ở thần kinh.",
        "Thuận theo áp lực đó để nén ép linh lực thành hình thể đặc quánh nhanh hơn."
      ]
    },
    // --- Nhóm 1 ---
    {
      stageGroup: 1,
      question: "Khi đối mặt với ảo cảnh người mình từng yêu thương bỏ rơi để đi theo cường giả khác:",
      correct: "Đạo bất đồng bất tương vi mưu, tình ái phàm trần nay đã là mây bay.",
      wrongs: [
        "Tự hứa sẽ trở thành cường giả tối cao để người đó phải hối hận vì đã rời đi.",
        "Xem đó là bài học về sự phũ phàng của thế gian, từ nay đóng chặt cửa lòng.",
        "Cho rằng duyên phận chưa đủ sâu, cần tìm cách níu kéo bằng thực lực."
      ]
    },
    {
      stageGroup: 1,
      question: "Linh đan phá cảnh dùng đã cạn mà đạo cơ vẫn chưa hoàn thiện, tâm sinh hoảng loạn:",
      correct: "Bình tĩnh dừng lại, dùng thiên nhiên thảo mộc để tự điều hòa sinh khí.",
      wrongs: [
        "Dùng công pháp thiêu đốt tiềm năng bản mệnh để hoàn thành nốt phần còn thiếu.",
        "Tin tưởng vào sự kiên trì của bản thân, tiếp tục ép buộc cơ thể đột phá không cần đan dược.",
        "Mượn ngoại lực từ linh khí của người khác để hoàn thiện đạo cơ."
      ]
    },
    {
      stageGroup: 1,
      question: "Tâm ma thì thầm rằng thiên tài trăm năm gặp một như ta cũng chỉ là con cờ trong tay môn phái:",
      correct: "Ta tu cho chính ta, mạnh mẽ vượt lên trên mọi sự sắp đặt của số phận.",
      wrongs: [
        "Cần phải tỏ ra ngoan ngoãn, che giấu tài năng thực sự để qua mặt các cao tầng.",
        "Tìm cách nắm giữ quyền lực trong tông môn để không bị kẻ khác sai khiến.",
        "Xem việc làm quân cờ cũng là một cách mượn thế lực tông môn để phát triển."
      ]
    },
    // --- Nhóm 2 ---
    {
      stageGroup: 2,
      question: "Khoảnh khắc ngưng kết đạo đài thành công chín phần mười, tâm ma đột ngột tạo ra ảo giác thiên địa sụp đổ:",
      correct: "Nhìn thấu tất cả là hư ảo, tâm như kính sáng soi chiếu mọi yêu ma.",
      wrongs: [
        "Dùng phần linh lực còn lại để bảo vệ những thứ trân quý trong ảo cảnh.",
        "Tự nhủ nếu đây là định mệnh thì đành chấp nhận sụp đổ cùng thiên địa.",
        "Tìm điểm yếu của thiên địa ảo để phản kích và thoát ra."
      ]
    },
    {
      stageGroup: 2,
      question: "Sức mạnh bùng nổ của Trúc Cơ khiến ta cảm thấy mình có thể ngạo thị phàm trần, tâm sinh ngạo mạn:",
      correct: "Núi cao còn có núi cao hơn, Trúc Cơ mới chỉ là khởi đầu của chân chính tu hành.",
      wrongs: [
        "Kẻ mạnh có quyền định đoạt số phận kẻ yếu, đó là quy luật tự nhiên của tu tiên giới.",
        "Chỉ nên khiêm nhường trước những người mạnh hơn, còn phàm nhân thì không cần bận tâm.",
        "Sự tự tin là cần thiết cho đạo tâm, ngạo mạn đôi khi giúp uy hiếp đối thủ."
      ]
    },
    {
      stageGroup: 2,
      question: "Cảm giác thần thức bị xé rách khi mở rộng không gian đan điền ở tầng cuối Trúc Cơ:",
      correct: "Nghiến răng chịu đựng, dùng ý chí sắt đá tôi luyện thần hồn kiên cường.",
      wrongs: [
        "Thu hẹp phạm vi đan điền lại để bảo toàn thần thức khỏi tổn thương.",
        "Dùng bí pháp phân tâm để chia nhỏ nỗi đau thành nhiều phần dễ chịu hơn.",
        "Chấp nhận dừng lại ở mức hiện tại, không mạo hiểm mở rộng thêm nữa."
      ]
    },
    {
      stageGroup: 2,
      question: "Trước ngưỡng cửa bước vào Kim Đan, tâm ma hóa thành bản ngã hoàn hảo không tì vết, chế giễu sự tầm thường của ta:",
      correct: "Bản ngã chính là ta, không hoàn hảo mới là nhân sinh tu đạo thực thụ.",
      wrongs: [
        "Quyết tâm tiêu diệt bản ngã giả lập đó để chứng minh bản thân mới là chân chính.",
        "Học hỏi những điểm hoàn hảo của nó để tự hoàn thiện bản thân ngay lúc này.",
        "Thừa nhận sự thua kém của mình và xin nó chỉ dẫn con đường tiếp theo."
      ]
    }
  ],

  // ==========================================
  // 3. KIM ĐAN KỲ
  // ==========================================
  "Kim Đan Kỳ": [
    // --- Nhóm 0 ---
    {
      stageGroup: 0,
      question: "Ngưng kết Kim Đan đòi hỏi sự viên mãn, nhưng nội tâm bỗng nhớ về những lỗi lầm thời phàm nhân:",
      correct: "Quá khứ đã qua là bài học tôi luyện đạo tâm, ta dung hòa nó thành dưỡng chất.",
      wrongs: [
        "Lập tức dừng bế quan, trở về phàm gian làm việc thiện để bù đắp tội lỗi xưa.",
        "Dùng bí pháp phong ấn ký ức đó vào góc sâu nhất của thần thức.",
        "Chấp nhận mang theo vết nhơ đó vì không ai trên đời là hoàn hảo."
      ]
    },
    {
      stageGroup: 0,
      question: "Kim Đan vừa thành hình nhưng có vết rạn nhỏ do tâm bất định, đối sách tốt nhất là gì?",
      correct: "Dùng linh lực thuần khiết và chân hỏa từ từ tôi luyện, bồi đắp lại vết nứt.",
      wrongs: [
        "Dùng dược lực mạnh để ép Kim Đan dung hợp lại một cách bạo lực.",
        "Chấp nhận chất lượng Kim Đan bị giảm sút, miễn là đột phá thành công là được.",
        "Luyện hóa thêm một viên phụ đan để che lấp vết rạn bên ngoài."
      ]
    },
    {
      stageGroup: 0,
      question: "Cảm giác cô độc của một Kim Đan chân nhân sống thọ hàng trăm năm khiến bạn bè phàm trần dần rời xa:",
      correct: "Đường tu tiên là cô độc, duyên khởi duyên diệt hãy để tự nhiên.",
      wrongs: [
        "Truyền thụ một ít công pháp trường sinh cho họ để có thể đồng hành lâu hơn.",
        "Tự cô lập cảm xúc từ trước để không phải đau đớn khi chứng kiến họ ra đi.",
        "Xem việc phàm nhân qua đời là quy luật sinh tử bình thường, không cần bận lòng."
      ]
    },
    // --- Nhóm 1 ---
    {
      stageGroup: 1,
      question: "Tâm ma tạo ra ảo cảnh môn phái bị diệt vong, sư phụ và đồng môn ngã xuống trước mặt:",
      correct: "Kìm nén bi thương, ghi khắc thù hận vào tim để phấn đấu mạnh mẽ hơn.",
      wrongs: [
        "Thề sẽ dùng toàn bộ sức mạnh để tiêu diệt kẻ thù trong ảo cảnh ngay lập tức.",
        "Tự trách bản thân yếu kém không bảo vệ được mọi người, sinh lòng thoái chí.",
        "Cho rằng đây là điềm báo trước, cần lập tức trở về tông môn kiểm tra phòng thủ."
      ]
    },
    {
      stageGroup: 1,
      question: "Đạo lý tu tiên mâu thuẫn với lòng trắc ẩn khi phải ra tay sát hại đồng loại để tranh đoạt tài nguyên:",
      correct: "Tu tiên tranh đoạt với trời đất, ta không hại người nhưng cũng không để người hại ta.",
      wrongs: [
        "Chỉ cướp đoạt tài nguyên của kẻ ác, tuyệt đối không ra tay với người vô tội.",
        "Chọn cách ẩn cư nơi thâm sơn cùng cốc để không phải tham gia vào những cuộc tranh đoạt.",
        "Xem lòng trắc ẩn là điểm yếu chí mạng, cần phải tàn nhẫn hơn nữa."
      ]
    },
    {
      stageGroup: 1,
      question: "Áp lực từ lôi kiếp Kim Đan kiết đỉnh khiến tâm thần dao động, sợ hãi cái chết:",
      correct: "Sợ chết là bản năng, vượt qua cái chết để chạm đến vĩnh hằng mới là tu sĩ.",
      wrongs: [
        "Chuẩn bị thật nhiều pháp bảo thế mạng để chắc chắn sống sót qua kiếp nạn.",
        "Tìm kiếm sự hỗ trợ từ các trưởng lão để họ che chở một phần lôi kiếp.",
        "Chấp nhận tu vi dừng lại ở mức an toàn, không mạo hiểm kiết đỉnh nữa."
      ]
    },
    // --- Nhóm 2 ---
    {
      stageGroup: 2,
      question: "Kim Đan đại viên mãn, quyền lực trong tay có thể quyết định sinh tử hàng vạn người, tâm sinh ngã mạn:",
      correct: "Nắm quyền lực càng lớn, tâm trí càng phải tĩnh lặng, không để ngoại vật sai khiến.",
      wrongs: [
        "Sử dụng quyền lực đó để thiết lập trật tự nghiêm minh, trừ gian diệt bạo.",
        "Giao lại quyền lực cho người khác quản lý để bản thân tập trung tu luyện.",
        "Hiểu rằng quyền lực chỉ là công cụ bảo vệ bản thân trên con đường đại đạo."
      ]
    },
    {
      stageGroup: 2,
      question: "Tâm ma biến thành một vị tiên nhân cao cao tại thượng, chê bai Kim Đan của ta chỉ là phàm phẩm:",
      correct: "Phàm phẩm hay thần phẩm, tự ta đi lên bằng đôi chân này chính là chí bảo.",
      wrongs: [
        "Tìm mọi cách luyện hóa lại Kim Đan để đạt chuẩn thần phẩm theo lời tiên nhân.",
        "Chứng minh cho vị tiên nhân đó thấy phàm phẩm cũng có thể chiến thắng thần phẩm.",
        "Cho rằng tiên nhân chỉ có cái nhìn phiến diện, không đáng để bận tâm."
      ]
    },
    {
      stageGroup: 2,
      question: "Khoảnh khắc chuẩn bị dung hợp nguyên thần để bước vào Nguyên Anh, tâm cảnh xuất hiện kẽ hở hoài nghi:",
      correct: "Giữ vững một niệm chân như, hợp nhất thần hồn không chút dao động.",
      wrongs: [
        "Dùng sự quyết đoán và uy quyền áp chế mọi hoài nghi trong tâm trí.",
        "Định kỳ hoãn lại việc đột phá để tìm hiểu rõ nguồn gốc của mối hoài nghi.",
        "Chấp nhận hoài nghi như một phần của quá trình tư duy trưởng thành."
      ]
    },
    {
      stageGroup: 2,
      question: "Ảo ảnh về sự vĩnh hằng và trống rỗng của cõi tiên giới hiện ra, khiến ý chí tu hành lung lay:",
      correct: "Đạo tại nhân tâm, vĩnh hằng hay không là do chính ta định nghĩa.",
      wrongs: [
        "Tập trung vào hiện tại, không nghĩ đến những chuyện xa xôi ở cõi tiên giới.",
        "Cho rằng sự trống rỗng là trạng thái cao nhất của niết bàn, cần phải hướng tới.",
        "Tìm kiếm ý nghĩa tu hành từ việc mang lại lợi ích cho chúng sinh."
      ]
    }
  ],

  // ==========================================
  // 4. NGUYÊN ANH KỲ
  // ==========================================
  "Nguyên Anh Kỳ": [
    // --- Nhóm 0 ---
    {
      stageGroup: 0,
      question: "Nguyên Anh vừa sinh ra, có hình hài giống hệt bản thể nhưng mang theo mặt tối tham lam và ích kỷ:",
      correct: "Chấp nhận mặt tối đó là một phần của bản ngã, dùng pháp lực thuần hóa nó.",
      wrongs: [
        "Dùng thần thức mạnh mẽ áp chế và phong ấn mặt tối đó vĩnh viễn.",
        "Tách rời phần tính cách đó ra khỏi Nguyên Anh để giữ sự trong sạch.",
        "Cho rằng ai cũng có tham sân si, không cần quá bận tâm đến nó."
      ]
    },
    {
      stageGroup: 0,
      question: "Đứng trên đỉnh cao Nguyên Anh, nhìn xuống chúng sinh thấy họ thật nhỏ bé và ngu muội:",
      correct: "Ta từng bước từ phàm nhân mà lên, chớ quên cội nguồn và lòng trắc ẩn.",
      wrongs: [
        "Cư xử xa cách, giữ khoảng cách đúng mực của một cao nhân với phàm trần.",
        "Dùng năng lực của mình để âm thầm che chở họ mà không cần họ biết.",
        "Hiểu rằng nhận thức khác biệt tạo ra khoảng cách, không cần phải hòa nhập."
      ]
    },
    {
      stageGroup: 0,
      question: "Tâm ma tạo ra ảo cảnh đối thủ cũ nay đã mạnh hơn và đang lăm le cướp đoạt địa vị của ta:",
      correct: "Mặc kệ hư danh, tu vi thực tế và tâm cảnh vững vàng mới là chân lý.",
      wrongs: [
        "Chủ động tìm đến đối thủ để giải quyết ân oán một lần cho xong.",
        "Tăng cường phòng thủ động phủ và chuẩn bị sẵn các đòn chí mạng phản công.",
        "Xem đó là động lực để không ngừng nâng cao thực lực bản thân."
      ]
    },
    // --- Nhóm 1 ---
    {
      stageGroup: 1,
      question: "Khám phá ra bí mật kinh hoàng về lịch sử của tông môn, phát hiện sư tổ từng là ma đầu sát hại vô số:",
      correct: "Đạo là của ta, sư tổ làm gì không quan trọng bằng việc ta đi con đường nào.",
      wrongs: [
        "Tách khỏi tông môn để đi theo con đường độc lập, không dính líu nhân quả.",
        "Tìm hiểu thêm động cơ đằng sau những hành động đó trước khi đưa ra phán xét.",
        "Giữ kín bí mật đó trong lòng, xem như chưa từng biết chuyện gì xảy ra."
      ]
    },
    {
      stageGroup: 1,
      question: "Nguyên Anh bị thương tổn do ngoại chiến, nỗi sợ cái chết và sự tàn tạ thể xác bao trùm:",
      correct: "Sinh tử có mệnh, dùng định lực vượt qua tổn thương thể xác.",
      wrongs: [
        "Tìm kiếm thiên tài địa bảo chuyên tu bổ thần hồn để phục hồi nguyên khí.",
        "Dùng bí pháp chuyển dời thương tổn sang các phân thân hoặc khôi lỗi.",
        "Chấp nhận tu vi bị suy giảm, miễn là vẫn giữ được tính mạng."
      ]
    },
    {
      stageGroup: 1,
      question: "Tâm ma cám dỗ buông bỏ gánh nặng tông môn, cao chạy xa bay tìm khoái lạc tiêu dao tự tại:",
      correct: "Trách nhiệm và đại đạo song hành, trốn tránh trách nhiệm không phải tiêu dao.",
      wrongs: [
        "Truyền ngôi vị lại cho thế hệ sau rồi mới tiêu dao tự tại theo ý mình.",
        "Chỉ tham gia các việc trọng đại của tông môn, còn lại dành thời gian cho bản thân.",
        "Xem việc gánh vác tông môn là một phần nhân quả phải trả trước khi phi thăng."
      ]
    },
    // --- Nhóm 2 ---
    {
      stageGroup: 2,
      question: "Đến cảnh giới Nguyên Anh hậu kỳ, sự cô độc của người mạnh nhất khiến tâm trí muốn tìm kiếm sự hủy diệt:",
      correct: "Tìm thấy ý nghĩa mới trong việc khám phá vũ trụ và bảo vệ đạo tâm.",
      wrongs: [
        "Tìm kiếm những đối thủ ngang tầm để giao chiến tìm cảm giác sinh tử.",
        "Đem công sức truyền lại cho hậu thế để để lại di sản trường tồn.",
        "Chấp nhận sự cô độc như một phần cái giá phải trả của cường giả."
      ]
    },
    {
      stageGroup: 2,
      question: "Tâm ma hiện nguyên hình là chính ta trong tương lai, già cỗi, thất bại và chết trong cô độc:",
      correct: "Tương lai nằm trong tay ta hiện tại, tương lai đó sẽ không bao giờ xảy ra.",
      wrongs: [
        "Thay đổi cách tu luyện hiện tại để phá vỡ viễn cảnh tương lai đó.",
        "Xem đó là lời cảnh tỉnh để trân trọng từng khoảnh khắc hiện tại hơn.",
        "Hiểu rằng mỗi lựa chọn tạo ra một tương lai khác nhau, không cần lo sợ."
      ]
    },
    {
      stageGroup: 2,
      question: "Khoảnh khắc dung hợp Nguyên Anh với không gian thiên địa để chuẩn bị bước sang Hóa Thần:",
      correct: "Hòa mình vào tự nhiên nhưng vẫn giữ vững bản ngã độc lập.",
      wrongs: [
        "Dùng thần thức bao trùm và kiểm soát một vùng không gian nhỏ của thiên địa.",
        "Thuận theo dòng chảy năng lượng tự nhiên để quá trình dung hợp diễn ra tự nhiên.",
        "Tận dụng linh khí thiên địa để củng cố thêm vững chắc cho Nguyên Anh."
      ]
    },
    {
      stageGroup: 2,
      question: "Cửa ải tâm ma cuối cùng trước khi hóa thần: Phải tự tay cắt đứt tình cảm sâu kín nhất với người trân quý:",
      correct: "Tình thâm nghĩa trọng nhưng đại đạo ở trên hết, khắc ghi trong tim rồi buông tay.",
      wrongs: [
        "Đưa người đó cùng đi vào bế quan để bảo vệ họ khỏi nguy hiểm.",
        "Phong ấn ký ức về người đó tạm thời để hoàn thành việc đột phá.",
        "Xem tình cảm là một phần động lực thúc đẩy bản thân tiến xa hơn."
      ]
    }
  ],

  // ==========================================
  // 5. HÓA THẦN KỲ
  // ==========================================
  "Hóa Thần Kỳ": [
    // --- Nhóm 0 ---
    {
      stageGroup: 0,
      question: "Thần thức phân liệt dung nhập thiên địa, cảm nhận được nỗi đau đớn của vạn vật trên thế gian:",
      correct: "Dùng từ bi và trí tuệ để thấu hiểu, không để nỗi đau đó làm vấy bẩn thần thức.",
      wrongs: [
        "Chỉ cảm nhận những nguồn năng lượng tích cực, chủ động che giấu phần tiêu cực.",
        "Dùng đại pháp thanh lọc một vùng nhỏ xung quanh để tạo sự bình yên giả tạo.",
        "Xem đó là nỗi đau của nhân gian, người tu đạo không nên can thiệp quá sâu."
      ]
    },
    {
      stageGroup: 0,
      question: "Tâm ma tạo ra thế giới ảo nơi ta là kẻ tạo vật toàn năng, có quyền sinh sát vô hạn:",
      correct: "Nhận thức rõ đây chỉ là ảo ảnh của quyền năng, ta vẫn chỉ là kẻ tu đạo.",
      wrongs: [
        "Sử dụng quyền năng trong thế giới ảo để cải thiện những điều chưa hoàn hảo.",
        "Xem đó là một trải nghiệm mô phỏng để thấu hiểu quy luật vận hành thế giới.",
        "Tự đặt ra các quy tắc luân hồi cho thế giới ảo để rèn luyện tâm tính."
      ]
    },
    {
      stageGroup: 0,
      question: "Cảm giác bản thể và pháp thân dần tách rời, nghi ngờ bản thân có còn là con người nữa không?",
      correct: "Hình hài chỉ là vỏ bọc, bản ngã và đạo tâm mới định nghĩa ta là ai.",
      wrongs: [
        "Thường xuyên hoán đổi ý thức giữa bản thể và pháp thân để duy trì sự cân bằng.",
        "Xem việc vượt qua hình hài con người là bước tiến tất yếu trên con đường hóa tiên.",
        "Tập trung tu luyện để pháp thân hoàn toàn hòa hợp với thể xác thịt."
      ]
    },
    // --- Nhóm 1 ---
    {
      stageGroup: 1,
      question: "Nhìn thấu qua lớp vỏ bọc đạo đức của các đại năng khác, thấy sự giả dối và ích kỷ tột cùng:",
      correct: "Đường ai nấy đi, giữ vững sự trong sạch của chính mình là đủ.",
      wrongs: [
        "Dùng sự thật đó để uy hiếp và buộc họ phải tuân theo trật tự của mình.",
        "Tự lập ra một quy chuẩn đạo đức nghiêm ngặt hơn để phân định chính tà.",
        "Xem sự giả dối là một dạng quy tắc sinh tồn ở tầng cao, học cách thích nghi."
      ]
    },
    {
      stageGroup: 1,
      question: "Tâm ma biến thành vị sư phụ quá cố, chỉ trích ta đã đi lệch khỏi con đường chân chính:",
      correct: "Thời đại thay đổi, đạo pháp vô tận, con đường của ta là do ta tự quyết định.",
      wrongs: [
        "Xem xét lại toàn bộ công pháp đang tu luyện xem có điểm nào bất ổn.",
        "Lập đàn cúng bái để xin sư phụ chỉ điểm và tha thứ cho lỗi lầm.",
        "Tin rằng ý chí của sư phụ luôn đúng, cần phải điều chỉnh lại lộ trình."
      ]
    },
    {
      stageGroup: 1,
      question: "Thần thức du ngoạn hư không vô tận, lạc lối trong khoảng không tối tăm không lối thoát:",
      correct: "Dùng một tia bản ngã kiên cố làm ngọn đuốc soi đường tìm về thể xác.",
      wrongs: [
        "Định tâm quan sát hư không để tìm hiểu quy luật ẩn giấu bên trong.",
        "Lợi dụng không gian vô tận đó để rèn luyện độ bền bỉ của thần thức.",
        "Thu hẹp phạm vi thần thức lại, chỉ quan sát những khu vực quen thuộc."
      ]
    },
    // --- Nhóm 2 ---
    {
      stageGroup: 2,
      question: "Đến cánh cửa Hợp Thể, tâm ma tạo ra sự cám dỗ trở thành kẻ thống trị tuyệt đối cõi nhân gian:",
      correct: "Vương quyền phàm thế hay tiên giới đều là xiềng xích, tự do tiêu dao mới là đích đến.",
      wrongs: [
        "Thống trị nhân gian để dùng nguồn tài nguyên khổng lồ phục vụ cho việc phi thăng.",
        "Làm minh chủ nhân gian để dẫn dắt chúng sinh đi theo con đường chính đạo.",
        "Xem việc thống trị là một thử thách trách nhiệm trước khi bước lên cảnh giới cao hơn."
      ]
    },
    {
      stageGroup: 2,
      question: "Cảm giác cô độc tột cùng của một Hóa Thần đại năng khi nhìn người thân lần lượt qua đời theo năm tháng:",
      correct: "Sinh tử luân hồi là thiên lý, ta trân trọng kỷ niệm nhưng mắt vẫn hướng về phía trước.",
      wrongs: [
        "Tìm kiếm các phương pháp chuyển thế luân hồi để giữ lại linh hồn người thân.",
        "Tạo ra một không gian ảo chứa đầy ký ức về họ để vỗ về tâm hồn.",
        "Xem đó là động lực để nhanh chóng đạt đến trường sinh bất tử thực sự."
      ]
    },
    {
      stageGroup: 2,
      question: "Khoảnh khắc dung hợp thần thức và thể xác đạt đỉnh cao Hóa Thần, thiên địa sinh ra dị tượng ép buộc tâm trí:",
      correct: "Tâm như bàn thạch, mặc cho phong ba bão táp bên ngoài.",
      wrongs: [
        "Tận dụng dị tượng thiên địa để hấp thụ thêm năng lượng đột phá.",
        "Quan sát dị tượng để lĩnh hội thêm một tầng thiên địa quy tắc mới.",
        "Thu liễm khí tức để tránh thu hút sự chú ý không cần thiết từ thiên đạo."
      ]
    },
    {
      stageGroup: 2,
      question: "Tâm ma cuối cùng: Hóa thân thành chính nỗi sợ lớn nhất trong lòng, đe dọa nuốt chửng linh hồn:",
      correct: "Nỗi sợ chỉ lớn khi ta trốn tránh, đối diện trực diện thì nó sẽ tan biến.",
      wrongs: [
        "Dùng pháp bảo trấn hồn mạnh nhất để phong ấn nỗi sợ đó vào sâu bên trong.",
        "Phân tích nguyên nhân hình thành nỗi sợ để tìm cách khắc chế từ gốc rễ.",
        "Chuyển hóa năng lượng của nỗi sợ thành sức mạnh chiến đấu cho bản thân."
      ]
    }
  ],

  // ==========================================
  // 6. LUYỆN HƯ KỲ
  // ==========================================
  "Luyện Hư Kỳ": [
    // --- Nhóm 0 ---
    {
      stageGroup: 0,
      question: "Luyện hóa hư không, nhận ra thế giới thực ra chỉ là một mảnh ảo ảnh lớn, tâm sinh ý niệm buông bỏ tất cả:",
      correct: "Dù là ảo ảnh hay chân thật, cảm xúc và trải nghiệm của ta tại đây là chân chính.",
      wrongs: [
        "Tận dụng tính chất ảo ảnh của thế giới để dễ dàng uốn nắn không gian theo ý muốn.",
        "Tìm kiếm kẽ hở giữa các tầng ảo ảnh để thoát ra khỏi thế giới này.",
        "Xem việc buông bỏ thế giới ảo là cảnh giới tối cao của việc đắc đạo."
      ]
    },
    {
      stageGroup: 0,
      question: "Tâm ma hóa thành vô số bản ngã ở các thế giới song song, mỗi bản ngã đều chì chiết con đường ta đã chọn:",
      correct: "Ta là duy nhất ở đây và lúc này, các con đường khác không liên quan đến ta.",
      wrongs: [
        "Lắng nghe những sai lầm của các bản ngã khác để rút kinh nghiệm cho bản thân.",
        "Hợp nhất những điểm mạnh của các bản ngã song song để trở nên hoàn hảo hơn.",
        "Chọn ra bản ngã có cuộc sống tốt nhất để hoán đổi tâm trí."
      ]
    },
    {
      stageGroup: 0,
      question: "Cảm giác hư vô bao trùm, cơ thể như muốn tan biến vào không gian xung quanh:",
      correct: "Giữ chặt một điểm chân tính trong đan điền, định hình lại thể xác.",
      wrongs: [
        "Thuận theo hư vô để trải nghiệm cảm giác dung hợp hoàn toàn với không gian.",
        "Dùng linh lực bản mệnh vẽ ra các trận pháp phong tỏa xung quanh cơ thể.",
        "Tập trung ý thức vào hơi thở để duy trì sự tồn tại của thực thể."
      ]
    },
    // --- Nhóm 1 ---
    {
      stageGroup: 1,
      question: "Thấu thị được bản chất vô thường của vạn vật, mọi thành tựu tu luyện đều sẽ về con số không:",
      correct: "Quá trình tu luyện và trải nghiệm mới là ý nghĩa thực sự, không phải kết quả.",
      wrongs: [
        "Tập trung để lại danh tiếng và công pháp trường tồn cho hậu thế.",
        "Xem vô thường là lời nhắc nhở phải tận dụng tối đa thời gian để hưởng thụ.",
        "Lập ra các di tích vĩnh cửu để thách thức sự bào mòn của thời gian."
      ]
    },
    {
      stageGroup: 1,
      question: "Tâm ma tạo ra cạm bẫy không gian, giam cầm thần thức trong mê cung vô tận của quá khứ:",
      correct: "Dùng đại đạo quy nguyên phá vỡ các lớp không gian giả tạo.",
      wrongs: [
        "Tìm kiếm lối ra bằng cách giải mã các khúc mắc trong quá khứ.",
        "Sử dụng không gian chi lực để dịch chuyển xuyên qua các lớp mê cung.",
        "Chấp nhận ở lại quá khứ để sửa chữa những nuối tiếc ngày xưa."
      ]
    },
    {
      stageGroup: 1,
      question: "Sức mạnh Luyện Hư khiến ta có thể bóp méo không gian nhỏ, tâm sinh ngạo mạn muốn thách thức cả quy luật vũ trụ:",
      correct: "Quy luật vũ trụ là tối cao, ta chỉ đang học cách dung hòa chứ không phải chống lại.",
      wrongs: [
        "Sử dụng không gian biến ảo để tạo ra một tiểu thế giới hoàn hảo theo ý mình.",
        "Xem sự bóp méo không gian là minh chứng cho việc mình đã vượt trên quy luật.",
        "Thử nghiệm giới hạn của không gian để tìm ra cách tối ưu hóa sức mạnh."
      ]
    },
    // --- Nhóm 2 ---
    {
      stageGroup: 2,
      question: "Đến cảnh giới Luyện Hư hậu kỳ, ranh giới giữa ta và hư không gần như biến mất hoàn toàn:",
      correct: "Ta ở trong hư không nhưng hư không không thể đồng hóa được ta.",
      wrongs: [
        "Cho phép hư không đồng hóa một nửa để sở hữu năng lực tàng hình tuyệt đối.",
        "Dùng bản ngã mạnh mẽ để định hình ranh giới rõ ràng với hư không bên ngoài.",
        "Tận dụng trạng thái này để du hành qua các khoảng không vũ trụ xa xôi."
      ]
    },
    {
      stageGroup: 2,
      question: "Tâm ma hiển hóa thành nỗi sợ lớn nhất: Sự lãng quên, không ai còn nhớ đến sự tồn tại của ta trên đời:",
      correct: "Ta tu vì đại đạo của chính mình, danh tiếng vạn người kính trọng hay không nào quan trọng.",
      wrongs: [
        "Ghi danh vào các bia đá vĩnh cửu tại các đại thánh địa để hậu thế đời đời chiêm bái.",
        "Truyền thụ y bát cho thật nhiều đệ tử để tên tuổi được lưu truyền rộng rãi.",
        "Xem sự lãng quên là cách tốt nhất để tránh khỏi nhân quả phàm trần."
      ]
    },
    {
      stageGroup: 2,
      question: "Khoảnh khắc chuẩn bị bước vào Hợp Thể, hư không sụp đổ tạo thành áp lực chí mạng lên đạo tâm:",
      correct: "Tâm như chỉ thủy, mượn sức sụp đổ của hư không để rèn giũa pháp thể.",
      wrongs: [
        "Mở ra một không gian độc lập vững chắc để tránh né hoàn toàn vụ sụp đổ.",
        "Dùng toàn lực phản kích để ổn định lại tầng không gian đang sụp đổ.",
        "Nương theo dòng năng lượng sụp đổ để đẩy nhanh tốc độ dung hợp."
      ]
    },
    {
      stageGroup: 2,
      question: "Cửa ải cuối cùng của Luyện Hư: Phải tự tay xóa sổ một phần ký ức đẹp đẽ nhất để đổi lấy sự hoàn mỹ của hư không:",
      correct: "Ký ức là một phần của ta, thà không hoàn mỹ chứ quyết không quên đi sơ tâm.",
      wrongs: [
        "Chuyển ký ức đó vào một pháp bảo lưu trữ trước khi xóa sổ khỏi đầu.",
        "Đánh đổi ký ức ít quan trọng hơn để bảo vệ phần ký ức đẹp đẽ đó.",
        "Xem sự lãng quên là hy sinh cần thiết để đạt đến cảnh giới cao hơn."
      ]
    }
  ],

  // ==========================================
  // 7. HỢP THỂ KỲ
  // ==========================================
  "Hợp Thể Kỳ": [
    // --- Nhóm 0 ---
    {
      stageGroup: 0,
      question: "Quá trình dung hợp thể xác, pháp thân và thiên đạo bắt đầu tạo ra sự xung đột đau đớn tột cùng ở cấp độ tế bào:",
      correct: "Cắn răng chịu đựng, dùng ý chí cường đại ép ba yếu tố quy về một mối.",
      wrongs: [
        "Tạm hoãn quá trình dung hợp để tìm thêm thiên tài địa bảo hỗ trợ làm dịu xung đột.",
        "Dùng trận pháp phong tỏa bên ngoài để giảm bớt sự chấn động vào tế bào.",
        "Điều chỉnh tốc độ dung hợp chậm lại, để cơ thể có thời gian thích nghi từ từ."
      ]
    },
    {
      stageGroup: 0,
      question: "Tâm ma tạo ra ảo ảnh thiên hạ đại loạn, chúng sinh lầm than cầu cứu sự bảo trợ của ta:",
      correct: "Độ lượng cứu giúp trong khả năng, nhưng không thể vì thương hại mà làm lỡ đại đạo của mình.",
      wrongs: [
        "Sử dụng năng lực hiện tại để thiết lập một vùng đất tị nạn bình yên cho chúng sinh.",
        "Xem đây là kiếp nạn tự nhiên của nhân gian, can thiệp sẽ gánh thêm nhân quả.",
        "Dùng uy quyền cao nhất để chấm dứt chiến loạn trong thời gian ngắn nhất."
      ]
    },
    {
      stageGroup: 0,
      question: "Cảm giác quyền năng và thiên địa hòa hợp làm một khiến cái tôi phình to vô hạn, tự cho mình là chân lý:",
      correct: "Thiên địa vô tận, ta chỉ là một hạt cát nhỏ bé biết suy nghĩ trong đó.",
      wrongs: [
        "Xem bản thân là đại diện của thiên đạo để thực hiện công lý trên thế gian.",
        "Kiềm chế cái tôi bằng cách thường xuyên nhớ lại những ngày tháng yếu kém thuở ban đầu.",
        "Hiểu rằng quyền năng lớn đi kèm trách nhiệm lớn, không nên sinh lòng kiêu ngạo."
      ]
    },
    // --- Nhóm 1 ---
    {
      stageGroup: 1,
      question: "Tâm ma hóa thành người thân yêu nhất, yêu cầu ta từ bỏ Hợp Thể để cùng họ quy ẩn giang hồ:",
      correct: "Người thực sự yêu ta sẽ hiểu và đồng hành cùng đại đạo, đây chỉ là ảo ảnh.",
      wrongs: [
        "Hứa hẹn khi nào đắc đạo sẽ trở lại đón họ cùng phi thăng trường sinh.",
        "Dùng thần thức kiểm tra sự chân thực của hình ảnh trước khi đưa ra quyết định.",
        "Xem đó là thử thách về tình cảm, cần phải vượt qua bằng sự kiên định."
      ]
    },
    {
      stageGroup: 1,
      question: "Sự cọ sát giữa nhân tính và thiên tính trong quá trình Hợp Thể khiến cảm xúc con người dần phai nhạt:",
      correct: "Giữ vững nhân tính làm gốc, dùng thiên tính làm công cụ, không để mất đi bản ngã.",
      wrongs: [
        "Chủ động hòa nhập vào thiên tính vì đó là xu thế tất yếu của đại năng.",
        "Tìm cách nuôi dưỡng những hỉ nộ ái ố phàm trần để duy trì nhân tính.",
        "Xem việc mất đi cảm xúc là biểu hiện của sự tĩnh lặng và sáng suốt."
      ]
    },
    {
      stageGroup: 1,
      question: "Gặp phải dòng nghịch lưu nhân quả khổng lồ từ kiếp trước dội về, tâm cảnh chao đảo:",
      correct: "Dùng đại đạo dung hợp hóa giải từng đoạn nhân quả, không trốn tránh.",
      wrongs: [
        "Dùng pháp bảo trấn áp nhân quả xuống sâu trong đáy lòng.",
        "Nhờ các cao tăng hoặc đại năng có đạo hạnh cao thâm giúp siêu độ nhân quả.",
        "Xem đó là món nợ phải trả, chủ động dùng tu vi ra để gánh chịu."
      ]
    },
    // --- Nhóm 2 ---
    {
      stageGroup: 2,
      question: "Đến giai đoạn cuối Hợp Thể, tâm ma tạo ra cửa ải tối thượng: Phải tự tay hủy diệt bản ngã cũ để sinh ra bản ngã mới:",
      correct: "Phượng hoàng niết bàn, tro tàn lại cháy, ta dũng cảm đối diện sự lột xác.",
      wrongs: [
        "Giữ lại một phần bản ngã cũ làm nền móng để không bị mất gốc.",
        "Dùng bí pháp dung hòa bản ngã cũ và mới lại với nhau thay vì hủy diệt.",
        "Xem sự lột xác này là bước ngoặt sinh tử, cần chuẩn bị thật kỹ lưỡng."
      ]
    },
    {
      stageGroup: 2,
      question: "Cảm giác cô độc ở đỉnh cao Hợp Thể, không còn ai trên thế gian đủ tầm để trò chuyện cùng đối thoại:",
      correct: "Thiên địa vạn vật là bạn, cô độc là sự tự do tuyệt đối của kẻ mạnh.",
      wrongs: [
        "Tìm kiếm những đồng đạo ở cảnh giới tương đương tại các tiểu thế giới khác.",
        "Dành thời gian truyền đạo, bồi dưỡng những hậu bối có tiềm năng để làm người đối thoại.",
        "Xem sự cô độc là cái giá xứng đáng cho việc đứng trên đỉnh cao."
      ]
    },
    {
      stageGroup: 2,
      question: "Khoảnh khắc chuẩn bị bước chân vào Đại Thừa, thiên địa biến sắc, đạo tâm bị thử thách bởi hàng vạn tiếng khóc than:",
      correct: "Tâm như gương sáng, tiếng khóc than không làm dao động được ý chí tu đạo.",
      wrongs: [
        "Dùng Phật môn đại từ bi chú để siêu độ những âm thanh oán hận đó.",
        "Tìm nguyên nhân gây ra tiếng khóc than để giải quyết triệt để vấn đề.",
        "Xem đó là khảo nghiệm về lòng thương cảm, cần giữ vững tâm từ thiện."
      ]
    },
    {
      stageGroup: 2,
      question: "Cửa ải tâm ma cuối cùng của Hợp Thể: Nhìn thấu sự vô thường của thời gian, cảm giác bản thân sắp bị lãng quên:",
      correct: "Ta sống vì hiện tại và đạo tâm vững chắc, danh tiếng ngàn năm hay không chẳng bận lòng.",
      wrongs: [
        "Lập ra hệ thống truyền thừa quy mô lớn để tên tuổi gắn liền với lịch sử tu tiên.",
        "Tập trung gia cố pháp thân để trường tồn cùng năm tháng, chống lại sự lãng quên.",
        "Xem sự lãng quên là quy luật tự nhiên, không ai có thể chiến thắng thời gian."
      ]
    }
  ],

  // ==========================================
  // 8. ĐẠI THỪA KỲ
  // ==========================================
  "Đại Thừa Kỳ": [
    // --- Nhóm 0 ---
    {
      stageGroup: 0,
      question: "Đứng ở ngưỡng cửa Đại Thừa, nhìn lại con đường đã đi qua, cảm giác mệt mỏi và muốn dừng chân nghỉ ngơi:",
      correct: "Đường tu tiên không có điểm dừng, đích đến cuối cùng là phi thăng trường sinh.",
      wrongs: [
        "Tạm nghỉ ngơi một thời gian ngắn để phục hồi nguyên khí tinh thần rồi tiếp tục.",
        "Chia sẻ gánh nặng tu hành với các đệ tử để bản thân có không gian thư giãn.",
        "Xem việc mệt mỏi là tín hiệu cơ thể cần tĩnh dưỡng, không nên ép buộc bản thân quá mức."
      ]
    },
    {
      stageGroup: 0,
      question: "Tâm ma hóa thành vị thần tiên tối cao trên chín tầng mây, ban ơn huệ nhưng yêu cầu ta phải thần phục làm tôi tớ:",
      correct: "Ta tu để làm tiên nhân tự tại, quyết không quỳ gối làm tôi tớ cho kẻ khác kể cả là thần.",
      wrongs: [
        "Thương lượng với vị thần tiên đó để nhận ơn huệ mà vẫn giữ được sự độc lập.",
        "Xem đó là cơ hội mượn thế lực thượng giới để củng cố con đường phi thăng.",
        "Dùng thực lực để thử thách xem vị thần tiên đó có thực sự xứng đáng để thần phục."
      ]
    },
    {
      stageGroup: 0,
      question: "Sức mạnh Đại Thừa quá lớn khiến không gian xung quanh tự động rạn nứt, tâm sinh lo sợ mình là tai họa:",
      correct: "Kiểm soát tốt pháp lực, xem sức mạnh là công cụ bảo vệ chứ không phải tàn phá.",
      wrongs: [
        "Di chuyển đến những nơi hoang vắng không có sự sống để tu luyện tránh gây họa.",
        "Dùng pháp bảo chuyên dụng để áp chế và thu liễm toàn bộ năng lượng phát ra.",
        "Xem đó là biểu hiện của việc cảnh giới đã vượt quá giới hạn chịu đựng của hạ giới."
      ]
    },
    // --- Nhóm 1 ---
    {
      stageGroup: 1,
      question: "Tâm ma tạo ra ảo ảnh toàn bộ người thân, bạn bè, đồng môn đều đã chết, chỉ còn trơ trọi một mình ta trên đỉnh núi cao:",
      correct: "Đã đi đến bước này, ta phải mang theo ý chí của họ mà bước tiếp lên tiên giới.",
      wrongs: [
        "Dùng thần thông đại luân hồi để tìm kiếm linh hồn họ ở các cõi giới khác.",
        "Lập bia tưởng niệm vĩnh hằng để khắc ghi công ơn và hình bóng của họ.",
        "Chuyển hóa nỗi đau thành sức mạnh để hoàn thành nốt tâm nguyện của họ."
      ]
    },
    {
      stageGroup: 1,
      question: "Sự cám dỗ của việc dung hợp toàn bộ linh khí đại lục vào bản thân để đạt đến đỉnh cao tối thượng lập tức:",
      correct: "Hút cạn linh khí đại lục sẽ mang lại nhân quả nghiệp chướng khổng lồ, ta không làm.",
      wrongs: [
        "Chỉ hấp thụ một phần nhỏ vừa đủ để đột phá, không làm ảnh hưởng đến nguồn sống đại lục.",
        "Tìm kiếm các tiểu thế giới khác để hút linh khí thay vì lấy từ đại lục chính.",
        "Xem đó là cách thâu tóm thiên địa để chuẩn bị cho thiên kiếp lớn sắp tới."
      ]
    },
    {
      stageGroup: 1,
      question: "Cảm giác thiên kiếp sắp tới kinh hoàng đến mức ngay cả Đại Thừa cũng có cảm giác tan thành mây khói:",
      correct: "Thiên kiếp là thử thách cuối cùng để lột xác, ta sẵn sàng đón nhận bằng đạo tâm thép.",
      wrongs: [
        "Tận dụng tối đa thời gian còn lại để luyện chế thêm các tiên khí phòng ngộ.",
        "Tìm kiếm các trận pháp thượng cổ có khả năng chia bớt uy lực thiên kiếp.",
        "Xem việc lo sợ là bản năng tự nhiên, quan trọng là hành động chuẩn bị ra sao."
      ]
    },
    // --- Nhóm 2 ---
    {
      stageGroup: 2,
      question: "Đến đỉnh phong Đại Thừa, tâm ma tạo ra ảo ảnh tiên giới tồi tệ và giả dối không khác gì phàm trần:",
      correct: "Tiên giới giả hay thật, chí hướng phi thăng của ta chưa bao giờ thay đổi.",
      wrongs: [
        "Tự mình tạo ra một tiên giới lý tưởng trong tâm trí để làm chỗ dựa tinh thần.",
        "Tìm kiếm cách thức kiểm chứng tính chân thực của tiên giới trước khi phi thăng.",
        "Xem việc tiên giới ra sao không quan trọng bằng việc bản thân đã vươn lên tới đó."
      ]
    },
    {
      stageGroup: 2,
      question: "Khoảnh khắc chuẩn bị đối mặt với Độ Kiếp, tâm cảnh xuất hiện khe hở nghi ngờ bản thân không đủ tài đức để thành tiên:",
      correct: "Ta đi bằng thực lực và máu xương, ta xứng đáng bước lên tiên giới.",
      wrongs: [
        "Làm thêm nhiều việc thiện tích lũy công đức để củng cố thêm lòng tin vào bản thân.",
        "Xem lại toàn bộ chặng đường tu luyện để khẳng định không thẹn với lòng.",
        "Nhờ các vị tiền bối từng độ kiếp truyền đạt kinh nghiệm để giải tỏa nghi ngờ."
      ]
    },
    {
      stageGroup: 2,
      question: "Tâm ma cuối cùng của Đại Thừa: Hiện nguyên hình là chính nỗi sợ hãi nguyên thủy nhất từ thuở lọt lòng phàm nhân:",
      correct: "Nhìn thấu cội nguồn nỗi sợ, mỉm cười xem nó như một phần ký ức đã qua.",
      wrongs: [
        "Chấp nhận nỗi sợ đó như một phần bản ngã không thể tách rời.",
        "Dùng ý chí tuyệt đối để xóa sạch mọi dấu vết của nỗi sợ trong tâm trí.",
        "Biến nỗi sợ thành động lực cuối cùng để vượt qua cửa ải."
      ]
    },
    {
      stageGroup: 2,
      question: "Ánh sáng phi thăng lóe lên nhưng bị tâm ma che lấp bằng màn đêm vĩnh cửu, đòi hỏi phải hy sinh đạo tâm để bước qua:",
      correct: "Thà hồn phi phách tán chứ đạo tâm trong sáng quyết không dung thứ tà ma.",
      wrongs: [
        "Tìm cách phá vỡ màn đêm vĩnh cửu bằng ánh sáng từ đạo tâm nguyên bản.",
        "Dùng một phần nhỏ tà niệm để đánh lừa tâm ma, mở ra con đường sáng.",
        "Kiên nhẫn chờ đợi ánh sáng tự nhiên phá vỡ màn đêm mà không hành động mạo hiểm."
      ]
    }
  ],

  // ==========================================
  // 9. ĐỘ KIẾP KỲ
  // ==========================================
  "Độ Kiếp Kỳ": [
    // --- Nhóm 0 ---
    {
      stageGroup: 0,
      question: "Đạo lôi đầu tiên giáng xuống, không chỉ đánh vào thể xác mà trực tiếp thiêu đốt tâm ma sâu kín nhất:",
      correct: "Dùng đạo tâm kiên cường làm khiên, mượn lôi kiếp tôi luyện thần hồn tinh khiết.",
      wrongs: [
        "Sử dụng tiên khí hộ thân để triệt tiêu phần lớn uy lực lôi điện trước khi chạm vào thần hồn.",
        "Chia nhỏ lôi điện thành nhiều phần nhỏ để hấp thụ từ từ vào đan điền.",
        "Dùng bí pháp chuyển hướng lôi kiếp sang các phân thân dự phòng."
      ]
    },
    {
      stageGroup: 0,
      question: "Tâm ma hóa thành hình ảnh tất cả những kẻ ta từng sát hại trong đời, hiện về đòi mạng trong lôi kiếp:",
      correct: "Nhân quả tuần hoàn, ta ra tay có nguyên tắc, không thẹn với lòng.",
      wrongs: [
        "Cầu nguyện siêu độ cho họ ngay trong lúc đang chịu lôi kiếp.",
        "Xem đó là ảo ảnh do lôi kiếp sinh ra để làm phân tâm, tuyệt đối không để ý tới.",
        "Dùng công pháp trấn áp toàn bộ oán khí của những kẻ đó xuống."
      ]
    },
    {
      stageGroup: 0,
      question: "Cảm giác nhục thân sắp tan rã dưới uy lực của lôi kiếp tầng đầu, ý chí sinh tồn lay động:",
      correct: "Nhục thân có thể hoại, nhưng ý chí và đạo tâm của ta là bất diệt.",
      wrongs: [
        "Sử dụng đan dược tuyệt phẩm để liên tục tái tạo nhục thân trong lúc độ kiếp.",
        "Thuận theo dòng lôi kiếp để rèn luyện thần hồn thay vì bảo vệ nhục thân.",
        "Tìm kiếm điểm yếu của lôi trận để giảm bớt lực sát thương trực diện."
      ]
    },
    // --- Nhóm 1 ---
    {
      stageGroup: 1,
      question: "Đạo lôi thứ tư (Tâm Ma Lôi) giáng xuống, xóa sạch mọi ký ức về người thân và bạn bè, chỉ để lại sự cô độc tột cùng:",
      correct: "Dù quên đi ký ức, bản ngã và khát vọng vươn lên vẫn khắc sâu trong cốt tủy.",
      wrongs: [
        "Dùng pháp bảo lưu trữ ký ức đã chuẩn bị sẵn từ trước để khôi phục lại ngay lập tức.",
        "Tự nhủ rằng ký ức chỉ là phụ, việc sống sót qua lôi kiếp mới là quan trọng nhất.",
        "Dựa vào bản năng tu hành thâm sâu để tự động tái tạo lại các mối liên kết tâm trí."
      ]
    },
    {
      stageGroup: 1,
      question: "Tâm ma tạo ra ảo cảnh thế giới bên dưới đang hoan hô vì ta bị thiên kiếp tiêu diệt, phơi bày sự vô ơn của chúng sinh:",
      correct: "Ta tu vì chính ta và đại đạo, thiên hạ nghĩ gì không mảy may ảnh hưởng đến ta.",
      wrongs: [
        "Tự nhủ sau khi thành tiên sẽ quay lại ban ân trạch cho họ để thay đổi cách nhìn.",
        "Xem sự vô ơn đó là bản chất của phàm nhân, không đáng để bận lòng suy nghĩ.",
        "Tập trung hoàn toàn vào việc chống đỡ lôi kiếp, không để ảo ảnh chi phối."
      ]
    },
    {
      stageGroup: 1,
      question: "Linh lực cạn kiệt, lôi kiếp thứ sáu đang tụ hình với uy lực đủ san bằng một ngọn núi lớn:",
      correct: "Thiêu đốt tinh huyết và ý chí cuối cùng, dồn toàn lực đánh một trận sinh tử.",
      wrongs: [
        "Sử dụng các loại bí dược cấm kỵ để trong chớp mắt khôi phục toàn bộ linh lực.",
        "Lợi dụng địa thế xung quanh để triệt tiêu một phần sức công phá của đạo lôi.",
        "Chờ đợi thiên kiếp tự suy yếu sau khi bùng nổ đỉnh điểm."
      ]
    },
    // --- Nhóm 2 ---
    {
      stageGroup: 2,
      question: "Đạo lôi cuối cùng (Cửu Tiêu Thần Lôi) - Cửa ải sinh tử quyết định thành tiên hay hồn phi phách tán:",
      correct: "Ngẩng cao đầu đối mặt, sinh tử hay phi thăng ta đều tự mình định đoạt!",
      wrongs: [
        "Dùng toàn bộ pháp bảo tích lũy cả đời để tạo thành lớp phòng thủ kiên cố nhất.",
        "Hòa làm một với thiên kiếp, mượn sức mạnh của nó để hoàn thành bước nhảy vọt cuối cùng.",
        "Phó mặc cho vận mệnh định đoạt, vì đến bước này mọi tính toán đều vô nghĩa."
      ]
    },
    {
      stageGroup: 2,
      question: "Giữa biển lôi kiếp cuồn cuộn, tâm ma hiện hình lần cuối, dụ dỗ đầu hàng để giữ lại một tia linh hồn chuyển thế phàm trần:",
      correct: "Ta đã đi đến tận cùng gian khó, quyết không chuyển thế làm phàm nhân nữa!",
      wrongs: [
        "Cân nhắc phương án chuyển thế nếu tình hình quá mức tuyệt vọng.",
        "Dùng đòn tấn công chí mạng tiêu diệt phân thân tâm ma cuối cùng này.",
        "Phớt lờ mọi lời dụ dỗ, dồn toàn bộ ý chí vào việc đón nhận tiên quang."
      ]
    },
    {
      stageGroup: 2,
      question: "Khoảnh khắc lôi kiếp tan đi, ánh sáng tiên giới rọi xuống nhưng tâm thần vẫn còn vương vấn chút bụi trần sân hận:",
      correct: "Buông bỏ hoàn toàn bụi trần, tâm như gương sáng đón nhận tiên quang tẩy rửa.",
      wrongs: [
        "Mang theo chút sân hận đó lên tiên giới để tiếp tục giải quyết ân oán cũ.",
        "Tự mình dùng tiên quang để thiêu rụi triệt để những cảm xúc tiêu cực còn sót lại.",
        "Chờ đợi thêm một nhịp thở để tâm tự thanh tịnh trước khi bước vào tiên quang."
      ]
    },
    {
      stageGroup: 2,
      question: "Cửa ải cuối cùng của Độ Kiếp Kỳ: Phải tự tay cắt đứt đoạn duyên cuối cùng với nhân gian để chính thức phi thăng:",
      correct: "Đường tu tiên chính là con đường cô độc hướng về vĩnh hằng, ta dứt áo ra đi không hối tiếc.",
      wrongs: [
        "Gửi lại một đạo phân thân ở hạ giới để âm thầm bảo vệ những người còn vương vấn.",
        "Hứa hẹn ngày quay trở lại thăm nom khi đã vững chân ở tiên giới.",
        "Xem sự chia cắt này là tạm thời, khi đắc đạo cao hơn sẽ có ngày hội ngộ."
      ]
    }
  ]
};