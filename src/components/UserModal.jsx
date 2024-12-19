import { useState } from 'react'
import instagramLogo from '/src/assets/instagram.svg?url'
import xLogo from '/src/assets/x.svg?url'

const COUNTRIES = [
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'AS', name: 'American Samoa' },
  { code: 'AD', name: 'Andorra' },
  { code: 'AO', name: 'Angola' },
  { code: 'AI', name: 'Anguilla' },
  { code: 'AQ', name: 'Antarctica' },
  { code: 'AG', name: 'Antigua and Barbuda' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Armenia' },
  { code: 'AW', name: 'Aruba' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Belarus' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BM', name: 'Bermuda' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BV', name: 'Bouvet Island' },
  { code: 'BR', name: 'Brazil' },
  { code: 'IO', name: 'British Indian Ocean Territory' },
  { code: 'BN', name: 'Brunei Darussalam' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'CA', name: 'Canada' },
  { code: 'CV', name: 'Cape Verde' },
  { code: 'KY', name: 'Cayman Islands' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'TD', name: 'Chad' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CX', name: 'Christmas Island' },
  { code: 'CC', name: 'Cocos (Keeling) Islands' },
  { code: 'CO', name: 'Colombia' },
  { code: 'KM', name: 'Comoros' },
  { code: 'CG', name: 'Congo' },
  { code: 'CD', name: 'Congo, Democratic Republic of the' },
  { code: 'CK', name: 'Cook Islands' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CI', name: "Côte d'Ivoire" },
  { code: 'HR', name: 'Croatia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'EE', name: 'Estonia' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'FK', name: 'Falkland Islands' },
  { code: 'FO', name: 'Faroe Islands' },
  { code: 'FJ', name: 'Fiji' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GF', name: 'French Guiana' },
  { code: 'PF', name: 'French Polynesia' },
  { code: 'TF', name: 'French Southern Territories' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GI', name: 'Gibraltar' },
  { code: 'GR', name: 'Greece' },
  { code: 'GL', name: 'Greenland' },
  { code: 'GD', name: 'Grenada' },
  { code: 'GP', name: 'Guadeloupe' },
  { code: 'GU', name: 'Guam' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GG', name: 'Guernsey' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GW', name: 'Guinea-Bissau' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HM', name: 'Heard Island and McDonald Islands' },
  { code: 'VA', name: 'Holy See (Vatican City State)' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IR', name: 'Iran' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IM', name: 'Isle of Man' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' },
  { code: 'JE', name: 'Jersey' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KI', name: 'Kiribati' },
  { code: 'KP', name: "Korea, Democratic People's Republic of" },
  { code: 'KR', name: 'Korea, Republic of' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LA', name: "Lao People's Democratic Republic" },
  { code: 'LV', name: 'Latvia' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'LR', name: 'Liberia' },
  { code: 'LY', name: 'Libya' },
  { code: 'LI', name: 'Liechtenstein' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MO', name: 'Macao' },
  { code: 'MK', name: 'Macedonia' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MW', name: 'Malawi' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MV', name: 'Maldives' },
  { code: 'ML', name: 'Mali' },
  { code: 'MT', name: 'Malta' },
  { code: 'MH', name: 'Marshall Islands' },
  { code: 'MQ', name: 'Martinique' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'YT', name: 'Mayotte' },
  { code: 'MX', name: 'Mexico' },
  { code: 'FM', name: 'Micronesia' },
  { code: 'MD', name: 'Moldova' },
  { code: 'MC', name: 'Monaco' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'MS', name: 'Montserrat' },
  { code: 'MA', name: 'Morocco' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'NA', name: 'Namibia' },
  { code: 'NR', name: 'Nauru' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NC', name: 'New Caledonia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'NE', name: 'Niger' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'NU', name: 'Niue' },
  { code: 'NF', name: 'Norfolk Island' },
  { code: 'MP', name: 'Northern Mariana Islands' },
  { code: 'NO', name: 'Norway' },
  { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PW', name: 'Palau' },
  { code: 'PS', name: 'Palestine' },
  { code: 'PA', name: 'Panama' },
  { code: 'PG', name: 'Papua New Guinea' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PN', name: 'Pitcairn' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'QA', name: 'Qatar' },
  { code: 'RE', name: 'Réunion' },
  { code: 'RO', name: 'Romania' },
  { code: 'RU', name: 'Russian Federation' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'BL', name: 'Saint Barthélemy' },
  { code: 'SH', name: 'Saint Helena' },
  { code: 'KN', name: 'Saint Kitts and Nevis' },
  { code: 'LC', name: 'Saint Lucia' },
  { code: 'MF', name: 'Saint Martin (French part)' },
  { code: 'PM', name: 'Saint Pierre and Miquelon' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines' },
  { code: 'WS', name: 'Samoa' },
  { code: 'SM', name: 'San Marino' },
  { code: 'ST', name: 'Sao Tome and Principe' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SN', name: 'Senegal' },
  { code: 'RS', name: 'Serbia' },
  { code: 'SC', name: 'Seychelles' },
  { code: 'SL', name: 'Sierra Leone' },
  { code: 'SG', name: 'Singapore' },
  { code: 'SX', name: 'Sint Maarten (Dutch part)' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'SB', name: 'Solomon Islands' },
  { code: 'SO', name: 'Somalia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'GS', name: 'South Georgia and the South Sandwich Islands' },
  { code: 'SS', name: 'South Sudan' },
  { code: 'ES', name: 'Spain' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'SD', name: 'Sudan' },
  { code: 'SR', name: 'Suriname' },
  { code: 'SJ', name: 'Svalbard and Jan Mayen' },
  { code: 'SZ', name: 'Swaziland' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'SY', name: 'Syrian Arab Republic' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'TJ', name: 'Tajikistan' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TL', name: 'Timor-Leste' },
  { code: 'TG', name: 'Togo' },
  { code: 'TK', name: 'Tokelau' },
  { code: 'TO', name: 'Tonga' },
  { code: 'TT', name: 'Trinidad and Tobago' },
  { code: 'TN', name: 'Tunisia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'TM', name: 'Turkmenistan' },
  { code: 'TC', name: 'Turks and Caicos Islands' },
  { code: 'TV', name: 'Tuvalu' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'UM', name: 'United States Minor Outlying Islands' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'VU', name: 'Vanuatu' },
  { code: 'VE', name: 'Venezuela' },
  { code: 'VN', name: 'Viet Nam' },
  { code: 'VG', name: 'Virgin Islands, British' },
  { code: 'VI', name: 'Virgin Islands, U.S.' },
  { code: 'WF', name: 'Wallis and Futuna' },
  { code: 'EH', name: 'Western Sahara' },
  { code: 'YE', name: 'Yemen' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' }
].sort((a, b) => a.name.localeCompare(b.name))

// Replace the existing countryCodes with this comprehensive list
const countryCodes = {
  'Afghanistan': '+93',
  'Albania': '+355',
  'Algeria': '+213',
  'American Samoa': '+1-684',
  'Andorra': '+376',
  'Angola': '+244',
  'Anguilla': '+1-264',
  'Antarctica': '+672',
  'Antigua and Barbuda': '+1-268',
  'Argentina': '+54',
  'Armenia': '+374',
  'Aruba': '+297',
  'Australia': '+61',
  'Austria': '+43',
  'Azerbaijan': '+994',
  'Bahamas': '+1-242',
  'Bahrain': '+973',
  'Bangladesh': '+880',
  'Barbados': '+1-246',
  'Belarus': '+375',
  'Belgium': '+32',
  'Belize': '+501',
  'Benin': '+229',
  'Bermuda': '+1-441',
  'Bhutan': '+975',
  'Bolivia': '+591',
  'Bosnia and Herzegovina': '+387',
  'Botswana': '+267',
  'Brazil': '+55',
  'British Indian Ocean Territory': '+246',
  'Brunei': '+673',
  'Bulgaria': '+359',
  'Burkina Faso': '+226',
  'Burundi': '+257',
  'Cambodia': '+855',
  'Cameroon': '+237',
  'Canada': '+1',
  'Cape Verde': '+238',
  'Cayman Islands': '+1-345',
  'Central African Republic': '+236',
  'Chad': '+235',
  'Chile': '+56',
  'China': '+86',
  'Christmas Island': '+61',
  'Colombia': '+57',
  'Comoros': '+269',
  'Congo': '+242',
  'Congo, Democratic Republic of the': '+243',
  'Cook Islands': '+682',
  'Costa Rica': '+506',
  'Croatia': '+385',
  'Cuba': '+53',
  'Cyprus': '+357',
  'Czech Republic': '+420',
  'Denmark': '+45',
  'Djibouti': '+253',
  'Dominica': '+1-767',
  'Dominican Republic': '+1-809',
  'Ecuador': '+593',
  'Egypt': '+20',
  'El Salvador': '+503',
  'Equatorial Guinea': '+240',
  'Eritrea': '+291',
  'Estonia': '+372',
  'Ethiopia': '+251',
  'Fiji': '+679',
  'Finland': '+358',
  'France': '+33',
  'French Guiana': '+594',
  'French Polynesia': '+689',
  'Gabon': '+241',
  'Gambia': '+220',
  'Georgia': '+995',
  'Germany': '+49',
  'Ghana': '+233',
  'Gibraltar': '+350',
  'Greece': '+30',
  'Greenland': '+299',
  'Grenada': '+1-473',
  'Guadeloupe': '+590',
  'Guam': '+1-671',
  'Guatemala': '+502',
  'Guinea': '+224',
  'Guinea-Bissau': '+245',
  'Guyana': '+592',
  'Haiti': '+509',
  'Honduras': '+504',
  'Hong Kong': '+852',
  'Hungary': '+36',
  'Iceland': '+354',
  'India': '+91',
  'Indonesia': '+62',
  'Iran': '+98',
  'Iraq': '+964',
  'Ireland': '+353',
  'Israel': '+972',
  'Italy': '+39',
  'Jamaica': '+1-876',
  'Japan': '+81',
  'Jordan': '+962',
  'Kazakhstan': '+7',
  'Kenya': '+254',
  'Kiribati': '+686',
  'Korea, North': '+850',
  'Korea, South': '+82',
  'Kuwait': '+965',
  'Kyrgyzstan': '+996',
  'Laos': '+856',
  'Latvia': '+371',
  'Lebanon': '+961',
  'Lesotho': '+266',
  'Liberia': '+231',
  'Libya': '+218',
  'Liechtenstein': '+423',
  'Lithuania': '+370',
  'Luxembourg': '+352',
  'Macau': '+853',
  'Madagascar': '+261',
  'Malawi': '+265',
  'Malaysia': '+60',
  'Maldives': '+960',
  'Mali': '+223',
  'Malta': '+356',
  'Marshall Islands': '+692',
  'Martinique': '+596',
  'Mauritania': '+222',
  'Mauritius': '+230',
  'Mexico': '+52',
  'Micronesia': '+691',
  'Moldova': '+373',
  'Monaco': '+377',
  'Mongolia': '+976',
  'Montenegro': '+382',
  'Montserrat': '+1-664',
  'Morocco': '+212',
  'Mozambique': '+258',
  'Myanmar': '+95',
  'Namibia': '+264',
  'Nauru': '+674',
  'Nepal': '+977',
  'Netherlands': '+31',
  'New Caledonia': '+687',
  'New Zealand': '+64',
  'Nicaragua': '+505',
  'Niger': '+227',
  'Nigeria': '+234',
  'Norfolk Island': '+672',
  'Northern Mariana Islands': '+1-670',
  'Norway': '+47',
  'Oman': '+968',
  'Pakistan': '+92',
  'Palau': '+680',
  'Palestine': '+970',
  'Panama': '+507',
  'Papua New Guinea': '+675',
  'Paraguay': '+595',
  'Peru': '+51',
  'Philippines': '+63',
  'Poland': '+48',
  'Portugal': '+351',
  'Puerto Rico': '+1-787',
  'Qatar': '+974',
  'Romania': '+40',
  'Russia': '+7',
  'Rwanda': '+250',
  'Saint Kitts and Nevis': '+1-869',
  'Saint Lucia': '+1-758',
  'Saint Vincent and the Grenadines': '+1-784',
  'Samoa': '+685',
  'San Marino': '+378',
  'Sao Tome and Principe': '+239',
  'Saudi Arabia': '+966',
  'Senegal': '+221',
  'Serbia': '+381',
  'Seychelles': '+248',
  'Sierra Leone': '+232',
  'Singapore': '+65',
  'Slovakia': '+421',
  'Slovenia': '+386',
  'Solomon Islands': '+677',
  'Somalia': '+252',
  'South Africa': '+27',
  'South Sudan': '+211',
  'Spain': '+34',
  'Sri Lanka': '+94',
  'Sudan': '+249',
  'Suriname': '+597',
  'Swaziland': '+268',
  'Sweden': '+46',
  'Switzerland': '+41',
  'Syria': '+963',
  'Taiwan': '+886',
  'Tajikistan': '+992',
  'Tanzania': '+255',
  'Thailand': '+66',
  'Togo': '+228',
  'Tonga': '+676',
  'Trinidad and Tobago': '+1-868',
  'Tunisia': '+216',
  'Turkey': '+90',
  'Turkmenistan': '+993',
  'Turks and Caicos Islands': '+1-649',
  'Tuvalu': '+688',
  'Uganda': '+256',
  'Ukraine': '+380',
  'United Arab Emirates': '+971',
  'United Kingdom': '+44',
  'United States': '+1',
  'Uruguay': '+598',
  'Uzbekistan': '+998',
  'Vanuatu': '+678',
  'Vatican City': '+379',
  'Venezuela': '+58',
  'Vietnam': '+84',
  'Virgin Islands, British': '+1-284',
  'Virgin Islands, US': '+1-340',
  'Yemen': '+967',
  'Zambia': '+260',
  'Zimbabwe': '+263'
}

const formatPhoneNumber = (phone, countryCode) => {
  // Remove all non-digit characters except +
  let cleaned = phone.replace(/[^\d+]/g, '')
  
  // Ensure it starts with country code
  if (!cleaned.startsWith(countryCode)) {
    cleaned = countryCode + cleaned.replace(/^\+?\d*/, '')
  }
  
  // Add spaces for readability based on country format
  switch (countryCode) {
    case '+1': // US/Canada format: +1 XXX XXX XXXX
      cleaned = cleaned.replace(/(\+1)(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')
      break
    case '+44': // UK format: +44 XXXX XXXXXX
      cleaned = cleaned.replace(/(\+44)(\d{4})(\d{6})/, '$1 $2 $3')
      break
    case '+234': // Nigeria format: +234 XXX XXX XXXX
      cleaned = cleaned.replace(/(\+234)(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')
      break
    default: // Generic format: +X XXX XXX XXXX
      cleaned = cleaned.replace(/(\+\d+)(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')
  }
  
  return cleaned
}

const UserModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    platform: 'instagram',
    country: 'United States', // Default country
    countryCode: '+1'  // Default code
  })

  const handleCountryChange = (e) => {
    const country = e.target.value
    const countryCode = countryCodes[country] || ''
    
    setFormData(prev => ({
      ...prev,
      country,
      countryCode,
      phone: prev.phone.replace(/^\+\d+/, countryCode) // Replace old code with new one
    }))
  }

  const handlePhoneChange = (e) => {
    let phone = e.target.value
    phone = formatPhoneNumber(phone, formData.countryCode)
    setFormData(prev => ({ ...prev, phone }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.username) {
      alert('Please fill in all fields')
      return
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Please enter a valid email')
      return
    }

    // Submit the form
    onSubmit(formData)
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h1 className="modal-title">ONE MORE STEP!</h1>
        <p className="modal-subtitle">Kindly Fill In Your Details, Just Incase You Win!</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="What's your name?"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Country</label>
            <select
              value={formData.country}
              onChange={handleCountryChange}
              required
            >
              {Object.keys(countryCodes).map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              placeholder={`${formData.countryCode} Phone Number`}
              value={formData.phone}
              onChange={handlePhoneChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Social Handle</label>
            <div className="social-wrapper">
              <div className="platform-toggle">
                <button
                  type="button"
                  className={`platform-btn ${formData.platform === 'instagram' ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, platform: 'instagram' })}
                >
                  <img src={instagramLogo} alt="Instagram" />
                </button>
                <button
                  type="button"
                  className={`platform-btn ${formData.platform === 'x' ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, platform: 'x' })}
                >
                  <img src={xLogo} alt="X" />
                </button>
              </div>
              <div className="social-input">
                <span>@</span>
                <input
                  type="text"
                  placeholder="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Spin The Fokin Wheel Now!!
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserModal 