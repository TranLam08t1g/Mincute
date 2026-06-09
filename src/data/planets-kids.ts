import { PLANETS as _PLANETS, type PlanetData } from './planets'

export interface QuizItem {
  question: string
  options: string[]
  correct: number
}

export interface KidPlanet extends PlanetData {
  emoji: string
  quiz: QuizItem[]
  nickname: string
  temperature: string
  composition: string
  sizeComparison: string
  funFacts: string[]
}

const quizMap: Record<string, QuizItem[]> = {
  mercury: [
    {
      question: 'Sao Thuỷ là hành tinh gần ai nhất trong hệ Mặt Trời?',
      options: ['Mặt Trời', 'Trái Đất', 'Sao Kim'],
      correct: 0,
    },
    {
      question: 'Một năm trên Sao Thuỷ dài bao lâu?',
      options: ['88 ngày', '365 ngày', '225 ngày'],
      correct: 0,
    },
    {
      question: 'Sao Thuỷ có kích thước bằng bao nhiêu Trái Đất?',
      options: ['Bằng một phần ba', 'Bằng một nửa', 'Bằng gấp đôi'],
      correct: 0,
    },
    {
      question: 'Ban ngày Sao Thuỷ nóng tới bao nhiêu độ?',
      options: ['100°C', '300°C', '430°C'],
      correct: 2,
    },
  ],
  venus: [
    {
      question: 'Sao Kim là hành tinh nóng nhất vì sao?',
      options: ['Gần Mặt Trời nhất', 'Bầu khí quyển dày giữ nhiệt', 'Lõi nóng chảy'],
      correct: 1,
    },
    {
      question: 'Sao Kim quay khác các hành tinh khác thế nào?',
      options: ['Quay nhanh nhất', 'Quay ngược chiều', 'Không quay'],
      correct: 1,
    },
    {
      question: 'Sao Kim thường được gọi là gì khi nhìn từ Trái Đất?',
      options: ['Sao Mai', 'Sao Bắc Cực', 'Sao Băng'],
      correct: 0,
    },
    {
      question: 'Nhiệt độ bề mặt Sao Kim vào khoảng bao nhiêu?',
      options: ['100°C', '250°C', '465°C'],
      correct: 2,
    },
  ],
  earth: [
    {
      question: 'Trái Đất là hành tinh thứ mấy tính từ Mặt Trời?',
      options: ['Thứ hai', 'Thứ ba', 'Thứ tư'],
      correct: 1,
    },
    {
      question: 'Trái Đất có bao nhiêu vệ tinh tự nhiên?',
      options: ['Không có', '1 (Mặt Trăng)', '2'],
      correct: 1,
    },
    {
      question: 'Bao nhiêu phần trăm bề mặt Trái Đất là nước?',
      options: ['50%', '71%', '90%'],
      correct: 1,
    },
    {
      question: 'Lớp không khí bao quanh Trái Đất gọi là gì?',
      options: ['Tầng ozone', 'Khí quyển', 'Từ trường'],
      correct: 1,
    },
  ],
  mars: [
    {
      question: 'Ngọn núi Olympus Mons trên Sao Hoả cao gấp mấy lần đỉnh Everest?',
      options: ['1.5 lần', '2.5 lần', '3 lần'],
      correct: 1,
    },
    {
      question: 'Sao Hoả có màu gì?',
      options: ['Xanh lam', 'Vàng', 'Đỏ'],
      correct: 2,
    },
    {
      question: 'Sao Hoả có mấy mặt trăng?',
      options: ['1', '2', '4'],
      correct: 1,
    },
    {
      question: 'Con người đã gửi robot lên Sao Hoả chưa?',
      options: ['Chưa bao giờ', 'Đã gửi nhiều lần', 'Chỉ một lần'],
      correct: 1,
    },
  ],
  jupiter: [
    {
      question: 'Sao Mộc so với Trái Đất thì như thế nào?',
      options: ['Nhỏ hơn', 'Lớn gấp 11 lần', 'Bằng'],
      correct: 1,
    },
    {
      question: 'Vết Đỏ Lớn trên Sao Mộc thực chất là gì?',
      options: ['Một cơn bão khổng lồ', 'Một ngọn núi lửa', 'Một hố va chạm'],
      correct: 0,
    },
    {
      question: 'Sao Mộc có bao nhiêu mặt trăng?',
      options: ['8', '50', '95'],
      correct: 2,
    },
    {
      question: 'Sao Mộc được gọi là gì?',
      options: ['Hành tinh Đỏ', 'Ông vua hành tinh', 'Người khổng lồ băng'],
      correct: 1,
    },
  ],
  saturn: [
    {
      question: 'Vành đai Sao Thổ được làm từ gì?',
      options: ['Vàng', 'Băng và đá', 'Kim loại'],
      correct: 1,
    },
    {
      question: 'Điều thú vị về mật độ của Sao Thổ là gì?',
      options: ['Cứng nhất hệ Mặt Trời', 'Có thể nổi trên nước', 'Nặng nhất'],
      correct: 1,
    },
    {
      question: 'Sao Thổ có bao nhiêu mặt trăng?',
      options: ['62', '100', '146'],
      correct: 2,
    },
    {
      question: 'Mặt trăng lớn nhất của Sao Thổ tên là gì?',
      options: ['Europa', 'Titan', 'Io'],
      correct: 1,
    },
  ],
  uranus: [
    {
      question: 'Sao Thiên Vương được phát hiện bằng gì?',
      options: ['Mắt thường', 'Kính thiên văn', 'Tàu vũ trụ'],
      correct: 1,
    },
    {
      question: 'Sao Thiên Vương quay như thế nào?',
      options: ['Quay đứng', 'Quay nghiêng một bên', 'Không quay'],
      correct: 1,
    },
    {
      question: 'Sao Thiên Vương có màu gì?',
      options: ['Đỏ cam', 'Xanh lục nhạt', 'Trắng'],
      correct: 1,
    },
    {
      question: 'Ai phát hiện ra Sao Thiên Vương?',
      options: ['Galileo', 'William Herschel', 'Newton'],
      correct: 1,
    },
    {
      question: 'Sao Thiên Vương có bao nhiêu mặt trăng?',
      options: ['15', '27', '42'],
      correct: 1,
    },
  ],
  neptune: [
    {
      question: 'Sao Hải Vương nổi tiếng với điều gì?',
      options: ['Nhiệt độ cao nhất', 'Gió mạnh nhất', 'Có nhiều mặt trăng nhất'],
      correct: 1,
    },
    {
      question: 'Tốc độ gió trên Sao Hải Vương có thể lên tới bao nhiêu?',
      options: ['500 km/h', '1000 km/h', '2100 km/h'],
      correct: 2,
    },
    {
      question: 'Sao Hải Vương có màu sắc đặc trưng là gì?',
      options: ['Đỏ sẫm', 'Xanh dương đậm', 'Vàng nhạt'],
      correct: 1,
    },
    {
      question: 'Mặt trăng lớn nhất của Sao Hải Vương tên là gì?',
      options: ['Miranda', 'Triton', 'Ganymede'],
      correct: 1,
    },
  ],
}

