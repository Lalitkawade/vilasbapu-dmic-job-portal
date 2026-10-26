import { ReferenceItem } from '../types/candidate';

export const QUALIFICATIONS: ReferenceItem[] = [
  { id: 'below_10th', name_en: 'Below 10th', name_mr: '१०वी पेक्षा कमी', category: 'school', display_order: 10 },
  { id: '10th_pass', name_en: '10th Pass (SSC)', name_mr: '१०वी उत्तीर्ण (एसएससी)', category: 'school', display_order: 20 },
  { id: '12th_pass', name_en: '12th Pass (HSC)', name_mr: '१२वी उत्तीर्ण (एचएससी)', category: 'junior_college', display_order: 30 },
  { id: 'iti', name_en: 'ITI (Industrial Training)', name_mr: 'आयटीआय (ITI)', category: 'vocational', display_order: 40 },
  { id: 'diploma_polytechnic', name_en: 'Diploma / Polytechnic', name_mr: 'डिप्लोमा / पॉलिटेक्निक', category: 'technical', display_order: 50 },
  { id: 'bachelors_degree', name_en: 'Bachelor\'s Degree (General)', name_mr: 'पदवीधर (सामान्य)', category: 'graduation', display_order: 60 },
  { id: 'be_btech', name_en: 'BE / BTech (Engineering)', name_mr: 'बी.ई. / बी.टेक (अभियांत्रिकी)', category: 'engineering', display_order: 70 },
  { id: 'bsc_msc', name_en: 'BSc / MSc (Science)', name_mr: 'बी.एस्सी / एम.एस्सी (विज्ञान)', category: 'graduation', display_order: 80 },
  { id: 'ba_ma', name_en: 'BA / MA (Arts)', name_mr: 'बी.ए. / एम.ए. (कला)', category: 'graduation', display_order: 90 },
  { id: 'bcom_mcom', name_en: 'BCom / MCom (Commerce)', name_mr: 'बी.कॉम / एम.कॉम (वाणिज्य)', category: 'graduation', display_order: 100 },
  { id: 'bba_mba', name_en: 'BBA / MBA (Management)', name_mr: 'बीबीए / एमबीए (व्यवस्थापन)', category: 'management', display_order: 110 },
  { id: 'bca_mca', name_en: 'BCA / MCA (Computer Applications)', name_mr: 'बीसीए / एमसीए (संगणक)', category: 'it', display_order: 120 },
  { id: 'bpharm_mpharm', name_en: 'BPharm / MPharm (Pharmacy)', name_mr: 'बी.फार्म / एम.फार्म (औषधनिर्माण)', category: 'pharma', display_order: 130 },
  { id: 'vocational_training', name_en: 'Vocational Training', name_mr: 'व्यावसायिक प्रशिक्षण', category: 'vocational', display_order: 140 },
  { id: 'apprenticeship', name_en: 'Apprenticeship Completed', name_mr: 'शिकाऊ उमेदवारी पूर्ण (Apprentice)', category: 'vocational', display_order: 150 },
  { id: 'other_qual', name_en: 'Other Qualification', name_mr: 'इतर शिक्षण', category: 'other', display_order: 160 },
];

