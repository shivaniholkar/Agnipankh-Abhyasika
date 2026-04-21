import { useState, useRef } from 'react';

function Booking() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [paymentPreview, setPaymentPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrModalAnimation, setQrModalAnimation] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const fileInputRef = useRef(null);
  const paymentInputRef = useRef(null);
  const formRef = useRef(null);

  const mapSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242117.68082829823!2d73.72287834726642!3d18.524598710498977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1smr!2sin!4v1700000000000!5m2!1smr!2sin';

  // ⚠️ Replace with YOUR deployed Google Apps Script Web App URL
  const SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbzH4vSxK7wMZzq0CbyT9iPC-G32Q0aM5kCF_yLWH60zBxsx6ellsYKbwcrwJ1UNoU39/exec';

  // ============================================================
  // FILE HANDLERS
  // ============================================================
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('⚠️ फाइल आकार 5MB पेक्षा कमी असावा!');
      e.target.value = '';
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('⚠️ फक्त JPG, PNG किंवा PDF फाइल अपलोड करा!');
      e.target.value = '';
      return;
    }

    setSelectedFile(file);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setFilePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handlePaymentScreenshot = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('⚠️ फाइल आकार 5MB पेक्षा कमी असावा!');
      e.target.value = '';
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('⚠️ फक्त इमेज फाइल अपलोड करा (JPG, PNG)!');
      e.target.value = '';
      return;
    }

    setPaymentScreenshot(file);
    const reader = new FileReader();
    reader.onloadend = () => setPaymentPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removePaymentScreenshot = () => {
    setPaymentScreenshot(null);
    setPaymentPreview(null);
    if (paymentInputRef.current) paymentInputRef.current.value = '';
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  // ============================================================
  // CLIPBOARD COPY
  // ============================================================
  const copyUPI = async () => {
    try {
      await navigator.clipboard.writeText('shantiniketan@upi');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = 'shantiniketan@upi';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // ============================================================
  // QR MODAL
  // ============================================================
  const openQRModal = () => {
    setShowQRModal(true);
    setTimeout(() => setQrModalAnimation(true), 100);
  };

  const closeQRModal = () => {
    setQrModalAnimation(false);
    setTimeout(() => setShowQRModal(false), 300);
  };

  // ============================================================
  // FORM RESET
  // ============================================================
  const resetForm = () => {
    if (formRef.current) formRef.current.reset();
    setSelectedFile(null);
    setFilePreview(null);
    setPaymentScreenshot(null);
    setPaymentPreview(null);
    setSelectedRoomType('');
    setUploadProgress(0);
    setUploadStatus('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (paymentInputRef.current) paymentInputRef.current.value = '';
  };

  // ============================================================
  // SUBMIT HANDLER — Sends data + files to Google Apps Script
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!paymentScreenshot) {
      alert('⚠️ कृपया पेमेंट स्क्रीनशॉट अपलोड करा!');
      return;
    }

    if (!selectedRoomType) {
      alert('⚠️ कृपया कक्ष प्रकार निवडा!');
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);
    setUploadStatus('फॉर्म डेटा तयार करत आहे...');

    const formData = new FormData(e.target);

    // Build the data object matching Google Apps Script fields
    const data = {
      fullName: formData.get('fullName')?.trim() || '',
      phone: formData.get('phone')?.trim() || '',
      email: formData.get('email')?.trim() || '',
      roomType: selectedRoomType || formData.get('roomType') || '',
      shift: formData.get('shift') || '',
      purpose: formData.get('purpose')?.trim() || '',
      message: formData.get('message')?.trim() || '',
      // File fields — populated below
      fileName: '',
      fileData: '',
      fileType: '',
      paymentFileName: '',
      paymentFileData: '',
      paymentFileType: '',
    };

    // Process ID document file
    if (selectedFile) {
      try {
        setUploadProgress(10);
        setUploadStatus('ओळखपत्र प्रोसेस करत आहे...');

        const base64Data = await fileToBase64(selectedFile);
        data.fileName = selectedFile.name;
        data.fileData = base64Data;
        data.fileType = selectedFile.type;

        setUploadProgress(30);
      } catch (error) {
        console.error('ID file processing error:', error);
        setUploadStatus('ओळखपत्र प्रोसेसिंग अयशस्वी, पुढे जात आहे...');
      }
    } else {
      setUploadProgress(30);
    }

    // Process payment screenshot
    if (paymentScreenshot) {
      try {
        setUploadProgress(40);
        setUploadStatus('पेमेंट स्क्रीनशॉट प्रोसेस करत आहे...');

        const base64Data = await fileToBase64(paymentScreenshot);
        data.paymentFileName = paymentScreenshot.name;
        data.paymentFileData = base64Data;
        data.paymentFileType = paymentScreenshot.type;

        setUploadProgress(60);
      } catch (error) {
        console.error('Payment screenshot processing error:', error);
        alert('❌ पेमेंट स्क्रीनशॉट प्रोसेस करता आली नाही. कृपया पुन्हा प्रयत्न करा.');
        setIsSubmitting(false);
        setUploadProgress(0);
        setUploadStatus('');
        return;
      }
    }

    // Send to Google Apps Script
    try {
      setUploadProgress(70);
      setUploadStatus('डेटा स्टोर होत आहे...');

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Apps Script
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // With mode: 'no-cors', response is opaque (status 0)
      // We assume success if no error was thrown
      setUploadProgress(90);
      setUploadStatus('डेटा सेव्ह करत आहे...');

      // Small delay to show completion
      await new Promise((resolve) => setTimeout(resolve, 500));

      setUploadProgress(100);
      setUploadStatus('पूर्ण झाले! ✅');

      // Show success modal
      await new Promise((resolve) => setTimeout(resolve, 300));
      setShowModal(true);
      setTimeout(() => setModalAnimation(true), 100);

      // Reset form
      resetForm();
    } catch (error) {
      console.error('Submission error:', error);
      alert(
        '❌ नोंदणी सबमिट करताना त्रुटी आली.\n\nकृपया तुमचे इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा.\n\nसमस्या कायम राहिल्यास WhatsApp वर संपर्क करा.'
      );
    } finally {
      setIsSubmitting(false);
      // Delay clearing progress so user sees 100%
      setTimeout(() => {
        setUploadProgress(0);
        setUploadStatus('');
      }, 1000);
    }
  };

  // ============================================================
  // MODAL CLOSE
  // ============================================================
  const closeModal = () => {
    setModalAnimation(false);
    setTimeout(() => setShowModal(false), 300);
  };

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <>
      {/* ==================== SUCCESS MODAL ==================== */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/40 backdrop-blur-sm transition-opacity duration-300"
          style={{ opacity: modalAnimation ? 1 : 0 }}
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-md w-full border border-dark-200 shadow-2xl transition-all duration-300"
            style={{
              transform: modalAnimation
                ? 'scale(1) translateY(0)'
                : 'scale(0.9) translateY(20px)',
              opacity: modalAnimation ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-green-600 text-3xl"></i>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-dark-900 text-center mb-3">
              नोंदणी यशस्वी! 🎉
            </h3>

            <p className="text-dark-600 text-center mb-4">
              तुमची नोंदणी यशस्वीरित्या सबमिट झाली आहे. तुमचा डेटा आणि फाइल्स सुरक्षितपणे सेव्ह झाल्या आहेत.
            </p>

            <div className="border-t border-dark-200 my-4"></div>

            <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-4">
              <div className="flex items-start space-x-3">
                <i className="fas fa-info-circle text-primary-600 mt-1"></i>
                <p className="text-sm text-dark-700">
                  पेमेंट व्हेरिफाय झाल्यावर{' '}
                  <span className="text-primary-700 font-semibold">24 तासांच्या आत</span>{' '}
                  कन्फर्मेशन मिळेल.
                </p>
              </div>
            </div>

            {/* What happens next */}
            <div className="bg-dark-50 border border-dark-200 rounded-xl p-4 mb-6">
              <h4 className="text-dark-900 font-bold text-sm mb-2">
                <i className="fas fa-list-ol mr-2 text-primary-600"></i>पुढे काय होईल?
              </h4>
              <div className="space-y-2 text-xs text-dark-600">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-check text-green-600 text-[8px]"></i>
                  </span>
                  <span>नोंदणी फॉर्म सबमिट झाला</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-clock text-amber-600 text-[8px]"></i>
                  </span>
                  <span>पेमेंट व्हेरिफिकेशन (24 तास)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone text-primary-600 text-[8px]"></i>
                  </span>
                  <span>फोन/WhatsApp वर कन्फर्मेशन</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={closeModal}
                className="flex-1 bg-gradient-to-r from-primary-700 to-primary-600 text-white py-3 px-6 rounded-xl font-bold hover:from-primary-800 hover:to-primary-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-primary-600/20"
              >
                <i className="fas fa-thumbs-up"></i>
                <span>ठीक आहे</span>
              </button>
              <a
                href="https://wa.me/919876543210?text=नमस्कार! मी नुकतीच नोंदणी केली आहे. कृपया कन्फर्म करा."
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-green-50 border border-green-200 text-green-700 py-3 px-6 rounded-xl font-bold hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <i className="fab fa-whatsapp"></i>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ==================== QR CODE MODAL ==================== */}
      {showQRModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/40 backdrop-blur-sm transition-opacity duration-300"
          style={{ opacity: qrModalAnimation ? 1 : 0 }}
          onClick={closeQRModal}
        >
          <div
            className="bg-white rounded-3xl p-8 max-w-sm w-full border border-dark-200 shadow-2xl transition-all duration-300"
            style={{
              transform: qrModalAnimation
                ? 'scale(1) translateY(0)'
                : 'scale(0.9) translateY(20px)',
              opacity: qrModalAnimation ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* QR Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-qrcode text-primary-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-dark-900">QR कोड स्कॅन करा</h3>
              <p className="text-dark-500 text-sm mt-1">GPay / PhonePe / Paytm वापरा</p>
            </div>

            {/* QR Code Image */}
            <div className="bg-white border-2 border-dark-200 rounded-2xl p-4 mb-4 flex items-center justify-center">
              <div className="w-56 h-56 rounded-xl overflow-hidden">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=shantiniketan@upi&pn=ShantiniketanStudyRoom&am=999&cu=INR"
                  alt="Payment QR Code"
                  className="w-full h-full object-contain p-2"
                />
              </div>
            </div>

            {/* UPI ID */}
            <div className="bg-dark-50 rounded-xl p-3 mb-4 border border-dark-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-dark-400 uppercase tracking-wide font-medium">
                    UPI ID
                  </div>
                  <div className="text-dark-900 font-bold text-sm">shantiniketan@upi</div>
                </div>
                <button
                  type="button"
                  onClick={copyUPI}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                    copySuccess
                      ? 'bg-green-100 text-green-700'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  <i className={`fas ${copySuccess ? 'fa-check' : 'fa-copy'} mr-1`}></i>
                  {copySuccess ? 'कॉपी झाली!' : 'कॉपी'}
                </button>
              </div>
            </div>

            {/* Amount Info */}
            {selectedRoomType && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-4">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-rupee-sign text-green-600"></i>
                  <span className="text-green-800 font-semibold text-sm">{selectedRoomType}</span>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6">
              <div className="flex items-start space-x-2">
                <i className="fas fa-exclamation-triangle text-amber-600 mt-0.5 text-sm"></i>
                <p className="text-amber-800 text-xs leading-relaxed">
                  पेमेंट केल्यानंतर{' '}
                  <span className="font-bold">स्क्रीनशॉट</span> घ्या आणि खालील फॉर्ममध्ये
                  अपलोड करा.
                </p>
              </div>
            </div>

            <button
              onClick={closeQRModal}
              className="w-full bg-gradient-to-r from-primary-700 to-primary-600 text-white py-3 rounded-xl font-bold hover:from-primary-800 hover:to-primary-700 transition-all duration-300 shadow-lg shadow-primary-600/20"
            >
              <i className="fas fa-check mr-2"></i>पेमेंट केले, पुढे जा
            </button>
          </div>
        </div>
      )}

      {/* ==================== BOOKING SECTION ==================== */}
      <section
        id="booking"
        className="py-24 relative overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #faf9f8 0%, #e9ecef 30%, #f1f3f5 60%, #f8f9fa 100%)',
        }}
      >
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-200/30 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 px-4 py-2 rounded-full mb-6">
              <i className="fas fa-calendar-check text-green-600"></i>
              <span className="text-green-700 text-sm font-semibold">आत्ताच नोंदणी करा</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-dark-900 mb-6">
              तुमची जागा <span className="gradient-gold">आरक्षित करा</span>
            </h2>
            <p className="text-dark-600 text-lg">
              खालील फॉर्म भरा, पेमेंट करा आणि तुमचे स्थान कन्फर्म करा!
            </p>
          </div>

          {/* ============ FORM + SIDEBAR ============ */}
          <div className="grid lg:grid-cols-6 gap-12">
            {/* Form */}
            <div className="lg:col-span-4 glass-light rounded-3xl p-8 lg:p-12 shadow-xl shadow-dark-900/5">
              <h3 className="text-2xl font-bold text-dark-900 mb-8">
                <i className="fas fa-edit text-primary-600 mr-2"></i>नोंदणी फॉर्म
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-dark-700 text-sm font-medium mb-2">
                      पूर्ण नाव <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      minLength={2}
                      maxLength={100}
                      placeholder="तुमचे पूर्ण नाव"
                      className="w-full bg-white border border-dark-300 text-dark-900 px-5 py-4 rounded-xl placeholder-dark-400 focus:border-primary-500 focus:outline-none transition-all shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-700 text-sm font-medium mb-2">
                      मोबाईल नंबर <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      pattern="[0-9+\s\-]{10,15}"
                      title="कृपया वैध मोबाईल नंबर टाका (10-15 अंक)"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-white border border-dark-300 text-dark-900 px-5 py-4 rounded-xl placeholder-dark-400 focus:border-primary-500 focus:outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Email & Room Type */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-dark-700 text-sm font-medium mb-2">ईमेल</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="example@gmail.com"
                      className="w-full bg-white border border-dark-300 text-dark-900 px-5 py-4 rounded-xl placeholder-dark-400 focus:border-primary-500 focus:outline-none transition-all shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-700 text-sm font-medium mb-2">
                      सीट निवडा <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="roomType"
                      required
                      value={selectedRoomType}
                      onChange={(e) => setSelectedRoomType(e.target.value)}
                      className="w-full bg-white border border-dark-300 text-dark-900 px-5 py-4 rounded-xl focus:border-primary-500 focus:outline-none transition-all appearance-none cursor-pointer shadow-sm"
                    >
                      <option value="">सीट निवडा</option>
                      <option value="साधारण - ₹999/महिना">साधारण - ₹999/महिना</option>
                      <option value="प्रीमियम - ₹1799/महिना">प्रीमियम - ₹1799/महिना</option>
                      <option value="एक्झिक्युटिव्ह - ₹2999/महिना">
                        एक्झिक्युटिव्ह - ₹2999/महिना
                      </option>
                      <option value="दैनिक पास - ₹99/दिवस">दैनिक पास - ₹99/दिवस</option>
                    </select>
                  </div>
                </div>

                {/* Shift & Purpose */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-dark-700 text-sm font-medium mb-2">
                      शिफ्ट निवडा <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="shift"
                      required
                      className="w-full bg-white border border-dark-300 text-dark-900 px-5 py-4 rounded-xl focus:border-primary-500 focus:outline-none transition-all appearance-none cursor-pointer shadow-sm"
                    >
                      <option value="">शिफ्ट निवडा</option>
                      <option value="सकाळची पाळी (6AM-2PM)">सकाळची शिफ्ट (6AM-2PM)</option>
                      <option value="दुपारची पाळी (2PM-10PM)">दुपारची शिफ्ट (2PM-10PM)</option>
                      <option value="पूर्ण दिवस (24/7)">पूर्ण दिवस (24/7)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-dark-700 text-sm font-medium mb-2">
                      अभ्यासाचा उद्देश
                    </label>
                    <input
                      type="text"
                      name="purpose"
                      maxLength={200}
                      placeholder="उदा: MPSC, UPSC, JEE..."
                      className="w-full bg-white border border-dark-300 text-dark-900 px-5 py-4 rounded-xl placeholder-dark-400 focus:border-primary-500 focus:outline-none transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* ============ PAYMENT SECTION ============ */}
                <div className="border-t border-dark-200 pt-6">
                  <h4 className="text-lg font-bold text-dark-900 mb-4 flex items-center">
                    <i className="fas fa-credit-card text-primary-600 mr-2"></i>
                    पेमेंट माहिती
                  </h4>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* QR Code Card */}
                    <div className="bg-white border border-dark-200 rounded-2xl p-5 shadow-sm">
                      <div className="text-center">
                        <div className="text-dark-700 font-semibold text-sm mb-3">
                          <i className="fas fa-qrcode text-primary-600 mr-1"></i> QR कोड स्कॅन करा
                        </div>

                        {/* QR Image */}
                        <div
                          className="w-40 h-40 mx-auto bg-white border-2 border-dark-200 rounded-xl overflow-hidden mb-3 cursor-pointer hover:border-primary-400 transition-colors"
                          onClick={openQRModal}
                        >
                          <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=shantiniketan@upi&pn=ShantiniketanStudyRoom&cu=INR"
                            alt="Payment QR"
                            className="w-full h-full object-contain p-1"
                          />
                        </div>

                        {/* UPI ID */}
                        <div className="bg-dark-50 rounded-lg px-3 py-2 mb-3 border border-dark-200">
                          <div className="text-[10px] text-dark-400 uppercase tracking-wider mb-0.5">
                            UPI ID
                          </div>
                          <div className="text-dark-900 font-bold text-sm flex items-center justify-center space-x-2">
                            <span>shantiniketan@upi</span>
                            <button
                              type="button"
                              onClick={copyUPI}
                              className={`transition-colors ${
                                copySuccess
                                  ? 'text-green-600'
                                  : 'text-primary-500 hover:text-primary-700'
                              }`}
                            >
                              <i className={`fas ${copySuccess ? 'fa-check' : 'fa-copy'} text-xs`}></i>
                            </button>
                          </div>
                        </div>

                        {/* Amount based on room type */}
                        {selectedRoomType && (
                          <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-3">
                            <div className="text-green-700 font-bold text-sm">
                              <i className="fas fa-rupee-sign mr-1"></i>
                              {selectedRoomType}
                            </div>
                          </div>
                        )}

                        {/* <button
                          type="button"
                          onClick={openQRModal}
                          className="text-primary-600 text-xs font-bold hover:text-primary-800 transition-colors"
                        >
                          <i className="fas fa-expand mr-1"></i>मोठा पहा
                        </button> */}
                      </div>
                    </div>

                    {/* Payment Screenshot Upload */}
                    <div>
                      <label className="block text-dark-700 text-sm font-medium mb-2">
                        <i className="fas fa-camera mr-2 text-green-600"></i>
                        पेमेंट स्क्रीनशॉट अपलोड करा <span className="text-red-500">*</span>
                      </label>

                      {!paymentScreenshot ? (
                        <label className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-green-300 rounded-xl cursor-pointer bg-green-50/50 hover:bg-green-50 hover:border-green-400 transition-all duration-300">
                          <div className="flex flex-col items-center justify-center py-5">
                            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-3">
                              <i className="fas fa-cloud-upload-alt text-green-600 text-2xl"></i>
                            </div>
                            <p className="mb-2 text-sm text-dark-600">
                              <span className="font-semibold text-green-600">क्लिक करा</span> किंवा
                              ड्रॅग करा
                            </p>
                            <p className="text-xs text-dark-400">पेमेंट केल्यानंतरचा स्क्रीनशॉट</p>
                            <p className="text-[10px] text-dark-400 mt-1">PNG, JPG (Max. 5MB)</p>
                          </div>
                          <input
                            ref={paymentInputRef}
                            type="file"
                            className="hidden"
                            accept=".jpg,.jpeg,.png"
                            onChange={handlePaymentScreenshot}
                          />
                        </label>
                      ) : (
                        <div className="relative border border-green-200 rounded-xl p-3 bg-white shadow-sm h-52 flex items-center">
                          <div className="flex items-center space-x-3 w-full">
                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-dark-200 shadow-sm">
                              <img
                                src={paymentPreview}
                                alt="Payment Screenshot"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-dark-900 font-medium truncate text-sm">
                                {paymentScreenshot.name}
                              </p>
                              <p className="text-dark-500 text-xs">
                                {(paymentScreenshot.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                              <div className="flex items-center mt-1.5">
                                <i className="fas fa-check-circle text-green-500 text-sm mr-2"></i>
                                <span className="text-green-600 text-xs font-medium">
                                  अपलोड तयार
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={removePaymentScreenshot}
                              className="w-9 h-9 bg-red-50 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-300 group border border-red-200 hover:border-red-500 flex-shrink-0"
                            >
                              <i className="fas fa-times text-red-500 group-hover:text-white text-sm"></i>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Payment Help */}
                      <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-2.5">
                        <div className="flex items-start space-x-2">
                          <i className="fas fa-lightbulb text-amber-500 mt-0.5 text-xs"></i>
                          <p className="text-amber-800 text-[11px] leading-relaxed">
                            GPay, PhonePe, Paytm किंवा बँक अ‍ॅप वरून पेमेंट करा. यशस्वी
                            पेमेंटचा <span className="font-bold">स्क्रीनशॉट</span> अपलोड करा.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ID File Upload */}
                <div>
                  <label className="block text-dark-700 text-sm font-medium mb-2">
                    <i className="fas fa-id-card mr-2 text-primary-600"></i>ओळखपत्र अपलोड करा
                    (आधार/पॅन कार्ड)
                  </label>
                  <div className="relative">
                    {!selectedFile ? (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-dark-300 rounded-xl cursor-pointer bg-dark-50 hover:bg-primary-50 hover:border-primary-400 transition-all duration-300">
                        <div className="flex flex-col items-center justify-center py-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-2">
                            <i className="fas fa-cloud-upload-alt text-primary-600 text-xl"></i>
                          </div>
                          <p className="mb-1 text-sm text-dark-600">
                            <span className="font-semibold text-primary-600">क्लिक करा</span>{' '}
                            किंवा ड्रॅग करा
                          </p>
                          <p className="text-xs text-dark-500">PNG, JPG किंवा PDF (Max. 5MB)</p>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={handleFileChange}
                        />
                      </label>
                    ) : (
                      <div className="relative border border-dark-200 rounded-xl p-4 bg-white shadow-sm">
                        <div className="flex items-center space-x-4">
                          {filePreview ? (
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-dark-200 shadow-sm">
                              <img
                                src={filePreview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 border border-red-100">
                              <i className="fas fa-file-pdf text-red-500 text-2xl"></i>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-dark-900 font-medium truncate text-sm">
                              {selectedFile.name}
                            </p>
                            <p className="text-dark-500 text-xs">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <div className="flex items-center mt-1">
                              <i className="fas fa-check-circle text-green-500 text-xs mr-1.5"></i>
                              <span className="text-green-600 text-xs font-medium">तयार आहे</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="w-9 h-9 bg-red-50 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-300 group border border-red-200 hover:border-red-500"
                          >
                            <i className="fas fa-times text-red-500 group-hover:text-white text-sm"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-dark-700 text-sm font-medium mb-2">
                    अतिरिक्त संदेश
                  </label>
                  <textarea
                    name="message"
                    rows="2"
                    maxLength={500}
                    placeholder="काही विशेष गरज असल्यास इथे लिहा..."
                    className="w-full bg-white border border-dark-300 text-dark-900 px-5 py-4 rounded-xl placeholder-dark-400 focus:border-primary-500 focus:outline-none transition-all resize-none shadow-sm"
                  ></textarea>
                </div>

                {/* Progress Bar */}
                {isSubmitting && uploadProgress > 0 && (
                  <div className="space-y-2 animate-fade-in">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-dark-600 font-medium flex items-center space-x-2">
                        <i className="fas fa-spinner fa-spin text-primary-500"></i>
                        <span>{uploadStatus || 'प्रोसेसिंग...'}</span>
                      </span>
                      <span className="text-primary-600 font-bold">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-dark-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${uploadProgress}%`,
                          background:
                            uploadProgress === 100
                              ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                              : 'linear-gradient(90deg, var(--color-primary-500), var(--color-primary-600))',
                        }}
                      ></div>
                    </div>
                    {/* Step indicators */}
                    <div className="flex justify-between text-[10px] text-dark-400 px-1">
                      <span className={uploadProgress >= 10 ? 'text-primary-600 font-medium' : ''}>
                        फॉर्म
                      </span>
                      <span className={uploadProgress >= 30 ? 'text-primary-600 font-medium' : ''}>
                        ओळखपत्र
                      </span>
                      <span className={uploadProgress >= 60 ? 'text-primary-600 font-medium' : ''}>
                        पेमेंट
                      </span>
                      <span className={uploadProgress >= 85 ? 'text-primary-600 font-medium' : ''}>
                        सबमिट
                      </span>
                      <span className={uploadProgress >= 100 ? 'text-green-600 font-bold' : ''}>
                        पूर्ण ✓
                      </span>
                    </div>
                  </div>
                )}

                {/* Summary Before Submit 
                {selectedRoomType && paymentScreenshot && !isSubmitting && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h5 className="text-green-800 font-bold text-sm mb-3 flex items-center">
                      <i className="fas fa-clipboard-check mr-2"></i>नोंदणी सारांश
                    </h5>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-dark-500">कक्ष प्रकार:</span>
                        <span className="text-dark-900 font-bold">{selectedRoomType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark-500">पेमेंट स्क्रीनशॉट:</span>
                        <span className="text-green-600 font-bold">
                          <i className="fas fa-check-circle mr-1"></i>अपलोड
                        </span>
                      </div>
                      {selectedFile && (
                        <div className="flex justify-between">
                          <span className="text-dark-500">ओळखपत्र:</span>
                          <span className="text-green-600 font-bold">
                            <i className="fas fa-check-circle mr-1"></i>अपलोड
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
            */}
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-premium w-full bg-gradient-to-r from-primary-700 to-primary-600 text-white py-4 rounded-xl font-bold text-lg hover:from-primary-800 hover:to-primary-700 transition-all duration-300 shadow-xl shadow-primary-600/25 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span>
                        {uploadProgress < 30
                          ? 'डेटा तयार करत आहे...'
                          : uploadProgress < 60
                          ? 'फाइल्स अपलोड करत आहे...'
                          : uploadProgress < 90
                          ? 'डेटा सेव्ह करत आहे...'
                          : 'पूर्ण होत आहे...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      <span>नोंदणी सबमिट करा</span>
                    </>
                  )}
                </button>

                {/* Security Note */}
                <p className="text-center text-dark-400 text-[11px] flex items-center justify-center space-x-1">
                  <i className="fas fa-lock text-green-500"></i>
                  <span>तुमचा डेटा सुरक्षित आहे.</span>
                </p>
              </form>
            </div>

            {/* ============ RIGHT SIDEBAR ============ */}
            <div id="contact" className="lg:col-span-2 space-y-6">
              {/* Contact Info */}
              <div className="glass-light rounded-3xl p-8 shadow-xl shadow-dark-900/5">
                <h3 className="text-2xl font-bold text-dark-900 mb-6">
                  <i className="fas fa-address-card text-primary-600 mr-2"></i>संपर्क माहिती
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <i className="fas fa-map-marker-alt text-primary-600 text-xl"></i>
                    </div>
                    <div>
                      <div className="text-dark-900 font-bold">पत्ता</div>
                      <div className="text-dark-600 mt-1">
                        शिवाजी रोड, स्टेशन जवळ,
                        <br />
                        पुणे - 411001, महाराष्ट्र
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <i className="fas fa-phone-alt text-green-600 text-xl"></i>
                    </div>
                    <div>
                      <div className="text-dark-900 font-bold">फोन नंबर</div>
                      <div className="text-dark-600 mt-1">
                        <a href="tel:+919876543210" className="hover:text-primary-600 transition-colors">
                          +91 98765 43210
                        </a>
                        <br />
                        <a href="tel:+918765432109" className="hover:text-primary-600 transition-colors">
                          +91 87654 32109
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <i className="fas fa-envelope text-orange-600 text-xl"></i>
                    </div>
                    <div>
                      <div className="text-dark-900 font-bold">ईमेल</div>
                      <div className="text-dark-600 mt-1">
                        <a
                          href="mailto:info@shantiniketan.com"
                          className="hover:text-primary-600 transition-colors"
                        >
                          info@shantiniketan.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="glass-light rounded-3xl p-8 shadow-xl shadow-dark-900/5">
                <h3 className="text-xl font-bold text-dark-900 mb-4">
                  <i className="fas fa-shield-alt text-green-600 mr-2"></i>पेमेंट पद्धती
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      name: 'Google Pay',
                      icon: 'fab fa-google-pay',
                      color: 'text-blue-600 bg-blue-50',
                    },
                    {
                      name: 'PhonePe',
                      icon: 'fas fa-mobile-alt',
                      color: 'text-purple-600 bg-purple-50',
                    },
                    {
                      name: 'Paytm',
                      icon: 'fas fa-wallet',
                      color: 'text-cyan-600 bg-cyan-50',
                    },
                    {
                      name: 'Bank Transfer',
                      icon: 'fas fa-university',
                      color: 'text-dark-600 bg-dark-100',
                    },
                  ].map((method, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-dark-50 transition-colors"
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center ${method.color}`}
                      >
                        <i className={method.icon}></i>
                      </div>
                      <span className="text-dark-700 font-medium text-sm">{method.name}</span>
                      <i className="fas fa-check-circle text-green-500 text-xs ml-auto"></i>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="glass-light rounded-3xl p-8 shadow-xl shadow-dark-900/5">
                <h3 className="text-xl font-bold text-dark-900 mb-4">सोशल मीडिया</h3>
                <div className="grid grid-cols-4 gap-3">
                  <a
                    href="#"
                    className="w-full h-14 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 group shadow-sm"
                  >
                    <i className="fab fa-facebook-f text-blue-600 text-xl group-hover:text-white"></i>
                  </a>
                  <a
                    href="#"
                    className="w-full h-14 bg-pink-50 border border-pink-100 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 hover:border-pink-500 transition-all duration-300 group shadow-sm"
                  >
                    <i className="fab fa-instagram text-pink-600 text-xl group-hover:text-white"></i>
                  </a>
                  <a
                    href="#"
                    className="w-full h-14 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center hover:bg-green-600 hover:border-green-600 transition-all duration-300 group shadow-sm"
                  >
                    <i className="fab fa-whatsapp text-green-600 text-xl group-hover:text-white"></i>
                  </a>
                  <a
                    href="#"
                    className="w-full h-14 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 group shadow-sm"
                  >
                    <i className="fab fa-youtube text-red-600 text-xl group-hover:text-white"></i>
                  </a>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919876543210?text=नमस्कार! मला अभ्यासिकेबद्दल माहिती हवी आहे."
                target="_blank"
                rel="noreferrer"
                className="block glass-light rounded-3xl p-6 hover:bg-green-50 transition-all duration-300 border border-green-200 group shadow-xl shadow-dark-900/5"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                    <i className="fab fa-whatsapp text-white text-2xl"></i>
                  </div>
                  <div className="flex-1">
                    <div className="text-dark-900 font-bold text-lg group-hover:text-green-700 transition-colors">
                      WhatsApp वर संपर्क करा
                    </div>
                    <div className="text-dark-500 text-sm">त्वरित उत्तर मिळवा</div>
                  </div>
                  <i className="fas fa-arrow-right text-green-600 group-hover:translate-x-2 transition-transform"></i>
                </div>
              </a>

              {/* Google Map */}
              <div className="glass-light rounded-3xl overflow-hidden border border-dark-200 shadow-xl shadow-dark-900/5">
                <div className="px-6 py-4 border-b border-dark-200 flex items-center space-x-3 bg-white/80">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-primary-600"></i>
                  </div>
                  <div>
                    <div className="text-dark-900 font-bold text-sm">आमचे स्थान</div>
                    <div className="text-dark-500 text-xs">Google Maps वर पहा</div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Pune,Maharashtra"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto text-xs text-primary-600 hover:text-primary-800 transition-colors flex items-center space-x-1 font-medium"
                  >
                    <span>मोठे पहा</span>
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
                <div className="relative">
                  <iframe
                    src={mapSrc}
                    width="100%"
                    height="150"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="अग्निपंख अभ्यासिका - स्थान"
                    className="w-full"
                  ></iframe>
                  <a
                    href="https://maps.google.com/?q=Pune,Maharashtra"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-3 right-3 bg-white text-dark-900 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg border border-dark-200 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300 flex items-center space-x-1"
                  >
                    <i className="fas fa-directions"></i>
                    <span>दिशा मिळवा</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Booking;