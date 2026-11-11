// Content extracted from the Framer project (CMS collections + page copy)
const ICONS = {
  wellness: '<svg viewBox="0 0 24 24"><path d="M3.5 12.5C2 11 2 8.2 3.9 6.6a4.4 4.4 0 0 1 6 .3L12 9l2.1-2.1a4.4 4.4 0 0 1 6-.3c1.9 1.6 1.9 4.4.4 5.9L12 21 3.5 12.5Z"/><path d="M5 12h3l1.5-2.5 2.5 5 1.5-2.5H19"/></svg>',
  vaccinations: '<svg viewBox="0 0 24 24"><path d="m18 2 4 4M17 7l3-3M19 9 8.7 19.3a2 2 0 0 1-1.4.6H4v-3.3c0-.5.2-1 .6-1.4L15 5M9 11l4 4M5 19l-3 3M14 4l6 6"/></svg>',
  dental: '<svg viewBox="0 0 24 24"><path d="M12 5.5C10 3.8 7 3.5 5.5 5.5S4.5 10 5.8 13c.8 2 .6 5 1.7 6.5.9 1.2 1.9.5 2.3-.7.4-1.3.8-3.8 2.2-3.8s1.8 2.5 2.2 3.8c.4 1.2 1.4 1.9 2.3.7 1.1-1.5.9-4.5 1.7-6.5 1.3-3 1.8-5.5.3-7.5S14 3.8 12 5.5Z"/></svg>',
  grooming: '<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12"/></svg>',
  surgery: '<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M12 11v6M9 14h6"/></svg>',
  boarding: '<svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/><path d="M9 21v-6h6v6"/></svg>',
  check: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8L16 9.5"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 21s7-5.8 7-11.5a7 7 0 1 0-14 0C5 15.2 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2C9.7 21 3 14.3 3 6a2 2 0 0 1 2-2Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></svg>',
  bell: '<svg viewBox="0 0 24 24"><path d="M4 18h16M6 18a6 6 0 0 1 12 0M12 8V6M10 6h4"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/><path d="M9 21v-6h6v6"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 3 4.5 6v5.5c0 4.6 3.1 8 7.5 9.5 4.4-1.5 7.5-4.9 7.5-9.5V6L12 3Z"/><path d="m9 12 2.2 2.2L15.5 10"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M3.5 12.5C2 11 2 8.2 3.9 6.6a4.4 4.4 0 0 1 6 .3L12 9l2.1-2.1a4.4 4.4 0 0 1 6-.3c1.9 1.6 1.9 4.4.4 5.9L12 21 3.5 12.5Z"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.4 6.6 19.5l1.2-6L3.3 9.3l6.1-.7L12 3Z"/></svg>'
};