export const EMPLOYMENT_LEVELS: ReferenceItem[] = [
  // Casual and Entry-Level
  { id: 'casual_labour', category: 'casual', category_en: 'Casual and Entry-Level', category_mr: 'रोजंदारी आणि प्राथमिक पातळी', name_en: 'Casual Labour', name_mr: 'रोजंदारी कामगार', display_order: 10 },
  { id: 'helper', category: 'casual', category_en: 'Casual and Entry-Level', category_mr: 'रोजंदारी आणि प्राथमिक पातळी', name_en: 'Helper', name_mr: 'मदतनीस', display_order: 20 },
  { id: 'unskilled_worker', category: 'casual', category_en: 'Casual and Entry-Level', category_mr: 'रोजंदारी आणि प्राथमिक पातळी', name_en: 'Unskilled Worker', name_mr: 'अकुशल कामगार', display_order: 30 },
  { id: 'semi_skilled_worker', category: 'casual', category_en: 'Casual and Entry-Level', category_mr: 'रोजंदारी आणि प्राथमिक पातळी', name_en: 'Semi-Skilled Worker', name_mr: 'अर्धकुशल कामगार', display_order: 40 },
  { id: 'general_worker', category: 'casual', category_en: 'Casual and Entry-Level', category_mr: 'रोजंदारी आणि प्राथमिक पातळी', name_en: 'General Worker', name_mr: 'सामान्य कामगार', display_order: 50 },
  { id: 'apprentice', category: 'casual', category_en: 'Casual and Entry-Level', category_mr: 'रोजंदारी आणि प्राथमिक पातळी', name_en: 'Apprentice', name_mr: 'शिकाऊ उमेदवार', display_order: 60 },
  { id: 'trainee', category: 'casual', category_en: 'Casual and Entry-Level', category_mr: 'रोजंदारी आणि प्राथमिक पातळी', name_en: 'Trainee', name_mr: 'प्रशिक्षणार्थी', display_order: 70 },
  { id: 'fresher', category: 'casual', category_en: 'Casual and Entry-Level', category_mr: 'रोजंदारी आणि प्राथमिक पातळी', name_en: 'Fresher', name_mr: 'नवोदित उमेदवार', display_order: 80 },
  { id: 'production_worker', category: 'casual', category_en: 'Casual and Entry-Level', category_mr: 'रोजंदारी आणि प्राथमिक पातळी', name_en: 'Production Worker', name_mr: 'उत्पादन कामगार', display_order: 90 },
  { id: 'assembly_worker', category: 'casual', category_en: 'Casual and Entry-Level', category_mr: 'रोजंदारी आणि प्राथमिक पातळी', name_en: 'Assembly Line Worker', name_mr: 'असेंब्ली कामगार', display_order: 100 },
  { id: 'packer', category: 'casual', category_en: 'Casual and Entry-Level', category_mr: 'रोजंदारी आणि प्राथमिक पातळी', name_en: 'Packer', name_mr: 'पॅकर', display_order: 110 },
  { id: 'loader_unloader', category: 'casual', category_en: 'Casual and Entry-Level', category_mr: 'रोजंदारी आणि प्राथमिक पातळी', name_en: 'Loader / Unloader', name_mr: 'माल चढवणे-उतरवणे कामगार', display_order: 120 },
  { id: 'housekeeping_staff', category: 'casual', category_en: 'Casual and Entry-Level', category_mr: 'रोजंदारी आणि प्राथमिक पातळी', name_en: 'Housekeeping Staff', name_mr: 'स्वच्छता कर्मचारी', display_order: 130 },
  { id: 'security_guard', category: 'casual', category_en: 'Casual and Entry-Level', category_mr: 'रोजंदारी आणि प्राथमिक पातळी', name_en: 'Security Guard', name_mr: 'सुरक्षा रक्षक', display_order: 140 },
  { id: 'warehouse_worker', category: 'casual', category_en: 'Casual and Entry-Level', category_mr: 'रोजंदारी आणि प्राथमिक पातळी', name_en: 'Warehouse Worker', name_mr: 'गोदाम कामगार', display_order: 150 },
  { id: 'driver', category: 'casual', category_en: 'Casual and Entry-Level', category_mr: 'रोजंदारी आणि प्राथमिक पातळी', name_en: 'Driver', name_mr: 'वाहनचालक', display_order: 160 },

  // Skilled and Technical
  { id: 'operator', category: 'skilled', category_en: 'Skilled and Technical', category_mr: 'कुशल आणि तांत्रिक', name_en: 'Operator', name_mr: 'ऑपरेटर', display_order: 200 },
  { id: 'machine_operator', category: 'skilled', category_en: 'Skilled and Technical', category_mr: 'कुशल आणि तांत्रिक', name_en: 'Machine Operator', name_mr: 'मशीन ऑपरेटर', display_order: 210 },
  { id: 'cnc_operator', category: 'skilled', category_en: 'Skilled and Technical', category_mr: 'कुशल आणि तांत्रिक', name_en: 'CNC Operator', name_mr: 'CNC ऑपरेटर', display_order: 220 },
  { id: 'technician', category: 'skilled', category_en: 'Skilled and Technical', category_mr: 'कुशल आणि तांत्रिक', name_en: 'Technician', name_mr: 'तंत्रज्ञ', display_order: 230 },
  { id: 'iti_technician', category: 'skilled', category_en: 'Skilled and Technical', category_mr: 'कुशल आणि तांत्रिक', name_en: 'ITI Technician', name_mr: 'आयटीआय तंत्रज्ञ', display_order: 240 },
  { id: 'electrician', category: 'skilled', category_en: 'Skilled and Technical', category_mr: 'कुशल आणि तांत्रिक', name_en: 'Electrician', name_mr: 'इलेक्ट्रिशियन', display_order: 250 },
  { id: 'fitter', category: 'skilled', category_en: 'Skilled and Technical', category_mr: 'कुशल आणि तांत्रिक', name_en: 'Fitter', name_mr: 'फिटर', display_order: 260 },
  { id: 'welder', category: 'skilled', category_en: 'Skilled and Technical', category_mr: 'कुशल आणि तांत्रिक', name_en: 'Welder', name_mr: 'वेल्डर', display_order: 270 },
  { id: 'fabricator', category: 'skilled', category_en: 'Skilled and Technical', category_mr: 'कुशल आणि तांत्रिक', name_en: 'Fabricator', name_mr: 'फॅब्रिकेटर', display_order: 280 },
  { id: 'quality_inspector', category: 'skilled', category_en: 'Skilled and Technical', category_mr: 'कुशल आणि तांत्रिक', name_en: 'Quality Inspector', name_mr: 'गुणवत्ता निरीक्षक', display_order: 290 },
  { id: 'maintenance_technician', category: 'skilled', category_en: 'Skilled and Technical', category_mr: 'कुशल आणि तांत्रिक', name_en: 'Maintenance Technician', name_mr: 'देखभाल तंत्रज्ञ', display_order: 300 },
  { id: 'senior_technician', category: 'skilled', category_en: 'Skilled and Technical', category_mr: 'कुशल आणि तांत्रिक', name_en: 'Senior Technician', name_mr: 'वरिष्ठ तंत्रज्ञ', display_order: 310 },
  { id: 'skilled_tradesperson', category: 'skilled', category_en: 'Skilled and Technical', category_mr: 'कुशल आणि तांत्रिक', name_en: 'Skilled Tradesperson', name_mr: 'कुशल कारागीर', display_order: 320 },

  // Supervisory
  { id: 'team_leader', category: 'supervisory', category_en: 'Supervisory', category_mr: 'पर्यवेक्षी (सुपरवायझरी)', name_en: 'Team Leader', name_mr: 'टीम लीडर', display_order: 400 },
  { id: 'shift_incharge', category: 'supervisory', category_en: 'Supervisory', category_mr: 'पर्यवेक्षी (सुपरवायझरी)', name_en: 'Shift In-charge', name_mr: 'शिफ्ट इन्चार्ज', display_order: 410 },
  { id: 'supervisor', category: 'supervisory', category_en: 'Supervisory', category_mr: 'पर्यवेक्षी (सुपरवायझरी)', name_en: 'Supervisor', name_mr: 'पर्यवेक्षक', display_order: 420 },
  { id: 'senior_supervisor', category: 'supervisory', category_en: 'Supervisory', category_mr: 'पर्यवेक्षी (सुपरवायझरी)', name_en: 'Senior Supervisor', name_mr: 'वरिष्ठ पर्यवेक्षक', display_order: 430 },
  { id: 'production_supervisor', category: 'supervisory', category_en: 'Supervisory', category_mr: 'पर्यवेक्षी (सुपरवायझरी)', name_en: 'Production Supervisor', name_mr: 'उत्पादन पर्यवेक्षक', display_order: 440 },
  { id: 'quality_supervisor', category: 'supervisory', category_en: 'Supervisory', category_mr: 'पर्यवेक्षी (सुपरवायझरी)', name_en: 'Quality Supervisor', name_mr: 'गुणवत्ता पर्यवेक्षक', display_order: 450 },
  { id: 'maintenance_supervisor', category: 'supervisory', category_en: 'Supervisory', category_mr: 'पर्यवेक्षी (सुपरवायझरी)', name_en: 'Maintenance Supervisor', name_mr: 'देखभाल पर्यवेक्षक', display_order: 460 },
  { id: 'stores_supervisor', category: 'supervisory', category_en: 'Supervisory', category_mr: 'पर्यवेक्षी (सुपरवायझरी)', name_en: 'Stores Supervisor', name_mr: 'स्टोअर्स पर्यवेक्षक', display_order: 470 },
  { id: 'safety_supervisor', category: 'supervisory', category_en: 'Supervisory', category_mr: 'पर्यवेक्षी (सुपरवायझरी)', name_en: 'Safety Supervisor', name_mr: 'सुरक्षा पर्यवेक्षक', display_order: 480 },

  // Engineering and Specialist
  { id: 'junior_engineer', category: 'engineering', category_en: 'Engineering and Specialist', category_mr: 'अभियांत्रिकी आणि तज्ज्ञ', name_en: 'Junior Engineer', name_mr: 'कनिष्ठ अभियंता', display_order: 500 },
  { id: 'engineer', category: 'engineering', category_en: 'Engineering and Specialist', category_mr: 'अभियांत्रिकी आणि तज्ज्ञ', name_en: 'Engineer', name_mr: 'अभियंता', display_order: 510 },
  { id: 'senior_engineer', category: 'engineering', category_en: 'Engineering and Specialist', category_mr: 'अभियांत्रिकी आणि तज्ज्ञ', name_en: 'Senior Engineer', name_mr: 'वरिष्ठ अभियंता', display_order: 520 },
  { id: 'mechanical_engineer', category: 'engineering', category_en: 'Engineering and Specialist', category_mr: 'अभियांत्रिकी आणि तज्ज्ञ', name_en: 'Mechanical Engineer', name_mr: 'मेकॅनिकल अभियंता', display_order: 530 },
  { id: 'electrical_engineer', category: 'engineering', category_en: 'Engineering and Specialist', category_mr: 'अभियांत्रिकी आणि तज्ज्ञ', name_en: 'Electrical Engineer', name_mr: 'इलेक्ट्रिकल अभियंता', display_order: 540 },
  { id: 'production_engineer', category: 'engineering', category_en: 'Engineering and Specialist', category_mr: 'अभियांत्रिकी आणि तज्ज्ञ', name_en: 'Production Engineer', name_mr: 'उत्पादन अभियंता', display_order: 550 },
  { id: 'quality_engineer', category: 'engineering', category_en: 'Engineering and Specialist', category_mr: 'अभियांत्रिकी आणि तज्ज्ञ', name_en: 'Quality Engineer', name_mr: 'गुणवत्ता अभियंता', display_order: 560 },
  { id: 'maintenance_engineer', category: 'engineering', category_en: 'Engineering and Specialist', category_mr: 'अभियांत्रिकी आणि तज्ज्ञ', name_en: 'Maintenance Engineer', name_mr: 'देखभाल अभियंता', display_order: 570 },
  { id: 'design_engineer', category: 'engineering', category_en: 'Engineering and Specialist', category_mr: 'अभियांत्रिकी आणि तज्ज्ञ', name_en: 'Design Engineer', name_mr: 'डिझाइन अभियंता', display_order: 580 },
  { id: 'industrial_engineer', category: 'engineering', category_en: 'Engineering and Specialist', category_mr: 'अभियांत्रिकी आणि तज्ज्ञ', name_en: 'Industrial Engineer', name_mr: 'औद्योगिक अभियंता', display_order: 590 },
  { id: 'automation_engineer', category: 'engineering', category_en: 'Engineering and Specialist', category_mr: 'अभियांत्रिकी आणि तज्ज्ञ', name_en: 'Automation Engineer', name_mr: 'ऑटोमेशन अभियंता', display_order: 600 },
  { id: 'robotics_engineer', category: 'engineering', category_en: 'Engineering and Specialist', category_mr: 'अभियांत्रिकी आणि तज्ज्ञ', name_en: 'Robotics Engineer', name_mr: 'रोबोटिक्स अभियंता', display_order: 610 },
  { id: 'software_engineer', category: 'engineering', category_en: 'Engineering and Specialist', category_mr: 'अभियांत्रिकी आणि तज्ज्ञ', name_en: 'Software Engineer', name_mr: 'सॉफ्टवेअर अभियंता', display_order: 620 },
  { id: 'safety_officer', category: 'engineering', category_en: 'Engineering and Specialist', category_mr: 'अभियांत्रिकी आणि तज्ज्ञ', name_en: 'Safety Officer', name_mr: 'सुरक्षा अधिकारी', display_order: 630 },
  { id: 'environmental_officer', category: 'engineering', category_en: 'Engineering and Specialist', category_mr: 'अभियांत्रिकी आणि तज्ज्ञ', name_en: 'Environmental Officer', name_mr: 'पर्यावरण अधिकारी', display_order: 640 },
  { id: 'specialist', category: 'engineering', category_en: 'Engineering and Specialist', category_mr: 'अभियांत्रिकी आणि तज्ज्ञ', name_en: 'Specialist', name_mr: 'तांत्रिक तज्ज्ञ', display_order: 650 },

  // Executive and Office
  { id: 'office_assistant', category: 'executive', category_en: 'Executive and Office', category_mr: 'कार्यालयीन आणि कार्यकारी', name_en: 'Office Assistant', name_mr: 'कार्यालयीन सहाय्यक', display_order: 700 },
  { id: 'data_entry_operator', category: 'executive', category_en: 'Executive and Office', category_mr: 'कार्यालयीन आणि कार्यकारी', name_en: 'Data Entry Operator', name_mr: 'डेटा एंट्री ऑपरेटर', display_order: 710 },
  { id: 'computer_operator', category: 'executive', category_en: 'Executive and Office', category_mr: 'कार्यालयीन आणि कार्यकारी', name_en: 'Computer Operator', name_mr: 'संगणक ऑपरेटर', display_order: 720 },
  { id: 'hr_executive', category: 'executive', category_en: 'Executive and Office', category_mr: 'कार्यालयीन आणि कार्यकारी', name_en: 'HR Executive', name_mr: 'एचआर एक्झिक्युटिव्ह', display_order: 730 },
  { id: 'accounts_executive', category: 'executive', category_en: 'Executive and Office', category_mr: 'कार्यालयीन आणि कार्यकारी', name_en: 'Accounts Executive', name_mr: 'लेखा कार्यकारी', display_order: 740 },
  { id: 'admin_executive', category: 'executive', category_en: 'Executive and Office', category_mr: 'कार्यालयीन आणि कार्यकारी', name_en: 'Administrative Executive', name_mr: 'प्रशासकीय कार्यकारी', display_order: 750 },
  { id: 'purchase_executive', category: 'executive', category_en: 'Executive and Office', category_mr: 'कार्यालयीन आणि कार्यकारी', name_en: 'Purchase Executive', name_mr: 'खरेदी कार्यकारी', display_order: 760 },
  { id: 'procurement_executive', category: 'executive', category_en: 'Executive and Office', category_mr: 'कार्यालयीन आणि कार्यकारी', name_en: 'Procurement Executive', name_mr: 'प्रोक्योरमेंट कार्यकारी', display_order: 770 },
  { id: 'logistics_executive', category: 'executive', category_en: 'Executive and Office', category_mr: 'कार्यालयीन आणि कार्यकारी', name_en: 'Logistics Executive', name_mr: 'लॉजिस्टिक्स कार्यकारी', display_order: 780 },
  { id: 'sales_executive', category: 'executive', category_en: 'Executive and Office', category_mr: 'कार्यालयीन आणि कार्यकारी', name_en: 'Sales Executive', name_mr: 'विक्री कार्यकारी', display_order: 790 },
  { id: 'support_executive', category: 'executive', category_en: 'Executive and Office', category_mr: 'कार्यालयीन आणि कार्यकारी', name_en: 'Customer Support Executive', name_mr: 'ग्राहक सेवा कार्यकारी', display_order: 800 },
  { id: 'senior_executive', category: 'executive', category_en: 'Executive and Office', category_mr: 'कार्यालयीन आणि कार्यकारी', name_en: 'Senior Executive', name_mr: 'वरिष्ठ कार्यकारी', display_order: 810 },
  { id: 'analyst', category: 'executive', category_en: 'Executive and Office', category_mr: 'कार्यालयीन आणि कार्यकारी', name_en: 'Analyst', name_mr: 'विश्लेषक', display_order: 820 },

  // Management
  { id: 'asst_manager', category: 'management', category_en: 'Management', category_mr: 'व्यवस्थापन पातळी', name_en: 'Assistant Manager', name_mr: 'सहाय्यक व्यवस्थापक', display_order: 900 },
  { id: 'deputy_manager', category: 'management', category_en: 'Management', category_mr: 'व्यवस्थापन पातळी', name_en: 'Deputy Manager', name_mr: 'उपव्यवस्थापक', display_order: 910 },
  { id: 'manager', category: 'management', category_en: 'Management', category_mr: 'व्यवस्थापन पातळी', name_en: 'Manager', name_mr: 'व्यवस्थापक', display_order: 920 },
  { id: 'senior_manager', category: 'management', category_en: 'Management', category_mr: 'व्यवस्थापन पातळी', name_en: 'Senior Manager', name_mr: 'वरिष्ठ व्यवस्थापक', display_order: 930 },
  { id: 'dept_head', category: 'management', category_en: 'Management', category_mr: 'व्यवस्थापन पातळी', name_en: 'Department Head', name_mr: 'विभागप्रमुख', display_order: 940 },
  { id: 'plant_manager', category: 'management', category_en: 'Management', category_mr: 'व्यवस्थापन पातळी', name_en: 'Plant Manager', name_mr: 'प्लांट व्यवस्थापक', display_order: 950 },
  { id: 'ops_manager', category: 'management', category_en: 'Management', category_mr: 'व्यवस्थापन पातळी', name_en: 'Operations Manager', name_mr: 'ऑपरेशन्स व्यवस्थापक', display_order: 960 },
  { id: 'general_manager', category: 'management', category_en: 'Management', category_mr: 'व्यवस्थापन पातळी', name_en: 'General Manager', name_mr: 'जनरल मॅनेजर', display_order: 970 },
  { id: 'other_level', category: 'other', category_en: 'Other', category_mr: 'इतर', name_en: 'Other Level', name_mr: 'इतर पातळी', display_order: 999 },
];