const emojiMap: Record<string, string> = {
  mercury: '☀️',
  venus: '🔥',
  earth: '🌍',
  mars: '🔴',
  jupiter: '🪐',
  saturn: '💫',
  uranus: '❄️',
  neptune: '💨',
}

const nicknameMap: Record<string, string> = {
  mercury: 'Em bé của Mặt Trời',
  venus: 'Chị em sinh đôi của Trái Đất',
  earth: 'Ngôi nhà xanh',
  mars: 'Hành tinh Đỏ',
  jupiter: 'Ông vua khổng lồ',
  saturn: 'Chúa tể những vành đai',
  uranus: 'Người khổng lồ băng',
  neptune: 'Bão tố xanh',
}

const temperatureMap: Record<string, string> = {
  mercury: '-180°C đến 430°C',
  venus: '465°C (trung bình)',
  earth: '-89°C đến 57°C',
  mars: '-140°C đến 20°C',
  jupiter: '-145°C (đỉnh mây)',
  saturn: '-178°C (trung bình)',
  uranus: '-224°C (lạnh nhất)',
  neptune: '-218°C (trung bình)',
}

const compositionMap: Record<string, string> = {
  mercury: 'Lõi sắt khổng lồ chiếm 75% bán kính, bề mặt đá và bụi',
  venus: 'Đá bazan, khí quyển CO₂ dày đặc, mây axit sulfuric',
  earth: 'Lõi sắt-nickel, lớp phủ đá, 71% bề mặt là nước',
  mars: 'Đá bazan giàu sắt (gây màu đỏ), khí quyển CO₂ mỏng',
  jupiter: 'Khí hydro và heli, có thể có lõi đá',
  saturn: 'Khí hydro và heli, vành đai băng và đá',
  uranus: 'Băng nước, methane, ammonia',
  neptune: 'Băng nước, methane, ammonia (xanh vì methane)',
}