const SERVICES = [
  { slug: 'wellness-exams', title: 'Wellness Exams', icon: 'wellness', tone: 'primary', price: 'From $65', dur: '30–45 min', pill: 'Wellness',
    summary: 'Routine checkups and diagnostics to catch issues early and keep your pet in top shape.',
    img: 'P7pOxWwc7HelmvYLL9Xd1cTaXtw', hero: 'LKXR0nv6YOQT43eq0j7jrK00HU', heroAlt: 'Veterinarian greeting a Labrador during a wellness exam',
    body: [['h2', 'A complete nose-to-tail check'], ['p', 'Every wellness exam starts with a calm, unhurried conversation about your pet’s routine, appetite, energy and behavior. Then our veterinarians examine eyes, ears, teeth, heart, lungs, skin, joints and weight, so small changes are spotted long before they become problems.'], ['p', 'You leave with a clear summary, a personalised care plan and answers to every question, never a rushed appointment.'], ['h3', 'What’s included'], ['p', 'Full physical examination, weight and body-condition score, parasite prevention review, nutrition advice, and a vaccination schedule check. Blood work and diagnostics are recommended only when they’re genuinely useful.']] },
  { slug: 'vaccinations', title: 'Vaccinations', icon: 'vaccinations', tone: 'accent', price: 'From $35', dur: '15–20 min', pill: 'Vaccinations',
    summary: 'Protect your pet with essential vaccines that support a strong and healthy immune system.',
    img: 'e0DH2Jqrk72sc9v6i9TmlDIEEdQ', hero: 'sVfeici7FLDOFLyDMqPJZkOu8Oc', heroAlt: 'Puppy held calmly during a clinic visit',
    body: [['h2', 'Protection that fits your pet’s life'], ['p', 'Not every pet needs every vaccine. We tailor a schedule to your pet’s age, health and lifestyle, whether they’re a curious puppy, an indoor cat or a seasoned traveller.'], ['p', 'Core vaccines protect against serious, common diseases, while lifestyle vaccines are recommended when your pet’s routine calls for them.'], ['h3', 'Puppies & kittens'], ['p', 'Early vaccine courses are spaced over several visits. We keep appointments short, positive and treat-filled, so first vet visits build confidence rather than fear.']] },
  { slug: 'dental-care', title: 'Dental Care', icon: 'dental', tone: 'primary', price: 'From $180', dur: 'Half day', pill: 'Dental',
    summary: 'Professional dental cleanings and treatments for healthy teeth and gums.',
    img: 'E0p18K0a2FFRDtEsSfLd6oXDKA', hero: 'cIVGJPGd9MzcEJcup7gKHLhvzs', heroAlt: 'Close-up of a dog’s clean, healthy teeth',
    body: [['h2', 'Healthy mouth, happier pet'], ['p', 'Most pets show signs of dental disease by age three, often without obvious symptoms. Professional cleanings under safe, monitored anesthesia remove plaque and tartar above and below the gumline.'], ['p', 'Every dental procedure includes a full oral assessment, charting and polishing, with digital X-rays when needed to see what’s hidden beneath the surface.'], ['h3', 'Aftercare at home'], ['p', 'We’ll show you simple brushing techniques, recommend dental-friendly diets and chews, and set a gentle reminder for your pet’s next check.']] },
  { slug: 'grooming', title: 'Grooming', icon: 'grooming', tone: 'accent', price: 'From $55', dur: '60–90 min', pill: 'Grooming',
    summary: 'Bathing, trimming, and styling to keep your pet looking great and feeling their best.',
    img: 'GihUIM1QMN6mLRS4PBrDdUQzk', hero: 'nNiPNn9ksbgzm2T3i5tO8kqGac', heroAlt: 'Groomer trimming a white poodle',
    body: [['h2', 'Grooming with a vet’s eye'], ['p', 'Our groomers work alongside our veterinary team, so lumps, skin irritation, ear infections or overgrown nails are noticed and flagged early.'], ['p', 'We use gentle, low-stress handling and pet-safe products, and we never rush a nervous pet. Breaks, cuddles and patience are part of the service.'], ['h3', 'Services available'], ['p', 'Bath and blow-dry, breed-specific trims, de-shedding treatments, nail clipping, ear cleaning and sanitary trims, plus puppy introductions to make grooming a lifelong positive routine.']] },
  { slug: 'surgery', title: 'Surgery', icon: 'surgery', tone: 'primary', price: 'Consult from $95', dur: 'By appointment', pill: 'Surgery',
    summary: 'Safe and advanced surgical procedures performed by experienced veterinarians.',
    img: 'xSpSOQH3SuM9oVtxT1Qpc2i5zg', hero: 'tl0KhRfRTLAbEke1WuzQjQDHEjE', heroAlt: 'Cat resting comfortably while recovering after surgery',
    body: [['h2', 'Advanced care, gentle recovery'], ['p', 'From routine spays and neuters to soft-tissue and orthopedic procedures, every surgery is performed in our modern theatre with dedicated anesthetic monitoring.'], ['p', 'Before any procedure we walk you through what to expect, the risks and the recovery plan, so you can make decisions with confidence.'], ['h3', 'Aftercare & pain management'], ['p', 'Your pet goes home with a tailored pain-management plan and clear instructions, and our team checks in during recovery. Post-op re-checks are always included.']] },
  { slug: 'pet-boarding', title: 'Pet Boarding', icon: 'boarding', tone: 'accent', price: 'From $48 / night', dur: 'Overnight stays', pill: 'Boarding',
    summary: 'A safe, comfortable, and loving home away from home while you’re away.',
    img: 'jU4XgNOXzU14juSyrWZqNPbRnlg', hero: 'hRASUd0tBVl1GFKvbAsCUEwPBs', heroAlt: 'Happy dogs playing together at daycare',
    body: [['h2', 'A calm stay, medically supervised'], ['p', 'Boarding at PetCare+ means your pet is looked after by people who understand animals, with veterinarians on site if anything changes.'], ['p', 'Pets enjoy cosy private suites, regular walks and play, familiar food routines and plenty of affection. Medication and special diets are handled carefully and logged.'], ['h3', 'Daily updates'], ['p', 'We send a photo and a short note every day, so you can relax and enjoy your time away, knowing your pet is happy and well.']] }
];