export const JOB_DEPARTMENTS: ReferenceItem[] = [
  { id: 'dept_production', name_en: 'Production and Manufacturing', name_mr: 'उत्पादन आणि निर्मिती', display_order: 1 },
  { id: 'dept_machine_ops', name_en: 'Machine Operations', name_mr: 'मशीन ऑपरेशन्स', display_order: 2 },
  { id: 'dept_cnc_fab_weld', name_en: 'CNC, Fabrication and Welding', name_mr: 'CNC, फॅब्रिकेशन आणि वेल्डिंग', display_order: 3 },
  { id: 'dept_mech_eng', name_en: 'Mechanical Engineering', name_mr: 'मेकॅनिकल अभियांत्रिकी', display_order: 4 },
  { id: 'dept_elec_eng', name_en: 'Electrical Engineering', name_mr: 'इलेक्ट्रिकल अभियांत्रिकी', display_order: 5 },
  { id: 'dept_electronics_inst', name_en: 'Electronics and Instrumentation', name_mr: 'इलेक्ट्रॉनिक्स आणि इन्स्ट्रुमेंटेशन', display_order: 6 },
  { id: 'dept_qa_qc', name_en: 'Quality Control and QA', name_mr: 'गुणवत्ता नियंत्रण (QA/QC)', display_order: 7 },
  { id: 'dept_maint_util', name_en: 'Maintenance and Utilities', name_mr: 'देखभाल आणि युटिलिटीज्', display_order: 8 },
  { id: 'dept_automation_robotics', name_en: 'Industrial Automation and Robotics', name_mr: 'इंडस्ट्रियल ऑटोमेशन आणि रोबोटिक्स', display_order: 9 },
  { id: 'dept_she', name_en: 'Safety, Health and Environment (EHS)', name_mr: 'सुरक्षा, आरोग्य आणि पर्यावरण', display_order: 10 },
  { id: 'dept_warehouse_stores', name_en: 'Warehouse, Stores and Inventory', name_mr: 'गोदाम, स्टोअर्स आणि इन्व्हेंटरी', display_order: 11 },
  { id: 'dept_logistics_dispatch', name_en: 'Logistics, Transport and Dispatch', name_mr: 'लॉजिस्टिक्स, वाहतूक आणि डिस्पॅच', display_order: 12 },
  { id: 'dept_procurement_scm', name_en: 'Procurement and Supply Chain', name_mr: 'खरेदी आणि सप्लाय चेन', display_order: 13 },
  { id: 'dept_hr_admin', name_en: 'HR and Administration', name_mr: 'मानव संसाधन (HR) आणि प्रशासन', display_order: 14 },
  { id: 'dept_finance_accounts', name_en: 'Accounts, Finance and Audit', name_mr: 'लेखा, वित्त आणि ऑडिट', display_order: 15 },
  { id: 'dept_it_computer', name_en: 'IT and Computer Operations', name_mr: 'आयटी आणि संगणक कार्य', display_order: 16 },
  { id: 'dept_sales_marketing', name_en: 'Sales and Marketing', name_mr: 'विक्री, विपणन आणि ग्राहक सेवा', display_order: 17 },
  { id: 'dept_civil_construction', name_en: 'Construction and Civil Engineering', name_mr: 'बांधकाम आणि सिव्हिल अभियांत्रिकी', display_order: 18 },
  { id: 'dept_packaging_assembly', name_en: 'Packaging and Assembly', name_mr: 'पॅकेजिंग आणि असेंब्ली', display_order: 19 },
  { id: 'dept_supervisory_mgmt', name_en: 'Supervisory and Management', name_mr: 'पर्यवेक्षण आणि व्यवस्थापन', display_order: 20 },
  { id: 'dept_facility_security', name_en: 'Housekeeping and Security', name_mr: 'हाउसकीपिंग, सुरक्षा व सुविधा', display_order: 21 },
  { id: 'dept_other', name_en: 'Other Roles', name_mr: 'इतर पदे', display_order: 22 },
];

