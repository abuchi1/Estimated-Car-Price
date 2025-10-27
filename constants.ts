export const CAR_BRANDS: string[] = [
  'Toyota',
  'Honda',
  'Hyundai',
  'Kia',
  'Mazda',
  'Ford',
  'Mitsubishi',
  'VinFast',
  'Suzuki',
  'Nissan',
  'Chevrolet',
  'Peugeot',
  'Mercedes-Benz',
  'BMW',
  'Audi',
  'Lexus',
  'Isuzu',
];

export const CAR_MODELS_BY_BRAND: { [key: string]: string[] } = {
  'Toyota': [
    // Vios
    'Vios 1.5E MT', 'Vios 1.5E CVT', 'Vios 1.5G CVT',
    // Corolla Altis
    'Corolla Altis 1.8G', 'Corolla Altis 1.8V', 'Corolla Altis 1.8HEV (Hybrid)',
    // Camry
    'Camry 2.0G', 'Camry 2.0Q', 'Camry 2.5Q', 'Camry 2.5HV (Hybrid)',
    // Fortuner
    'Fortuner 2.4MT 4x2 (Dầu)', 'Fortuner 2.4AT 4x2 (Dầu)', 'Fortuner 2.7AT 4x2 (Xăng)',
    'Fortuner 2.7AT 4x4 (Xăng)', 'Fortuner 2.8AT 4x4 (Dầu)',
    'Fortuner Legender 2.4AT 4x2 (Dầu)', 'Fortuner Legender 2.8AT 4x4 (Dầu)',
    // Innova
    'Innova 2.0E (Xăng)', 'Innova 2.0G (Xăng)', 'Innova Venturer (Xăng)', 
    'Innova Cross 2.0V (Xăng)', 'Innova Cross 2.0HEV (Hybrid)',
    // Hilux
    'Hilux 2.4E 4x2 MT (Dầu)', 'Hilux 2.4E 4x2 AT (Dầu)', 'Hilux 2.8G 4x4 AT Adventure (Dầu)',
    // Wigo
    'Wigo E MT', 'Wigo G AT',
    // Avanza & Veloz
    'Avanza Premio MT', 'Avanza Premio CVT', 'Veloz Cross CVT', 'Veloz Cross CVT Top',
    // Raize
    'Raize',
    // Yaris
    'Yaris G',
    // Land Cruiser
    'Land Cruiser 4.6 V8 (J200, Xăng)', 'Land Cruiser Prado 2.7L (Xăng)', 'Land Cruiser 3.5 V6 Turbo (LC300, Xăng)',
    // Corolla Cross
    'Corolla Cross 1.8G', 'Corolla Cross 1.8V', 'Corolla Cross 1.8HEV (Hybrid)'
  ],
  'Honda': [
    // City
    'City G', 'City L', 'City RS',
    // Civic
    'Civic E', 'Civic G', 'Civic RS',
    // CR-V
    'CR-V G (1.5L Turbo)', 'CR-V L (1.5L Turbo)', 'CR-V L AWD (1.5L Turbo)', 'CR-V e:HEV RS (Hybrid)',
    // HR-V
    'HR-V G', 'HR-V L', 'HR-V RS',
    // Accord
    'Accord 1.5L Turbo'
  ],
  'Hyundai': [
    // Grand i10
    'Grand i10 Hatchback 1.2 MT Tiêu chuẩn', 'Grand i10 Hatchback 1.2 AT Tiêu chuẩn', 'Grand i10 Hatchback 1.2 AT',
    'Grand i10 Sedan 1.2 MT Tiêu chuẩn', 'Grand i10 Sedan 1.2 AT Tiêu chuẩn', 'Grand i10 Sedan 1.2 AT',
    // Accent
    'Accent 1.4 MT Tiêu chuẩn', 'Accent 1.4 MT', 'Accent 1.4 AT', 'Accent 1.4 AT Đặc biệt',
    // Elantra
    'Elantra 1.6 AT Tiêu chuẩn', 'Elantra 1.6 AT Đặc biệt', 'Elantra 2.0 AT Cao cấp', 'Elantra N-line 1.6 Turbo',
    // Tucson
    'Tucson 2.0 Xăng Tiêu chuẩn', 'Tucson 2.0 Xăng Đặc biệt', 'Tucson 2.0 Dầu Đặc biệt', 'Tucson 1.6 T-GDi Turbo (Xăng)',
    // Santa Fe
    'Santa Fe 2.5 Xăng Tiêu chuẩn', 'Santa Fe 2.5 Xăng Cao cấp', 
    'Santa Fe 2.2 Dầu Tiêu chuẩn', 'Santa Fe 2.2 Dầu Cao cấp', 'Santa Fe 1.6 Turbo Hybrid',
    // Creta
    'Creta 1.5 Tiêu chuẩn', 'Creta 1.5 Đặc biệt', 'Creta 1.5 Cao cấp',
    // Stargazer
    'Stargazer 1.5 Tiêu chuẩn', 'Stargazer 1.5 Đặc biệt', 'Stargazer 1.5 Cao cấp', 'Stargazer X'
  ],
  'Kia': [
    // Morning
    'Morning MT', 'Morning AT', 'Morning AT Premium', 'New Morning GT-Line', 'New Morning X-Line',
    // Soluto
    'Soluto MT', 'Soluto MT Deluxe', 'Soluto AT Deluxe',
    // K3 / Cerato
    'K3 1.6 Deluxe MT', 'K3 1.6 Luxury', 'K3 1.6 Premium', 'K3 2.0 Premium', 'K3 1.6 Turbo GT',
    // K5
    'K5 2.0 Luxury', 'K5 2.0 Premium', 'K5 2.5 GT-Line',
    // Seltos
    'Seltos 1.5 AT', 'Seltos 1.5 Luxury', 'Seltos 1.5 Premium', 'Seltos 1.5 Turbo GT-Line',
    // Sonet
    'Sonet 1.5 Deluxe', 'Sonet 1.5 Luxury', 'Sonet 1.5 Premium',
    // Sportage
    'Sportage 2.0G Luxury (Xăng)', 'Sportage 2.0G Premium (Xăng)', 'Sportage 2.0G Signature (Xăng)', 'Sportage 2.0D Signature (Dầu)', 'Sportage 1.6 Turbo Signature (Xăng)',
    // Sorento
    'Sorento 2.2D Luxury (Dầu)', 'Sorento 2.2D Premium AWD (Dầu)', 'Sorento 2.2D Signature AWD (Dầu)', 'Sorento 2.5G Premium (Xăng)', 'Sorento 2.5G Signature AWD (Xăng)', 'Sorento 1.6 Hybrid Premium', 'Sorento 1.6 Hybrid Signature',
    // Carnival
    'Carnival 2.2D Luxury (8 ghế)', 'Carnival 2.2D Premium (8 ghế)', 'Carnival 2.2D Premium (7 ghế)', 'Carnival 2.2D Signature (7 ghế)', 'Carnival 3.5G Signature (7 ghế, Xăng)'
  ],
  'Mazda': [
    // Mazda2
    'Mazda2 1.5 AT', 'Mazda2 1.5 Luxury', 'Mazda2 1.5 Premium', 'Mazda2 Sport 1.5 Luxury', 'Mazda2 Sport 1.5 Premium',
    // Mazda3
    'Mazda3 1.5 Deluxe', 'Mazda3 1.5 Luxury', 'Mazda3 1.5 Premium', 'Mazda3 Sport 1.5 Luxury', 'Mazda3 Sport 1.5 Premium',
    // Mazda6
    'Mazda6 2.0 Luxury', 'Mazda6 2.0 Premium', 'Mazda6 2.5 Signature Premium',
    // CX-3
    'CX-3 1.5 Deluxe', 'CX-3 1.5 Luxury', 'CX-3 1.5 Premium',
    // CX-30
    'CX-30 2.0 Luxury', 'CX-30 2.0 Premium',
    // CX-5
    'CX-5 2.0 Deluxe', 'CX-5 2.0 Luxury', 'CX-5 2.0 Premium', 'CX-5 2.5 Signature Sport', 'CX-5 2.5 Signature Exclusive',
    // CX-8
    'CX-8 2.5 Luxury', 'CX-8 2.5 Premium', 'CX-8 2.5 Premium AWD', 'CX-8 2.5 Premium AWD (6 ghế)',
    // BT-50
    'BT-50 1.9 MT 4x2 (Dầu)', 'BT-50 1.9 AT 4x2 (Dầu)', 'BT-50 1.9 AT 4x4 Luxury (Dầu)'
  ],
  'Ford': [
    // Ranger
    'Ranger XL 2.0L 4x4 MT (Dầu)', 'Ranger XLS 2.0L 4x2 MT (Dầu)', 'Ranger XLS 2.0L 4x2 AT (Dầu)', 'Ranger XLS 2.0L 4x4 AT (Dầu)', 'Ranger XLT 2.0L 4x4 AT (Dầu)', 'Ranger Wildtrak 2.0L Bi-Turbo 4x4 AT (Dầu)', 'Ranger Raptor 2.0L Bi-Turbo 4x4 AT (Dầu)',
    // Everest
    'Everest Ambiente 2.0L AT 4x2 (Dầu)', 'Everest Sport 2.0L AT 4x2 (Dầu)', 'Everest Titanium 2.0L AT 4x2 (Dầu)', 'Everest Titanium+ 2.0L Bi-Turbo AT 4x4 (Dầu)', 'Everest Wildtrak 2.0L Bi-Turbo AT 4x4 (Dầu)',
    // Explorer
    'Explorer Limited 2.3L Ecoboost',
    // Transit
    'Transit 16 chỗ',
    // Territory
    'Territory Trend 1.5L', 'Territory Titanium 1.5L', 'Territory Titanium X 1.5L'
  ],
  'Mitsubishi': [
    // Xpander
    'Xpander MT', 'Xpander AT', 'Xpander AT Premium', 'Xpander Cross',
    // Attrage
    'Attrage MT', 'Attrage CVT', 'Attrage CVT Premium',
    // Outlander
    'Outlander 2.0 CVT', 'Outlander 2.0 CVT Premium', 'Outlander 2.4 CVT Premium',
    // Pajero Sport
    'Pajero Sport 4x2 AT (Dầu)', 'Pajero Sport 4x4 AT (Dầu)',
    // Triton
    'Triton 4x2 AT MIVEC (Dầu)', 'Triton 4x4 AT MIVEC (Dầu)', 'Triton Athlete 4x2 AT (Dầu)', 'Triton Athlete 4x4 AT (Dầu)'
  ],
  'VinFast': [
    'Fadil Tiêu chuẩn', 'Fadil Nâng cao', 'Fadil Cao cấp',
    'Lux A2.0 Tiêu chuẩn', 'Lux A2.0 Nâng cao', 'Lux A2.0 Cao cấp',
    'Lux SA2.0 Tiêu chuẩn', 'Lux SA2.0 Nâng cao', 'Lux SA2.0 Cao cấp',
    'VF e34',
    'VF 5 Plus',
    'VF 6 Eco', 'VF 6 Plus',
    'VF 7 Eco', 'VF 7 Plus',
    'VF 8 Eco', 'VF 8 Plus',
    'VF 9 Eco', 'VF 9 Plus'
  ],
  'Suzuki': ['Ertiga Hybrid MT', 'Ertiga Hybrid AT', 'XL7', 'Swift GLX', 'Ciaz AT', 'Carry Truck', 'Carry Pro'],
  'Nissan': ['Almera CVT', 'Almera CVT Cao cấp', 'Navara EL 2WD (Dầu)', 'Navara VL 4WD (Dầu)', 'Navara Pro4X (Dầu)', 'Kicks e-Power E', 'Kicks e-Power V'],
  'Chevrolet': ['Spark Duo', 'Spark LS', 'Spark LT', 'Aveo LT', 'Aveo LTZ', 'Cruze LS', 'Cruze LTZ', 'Colorado 4x2 MT LT (Dầu)', 'Colorado 4x2 AT LTZ (Dầu)', 'Colorado 4x4 AT LTZ High Country (Dầu)', 'Traiblazer (Dầu)'],
  'Peugeot': ['2008 Active', '2008 GT-Line', '3008 Allure', '3008 Premium', '3008 GT', '5008 Allure', '5008 GT', 'Traveller Luxury', 'Traveller Premium'],
  'Mercedes-Benz': ['C 200 Avantgarde', 'C 200 Avantgarde Plus', 'C 300 AMG', 'E 200 Exclusive', 'E 300 AMG', 'S 450 4MATIC', 'S 450 4MATIC Luxury', 'GLC 200 4MATIC', 'GLC 300 4MATIC', 'GLE 450 4MATIC', 'GLS 450 4MATIC', 'V 250 Luxury'],
  'BMW': ['320i Sport Line', '320i M Sport', '330i M Sport', '520i M Sport', '530i M Sport', '735i M Sport Pure Excellence', '740i Pure Excellence', 'X1 sDrive18i xLine', 'X3 sDrive20i M Sport', 'X5 xDrive40i M Sport', 'X7 xDrive40i M Sport'],
  'Audi': ['A4', 'A6', 'A8L', 'Q3 Sportback', 'Q5 S line', 'Q7'],
  'Lexus': ['ES 250', 'ES 300h', 'LS 500', 'LS 500h', 'NX 350h', 'RX 350 Premium', 'RX 350 Luxury', 'RX 500h F Sport Performance', 'GX 550 Luxury', 'LX 600 Urban', 'LX 600 VIP'],
  'Isuzu': ['D-Max Prestige 1.9 MT 4x2 (Dầu)', 'D-Max Prestige 1.9 AT 4x2 (Dầu)', 'D-Max Type Z 1.9 AT 4x4 (Dầu)', 'mu-X B7 1.9 MT 4x2 (Dầu)', 'mu-X B7 Plus 1.9 AT 4x2 (Dầu)', 'mu-X Prestige 1.9 AT 4x2 (Dầu)', 'mu-X Premium 1.9 AT 4x4 (Dầu)'],
};