const POSTS = [
  { t: 'How regular checkups keep your pet healthier', s: 'how-regular-checkups-keep-your-pet-healthier', d: 'July 14, 2026', i: 'IUXVnqqhF5sZizfPzxysrWczOk', i2: '7TL7VglQTxMhy4zNh2BU8unI', alt: 'Two veterinarians examining a puppy during a routine checkup' },
  { t: 'What should your pet eat every day?', s: 'what-should-your-pet-eat-every-day', d: 'July 17, 2026', i: 'BGj2TmKYXbnaa02yHocGIp1Ie8', i2: 'oJIl2YaZj2g9C7Si8MBQAkOz8I', alt: 'Dog looking at a bowl of dry food' },
  { t: '5 signs your pet might be trying to tell you something', s: '5-signs-your-pet-might-be-trying-to-tell-you-something', d: 'July 14, 2026', i: 'bYmFo4u6vy0BBqvweZZTFXXX8o', i2: 'zW66AnWRHgVQPq5tJfSye455c6k', alt: 'Owner gently petting a scruffy grey dog' },
  { t: 'Why your pet’s dental health matters', s: 'why-your-pets-dental-health-matters', d: 'June 10, 2026', i: 'yrwEk1ZfYPQMrGc6hHbPq8xrovY', i2: 'EI0OGGIcRizONw6jwDrDsmzko', alt: 'Happy dog showing healthy teeth' },
  { t: 'A simple guide to essential pet vaccinations', s: 'a-simple-guide-to-essential-pet-vaccinations', d: 'June 10, 2026', i: 'O7C1wKcmPW2agGQbvThbtJ4A0M', i2: 'SsPumq5HHCaxUAIGBZsRj3cZj8k', alt: 'Veterinary nurse with a corgi puppy at the clinic' },
  { t: 'How often should you groom your pet?', s: 'how-often-should-you-groom-your-pet', d: 'June 20, 2026', i: 'XvHyPP8kaZQ7R6ZDkMrFdxb3bc0', i2: 'weVYf1tL6IyHp0dinxEaU8jVU', alt: 'Pomeranian being dried with a towel after a bath' },
  { t: 'Helping your pet stay happy as they grow older', s: 'helping-your-pet-stay-happy-as-they-grow-older', d: 'June 26, 2026', i: 'h1XvpgIdnh3dlYkWZEzwoHiTiQ4', i2: 'V5X1Musvm7LfjtGv18A6HlV1tw', alt: 'Senior black dog resting on a sofa' },
  { t: 'When is a pet symptom an emergency?', s: 'when-is-a-pet-symptom-an-emergency', d: 'April 16, 2026', i: 'tbhXsHT2fEYoS1gWFkjkyuR0', i2: 'JD3FCdk0UawxDl0gvE8gkrpWC6o', alt: 'Veterinary team treating a dog' },
  { t: 'Building a healthier life for your pet', s: 'building-a-healthier-life-for-your-pet', d: 'May 26, 2026', i: 'f6Fx92VwwRdKSwgOKPZG5UDtMc', i2: 'aEV85eqHTmupa8PL7k5TO6Cr0Y', alt: 'Small white dog running across a sunny meadow' }
];

// every post in the project shares the same body template
const POST_BODY_A = `
<h3>Why routine checkups matter</h3>
<p>Pets can be surprisingly good at hiding discomfort. A routine examination gives your veterinarian the opportunity to notice small changes that may not be obvious at home.</p>
<p>Regular visits also help create a clear health history, making it easier to understand what is normal for your pet and what may need attention.</p>
<h3>Early care can make a difference</h3>
<p>Preventive care helps identify potential concerns before they become more serious. Your veterinarian can check your pet’s:</p>
<ul><li>overall body condition</li><li>heart and breathing</li><li>eyes and ears</li><li>teeth and gums</li><li>skin and coat</li><li>weight and nutrition</li><li>mobility and behavior</li></ul>
<p>The goal isn’t simply to find problems. It’s to keep your pet feeling their best.</p>
<h3>What happens during a wellness visit</h3>
<p>A wellness appointment is a complete look at your pet’s overall health.</p>
<p><strong>1. A complete health check</strong><br>Your veterinarian examines your pet from nose to tail, looking for anything unusual or worth monitoring.</p>
<p><strong>2. Keeping vaccinations on track</strong><br>Vaccinations help protect pets from preventable diseases. Your veterinarian can recommend a schedule based on your pet’s age, lifestyle, and needs.</p>
<p><strong>3. Nutrition and weight review</strong><br>Healthy weight plays an important role in your pet’s long-term wellbeing. We can help you understand their nutritional needs and make practical adjustments when needed.</p>
<p><strong>4. Dental health assessment</strong><br>Dental problems can develop quietly. Checking the teeth and gums regularly helps identify issues before they become painful or harder to treat.</p>
<h3>Preventive care is lifelong care</h3>
<p>Your pet’s needs change throughout their life.</p>
<p>A growing puppy may need a different care plan than an adult dog, while senior pets often benefit from more frequent monitoring. Regular visits allow their care to evolve as they do.</p>`;
const POST_BODY_B = `
<h3>Simple habits that support better health</h3>
<p>Between veterinary visits, a few everyday habits can make a meaningful difference.</p>
<ul><li>Keep fresh water available</li><li>Feed a balanced, appropriate diet</li><li>Give your pet regular exercise</li><li>Maintain dental and grooming routines</li><li>Watch for changes in appetite or behavior</li><li>Keep vaccinations and preventive treatments current</li><li>Give your pet plenty of attention and affection</li></ul>
<p>Small habits, practiced consistently, can support a healthier life.</p>
<h3>Final thoughts</h3>
<p>Your pet can’t always tell you when something feels wrong. That’s why preventive care matters.</p>
<p>Regular checkups give you a clearer picture of their health and give your veterinary team a chance to act early when something changes.</p>
<p>Healthy pets don’t happen by accident. They’re supported by thoughtful care, regular attention, and a team that truly cares.</p>`;

const FAQS = [
  ['Do I need an appointment?', 'We recommend booking ahead so we can give your pet unhurried time, but we always keep space for urgent cases the same day. Call us and we’ll fit you in.', 'visit'],
  ['What should I bring to my pet’s first visit?', 'Bring any previous medical records, a list of current medications and food, and your pet on a leash or in a secure carrier. A favourite treat or toy helps nervous pets settle.', 'visit'],
  ['Do you see emergencies?', 'Yes. During opening hours we prioritise emergencies. Call ahead if you can so the team is ready the moment you arrive. Out of hours, our phone line directs you to the nearest 24/7 partner hospital.', 'visit'],
  ['Which animals do you care for?', 'We care for dogs, cats, rabbits and other small mammals. For birds and reptiles we can recommend trusted exotic-animal specialists nearby.', 'care'],
  ['Can I stay with my pet during the exam?', 'Of course. Most exams and vaccinations happen with you right there. For surgery and some diagnostics we’ll explain each step and keep you updated throughout.', 'care'],
  ['Which payment methods do you accept?', 'We accept all major cards, Apple Pay and Google Pay. Pet insurance claims can be submitted directly from our clinic for most major providers.', 'care'],
  ['What’s included in a wellness plan?', 'Every plan includes scheduled wellness exams, core vaccinations, parasite prevention and discounts on additional care. Higher tiers add dental cleanings, diagnostics and priority booking.', 'plan'],
  ['Can I cancel my plan at any time?', 'Yes. Plans are billed monthly with no long-term contract. You can pause or cancel anytime, and any unused benefits remain available until the end of your billing month.', 'plan'],
  ['Do plans cover emergencies or surgery?', 'Wellness plans focus on preventive care. Emergency treatment and surgery aren’t included, but members receive 10–15% off, and we’ll always talk costs through with you first.', 'plan']
];

const PLANS = [
  { name: 'Essential', desc: 'Preventive basics for healthy adult pets.', price: '$29', items: ['Two wellness exams a year', 'Core vaccinations', 'Year-round parasite prevention', '10% off additional care', 'Nurse chat support'] },
  { name: 'Complete', desc: 'Our most loved plan for total peace of mind.', price: '$49', featured: true, items: ['Everything in Essential', 'Annual dental cleaning', 'Yearly blood panel', '15% off additional care', 'Priority same-day booking'] },
  { name: 'Senior', desc: 'Extra attention for pets aged seven and up.', price: '$69', items: ['Four wellness exams a year', 'Senior blood & urine panels', 'Mobility & pain assessments', '15% off additional care', 'Dedicated care coordinator'] }
];

module.exports = { ICONS, SERVICES, POSTS, POST_BODY_A, POST_BODY_B, FAQS, PLANS };

// Professional icon set: Phosphor (regular), inlined from ./icons
const PH = { wellness:'heartbeat-duotone', vaccinations:'syringe-duotone', dental:'tooth-duotone', grooming:'scissors-duotone', surgery:'first-aid-kit-duotone', boarding:'house-duotone', check:'check-circle', clock:'clock', pin:'map-pin', phone:'phone', mail:'envelope-simple', bell:'siren', home:'house', shield:'shield-check', heart:'heart', star:'star' };
for (const [k, f] of Object.entries(PH)) ICONS[k] = require('fs').readFileSync(require('path').join(__dirname, 'icons', f + '.svg'), 'utf8').trim();
for (const k of Object.keys(ICONS)) ICONS[k] = ICONS[k].replace('<svg ', '<svg class="ico" aria-hidden="true" ');
