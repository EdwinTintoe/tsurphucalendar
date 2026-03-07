const astro = [
    {
        "astroID": "a1",
        "category": "planets",
        "enName": "Moon",
        "boName": "ཟླ",
        "enText": "",
        "boText": ""
    },
    {
        "astroID": "a2",
        "category": "planets",
        "enName": "Mars",
        "boName": "དམར",
        "enText": "",
        "boText": ""
    },
    {
        "astroID": "a3",
        "category": "planets",
        "enName": "Mercury",
        "boName": "ལྷག",
        "enText": "",
        "boText": ""
    },
    {
        "astroID": "a4",
        "category": "planets",
        "enName": "Jupiter",
        "boName": "ཕུར",
        "enText": "",
        "boText": ""
    },
    {
        "astroID": "a5",
        "category": "planets",
        "enName": "Venus",
        "boName": "སངས",
        "enText": "",
        "boText": ""
    },
    {
        "astroID": "a6",
        "category": "planets",
        "enName": "Saturn",
        "boName": "སྤེན",
        "enText": "",
        "boText": ""
    },
    {
        "astroID": "a7",
        "category": "planets",
        "enName": "Sun",
        "boName": "ཉི",
        "enText": "",
        "boText": ""
    },
    {
        "astroID": "group1",
        "enText": "Unstable or changing mansion. Good for making offerings, performing Ganachakra feasts, giving teachings and vows, offering properties to appropriate persons and carrying out activities that give a quick result.",
        "boText": "རྒྱལ་དང་མེ་བཞི་ནམ་གྲུ་དབྱུག། །མི་བརྟན་འགྱུར་བའི་སྐར་མ་བཞིར། །འཆད་ཆོག་ཆོས་འཆད་སྡོམ་པ་འབོགས། །གོང་མར་ཞུ་ནོར་འབུལ་བ་དང་། །རང་དོན་མྱུར་པོར་སྒྲུབ་སོགས་བཟང།།"
    },
    {
        "astroID": "group2",
        "enText": "Steady mansion. Good for purchasing property or moving to new locations, commanding others, planting trees and flowers and carrying out long term projects such as building temples.",
        "boText": "སྣར་མ་ཆུ་སྨད་མོན་གྲུ་དབོ། །རབ་ཏུ་བརྟན་པའི་སྐར་བཞི་ལ། །ཡུལ་གསར་འཛིན་དང་དཔོན་གསར་བསྐོ། །རབ་ཏུ་བརྟན་པའི་ལས་སོགས་བཟང།།"
    },
    {
        "astroID": "group3",
        "enText": "Swift and positive mansion. Good for working on the land, weaving cloth, making ornaments and all positive activities.",
        "boText": "ནག་པ་ལྷ་མཚམས་ཁྲུམས་སྨད་མགོ  །མྱུར་ལ་བཟང་བའི་སྐར་བཞི་ཡིན། །རྒྱན་དང་རྩེ་མོ་ཞིང་ལས་དང་། །མྱུར་བའི་ལས་རྣམས་སྒྲུབ་པར་བཟང།།"
    },
    {
        "astroID": "group4",
        "enText": "Mansions that brings negative results. On these days the result of negative actions such as destruction, waging war, stealing, killing and all sorts of violence, are multiplied.",
        "boText": "ལག་དང་སྐག་དང་སྣྲོན་དང་སྣྲུབས། །འབྲས་བུ་ངན་པའི་སྐར་མ་བཞིར། །འཇོམས་འཕྲོག་དྲག་པོའི་ལས་ལ་སོགས།།ངན་པར་སྤྱོད་པའི་ལས་རྣམས་བཟང།།"
    },
    {
        "astroID": "group5",
        "enText": "Swift mansion. Favourable for travelling to foreign countries, commerce and all activities that have swift outcomes.",
        "boText": "ནབས་སོ་ས་རི་གྲོ་བཞིན་དང་། །ཇི་བཞིན་མོན་གྲེ་ཞེས་བྱ་བ། །མྱུར་ལ་འགྱུར་བའི་སྐར་ལྔ་ལ། །གཞན་ཡུལ་བགྲོད་དང་ཚོང་ལས་སོགས། །བརྟན་མིན་མྱུར་འགྲུབ་ལས་ལ་ཤིས།།"
    },
    {
        "astroID": "group6",
        "enText": "Wish fulfilling mansion. Good for family relations and marital affairs as well as buying cattle, consulting, giving empowerment, consecration ceremonies and laying foundations.",
        "boText": "མཆུ་གྲེ་ཆུ་སྟོད་ཁྲུམས་སྟོད་རྣམས། །བརྟན་པའི་དོན་གྲུབ་སྐར་བཞི་སྟེ། །གཉེན་སྦྱོར་བྱ་དང་ཕྱུགས་སོགས་ཉོ། །འཁོར་བསྟེན་དབང་བསྐུར་རབ་གནས་ཚོང་། །ཁར་ལས་རྨང་གདིང་དགེ་ལས་བཟོ། །སྦྱིན་སྲེག་ལ་སོགས་བྱ་བ་བཟང།།"
    },
    {
        "astroID": "group7",
        "enText": "Mansion of equanimity. Best for striving towards goals, equanimity, working on jewels or pottery and fire offering rituals.",
        "boText": "སྨིན་དྲུག་དང་ནི་ས་ག་སྟེ། །བཏང་སྙོམས་བྱེད་པའི་སྐར་གཉིས་ལ། །དོན་གཉེར་བཏང་སྙོམས་རིན་ཆེན་ལྔ། །ས་བཟོ་བཟོ་དང་སྦྱིན་སྲེག་བཟང།།"
    },
    {
        "astroID": "a8",
        "category": "lunar",
        "group": 1,
        "enName": "Pushya",
        "boName": "རྒྱལ"
    },
    {
        "astroID": "a9",
        "category": "lunar",
        "group": 1,
        "enName": "Hasta",
        "boName": "མེ་བཞི"
    },
    {
        "astroID": "a10",
        "category": "lunar",
        "group": 1,
        "enName": "Abhijita",
        "boName": "དབྱུག"
    },
    {
        "astroID": "a11",
        "category": "lunar",
        "group": 1,
        "enName": "Revati",
        "boName": "ནམ་གྲུ"
    },
    {
        "astroID": "a12",
        "category": "lunar",
        "group": 2,
        "enName": "Rohini",
        "boName": "སྣར་མ"
    },
    {
        "astroID": "a13",
        "category": "lunar",
        "group": 2,
        "enName": "Uttar-Phalguni",
        "boName": "དབོ"
    },
    {
        "astroID": "a14",
        "category": "lunar",
        "group": 2,
        "enName": "Uttar-Ashadha",
        "boName": "ཆུ་སྨད"
    },
    {
        "astroID": "a15",
        "category": "lunar",
        "group": 2,
        "enName": "Shatabhisha",
        "boName": "མོན་དྲུ"
    },
    {
        "astroID": "a16",
        "category": "lunar",
        "group": 3,
        "enName": "Mrigashirsha",
        "boName": "མགོ"
    },
    {
        "astroID": "a17",
        "category": "lunar",
        "group": 3,
        "enName": "Chitra",
        "boName": "ནག་པ"
    },
    {
        "astroID": "a18",
        "category": "lunar",
        "group": 3,
        "enName": "Anuradha",
        "boName": "ལྷ་མཚམས"
    },
    {
        "astroID": "a19",
        "category": "lunar",
        "group": 3,
        "enName": "Uttar-Bhadrapada",
        "boName": "ཁྲུམས་སྨད"
    },
    {
        "astroID": "a20",
        "category": "lunar",
        "group": 4,
        "enName": "Ardra",
        "boName": "ལག"
    },
    {
        "astroID": "a21",
        "category": "lunar",
        "group": 4,
        "enName": "Jyeshtha",
        "boName": "སྣྲོན"
    },
    {
        "astroID": "a22",
        "category": "lunar",
        "group": 4,
        "enName": "Ashlesha",
        "boName": "སྐག"
    },
    {
        "astroID": "a23",
        "category": "lunar",
        "group": 4,
        "enName": "Mula",
        "boName": "སྣྲུབས"
    },
    {
        "astroID": "a24",
        "category": "lunar",
        "group": 5,
        "enName": "Punarvasu",
        "boName": "ནབས་སོ"
    },
    {
        "astroID": "a25",
        "category": "lunar",
        "group": 5,
        "enName": "Swati",
        "boName": "ས་རི"
    },
    {
        "astroID": "a26",
        "category": "lunar",
        "group": 5,
        "enName": "Shravana",
        "boName": "གྲོ་བཞིན"
    },
    {
        "astroID": "a27",
        "category": "lunar",
        "group": 5,
        "enName": "Dhanishta",
        "boName": "མོན་དྲེ"
    },
    {
        "astroID": "a28",
        "category": "lunar",
        "group": 5,
        "enName": "Ashvini",
        "boName": "ཐ་སྐར"
    },
    {
        "astroID": "a29",
        "category": "lunar",
        "group": 6,
        "enName": "Magha",
        "boName": "མཆུ"
    },
    {
        "astroID": "a30",
        "category": "lunar",
        "group": 6,
        "enName": "Bharani",
        "boName": "བྲ་ཉེ"
    },
    {
        "astroID": "a31",
        "category": "lunar",
        "group": 6,
        "enName": "Purva-Phalguni",
        "boName": "གྲེ"
    },
    {
        "astroID": "a32",
        "category": "lunar",
        "group": 6,
        "enName": "Purva-Ashadha",
        "boName": "ཆུ་སྟོད"
    },
    {
        "astroID": "a33",
        "category": "lunar",
        "group": 6,
        "enName": "Purva-Bhadrapada",
        "boName": "ཁྲུམས་སྟོད"
    },
    {
        "astroID": "a34",
        "category": "lunar",
        "group": 7,
        "enName": "Krittika",
        "boName": "སྨིན་དྲུག"
    },
    {
        "astroID": "a35",
        "category": "lunar",
        "group": 7,
        "enName": "Vishaka",
        "boName": "ས་ག"
    },
    {
        "astroID": "a36",
        "category": "elemental",
        "enName": "Earth-Earth",
        "boName": "ས་གཉིས",
        "enText": "Positive combination. Earth-earth leads to accomplishment. Accomplishment enables all our wishes to be fulfilled. Good for laying foundations, for building and all activities related to the earth, for reunions and for long-term activities.",
        "boText": "ས་གཉིས་འཕྲད་པ་དངོས་གྲུབ་སྦྱོར། །དངོས་གྲུབ་སྦྱོར་བས་ཅི་བསམ་འགྲུབ། །རྟེན་བཞེངས་མཁར་བརྩིག་ཞིིང་ཉོ་བ། །རྒྱས་པའི་ལས་རྣམས་བྱ་བ་དང་། །མདུན་མ་བྱེད་སོགས་བརྟན་ལས་བཟང།།"
    },
    {
        "astroID": "a37",
        "category": "elemental",
        "enName": "Water-Water",
        "boName": "ཆུ་གཉིས",
        "enText": "Positive combination. Water-water brings nectar and increases life and strength. Good for receiving long-life empowerment and practicing long-life rituals, for activities related to medicine, for cleansing and marriage, family matters and commerce.",
        "boText": "ཆུ་གཉིས་འཕྲད་པ་བདུད་རྩི་སྦྱོར། །བདུད་རྩི་སྦྱོར་བས་ཚེ་སྟོབས་འཕེལ། །སྨན་སྦྱོར་ཁྲུས་བྱེད་བག་མ་ལེན། །ཚེ་དབང་ཚེ་སྒྲུབ་ཆོ་ག་དང་། །གཉེན་དང་ཚོང་བསྐྱེད་འཕེལ་ལས་བཟང།།"
    },
    {
        "astroID": "a38",
        "category": "elemental",
        "enName": "Earth-Water",
        "boName": "ས་ཆུ",
        "enText": "Positive combination. Water-earth brings youthfulness, leading to constant happiness. Good for dressing up, festivals, amusement and feasting.",
        "boText": "ས་ཆུ་འཕྲད་པ་ལང་ཚོ་སྦྱོར། །ལང་ཚོ་སྦྱོར་བས་ཤིན་ཏུ་སྐྱིད། །དགའ་སྟོན་བྱ་ཞིང་ཆེ་སར་འདོན། །གོས་གྱོན་རྒྱན་འདོགས་རོལ་རྩེད་བཟང།།"
    },
    {
        "astroID": "a39",
        "category": "elemental",
        "enName": "Fire-Fire",
        "boName": "མེ་གཉིས",
        "enText": "Curable combination. Fire-fire brings increase, causing one to meet sustenance and riches. Good for commerce, planting seeds and practicing generosity. Practice the wealth goddess, Vasudhara, engage in positive actions, make offerings to wealth deities and one will gain accomplishment.",
        "boText": "མེ་གཉིས་འཕྲད་པ་འཕེལ་འགྱུར་སྦྱོར། །འཕེལ་འགྱུར་སྦྱོར་བས་ཟས་གོས་རྙེད། ཚོང་བྱ་སྦྱིན་གཏོང་ས་བོན་འདེབས། །ནོར་སྦྱིན་མ་སྒྲུབ་ཆུ་སྦྱིན་སྟེར། །ནོར་ལྷ་མཆོད་ཅིང་དངོས་གྲུབ་ཞུ།།"
    },
    {
        "astroID": "a40",
        "category": "elemental",
        "enName": "Wind-Wind",
        "boName": "རླུང་གཉིས",
        "enText": "Curable combination. Wind-wind leads to excellence. Excellence accomplishes everything rapidly. Good for travelling, reunions, and all quick and changing activities.",
        "boText": "རླུང་གཉིས་འཕྲད་པ་ཕུན་ཚོགས་སྦྱོར། །ཕུན་ཚོགས་སྦྱོར་བས་བསམ་མྱུར་འགྲུབ།།འགྲུལ་བྱ་དོན་གཉེར་ཁ་མཆུ་བསྡུམས། །གཡོ་དྲག་མྱུར་བའི་ལས་རྣམས་བཟང།།"
    },
    {
        "astroID": "a41",
        "category": "elemental",
        "enName": "Fire-Wind",
        "boName": "མེ་རླུང",
        "enText": "Curable combination. Fire-wind brings strength. Strength brings auspiciousness. Engage in religious ceremonies and practice the Dharma.",
        "boText": "མེ་རླུང་འཕྲད་པ་སྟོབས་ལྡན་སྦྱོར། །སྟོབས་ལྡན་སྦྱོར་བས་བཀྲ་ཤིས་བྱེད། །རིམ་གྲོ་ལྷ་གསོལ་ཆོས་སྤྱོད་བྱ། །ཞི་རྒྱས་དབང་གི་ལས་རྣམས་འགྲུབ།།"
    },
    {
        "astroID": "a42",
        "category": "elemental",
        "enName": "Earth-Wind",
        "boName": "ས་རླུང",
        "enText": "Negative combination. Earth-wind brings discord. Discord leads to loss of sustenance and wealth. Violent robbery, thieving and plundering take place. Grief prevents anything from being achieved.",
        "boText": "ས་རླུང་འཕྲད་པ་མི་འཕྲོད་སྦྱོར། །མི་འཕྲོད་སྦྱོར་བས་ཟས་ནོར་འཛད། །ཇག་རྐུན་འཇོམས་འཕྲོག་བྱེད་པ་སོགས། །མྱ་ངན་འོང་བས་དོན་མི་འགྲུབ།།"
    },
    {
        "astroID": "a43",
        "category": "elemental",
        "enName": "Water-Wind",
        "boName": "ཆུ་རླུང",
        "enText": "Negative combination. Water-wind brings disharmony, separating friends and relatives. Divisive action, slander and activities to expel enemies will be successful.",
        "boText": "ཆུ་རླུང་འཕྲད་པ་མི་མཐུན་སྦྱོར། །མི་མཐུན་སྦྱོར་བས་གཉེན་བཤེས་འབྱེད། །དབེན་དང་ཕྲ་མ་འཇུག་པ་དང་། །དགྲ་བོ་དབྱུང་བའི་ལས་རྣམས་རྒྱལ།།"
    },
    {
        "astroID": "a44",
        "category": "elemental",
        "enName": "Earth-Fire",
        "boName": "ས་མེ",
        "enText": "Negative combination. Earth-fire brings burning which leads to suffering. Waging wars, annihilating enemies, violence and everything that makes adversaries suffer will be powerful.",
        "boText": "ས་མེ་འཕྲད་པ་སྲེག་པའི་སྦྱོར། །སྲེག་པའི་སྦྱོར་བས་སྡུག་བསྔལ་བསྐྱེད། །དམག་འདྲེན་དགྲ་གཞོམ་དྲག་ལས་རྩོད། །ཕ་རོལ་སྡུག་བསྔལ་བསྐྱེད་སོགས་མཐུ།།"
    },
    {
        "astroID": "a45",
        "category": "elemental",
        "enName": "Fire-Water",
        "boName": "མེ་ཆུ",
        "enText": "Fatal combination. Fire-water brings death. Death destroys life force. Killing, creating poison and casting curses will be powerful.",
        "boText": "མེ་ཆུ་འཕྲད་པ་འཆི་བའི་སྦྱོར། །འཆི་བའི་སྦྱོར་བས་སྲོག་འཕྲོག་བྱེད། །ཕ་རོལ་གསོད་དང་དུག་སྦྱོར་དང་། །མཐུ་གཏད་བསྒྲུབ་སོགས་མྱུར་སྟོབས་ཆེ། །འདིར་ནི་བཟང་གསུམ་གསོ་ཐུབ་གསུམ། །ངན་གསུམ་ཐ་ཆད་གཅིག་དང་བཅུས། །བྱ་བ་ཀུན་ལ་བཟང་ངན་བྱེད།།"
    },
    {
        "astroID": "a46",
        "category": "astro28",
        "enName": "Bliss",
        "boName": "ཀུན་དགའ",
        "enText": "Wealth is found under Bliss.",
        "boText": "ཀུན་དགའ་ལ་ནི་ནོར་རྙེད་འགྱུར།"
    },
    {
        "astroID": "a47",
        "category": "astro28",
        "enName": "Time-Gem",
        "boName": "དུས་དབྱུག",
        "enText": "Great terror is found in Time-Gem.",
        "boText": "དུས་ཀྱི་དབྱིག་ལ་འཇིགས་པ་ཆེ།"
    },
    {
        "astroID": "a48",
        "category": "astro28",
        "enName": "Tame",
        "boName": "དུལ་བ",
        "enText": "Wealth and prosperity come with Tame.",
        "boText": "དུལ་བ་ལ་ནི་ནོར་མང་ཕྱུག།"
    },
    {
        "astroID": "a49",
        "category": "astro28",
        "enName": "Being",
        "boName": "སྐྱེ་རྒུ",
        "enText": "With Being women are happy.",
        "boText": "སྐྱེ་རྒུ་གནས་སུ་བུད་མེད་སྐྱིད།"
    },
    {
        "astroID": "a50",
        "category": "astro28",
        "enName": "Youth",
        "boName": "གཞོན",
        "enText": "In Youth all undertakings are achieved.",
        "boText": "གཞོན་ལ་བྱ་བ་ཐམས་ཅད་འགྲུབ།"
    },
    {
        "astroID": "a51",
        "category": "astro28",
        "enName": "Raven",
        "boName": "བྱ་རོག",
        "enText": "Quarrels and fear come with Raven.",
        "boText": "བྱ་རོག་ཁ་འཏབ་འཇིགས་ཤིང་བཀྲེས།"
    },
    {
        "astroID": "a52",
        "category": "astro28",
        "enName": "Banner",
        "boName": "རྒྱལ་མཚན",
        "enText": "With Banner clothing abounds.",
        "boText": "རྒྱལ་མཚན་གོས་སོགས་ཕུན་སུམ་ཚོགས།"
    },
    {
        "astroID": "a53",
        "category": "astro28",
        "enName": "Knot",
        "boName": "དཔལ་བེའུ",
        "enText": "With Knot jewels are gathered.",
        "boText": "དཔལ་བེའུ་ལ་ནི་རིན་ཆེན་འདུ།"
    },
    {
        "astroID": "a54",
        "category": "astro28",
        "enName": "Vajra",
        "boName": "རྡོ་རྗེ",
        "enText": "Lightning strikes and fear arises under Vajra.",
        "boText": "རྡོ་རྗེ་ཐོག་དང་དེ་བཞིན་འཇིགས།"
    },
    {
        "astroID": "a55",
        "category": "astro28",
        "enName": "Hammer",
        "boName": "ཐོ་བ",
        "enText": "With Hammer life is threatened",
        "boText": "ཐོ་བས་འཆི་བའི་འཇིགས་པ་བྱུང།"
    },
    {
        "astroID": "a56",
        "category": "astro28",
        "enName": "Parasol",
        "boName": "གདུགས",
        "enText": "Under Parasol enemies are defeated.",
        "boText": "གདུགས་ལ་དགྲ་བོ་གཞོམ་པར་འགྱུར།"
    },
    {
        "astroID": "a57",
        "category": "astro28",
        "enName": "Friend",
        "boName": "གྲོགས་པོ",
        "enText": "Friends appear under friend.",
        "boText": "གྲོགས་པོ་ལ་ནི་གྲོགས་དང་འཕྲད།"
    },
    {
        "astroID": "a58",
        "category": "astro28",
        "enName": "Mind",
        "boName": "ཡིད",
        "enText": "Abundance is found under Mind.",
        "boText": "ཡིད་ལ་དཔལ་ནི་ཐོབ་པའོ།"
    },
    {
        "astroID": "a59",
        "category": "astro28",
        "enName": "Desire",
        "boName": "འདོད",
        "enText": "All wishes are fulfilled under Desire.",
        "boText": "འདོད་པས་བྱ་བ་ཡིད་སྨོན་འགྲུབ།"
    },
    {
        "astroID": "a60",
        "category": "astro28",
        "enName": "Firebrand",
        "boName": "འགལ་མེ",
        "enText": "Discord comes with Firebrand.",
        "boText": "འགལ་མེ་ལ་ནི་འཐབ་རྩོད་འབྱུང།"
    },
    {
        "astroID": "a61",
        "category": "astro28",
        "enName": "Uprooting",
        "boName": "རྩ་བཏོན",
        "enText": "Life ends under Uprooting.",
        "boText": "རྩ་བཏོན་ལ་ནི་ཚེ་ཟད་འགྱུར།"
    },
    {
        "astroID": "a62",
        "category": "astro28",
        "enName": "Death-Lord",
        "boName": "འཆི་བདག",
        "enText": "Death arrives under Death-Lord.",
        "boText": "འཆི་བདག་ལ་ནི་འཆི་བ་འོང།"
    },
    {
        "astroID": "a63",
        "category": "astro28",
        "enName": "Arrow",
        "boName": "མདའ",
        "enText": "Limbs and nose deteriorate under Arrow.",
        "boText": "མདའ་ལ་སྣ་དང་ཡན་ལག་ཉམས།"
    },
    {
        "astroID": "a64",
        "category": "astro28",
        "enName": "Spear",
        "boName": "མདུང",
        "enText": "Under Spear one should beware of disease.",
        "boText": "མདུང་ལ་ནད་ཀྱི་འཇིགས་པ་འབྱུང།"
    },
    {
        "astroID": "a65",
        "category": "astro28",
        "enName": "Nectar",
        "boName": "བདུད་རྩི",
        "enText": "Under Nectar enemies are destroyed.",
        "boText": "བདུད་རྩི་ལ་ནི་དགྲ་འཕུང་ངོ།"
    },
    {
        "astroID": "a66",
        "category": "astro28",
        "enName": "Pestle",
        "boName": "གཏུན",
        "enText": "Wealth and auspiciousness degenerate under Pestle.",
        "boText": "གཏུན་ལ་གཏུན་ཤིང་རིག་པར་བྱ།"
    },
    {
        "astroID": "a67",
        "category": "astro28",
        "enName": "Elephant",
        "boName": "གླང་པོ",
        "enText": "All activities are accomplished under Elephant.",
        "boText": "གླང་པོས་དོན་ཀུན་འགྲུབ་པ་སྟེ།"
    },
    {
        "astroID": "a68",
        "category": "astro28",
        "enName": "Tigress",
        "boName": "སྟག་མོ",
        "enText": "Vehicles are found under Tigress.",
        "boText": "སྟག་མྱོས་ལ་ནི་བཞོན་པ་རྙེད།"
    },
    {
        "astroID": "a69",
        "category": "astro28",
        "enName": "Exhaustion",
        "boName": "ཟད",
        "enText": "Under Exhaustion possessions and life are depleted.",
        "boText": "ཟད་ལ་ནོར་དང་སྐྱེ་བོ་འཛད།"
    },
    {
        "astroID": "a70",
        "category": "astro28",
        "enName": "Cunning",
        "boName": "གཡོ",
        "enText": "Under Cunning all actions are accomplished.",
        "boText": "གཡོ་ལ་རྒྱལ་པོའི་བྱ་བ་འགྲུབ།"
    },
    {
        "astroID": "a71",
        "category": "astro28",
        "enName": "Firmness",
        "boName": "བརྟན",
        "enText": "Firmness is disastrous for governing bodies.",
        "boText": "བརྟན་པ་ལ་ནི་སྲིད་སྡེ་འཕུང།"
    },
    {
        "astroID": "a72",
        "category": "astro28",
        "enName": "Increase",
        "boName": "འཕེལ",
        "enText": "Wealth is increased under Increase.",
        "boText": "འཕེལ་བ་ལ་ནི་ནོར་འཕེལ་ལོ།"
    },
    {
        "astroID": "a73",
        "category": "astro28",
        "enName": "Success",
        "boName": "གྲུབ",
        "enText": "Desired goals are achieved under Success",
        "boText": "གྲུབ་པ་བརྩམས་པའི་བྱ་བ་འགྲུབ།"
    },
    {
        "astroID": "a74",
        "category": "skyDoors",
        "enName": "Guest",
        "boName": "མགྲོན",
        "enText": "Guest is unfavourable for inviting guests and beginning important tasks.",
        "boText": "མགྲོན་བྱེད་དང་གལ་ཆེའི་དོན་གཉེར་མི་རུང།"
    },
    {
        "astroID": "a75",
        "category": "skyDoors",
        "enName": "Business",
        "boName": "ཚོང",
        "enText": "Business unfavourable good for starting new business.",
        "boText": "ཚོང་ལས་འགོ་འཛུགས་རིགས་མི་རུང།"
    },
    {
        "astroID": "a76",
        "category": "skyDoors",
        "enName": "Baby",
        "boName": "བུ",
        "enText": "Baby is unfavourable for newborns and for celebrating birthdays.",
        "boText": "བྱིས་པ་བཙས་སྟོན་དང་ཐོག་མའི་སྒོ་འདོན་མི་རུང།"
    },
    {
        "astroID": "a77",
        "category": "skyDoors",
        "enName": "Battle",
        "boName": "དམག",
        "enText": "Battle is unfavourable for starting battles or law suits.",
        "boText": "དམག་དང་ཁ་མཆུ་འགོ་འཛུགས་མི་རུང།"
    },
    {
        "astroID": "a78",
        "category": "skyDoors",
        "enName": "Relative",
        "boName": "གཉེན",
        "enText": "Relative is unfavourable for feasts with relatives.",
        "boText": "གཉེན་ཚན་ལ་སྟོན་མོ་བྱ་མི་རུང།"
    },
    {
        "astroID": "a79",
        "category": "skyDoors",
        "enName": "Castle",
        "boName": "མཁར",
        "enText": "Castle is unfavourable for laying foundations, renovations and moving house.",
        "boText": "མཁར་ལས་འགོ་འཛུགས་པ་དང། ཉམས་གསོ། ཁྱིམ་སྤོ་བཅས་མི་རུང།"
    },
    {
        "astroID": "a80",
        "category": "skyDoors",
        "enName": "Bride",
        "boName": "བག",
        "enText": "Bride is unfavourable for engagements or weddings.",
        "boText": "བག་མ་གཏོང་ལེན་བྱེད་མི་རུང།"
    },
    {
        "astroID": "a81",
        "category": "skyDoors",
        "enName": "Funeral",
        "boName": "དུར",
        "enText": "Funeral is unfavourable for funerals.",
        "boText": "དུར་བཏབ་མི་རུང།"
    },
    {
        "astroID": "a82",
        "category": "skyDoors",
        "enName": "Deceased",
        "boName": "ཤིད",
        "enText": "Deceased is unfavourable for accumulating virtue for the deceased.",
        "boText": "གཤིན་པོའི་ཆེད་དགེ་ལས་སྟོན་མོ་མི་ང།"
    },
    {
        "astroID": "a83",
        "category": "skyDoors",
        "enName": "General",
        "boName": "སྤྱི",
        "enText": "General is unfavourable for all kinds of important activities.",
        "boText": "བྱ་བའི་ལས་སྤྱི་དང་ཁྱད་པར་གལ་ཆེའི་མདུན་གྲོས་རིགས་མི་རུང།"
    },
    {
        "astroID": "a84",
        "category": "earthLord",
        "enName": "Bistii",
        "boName": "བིཥྚིར",
        "enText": "Negative influence. Under Bistii’s influence, wrathful activities will be meaningful, but positive actions should generally be avoided, mainly taking blood and moxibustion.",
        "boText": "བིཥྚིར་དབང་བསྐུར་རབ་གནས་དང་། །དོན་གཉེར་བག་མ་ལ་སོགས་ངན།།"
    },
    {
        "astroID": "a85",
        "category": "earthLord",
        "enName": "Segtse",
        "boName": "སྲེག་ཚེས",
        "enText": "Activities accumulating merit. taking blood and moxibustion should be avoided.",
        "boText": "སྲེག་ཚེས་དུས་སུ་དགེ་ལས་དང་། །གཏར་སྲེག་བྱ་བ་འཛེམས་པར་བྱ།།"
    },
    {
        "astroID": "a86",
        "category": "earthLord",
        "group": "baden",
        "enName": "Baden",
        "boName": "བ་དན",
        "enText": "The day of Lord Baden’s appearance is inauspicious even if other stars and planets are auspicious. Avoid digging and all earth-related activities. Hanging prayer flags, victory banners and decorative fringes should also be avoided, or misfortune will follow.",
        "boText": "བ་དན་འདིར་ས་བརྐོ་ས་ལས་བྱ་བ་དང་དར་འཕྱར་སོགས་ལ་འཛེམས།།"
    },
    {
        "astroID": "a87",
        "category": "earthLord",
        "group": "lu",
        "enName": "Lutheb",
        "boName": "ཀླུ་ཐེབས",
        "enText": "Favourable for bringing rain, performing Naga rituals and making offerings to them.",
        "boText": "ཀླུ་ཐེབས་དུས་སུ་ཆར་དབབ་པ། །ཀླུ་ཆོག་ཀླུ་གཏོར་གཏོང་བ་དང་། །ཀླུ་ལ་མནན་གཏད་སྐྱེལ་སོགས་བཟང།།"
    },
    {
        "astroID": "a88",
        "category": "earthLord",
        "group": "zha",
        "enName": "Zhangen",
        "boName": "ཞག་ངན",
        "enText": "One must not waste or throw away food on this day. Doing so will result in loss of prosperity, and in degeneration. This influence overrides other positive omens, and consequences are said to occur even if other auspicious signs are present.",
        "boText": "ཞག་ངན་འཆར་བའི་དུས་འདིར་ཟས་ཕྱིར་མི་བཏང། ཕྱིར་བཏང་ན་གཡང་ཉམས་ཏེ་ཐ་མ་རབ་ཆད་དབུལ་པོར་འགྱུར་བ་གདོན་མི་ཟ་ཞིང་དེ་ལ་གཟའ་སྐར་བཟང་ཡང་ཕན་པ་མེད་པས་འཛེམས་པ་གལ་ཆེའོ།།"
    },
    {
        "astroID": "a89",
        "category": "earthLord",
        "group": "nyin",
        "enName": "Nyinnag",
        "boName": "ཉི་ནག",
        "enText": "Lochen Rinpoche’s treatise states that apart from being good for negative and wrathful activities, this day is bad for everything concerning both the living and the deceased. It is unfavourable for initiations, consecrations, marriages, burials, building and sending valuables.",
        "boText": "ཉི་ནག་ངན་བྱེད་དྲག་ལས་ལ། །བཟང་བ་ཙམ་སྟེ་དེ་ལས་གཞན། །གསོན་གཤིན་བྱ་བ་ཅི་བྱས་ངན། །ཁྱད་པར་དབང་རབ་བག་མ་མཁར། །དགེ་བཤེས་ཆེ་འདོན་དུར་གདབ་ཚོང། །ནོར་རྫས་ཕྱིར་གཏོང་ལ་སོགས་ངན།།"
    },
    {
        "astroID": "a90",
        "category": "earthLord",
        "group": "ul",
        "enName": "Ullag",
        "boName": "དབུལ་ལག",
        "enText": "Lochen Rinpoche’s treatise states that Ullag is inauspicious for activities related to the living and the departed. Giving speeches, marital affairs and taking out dead bodies should be avoided at all cost.",
        "boText": "དབུལ་ལག་མཁར་ལས་འགོ་འཛུགས་དང། །བཤད་གསར་བརྟེན་བཞེངས་རབ་ཏུ་གནས། །བག་མ་བུ་འབོགས་སྒྱེད་པུ་འཛུགས། །ལྟད་སྟོན་ཐོག་འབུབས་དར་འཕྱར་བ། །ནོར་ཕྱུགས་ཕྱིར་གཏོང་བང་མཛོད་འབྱེད། །རོ་འདོན་ཞིང་འདེབས་ལ་སོགས་"
    },
    {
        "astroID": "a91",
        "category": "earthLord",
        "group": "yen",
        "enName": "Yenkong",
        "boName": "ཡན་ཀྭོང",
        "enText": "Kongtrul Rinpoche’s Astrological Treatise, The Compendium of all Elegant Teaching states, ‘During the 13 days (of Yenkong) on which Rishis refrained from activities, it is important to avoid all important tasks, otherwise harm will come. If corpses are taken out during these days, the next generation will suffer poverty. If enthronement is performed, decline and anguish will ensue. Refrain from activities on these days and tell others to do likewise for golden results.",
        "boText": "ཡན་ཀྭོང་ཨར་པོ་བཟོ་རིགས་དང་། །ཁྱིམ་བསྒྲིགས་ཁྱིམ་ལེན་ཁྲི་འདོན་བྱས། །དུར་བཏབ་འགྲོ་འདུག་བྱས་པ་སོགས། །ངན་པས་ངེས་པར་འཛེམས་པ་གཅེས།།"
    }
]