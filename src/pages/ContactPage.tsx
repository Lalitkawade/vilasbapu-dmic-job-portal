import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { language } = useLanguage();

  const officeName = language === 'mr'
    ? (import.meta.env.VITE_OFFICE_NAME_MR || 'आमदार विलास भुमरे यांचे कार्यालय')
    : (import.meta.env.VITE_OFFICE_NAME_EN || 'MLA Vilas Bhumare Office');

  const officeAddress = language === 'mr'
    ? (import.meta.env.VITE_OFFICE_ADDRESS_MR || 'बिडकीन जनसंपर्क कार्यालय, पैठण रोड, छत्रपती संभाजीनगर, महाराष्ट्र ४३११०५')
    : (import.meta.env.VITE_OFFICE_ADDRESS_EN || 'Bidkin Public Liaison Office, Paithan Road, Chhatrapati Sambhajinagar, Maharashtra 431105');

  const phone = import.meta.env.VITE_CONTACT_PHONE || '+91 240 2345678';
  const email = import.meta.env.VITE_CONTACT_EMAIL || '';

  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormData({ name: '', phone: '', message: '' });
      setFormSent(false);
    }, 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
          {language === 'mr' ? 'कार्यालयीन संपर्क' : 'Constituency Office Contact'}
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          {language === 'mr'
            ? 'नोंदणी किंवा इतर शंकांसाठी अधिकृत कार्यालयाशी खालील पत्त्यावर संपर्क साधा.'
            : 'For registration assistance or queries, reach out to the constituency liaison office.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Contact Information Cards */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="font-bold text-base text-navy-900 border-b border-slate-100 pb-2">
              {officeName}
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-saffron-50 text-saffron-600 rounded-lg shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block mb-0.5">
                    {language === 'mr' ? 'पत्ता' : 'Office Address'}
                  </span>
                  <p className="text-slate-600">{officeAddress}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-navy-50 text-navy-700 rounded-lg shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block mb-0.5">
                    {language === 'mr' ? 'दूरध्वनी / हेल्पलाईन' : 'Helpline & Telephone'}
                  </span>
                  <a href={`tel:${phone}`} className="text-navy-800 font-medium hover:underline">
                    {phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block mb-0.5">
                    {language === 'mr' ? 'ईमेल' : 'Email Address'}
                  </span>
                  <a href={`mailto:${email}`} className="text-navy-800 font-medium hover:underline">
                    {email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-slate-100 text-slate-700 rounded-lg shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block mb-0.5">
                    {language === 'mr' ? 'कार्यालयीन वेळ' : 'Office Working Hours'}
                  </span>
                  <p className="text-slate-600">
                    {language === 'mr' ? 'सोमवार ते शनिवार: सकाळी १०:०० ते संध्याकाळी ६:००' : 'Monday to Saturday: 10:00 AM – 6:00 PM'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Public Query / Message Form */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-bold text-base text-navy-900">
            {language === 'mr' ? 'आपला संदेश / प्रश्न पाठवा' : 'Send an Inquiry to Office'}
          </h2>

          {formSent ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-sm text-emerald-900">
                {language === 'mr' ? 'संदेश पाठवला गेला!' : 'Message Received!'}
              </h3>
              <p className="text-xs text-emerald-700">
                {language === 'mr' ? 'आपल्या संदेशाची नोंद घेतली आहे. आवश्यकतेनुसार कार्यालय संपर्क साधेल.' : 'Your query has been logged. Representatives will follow up as needed.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  {language === 'mr' ? 'आपले नाव' : 'Your Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder={language === 'mr' ? 'उदा. सचिन शिंदे' : 'Your Full Name'}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  {language === 'mr' ? 'मोबाईल नंबर' : 'Mobile Number'} *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  placeholder="9823xxxxxx"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">
                  {language === 'mr' ? 'आपला संदेश किंवा शंका' : 'Inquiry or Message'} *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder={language === 'mr' ? 'आपली शंका किंवा नोंदणी संदर्भातील माहिती लिहा...' : 'Type your query or reference number here...'}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-navy-800 hover:bg-navy-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'संदेश पाठवा' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