const sizeComparisonMap: Record<string, string> = {
  mercury: 'Bằng 1/3 Trái Đất — nhỏ nhất hệ Mặt Trời',
  venus: 'Gần bằng Trái Đất (95% đường kính)',
  earth: 'Hành tinh đá lớn nhất — 12,742 km đường kính',
  mars: 'Bằng khoảng một nửa Trái Đất',
  jupiter: 'Lớn gấp 11 lần Trái Đất — hành tinh lớn nhất',
  saturn: 'Lớn gấp 9.5 lần Trái Đất (không tính vành đai)',
  uranus: 'Lớn gấp 4 lần Trái Đất',
  neptune: 'Lớn gấp 4 lần Trái Đất, nhỏ hơn Sao Thiên Vương một chút',
}

const funFactsMap: Record<string, string[]> = {
  mercury: [
    'Một năm trên Sao Thủy chỉ dài 88 ngày Trái Đất.',
    'Sao Thủy là hành tinh nhỏ nhất trong hệ Mặt Trời.',
    'Dù gần Mặt Trời nhất nhưng Sao Kim mới là hành tinh nóng nhất.',
  ],
  venus: [
    'Sao Kim quay ngược chiều so với hầu hết các hành tinh khác.',
    'Một ngày trên Sao Kim dài hơn một năm của nó.',
    'Sao Kim được mệnh danh là "Sao Mai" hoặc "Sao Hôm" khi nhìn từ Trái Đất.',
  ],
  earth: [
    'Trái Đất là hành tinh duy nhất không được đặt tên theo thần Hy Lạp hay La Mã.',
    'Trái Đất là nơi duy nhất trong vũ trụ được biết có sự sống.',
    'Mặt Trăng đang di chuyển ra xa Trái Đất khoảng 3.8cm mỗi năm.',
  ],
  mars: [
    'Olympus Mons trên Sao Hỏa cao gấp 2.5 lần đỉnh Everest.',
    'Sao Hỏa có màu đỏ do bề mặt giàu oxit sắt (rỉ sét).',
    'NASA đã gửi nhiều robot tự hành lên Sao Hỏa, như Curiosity và Perseverance.',
  ],
  jupiter: [
    'Vết Đỏ Lớn của Sao Mộc là một cơn bão lớn hơn Trái Đất đã hoành hành hàng thế kỷ.',
    'Sao Mộc có từ trường mạnh gấp 20,000 lần Trái Đất.',
    'Sao Mộc quay rất nhanh — một ngày chỉ dài khoảng 10 giờ.',
  ],
  saturn: [
    'Sao Thổ nhẹ đến mức có thể nổi trên nước — đây là hành tinh có mật độ thấp nhất.',
    'Vành đai Sao Thổ trải rộng tới 282,000 km nhưng chỉ dày khoảng 10 mét.',
    'Mặt trăng Titan của Sao Thổ là nơi duy nhất ngoài Trái Đất có chất lỏng bề mặt.',
  ],
  uranus: [
    'Sao Thiên Vương là hành tinh đầu tiên được phát hiện bằng kính thiên văn vào năm 1781.',
    'Sao Thiên Vương quay nghiêng 98 độ — gần như nằm ngang.',
    'Sao Thiên Vương có 27 mặt trăng, tất cả đều được đặt theo tên nhân vật Shakespeare.',
  ],
  neptune: [
    'Sao Hải Vương có sức gió mạnh nhất trong tất cả các hành tinh của hệ Mặt Trời.',
    'Sao Hải Vương được phát hiện nhờ toán học trước khi được nhìn thấy qua kính thiên văn.',
    'Một năm trên Sao Hải Vương dài tới gần 165 năm Trái Đất.',
  ],
}

export const KID_PLANETS: KidPlanet[] = _PLANETS.map((p) => ({
  ...p,
  emoji: emojiMap[p.id] || '⭐',
  quiz: quizMap[p.id] || [],
  nickname: nicknameMap[p.id] || '',
  temperature: temperatureMap[p.id] || '?',
  composition: compositionMap[p.id] || '?',
  sizeComparison: sizeComparisonMap[p.id] || '?',
  funFacts: funFactsMap[p.id] || [],
}))