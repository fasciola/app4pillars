/**
 * Data for the QR table-menu demo: the three printed table cards on the homepage
 * and the sample menu they open at /menu-demo/?t=<code>.
 *
 * Each QR code holds a random code rather than the table number, so a guest
 * can't edit the address to order for another table.
 */
export interface DemoTable {
  code: string;
  table: string;
  /** Printable card with the QR code. */
  png: string;
  /** Smaller copy for showing on the page. */
  webp: string;
}

export const demoTables: DemoTable[] = [
  { code: 'q5zg6s', table: '01', png: '/table-qr/table-01.png', webp: '/table-qr/table-01.webp' },
  { code: 'ydwtu8', table: '02', png: '/table-qr/table-02.png', webp: '/table-qr/table-02.webp' },
  { code: 'w41fdb', table: '03', png: '/table-qr/table-03.png', webp: '/table-qr/table-03.webp' },
];

export function tableForCode(code: string | null): string | null {
  if (!code) return null;
  return demoTables.find((t) => t.code === code)?.table ?? null;
}

export interface DemoDish {
  en: string;
  ar: string;
  descEn: string;
  descAr: string;
  price: number;
}

export interface DemoCategory {
  id: string;
  en: string;
  ar: string;
  dishes: DemoDish[];
}

/** A fictional café's menu, used only to show how a guest browses on a phone. */
export const demoMenu: DemoCategory[] = [
  {
    id: 'breakfast',
    en: 'Breakfast',
    ar: 'الفطور',
    dishes: [
      { en: 'Turkish Eggs', ar: 'بيض تركي', descEn: 'Poached eggs, garlic labneh, chilli butter, sourdough', descAr: 'بيض مسلوق، لبنة بالثوم، زبدة بالفلفل، خبز العجين المخمر', price: 42 },
      { en: 'Shakshuka', ar: 'شكشوكة', descEn: 'Eggs in spiced tomato and pepper sauce, feta, bread', descAr: 'بيض في صلصة الطماطم والفلفل المتبلة، جبنة فيتا، خبز', price: 38 },
      { en: 'Za’atar Croissant', ar: 'كرواسون بالزعتر', descEn: 'Butter croissant, za’atar, olive oil, labneh on the side', descAr: 'كرواسون بالزبدة، زعتر، زيت زيتون، لبنة', price: 24 },
    ],
  },
  {
    id: 'coffee',
    en: 'Coffee',
    ar: 'القهوة',
    dishes: [
      { en: 'Spanish Latte', ar: 'سبانش لاتيه', descEn: 'Espresso, milk, a touch of condensed milk', descAr: 'إسبريسو، حليب، لمسة من الحليب المكثف', price: 22 },
      { en: 'Saffron Cortado', ar: 'كورتادو بالزعفران', descEn: 'Double espresso, steamed milk, saffron', descAr: 'إسبريسو مزدوج، حليب مبخر، زعفران', price: 24 },
      { en: 'Iced Pistachio Latte', ar: 'لاتيه الفستق المثلج', descEn: 'Espresso, pistachio cream, cold milk', descAr: 'إسبريسو، كريمة الفستق، حليب بارد', price: 26 },
    ],
  },
  {
    id: 'mains',
    en: 'Mains',
    ar: 'الأطباق الرئيسية',
    dishes: [
      { en: 'Grilled Halloumi Bowl', ar: 'وعاء الحلوم المشوي', descEn: 'Halloumi, quinoa, roasted vegetables, pomegranate', descAr: 'حلوم، كينوا، خضار مشوية، رمان', price: 48 },
      { en: 'Chicken Shawarma Plate', ar: 'صحن شاورما الدجاج', descEn: 'Marinated chicken, garlic sauce, pickles, fries', descAr: 'دجاج متبل، صلصة الثوم، مخللات، بطاطا', price: 45 },
    ],
  },
  {
    id: 'desserts',
    en: 'Desserts',
    ar: 'الحلويات',
    dishes: [
      { en: 'Kunafa Cheesecake', ar: 'تشيز كيك بالكنافة', descEn: 'Baked cheesecake, crispy kunafa, rose syrup', descAr: 'تشيز كيك مخبوز، كنافة مقرمشة، شراب الورد', price: 32 },
      { en: 'Date & Tahini Cake', ar: 'كيكة التمر والطحينة', descEn: 'Warm date cake, tahini caramel, vanilla ice cream', descAr: 'كيكة تمر دافئة، كراميل الطحينة، آيس كريم فانيلا', price: 30 },
    ],
  },
];