export const JOB_ROLES: ReferenceItem[] = [
  // Production
  { id: 'role_prod_worker', department_id: 'dept_production', name_en: 'Production Worker / Helper', name_mr: 'उत्पादन कामगार / मदतनीस', display_order: 10 },
  { id: 'role_assembly_op', department_id: 'dept_production', name_en: 'Assembly Line Operator', name_mr: 'असेंब्ली लाईन ऑपरेटर', display_order: 20 },
  { id: 'role_prod_supervisor', department_id: 'dept_production', name_en: 'Production Supervisor', name_mr: 'उत्पादन पर्यवेक्षक', display_order: 30 },
  { id: 'role_prod_engineer', department_id: 'dept_production', name_en: 'Production Engineer', name_mr: 'उत्पादन अभियंता', display_order: 40 },

  // Machine Ops
  { id: 'role_lathe_operator', department_id: 'dept_machine_ops', name_en: 'Lathe Machine Operator', name_mr: 'लेथ मशीन ऑपरेटर', display_order: 50 },
  { id: 'role_milling_operator', department_id: 'dept_machine_ops', name_en: 'Milling Machine Operator', name_mr: 'मिलिंग मशीन ऑपरेटर', display_order: 60 },
  { id: 'role_press_operator', department_id: 'dept_machine_ops', name_en: 'Power Press Operator', name_mr: 'प्रेस ऑपरेटर', display_order: 70 },
  { id: 'role_grinding_operator', department_id: 'dept_machine_ops', name_en: 'Grinding Machine Operator', name_mr: 'ग्राइंडिंग ऑपरेटर', display_order: 80 },

  // CNC & Fab
  { id: 'role_cnc_operator', department_id: 'dept_cnc_fab_weld', name_en: 'CNC Machine Operator', name_mr: 'CNC ऑपरेटर', display_order: 90 },
  { id: 'role_vmc_operator', department_id: 'dept_cnc_fab_weld', name_en: 'VMC Machine Operator / Setter', name_mr: 'VMC ऑपरेटर / सेटर', display_order: 100 },
  { id: 'role_cnc_programmer', department_id: 'dept_cnc_fab_weld', name_en: 'CNC Programmer', name_mr: 'CNC प्रोग्रॅमर', display_order: 110 },
  { id: 'role_welder_mig_tig', department_id: 'dept_cnc_fab_weld', name_en: 'Welder (ARC / MIG / TIG)', name_mr: 'वेल्डर (MIG/TIG/ARC)', display_order: 120 },
  { id: 'role_fitter_fabricator', department_id: 'dept_cnc_fab_weld', name_en: 'Fabricator & Structural Fitter', name_mr: 'फॅब्रिकेटर आणि फिटर', display_order: 130 },

  // Mech Eng
  { id: 'role_mech_technician', department_id: 'dept_mech_eng', name_en: 'Mechanical Maintenance Technician', name_mr: 'मेकॅनिकल देखभाल तंत्रज्ञ', display_order: 140 },
  { id: 'role_mech_engineer', department_id: 'dept_mech_eng', name_en: 'Mechanical Engineer', name_mr: 'मेकॅनिकल अभियंता', display_order: 150 },
  { id: 'role_tool_die_maker', department_id: 'dept_mech_eng', name_en: 'Tool & Die Maker', name_mr: 'टूल आणि डाय मेकर', display_order: 160 },

  // Elec Eng
  { id: 'role_industrial_electrician', department_id: 'dept_elec_eng', name_en: 'Industrial Electrician', name_mr: 'औद्योगिक इलेक्ट्रिशियन', display_order: 170 },
  { id: 'role_panel_wireman', department_id: 'dept_elec_eng', name_en: 'Control Panel Wireman', name_mr: 'कंट्रोल पॅनेल वायरमन', display_order: 180 },
  { id: 'role_electrical_engineer', department_id: 'dept_elec_eng', name_en: 'Electrical Engineer', name_mr: 'इलेक्ट्रिकल अभियंता', display_order: 190 },

  // Electronics & Automation
  { id: 'role_instrument_technician', department_id: 'dept_electronics_inst', name_en: 'Instrumentation Technician', name_mr: 'इन्स्ट्रुमेंटेशन तंत्रज्ञ', display_order: 200 },
  { id: 'role_plc_programmer', department_id: 'dept_automation_robotics', name_en: 'PLC & SCADA Programmer', name_mr: 'PLC आणि SCADA प्रोग्रॅमर', display_order: 210 },
  { id: 'role_robotics_technician', department_id: 'dept_automation_robotics', name_en: 'Robotics Technician / Engineer', name_mr: 'रोबोटिक्स तंत्रज्ञ', display_order: 220 },

  // QA & QC
  { id: 'role_qc_inspector', department_id: 'dept_qa_qc', name_en: 'Quality Inspector (CMM / Vernier)', name_mr: 'गुणवत्ता निरीक्षक (QC)', display_order: 230 },
  { id: 'role_qa_engineer', department_id: 'dept_qa_qc', name_en: 'QA / QC Engineer', name_mr: 'QA/QC अभियंता', display_order: 240 },

  // Maintenance & Utilities
  { id: 'role_maintenance_fitter', department_id: 'dept_maint_util', name_en: 'Maintenance Fitter', name_mr: 'मेंटेनन्स फिटर', display_order: 250 },
  { id: 'role_boiler_attendant', department_id: 'dept_maint_util', name_en: 'Boiler Attendant / Operator', name_mr: 'बॉइलर ऑपरेटर', display_order: 260 },
  { id: 'role_compressor_operator', department_id: 'dept_maint_util', name_en: 'Compressor / Utility Operator', name_mr: 'युटिलिटी ऑपरेटर', display_order: 270 },

  // EHS & Safety
  { id: 'role_safety_supervisor', department_id: 'dept_she', name_en: 'Safety Supervisor / Officer', name_mr: 'सुरक्षा अधिकारी (Safety Officer)', display_order: 280 },
  { id: 'role_fire_officer', department_id: 'dept_she', name_en: 'Fire & Safety Marshal', name_mr: 'अग्निशमन व सुरक्षा रक्षक', display_order: 290 },

  // Warehouse & Stores
  { id: 'role_storekeeper', department_id: 'dept_warehouse_stores', name_en: 'Storekeeper / Inventory Assistant', name_mr: 'स्टोअरकीपर / इन्व्हेंटरी सहाय्यक', display_order: 300 },
  { id: 'role_forklift_operator', department_id: 'dept_warehouse_stores', name_en: 'Forklift Operator', name_mr: 'फोर्कलिफ्ट चालक', display_order: 310 },

  // Logistics
  { id: 'role_dispatch_executive', department_id: 'dept_logistics_dispatch', name_en: 'Dispatch & Logistics Executive', name_mr: 'डिस्पॅच आणि लॉजिस्टिक्स कार्यकारी', display_order: 320 },
  { id: 'role_commercial_driver', department_id: 'dept_logistics_dispatch', name_en: 'Heavy Commercial Driver', name_mr: 'हेवी कमर्शियल ड्रायव्हर', display_order: 330 },

  // Admin & Accounts
  { id: 'role_data_entry', department_id: 'dept_it_computer', name_en: 'Data Entry & Office Assistant', name_mr: 'डेटा एंट्री व कार्यालयीन सहाय्यक', display_order: 340 },
  { id: 'role_tally_accountant', department_id: 'dept_finance_accounts', name_en: 'Accounts Assistant / Tally Operator', name_mr: 'अकाउंटंट (Tally)', display_order: 350 },
  { id: 'role_it_support', department_id: 'dept_it_computer', name_en: 'IT Hardware & Network Support', name_mr: 'आयटी हार्डवेअर व नेटवर्किंग', display_order: 360 },
  { id: 'role_hr_executive', department_id: 'dept_hr_admin', name_en: 'HR & Time Office Executive', name_mr: 'एचआर व टाईम ऑफिस कार्यकारी', display_order: 370 },

  // Facility & Security
  { id: 'role_security_guard', department_id: 'dept_facility_security', name_en: 'Security Guard / Supervisor', name_mr: 'सुरक्षा रक्षक / पर्यवेक्षक', display_order: 380 },
  { id: 'role_housekeeping_cleaner', department_id: 'dept_facility_security', name_en: 'Housekeeping Cleaner / Boy', name_mr: 'स्वच्छता कर्मचारी', display_order: 390 },
  { id: 'role_general_other', department_id: 'dept_other', name_en: 'Other Specific Role', name_mr: 'इतर विशिष्ट काम', display_order: 400 },
];

export const SKILLS: ReferenceItem[] = [
  // Mechanical & Manufacturing
  { id: 'skill_fitting', category: 'mechanical', category_en: 'Mechanical & Manufacturing', category_mr: 'मेकॅनिकल आणि उत्पादन', name_en: 'Fitting', name_mr: 'फिटींग (Fitting)', display_order: 10 },
  { id: 'skill_cnc', category: 'mechanical', category_en: 'Mechanical & Manufacturing', category_mr: 'मेकॅनिकल आणि उत्पादन', name_en: 'CNC Operating & Programming', name_mr: 'CNC ऑपरेटिंग व प्रोग्रॅमिंग', display_order: 20 },
  { id: 'skill_vmc', category: 'mechanical', category_en: 'Mechanical & Manufacturing', category_mr: 'मेकॅनिकल आणि उत्पादन', name_en: 'VMC Operating', name_mr: 'VMC ऑपरेटिंग', display_order: 30 },
  { id: 'skill_lathe', category: 'mechanical', category_en: 'Mechanical & Manufacturing', category_mr: 'मेकॅनिकल आणि उत्पादन', name_en: 'Lathe Machine', name_mr: 'लेथ मशीन', display_order: 40 },
  { id: 'skill_milling', category: 'mechanical', category_en: 'Mechanical & Manufacturing', category_mr: 'मेकॅनिकल आणि उत्पादन', name_en: 'Milling', name_mr: 'मिलिंग', display_order: 50 },
  { id: 'skill_welding', category: 'mechanical', category_en: 'Mechanical & Manufacturing', category_mr: 'मेकॅनिकल आणि उत्पादन', name_en: 'Welding (ARC / MIG / TIG)', name_mr: 'वेल्डिंग (ARC/MIG/TIG)', display_order: 60 },
  { id: 'skill_fabrication', category: 'mechanical', category_en: 'Mechanical & Manufacturing', category_mr: 'मेकॅनिकल आणि उत्पादन', name_en: 'Fabrication', name_mr: 'फॅब्रिकेशन', display_order: 70 },
  { id: 'skill_assembly', category: 'mechanical', category_en: 'Mechanical & Manufacturing', category_mr: 'मेकॅनिकल आणि उत्पादन', name_en: 'Assembly', name_mr: 'असेंब्ली', display_order: 80 },
  { id: 'skill_machine_op', category: 'mechanical', category_en: 'Mechanical & Manufacturing', category_mr: 'मेकॅनिकल आणि उत्पादन', name_en: 'Machine Operation', name_mr: 'मशीन ऑपरेशन', display_order: 90 },
  { id: 'skill_mech_maint', category: 'mechanical', category_en: 'Mechanical & Manufacturing', category_mr: 'मेकॅनिकल आणि उत्पादन', name_en: 'Mechanical Maintenance', name_mr: 'मेकॅनिकल मेंटेनन्स', display_order: 100 },
  { id: 'skill_hydraulics', category: 'mechanical', category_en: 'Mechanical & Manufacturing', category_mr: 'मेकॅनिकल आणि उत्पादन', name_en: 'Hydraulics', name_mr: 'हायड्रॉलिक्स', display_order: 110 },
  { id: 'skill_pneumatics', category: 'mechanical', category_en: 'Mechanical & Manufacturing', category_mr: 'मेकॅनिकल आणि उत्पादन', name_en: 'Pneumatics', name_mr: 'न्यूमॅटिक्स', display_order: 120 },
  { id: 'skill_prod_planning', category: 'mechanical', category_en: 'Mechanical & Manufacturing', category_mr: 'मेकॅनिकल आणि उत्पादन', name_en: 'Production Planning', name_mr: 'उत्पादन नियोजन (PPC)', display_order: 130 },

  // Electrical & Electronics
  { id: 'skill_ind_wiring', category: 'electrical', category_en: 'Electrical & Electronics', category_mr: 'इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स', name_en: 'Industrial Wiring', name_mr: 'इंडस्ट्रियल वायरिंग', display_order: 200 },
  { id: 'skill_elec_maint', category: 'electrical', category_en: 'Electrical & Electronics', category_mr: 'इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स', name_en: 'Electrical Maintenance', name_mr: 'इलेक्ट्रिकल मेंटेनन्स', display_order: 210 },
  { id: 'skill_plc', category: 'electrical', category_en: 'Electrical & Electronics', category_mr: 'इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स', name_en: 'PLC Programming', name_mr: 'PLC प्रोग्रॅमिंग', display_order: 220 },
  { id: 'skill_scada', category: 'electrical', category_en: 'Electrical & Electronics', category_mr: 'इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स', name_en: 'SCADA Systems', name_mr: 'SCADA सिस्टीम', display_order: 230 },
  { id: 'skill_instrumentation', category: 'electrical', category_en: 'Electrical & Electronics', category_mr: 'इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स', name_en: 'Instrumentation', name_mr: 'इन्स्ट्रुमेंटेशन', display_order: 240 },
  { id: 'skill_electronics_repair', category: 'electrical', category_en: 'Electrical & Electronics', category_mr: 'इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स', name_en: 'Electronics Repair', name_mr: 'इलेक्ट्रॉनिक्स दुरुस्ती', display_order: 250 },
  { id: 'skill_panel_wiring', category: 'electrical', category_en: 'Electrical & Electronics', category_mr: 'इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स', name_en: 'Control Panel Wiring', name_mr: 'कंट्रोल पॅनेल वायरिंग', display_order: 260 },
  { id: 'skill_motor_control', category: 'electrical', category_en: 'Electrical & Electronics', category_mr: 'इलेक्ट्रिकल आणि इलेक्ट्रॉनिक्स', name_en: 'Motor Control & Drives', name_mr: 'मोटर कंट्रोल आणि ड्राइव्ह्ज', display_order: 270 },

  // Quality & Safety
  { id: 'skill_quality_insp', category: 'quality', category_en: 'Quality & Safety', category_mr: 'गुणवत्ता आणि सुरक्षा', name_en: 'Quality Inspection', name_mr: 'गुणवत्ता तपासणी', display_order: 300 },
  { id: 'skill_quality_assurance', category: 'quality', category_en: 'Quality & Safety', category_mr: 'गुणवत्ता आणि सुरक्षा', name_en: 'Quality Assurance (QA)', name_mr: 'गुणवत्ता हमी (QA)', display_order: 310 },
  { id: 'skill_testing', category: 'quality', category_en: 'Quality & Safety', category_mr: 'गुणवत्ता आणि सुरक्षा', name_en: 'Product Testing', name_mr: 'उत्पादन चाचणी', display_order: 320 },
  { id: 'skill_measure_inst', category: 'quality', category_en: 'Quality & Safety', category_mr: 'गुणवत्ता आणि सुरक्षा', name_en: 'Measurement Instruments', name_mr: 'मापन साधने (व्हर्नियर/मायक्रोमीटर)', display_order: 330 },
  { id: 'skill_iso_doc', category: 'quality', category_en: 'Quality & Safety', category_mr: 'गुणवत्ता आणि सुरक्षा', name_en: 'ISO Documentation', name_mr: 'आयएसओ (ISO) दस्तऐवजीकरण', display_order: 340 },
  { id: 'skill_safety_procedures', category: 'quality', category_en: 'Quality & Safety', category_mr: 'गुणवत्ता आणि सुरक्षा', name_en: 'Industrial Safety Procedures', name_mr: 'सुरक्षा पद्धती व नियम', display_order: 350 },
  { id: 'skill_ehs', category: 'quality', category_en: 'Quality & Safety', category_mr: 'गुणवत्ता आणि सुरक्षा', name_en: 'EHS Management', name_mr: 'EHS पर्यावरण व सुरक्षा', display_order: 360 },
  { id: 'skill_rca', category: 'quality', category_en: 'Quality & Safety', category_mr: 'गुणवत्ता आणि सुरक्षा', name_en: 'Root Cause Analysis', name_mr: 'रूट कॉज ॲनालिसीस (RCA)', display_order: 370 },

  // Logistics & Operations
  { id: 'skill_inventory_mgmt', category: 'logistics', category_en: 'Logistics & Operations', category_mr: 'लॉजिस्टिक्स आणि कार्यप्रणाली', name_en: 'Inventory Management', name_mr: 'इन्व्हेंटरी व्यवस्थापन', display_order: 400 },
  { id: 'skill_warehouse_ops', category: 'logistics', category_en: 'Logistics & Operations', category_mr: 'लॉजिस्टिक्स आणि कार्यप्रणाली', name_en: 'Warehouse Operations', name_mr: 'गोदाम कामकाज', display_order: 410 },
  { id: 'skill_dispatch', category: 'logistics', category_en: 'Logistics & Operations', category_mr: 'लॉजिस्टिक्स आणि कार्यप्रणाली', name_en: 'Dispatch & Material Handling', name_mr: 'डिस्पॅच आणि माल हाताळणी', display_order: 420 },
  { id: 'skill_forklift', category: 'logistics', category_en: 'Logistics & Operations', category_mr: 'लॉजिस्टिक्स आणि कार्यप्रणाली', name_en: 'Forklift Operation', name_mr: 'फोर्कलिफ्ट चालवणे', display_order: 430 },
  { id: 'skill_transport_coord', category: 'logistics', category_en: 'Logistics & Operations', category_mr: 'लॉजिस्टिक्स आणि कार्यप्रणाली', name_en: 'Transport Coordination', name_mr: 'वाहतूक समन्वय', display_order: 440 },
  { id: 'skill_supply_chain', category: 'logistics', category_en: 'Logistics & Operations', category_mr: 'लॉजिस्टिक्स आणि कार्यप्रणाली', name_en: 'Supply Chain Management', name_mr: 'सप्लाय चेन व्यवस्थापन', display_order: 450 },
  { id: 'skill_procurement', category: 'logistics', category_en: 'Logistics & Operations', category_mr: 'लॉजिस्टिक्स आणि कार्यप्रणाली', name_en: 'Procurement & Purchasing', name_mr: 'खरेदी आणि संपादन', display_order: 460 },

  // Computer & Office
  { id: 'skill_basic_comp', category: 'computer', category_en: 'Computer & Office', category_mr: 'संगणक आणि कार्यालयीन कौशल्ये', name_en: 'Basic Computer (MS-CIT)', name_mr: 'मूलभूत संगणक ज्ञान (MS-CIT)', display_order: 500 },
  { id: 'skill_ms_word', category: 'computer', category_en: 'Computer & Office', category_mr: 'संगणक आणि कार्यालयीन कौशल्ये', name_en: 'MS Word', name_mr: 'एमएस वर्ड (MS Word)', display_order: 510 },
  { id: 'skill_excel', category: 'computer', category_en: 'Computer & Office', category_mr: 'संगणक आणि कार्यालयीन कौशल्ये', name_en: 'Excel (Spreadsheet)', name_mr: 'एक्सेल (Excel)', display_order: 520 },
  { id: 'skill_adv_excel', category: 'computer', category_en: 'Computer & Office', category_mr: 'संगणक आणि कार्यालयीन कौशल्ये', name_en: 'Advanced Excel', name_mr: 'ॲडव्हान्स एक्सेल (Pivot, VLOOKUP)', display_order: 530 },
  { id: 'skill_data_entry', category: 'computer', category_en: 'Computer & Office', category_mr: 'संगणक आणि कार्यालयीन कौशल्ये', name_en: 'Data Entry & Typing', name_mr: 'डेटा एंट्री आणि टायपिंग', display_order: 540 },
  { id: 'skill_email_internet', category: 'computer', category_en: 'Computer & Office', category_mr: 'संगणक आणि कार्यालयीन कौशल्ये', name_en: 'Email & Internet', name_mr: 'ईमेल आणि इंटरनेट वापर', display_order: 550 },
  { id: 'skill_tally', category: 'computer', category_en: 'Computer & Office', category_mr: 'संगणक आणि कार्यालयीन कौशल्ये', name_en: 'Tally Prime / ERP 9', name_mr: 'टॅली (Tally)', display_order: 560 },
  { id: 'skill_accounting_sw', category: 'computer', category_en: 'Computer & Office', category_mr: 'संगणक आणि कार्यालयीन कौशल्ये', name_en: 'Accounting Software', name_mr: 'लेखा सॉफ्टवेअर', display_order: 570 },
  { id: 'skill_erp_sap', category: 'computer', category_en: 'Computer & Office', category_mr: 'संगणक आणि कार्यालयीन कौशल्ये', name_en: 'ERP / SAP', name_mr: 'ईआरपी / सॅप (SAP)', display_order: 580 },
  { id: 'skill_autocad', category: 'computer', category_en: 'Computer & Office', category_mr: 'संगणक आणि कार्यालयीन कौशल्ये', name_en: 'AutoCAD (2D/3D)', name_mr: 'ऑटोकॅड (AutoCAD)', display_order: 590 },
  { id: 'skill_solidworks', category: 'computer', category_en: 'Computer & Office', category_mr: 'संगणक आणि कार्यालयीन कौशल्ये', name_en: 'SolidWorks / CAD CAM', name_mr: 'सॉलिडवर्क्स / कॅड कॅम', display_order: 600 },
  { id: 'skill_programming', category: 'computer', category_en: 'Computer & Office', category_mr: 'संगणक आणि कार्यालयीन कौशल्ये', name_en: 'Programming', name_mr: 'संगणक प्रोग्रॅमिंग', display_order: 610 },
  { id: 'skill_it_support', category: 'computer', category_en: 'Computer & Office', category_mr: 'संगणक आणि कार्यालयीन कौशल्ये', name_en: 'IT Hardware & Support', name_mr: 'आयटी हार्डवेअर व सपोर्ट', display_order: 620 },
  { id: 'skill_networking', category: 'computer', category_en: 'Computer & Office', category_mr: 'संगणक आणि कार्यालयीन कौशल्ये', name_en: 'Networking', name_mr: 'नेटवर्किंग', display_order: 630 },

  // Management & Business
  { id: 'skill_team_mgmt', category: 'management', category_en: 'Management & Business', category_mr: 'व्यवस्थापन आणि व्यवसाय', name_en: 'Team Management', name_mr: 'टीम व्यवस्थापन', display_order: 700 },
  { id: 'skill_communication', category: 'management', category_en: 'Management & Business', category_mr: 'व्यवस्थापन आणि व्यवसाय', name_en: 'Communication', name_mr: 'संभाषण कौशल्य', display_order: 710 },
  { id: 'skill_documentation', category: 'management', category_en: 'Management & Business', category_mr: 'व्यवस्थापन आणि व्यवसाय', name_en: 'Documentation & Filing', name_mr: 'दस्तऐवजीकरण व फाईलिंग', display_order: 720 },
  { id: 'skill_project_mgmt', category: 'management', category_en: 'Management & Business', category_mr: 'व्यवस्थापन आणि व्यवसाय', name_en: 'Project Management', name_mr: 'प्रकल्प व्यवस्थापन', display_order: 730 },
  { id: 'skill_quality_mgmt', category: 'management', category_en: 'Management & Business', category_mr: 'व्यवस्थापन आणि व्यवसाय', name_en: 'Quality Management Systems', name_mr: 'गुणवत्ता व्यवस्थापन प्रणाली', display_order: 740 },
  { id: 'skill_vendor_mgmt', category: 'management', category_en: 'Management & Business', category_mr: 'व्यवस्थापन आणि व्यवसाय', name_en: 'Vendor Management', name_mr: 'व्हेंडर व्यवस्थापन', display_order: 750 },
  { id: 'skill_customer_service', category: 'management', category_en: 'Management & Business', category_mr: 'व्यवस्थापन आणि व्यवसाय', name_en: 'Customer Service', name_mr: 'ग्राहक सेवा', display_order: 760 },
  { id: 'skill_sales', category: 'management', category_en: 'Management & Business', category_mr: 'व्यवस्थापन आणि व्यवसाय', name_en: 'Sales & Marketing', name_mr: 'विक्री आणि विपणन', display_order: 770 },
  { id: 'skill_administration', category: 'management', category_en: 'Management & Business', category_mr: 'व्यवस्थापन आणि व्यवसाय', name_en: 'Office Administration', name_mr: 'कार्यालय प्रशासन', display_order: 780 },
  { id: 'skill_other', category: 'other', category_en: 'Other', category_mr: 'इतर', name_en: 'Other Technical Skill', name_mr: 'इतर तांत्रिक कौशल्य', display_order: 999 },
];

export const INDUSTRIES: ReferenceItem[] = [
  { id: 'ind_auto', name_en: 'Automobile and Auto Components', name_mr: 'ऑटोमोबाईल आणि वाहन सुटे भाग उद्योग', display_order: 10 },
  { id: 'ind_general_mfg', name_en: 'General Manufacturing', name_mr: 'सर्वसाधारण उत्पादन व कारखानदारी', display_order: 20 },
  { id: 'ind_heavy_eng', name_en: 'Engineering and Heavy Machinery', name_mr: 'अभियांत्रिकी व अवजड यंत्रसामग्री', display_order: 30 },
  { id: 'ind_electronics', name_en: 'Electronics and Electrical Equipment', name_mr: 'इलेक्ट्रॉनिक्स व विद्युत उपकरणे', display_order: 40 },
  { id: 'ind_pharma', name_en: 'Pharmaceuticals', name_mr: 'औषध निर्माण उद्योग (फार्मास्युटिकल्स)', display_order: 50 },
  { id: 'ind_chemicals', name_en: 'Chemicals and Petrochemicals', name_mr: 'रसायन उद्योग (केमिकल्स)', display_order: 60 },
  { id: 'ind_food_proc', name_en: 'Food Processing', name_mr: 'अन्न प्रक्रिया उद्योग (फूड प्रोसेसिंग)', display_order: 70 },
  { id: 'ind_fmcg', name_en: 'FMCG (Fast Moving Consumer Goods)', name_mr: 'एफएमसीजी (ग्राहकोपयोगी वस्तू)', display_order: 80 },
  { id: 'ind_textiles', name_en: 'Textiles and Garments', name_mr: 'कापड उद्योग आणि गारमेंट्स', display_order: 90 },
  { id: 'ind_plastics', name_en: 'Plastics and Packaging', name_mr: 'प्लॅस्टिक्स आणि पॅकेजिंग', display_order: 100 },
  { id: 'ind_steel_metal', name_en: 'Steel and Metal Processing', name_mr: 'पोलाद आणि धातू प्रक्रिया उद्योग', display_order: 110 },
  { id: 'ind_renew_energy', name_en: 'Renewable Energy (Solar / Wind)', name_mr: 'अपारंपरिक ऊर्जा (सौर/पवन ऊर्जा)', display_order: 120 },
  { id: 'ind_logistics', name_en: 'Logistics and Warehousing', name_mr: 'लॉजिस्टिक्स आणि वेअरहाऊसिंग (गोदामे)', display_order: 130 },
  { id: 'ind_construction', name_en: 'Construction and Infrastructure', name_mr: 'बांधकाम आणि पायाभूत सुविधा', display_order: 140 },
  { id: 'ind_automation', name_en: 'Industrial Automation and Robotics', name_mr: 'इंडस्ट्रियल ऑटोमेशन आणि रोबोटिक्स', display_order: 150 },
  { id: 'ind_it_software', name_en: 'IT and Software Services', name_mr: 'माहिती तंत्रज्ञान (IT) आणि सॉफ्टवेअर', display_order: 160 },
  { id: 'ind_banking_fin', name_en: 'Banking and Finance', name_mr: 'बँकिंग आणि वित्तीय सेवा', display_order: 170 },
  { id: 'ind_retail_sales', name_en: 'Retail and Sales', name_mr: 'किरकोळ विक्री (रिटेल) व सेल्स', display_order: 180 },
  { id: 'ind_facility_mgmt', name_en: 'Facility Management & Services', name_mr: 'सुविधा व्यवस्थापन व सेवा', display_order: 190 },
  { id: 'ind_any_suitable', name_en: 'Any Suitable Industry', name_mr: 'कोणताही योग्य उद्योग', display_order: 200 },
  { id: 'ind_other', name_en: 'Other Industry', name_mr: 'इतर उद्योग', display_order: 210 },
];

export const SALARY_BANDS: ReferenceItem[] = [
  { id: 'below_10k', name_en: 'Below ₹10,000', name_mr: '₹१०,००० पेक्षा कमी', display_order: 10 },
  { id: '10k_15k', name_en: '₹10,000 – ₹15,000', name_mr: '₹१०,००० ते ₹१५,०००', display_order: 20 },
  { id: '15k_20k', name_en: '₹15,000 – ₹20,000', name_mr: '₹१५,००० ते ₹२०,०००', display_order: 30 },
  { id: '20k_30k', name_en: '₹20,000 – ₹30,000', name_mr: '₹२०,००० ते ₹३०,०००', display_order: 40 },
  { id: '30k_50k', name_en: '₹30,000 – ₹50,000', name_mr: '₹३०,००० ते ₹५०,०००', display_order: 50 },
  { id: '50k_75k', name_en: '₹50,000 – ₹75,000', name_mr: '₹५०,००० ते ₹७५,०००', display_order: 60 },
  { id: '75k_100k', name_en: '₹75,000 – ₹1,00,000', name_mr: '₹७५,००० ते ₹१,००,०००', display_order: 70 },
  { id: 'above_100k', name_en: 'Above ₹1,00,000', name_mr: '₹१,००,००० पेक्षा जास्त', display_order: 80 },
  { id: 'negotiable', name_en: 'Negotiable / Standard', name_mr: 'चर्चेनुसार / नियमानुसार', display_order: 90 },
];

export const SHIFT_PREFERENCES: ReferenceItem[] = [
  { id: 'general_shift', name_en: 'General Shift', name_mr: 'जनरल शिफ्ट (दिवस)', display_order: 10 },
  { id: 'day_shift', name_en: 'Day Shift Only', name_mr: 'फक्त दिवसाची शिफ्ट', display_order: 20 },
  { id: 'night_shift', name_en: 'Night Shift', name_mr: 'रात्रीची शिफ्ट', display_order: 30 },
  { id: 'rotational_shift', name_en: 'Rotational Shift', name_mr: 'बदलती शिफ्ट (रोटेशनल)', display_order: 40 },
  { id: 'any_shift', name_en: 'Any Shift', name_mr: 'कोणतीही शिफ्ट चालेल', display_order: 50 },
];

export const EMPLOYMENT_TYPES: ReferenceItem[] = [
  { id: 'permanent', name_en: 'Permanent', name_mr: 'कायमस्वरूपी (Permanent)', display_order: 10 },
  { id: 'contract', name_en: 'Contractual', name_mr: 'कंत्राटी (Contract)', display_order: 20 },
  { id: 'temporary', name_en: 'Temporary', name_mr: 'तात्पुरती (Temporary)', display_order: 30 },
  { id: 'casual', name_en: 'Casual / Daily Wage', name_mr: 'रोजंदारी (Casual)', display_order: 40 },
  { id: 'apprenticeship', name_en: 'Apprenticeship', name_mr: 'शिकाऊ उमेदवारी (Apprenticeship)', display_order: 50 },
  { id: 'internship', name_en: 'Internship', name_mr: 'इंटर्नशिप (Internship)', display_order: 60 },
  { id: 'full_time', name_en: 'Full-Time', name_mr: 'पूर्ण वेळ (Full-Time)', display_order: 70 },
  { id: 'part_time', name_en: 'Part-Time', name_mr: 'अर्धा वेळ (Part-Time)', display_order: 80 },
];

export const JOINING_AVAILABILITY: ReferenceItem[] = [
  { id: 'immediately', name_en: 'Immediately', name_mr: 'त्वरित (आजच/उद्या)', display_order: 10 },
  { id: 'within_7_days', name_en: 'Within 7 Days', name_mr: '७ दिवसांच्या आत', display_order: 20 },
  { id: 'within_15_days', name_en: 'Within 15 Days', name_mr: '१५ दिवसांच्या आत', display_order: 30 },
  { id: 'within_30_days', name_en: 'Within 30 Days', name_mr: '३० दिवसांच्या आत (१ महिना)', display_order: 40 },
  { id: 'within_60_days', name_en: 'Within 60 Days', name_mr: '६० दिवसांच्या आत (२ महिने)', display_order: 50 },
  { id: 'more_than_60_days', name_en: 'More Than 60 Days', name_mr: '६० दिवसांपेक्षा जास्त', display_order: 60 },
];

export const EXPERIENCE_BANDS: ReferenceItem[] = [
  { id: 'no_experience', name_en: 'No Experience / Fresher', name_mr: 'अनुभव नाही (नवोदित)', display_order: 10 },
  { id: 'apprentice_exp', name_en: 'Apprenticeship Experience', name_mr: 'शिकाऊ उमेदवारीचा अनुभव', display_order: 20 },
  { id: 'less_than_1', name_en: 'Less than 1 Year', name_mr: '१ वर्षापेक्षा कमी', display_order: 30 },
  { id: '1_to_2', name_en: '1 – 2 Years', name_mr: '१ ते २ वर्षे', display_order: 40 },
  { id: '3_to_5', name_en: '3 – 5 Years', name_mr: '३ ते ५ वर्षे', display_order: 50 },
  { id: '6_to_10', name_en: '6 – 10 Years', name_mr: '६ ते १० वर्षे', display_order: 60 },
  { id: '11_to_15', name_en: '11 – 15 Years', name_mr: '११ ते १५ वर्षे', display_order: 70 },
  { id: '16_to_20', name_en: '16 – 20 Years', name_mr: '१६ ते २० वर्षे', display_order: 80 },
  { id: 'more_than_20', name_en: 'More than 20 Years', name_mr: '२० वर्षांपेक्षा जास्त', display_order: 90 },
];

export const NOTICE_PERIODS: ReferenceItem[] = [
  { id: 'notice_immediate', name_en: 'Immediate / No Notice', name_mr: 'त्वरित / नोटीस नाही', display_order: 10 },
  { id: 'notice_15_days', name_en: '15 Days', name_mr: '१५ दिवस', display_order: 20 },
  { id: 'notice_30_days', name_en: '30 Days', name_mr: '३० दिवस', display_order: 30 },
  { id: 'notice_60_days', name_en: '60 Days', name_mr: '६० दिवस', display_order: 40 },
  { id: 'notice_90_days', name_en: '90 Days', name_mr: '९० दिवस', display_order: 50 },
];

export const COMPUTER_PROFICIENCY: ReferenceItem[] = [
  { id: 'none', name_en: 'No Computer Knowledge', name_mr: 'संगणक माहिती नाही', display_order: 10 },
  { id: 'basic', name_en: 'Basic (MS-CIT / Typing)', name_mr: 'मूलभूत (MS-CIT / टायपिंग)', display_order: 20 },
  { id: 'intermediate', name_en: 'Intermediate (MS Office / Tally / Email)', name_mr: 'मध्यम (MS Office / टॅली / व्यावसायिक कामे)', display_order: 30 },
  { id: 'advanced', name_en: 'Advanced (Software / Coding / ERP / CAD)', name_mr: 'प्रगत (सॉफ्टवेअर / कोडिंग / ERP / CAD)', display_order: 40 },
];

export const FOLLOW_UP_STATUS_OPTIONS: { id: string; name_en: string; name_mr: string; color: string }[] = [
  { id: 'new', name_en: 'New', name_mr: 'नवीन नोंदणी', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  { id: 'contacted', name_en: 'Contacted', name_mr: 'संपर्क झाला', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  { id: 'referred', name_en: 'Referred', name_mr: 'कंपनीला पाठवले', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  { id: 'interview', name_en: 'Interview', name_mr: 'मुलाखत सुरू', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { id: 'selected', name_en: 'Selected', name_mr: 'निवड झाली', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  { id: 'placed', name_en: 'Placed', name_mr: 'नोकरी मिळाली (रुजू)', color: 'bg-green-100 text-green-800 border-green-200' },
  { id: 'not_proceeding', name_en: 'Not Proceeding', name_mr: 'प्रक्रिया थांबवली', color: 'bg-slate-100 text-slate-800 border-slate-200' },
];

// Helper functions for translation lookup
export function getItemLabel(items: ReferenceItem[], id?: string | null, lang: 'mr' | 'en' = 'mr'): string {
  if (!id) return '—';
  const item = items.find(i => i.id === id);
  if (!item) return id;
  return lang === 'mr' ? item.name_mr : item.name_en;
}

export function getItemsLabels(items: ReferenceItem[], ids?: string[] | null, lang: 'mr' | 'en' = 'mr'): string[] {
  if (!ids || ids.length === 0) return [];
  return ids.map(id => getItemLabel(items, id, lang));
}
