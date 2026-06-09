import { useState, useRef, useEffect } from 'react';
import QR from "../assets/QR.jpeg"

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
  const [copySuccess, setCopySuccess] = useState(false);

  const [showSeatModal, setShowSeatModal] = useState(false);
  const [seatModalAnimation, setSeatModalAnimation] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [tempSelectedSeat, setTempSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [seatsLoading, setSeatsLoading] = useState(true);

  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [whatsAppModalAnimation, setWhatsAppModalAnimation] = useState(false);

  const fileInputRef = useRef(null);
  const paymentInputRef = useRef(null);
  const formRef = useRef(null);

  const TOTAL_SEATS = 87;
  const SEATS_PER_ROW = 10;
  const PERMANENT_BLOCKED_SEATS = [9, 78];
  const HALL_1_SEATS = { start: 1, end: 43, name: 'हॉल १', nameEn: 'Hall 1' };
  const HALL_2_SEATS = { start: 44, end: 87, name: 'हॉल २', nameEn: 'Hall 2' };

  const WHATSAPP_GROUPS = {
    boys: 'https://chat.whatsapp.com/GAdsqdp0PHsEYSXG4eGKk6',  
    girls: 'https://chat.whatsapp.com/HlaZMY8z3H5AFfiJHO1ksf', 
  };

  const mapSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3514.364344472679!2d74.6083036!3d18.1742749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc39fd284b53de1%3A0x1d325a4ee3396f51!2sAgnipankh%20Abhyasika%20(Library)!5e1!3m2!1sen!2sin!4v1779612711533!5m2!1sen!2sin';

  const SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbyH6sTy0xxyNWdkouYDWhE1jeiRcqpBO_Lw8QkNVONF7JMfCH5KWORqgPRXbsZ8lLRc/exec';

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        setSeatsLoading(true);
        const res = await fetch(`${SCRIPT_URL}?action=getBookedSeats`);
        const json = await res.json();
        if (json.status === 'success' && Array.isArray(json.bookedSeats)) {
          const seats = json.bookedSeats
            .map((s) => parseInt(s, 10))
            .filter((s) => !isNaN(s));
          setBookedSeats(seats);
        }
      } catch (err) {
        console.warn('Could not fetch booked seats:', err);
        setBookedSeats([]);
      } finally {
        setSeatsLoading(false);
      }
    };
    fetchBookedSeats();
  }, []);

  const generateRowsForRange = (startSeat, endSeat) => {
    const rows = [];
    let seatNum = startSeat;
    while (seatNum <= endSeat) {
      const seatsInRow = Math.min(SEATS_PER_ROW, endSeat - seatNum + 1);
      const row = [];
      for (let i = 0; i < seatsInRow; i++) {
        row.push(seatNum);
        seatNum++;
      }
      rows.push(row);
    }
    return rows;
  };

  const hall1Rows = generateRowsForRange(HALL_1_SEATS.start, HALL_1_SEATS.end);
  const hall2Rows = generateRowsForRange(HALL_2_SEATS.start, HALL_2_SEATS.end);

  const openSeatModal = () => {
    setTempSelectedSeat(selectedSeat);
    setShowSeatModal(true);
    setTimeout(() => setSeatModalAnimation(true), 100);
  };

  const closeSeatModal = () => {
    setSeatModalAnimation(false);
    setTimeout(() => setShowSeatModal(false), 300);
  };

  const handleSeatClick = (seatNum) => {
    if (PERMANENT_BLOCKED_SEATS.includes(seatNum)) return;
    if (bookedSeats.includes(seatNum)) return;
    setTempSelectedSeat(tempSelectedSeat === seatNum ? null : seatNum);
  };

  const confirmSeatSelection = () => {
    setSelectedSeat(tempSelectedSeat);
    closeSeatModal();
  };

  const getSeatStatus = (seatNum) => {
    if (PERMANENT_BLOCKED_SEATS.includes(seatNum)) return 'permanent-blocked';
    if (bookedSeats.includes(seatNum)) return 'booked';
    if (tempSelectedSeat === seatNum) return 'selected';
    return 'available';
  };

  const getSeatColor = (status) => {
    switch (status) {
      case 'permanent-blocked':
        return 'bg-gray-400 text-gray-600 cursor-not-allowed border-gray-400 opacity-60';
      case 'booked':
        return 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300';
      case 'selected':
        return 'bg-green-500 text-white cursor-pointer border-green-500 shadow-lg shadow-green-500/30 scale-110';
      default:
        return 'bg-white text-dark-600 cursor-pointer border-dark-300 hover:border-primary-400 hover:bg-primary-50';
    }
  };

  const getAvailableCount = () => {
    const totalUsable = TOTAL_SEATS - PERMANENT_BLOCKED_SEATS.length;
    return totalUsable - bookedSeats.filter(
      (s) => !PERMANENT_BLOCKED_SEATS.includes(s)
    ).length;
  };

  const renderHallGrid = (rows) => (
    <div className="space-y-1.5 sm:space-y-2">
      {rows.map((row, rowIndex) => {
        const leftHalf = row.slice(0, Math.ceil(row.length / 2));
        const rightHalf = row.slice(Math.ceil(row.length / 2));

        return (
          <div
            key={rowIndex}
            className="flex items-center justify-center gap-0.5 sm:gap-1"
          >
            <div className="flex gap-0.5 sm:gap-1">
              {leftHalf.map((seatNum) => {
                const status = getSeatStatus(seatNum);
                return (
                  <button
                    key={seatNum}
                    type="button"
                    onClick={() => handleSeatClick(seatNum)}
                    disabled={status === 'booked' || status === 'permanent-blocked'}
                    title={
                      status === 'permanent-blocked'
                        ? `सीट ${seatNum} — राखीव (उपलब्ध नाही)`
                        : status === 'booked'
                        ? `सीट ${seatNum} — आधीच बुक केली आहे`
                        : `सीट ${seatNum} निवडा`
                    }
                    className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] md:text-xs font-bold border-2 transition-all duration-200 flex items-center justify-center ${getSeatColor(status)}`}
                  >
                    {status === 'permanent-blocked' ? (
                      <i className="fas fa-ban text-[7px] sm:text-[8px]"></i>
                    ) : (
                      seatNum
                    )}
                  </button>
                );
              })}
            </div>

            <div className="w-2 sm:w-4 md:w-6 flex items-center justify-center flex-shrink-0">
              <div className="w-0.5 h-4 sm:h-5 bg-dark-200 rounded-full"></div>
            </div>

            <div className="flex gap-0.5 sm:gap-1">
              {rightHalf.map((seatNum) => {
                const status = getSeatStatus(seatNum);
                return (
                  <button
                    key={seatNum}
                    type="button"
                    onClick={() => handleSeatClick(seatNum)}
                    disabled={status === 'booked' || status === 'permanent-blocked'}
                    title={
                      status === 'permanent-blocked'
                        ? `सीट ${seatNum} — राखीव (उपलब्ध नाही)`
                        : status === 'booked'
                        ? `सीट ${seatNum} — आधीच बुक केली आहे`
                        : `सीट ${seatNum} निवडा`
                    }
                    className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] md:text-xs font-bold border-2 transition-all duration-200 flex items-center justify-center ${getSeatColor(status)}`}
                  >
                    {status === 'permanent-blocked' ? (
                      <i className="fas fa-ban text-[7px] sm:text-[8px]"></i>
                    ) : (
                      seatNum
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );

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

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = (error) => reject(error);
    });

  const copyUPI = async () => {
    try {
      await navigator.clipboard.writeText('7887975427@ybl');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = '7887975427@ybl';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const openQRModal = () => {
    setShowQRModal(true);
    setTimeout(() => setQrModalAnimation(true), 100);
  };
  const closeQRModal = () => {
    setQrModalAnimation(false);
    setTimeout(() => setShowQRModal(false), 300);
  };

  const openWhatsAppModal = () => {
    setShowWhatsAppModal(true);
    setTimeout(() => setWhatsAppModalAnimation(true), 100);
  };
  const closeWhatsAppModal = () => {
    setWhatsAppModalAnimation(false);
    setTimeout(() => setShowWhatsAppModal(false), 300);
  };

  const resetForm = () => {
    if (formRef.current) formRef.current.reset();
    setSelectedFile(null);
    setFilePreview(null);
    setPaymentScreenshot(null);
    setPaymentPreview(null);
    setSelectedSeat(null);
    setTempSelectedSeat(null);
    setUploadProgress(0);
    setUploadStatus('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (paymentInputRef.current) paymentInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!paymentScreenshot) {
      alert('⚠️ कृपया पेमेंट स्क्रीनशॉट अपलोड करा!');
      return;
    }
    if (!selectedFile) {
      alert('⚠️ कृपया ओळखपत्र (आधार/पॅन कार्ड) अपलोड करा!');
      return;
    }
    if (!selectedSeat) {
      alert('⚠️ कृपया सीट निवडा!');
      return;
    }
    if (PERMANENT_BLOCKED_SEATS.includes(selectedSeat)) {
      alert('⚠️ ही सीट राखीव आहे. कृपया दुसरी सीट निवडा!');
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);
    setUploadStatus('फॉर्म डेटा तयार करत आहे...');

    const formData = new FormData(e.target);

    const data = {
      fullName: formData.get('fullName')?.trim() || '',
      phone: formData.get('phone')?.trim() || '',
      email: formData.get('email')?.trim() || '',
      selectedSeat: selectedSeat ? String(selectedSeat) : '',
      shift: formData.get('shift') || '',
      purpose: formData.get('purpose')?.trim() || '',
      message: formData.get('message')?.trim() || '',
      fileName: '',
      fileData: '',
      fileType: '',
      paymentFileName: '',
      paymentFileData: '',
      paymentFileType: '',
    };

    try {
      setUploadProgress(10);
      setUploadStatus('ओळखपत्र प्रोसेस करत आहे...');
      data.fileData = await fileToBase64(selectedFile);
      data.fileName = selectedFile.name;
      data.fileType = selectedFile.type;
      setUploadProgress(30);
    } catch {
      alert('❌ ओळखपत्र प्रोसेस करता आले नाही. कृपया पुन्हा प्रयत्न करा.');
      setIsSubmitting(false);
      setUploadProgress(0);
      setUploadStatus('');
      return;
    }

    try {
      setUploadProgress(40);
      setUploadStatus('पेमेंट स्क्रीनशॉट प्रोसेस करत आहे...');
      data.paymentFileData = await fileToBase64(paymentScreenshot);
      data.paymentFileName = paymentScreenshot.name;
      data.paymentFileType = paymentScreenshot.type;
      setUploadProgress(60);
    } catch {
      alert('❌ पेमेंट स्क्रीनशॉट प्रोसेस करता आली नाही. कृपया पुन्हा प्रयत्न करा.');
      setIsSubmitting(false);
      setUploadProgress(0);
      setUploadStatus('');
      return;
    }

    try {
      setUploadProgress(70);
      setUploadStatus('डेटा स्टोर होत आहे...');
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setUploadProgress(90);
      setUploadStatus('डेटा सेव्ह करत आहे...');
      await new Promise((r) => setTimeout(r, 500));
      setUploadProgress(100);
      setUploadStatus('पूर्ण झाले! ✅');
      await new Promise((r) => setTimeout(r, 300));

      setBookedSeats((prev) => [...prev, selectedSeat]);

      setShowModal(true);
      setTimeout(() => setModalAnimation(true), 100);
      resetForm();
    } catch {
      alert('❌ नोंदणी सबमिट करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setUploadProgress(0);
        setUploadStatus('');
      }, 1000);
    }
  };

  const closeModal = () => {
    setModalAnimation(false);
    setTimeout(() => setShowModal(false), 300);
  };

  return (
    <>
      {/* ==================== SEAT SELECTION MODAL ==================== */}
      {showSeatModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-dark-900/60 backdrop-blur-sm transition-opacity duration-300"
          style={{ opacity: seatModalAnimation ? 1 : 0 }}
          onClick={closeSeatModal}
        >
          <div
            className="bg-white sm:rounded-3xl rounded-t-3xl max-w-2xl w-full border border-dark-200 shadow-2xl transition-all duration-300 flex flex-col"
            style={{
              maxHeight: '92vh',
              transform: seatModalAnimation
                ? 'scale(1) translateY(0)'
                : 'scale(0.95) translateY(30px)',
              opacity: seatModalAnimation ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile drag handle */}
            <div className="flex justify-center pt-3 pb-1 sm:hidden flex-shrink-0">
              <div className="w-10 h-1 bg-dark-300 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-dark-200 bg-gradient-to-r from-primary-700 to-primary-600 sm:rounded-t-3xl flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-chair text-white text-sm sm:text-lg"></i>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-white">सीट निवडा</h3>
                    <p className="text-primary-100 text-[10px] sm:text-xs mt-0.5">
                      {seatsLoading ? (
                        <span>
                          <i className="fas fa-spinner fa-spin mr-1"></i>लोड होत आहे...
                        </span>
                      ) : (
                        <span>
                          <span className="font-semibold text-white">{getAvailableCount()}</span>
                          {' '}उपलब्ध /{' '}
                          <span>एकूण {TOTAL_SEATS - PERMANENT_BLOCKED_SEATS.length}</span>
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {!seatsLoading && (
                  <div className="hidden md:flex items-center space-x-2 mr-3">
                    <span className="bg-blue-500/30 border border-blue-300/40 text-blue-100 text-[10px] font-bold px-2.5 py-1 rounded-full">
                      हॉल १: १–४३
                    </span>
                    <span className="bg-purple-500/30 border border-purple-300/40 text-purple-100 text-[10px] font-bold px-2.5 py-1 rounded-full">
                      हॉल २: ४४–८७
                    </span>
                  </div>
                )}

                <button
                  onClick={closeSeatModal}
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ml-2"
                >
                  <i className="fas fa-times text-white text-sm"></i>
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-5">
              {seatsLoading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin text-primary-600 text-xl sm:text-2xl"></i>
                  </div>
                  <p className="text-dark-500 text-sm">सीट माहिती लोड होत आहे...</p>
                  <div className="w-full space-y-2 mt-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex justify-center gap-1">
                        {[...Array(10)].map((_, j) => (
                          <div key={j} className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-gray-200 animate-pulse"></div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {/* HALL 1 */}
                  <div className="mb-6 sm:mb-8">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
                      <div className="flex items-center space-x-1.5 sm:space-x-2 bg-blue-50 border border-blue-200 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-blue-700 font-bold text-xs sm:text-sm">हॉल १</span>
                        <span className="text-blue-500 text-[10px] sm:text-xs hidden xs:inline">(सीट १ – ४३)</span>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
                    </div>
                    <div className="text-center mb-3 sm:mb-4">
                      <div className="relative mx-auto w-3/4 max-w-xs">
                        <div className="h-2 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"></div>
                        <div className="h-5 bg-gradient-to-b from-blue-100 to-transparent rounded-b-3xl -mt-0.5"></div>
                      </div>
                    </div>
                    {renderHallGrid(hall1Rows)}
                    <div className="mt-2 sm:mt-3 flex items-center justify-center space-x-2 sm:space-x-3 flex-wrap gap-y-1">
                      <span className="text-[10px] sm:text-xs text-blue-600 bg-blue-50 border border-blue-200 px-2 sm:px-3 py-1 rounded-full">
                        <i className="fas fa-chair mr-1"></i>
                        {43 - PERMANENT_BLOCKED_SEATS.filter(s => s >= 1 && s <= 43).length - bookedSeats.filter(s => s >= 1 && s <= 43).length} उपलब्ध
                      </span>
                      {bookedSeats.filter(s => s >= 1 && s <= 43).length > 0 && (
                        <span className="text-[10px] sm:text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2 sm:px-3 py-1 rounded-full">
                          <i className="fas fa-lock mr-1"></i>
                          {bookedSeats.filter(s => s >= 1 && s <= 43).length} बुक
                        </span>
                      )}
                    </div>
                  </div>

                  {/* HALL 2 */}
                  <div className="mb-3 sm:mb-4">
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                      <div className="flex items-center space-x-1.5 sm:space-x-2 bg-purple-50 border border-purple-200 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-purple-700 font-bold text-xs sm:text-sm">हॉल २</span>
                        <span className="text-purple-500 text-[10px] sm:text-xs hidden xs:inline">(सीट ४४ – ८७)</span>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                    </div>
                    <div className="text-center mb-3 sm:mb-4">
                      <div className="relative mx-auto w-3/4 max-w-xs">
                        <div className="h-2 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full"></div>
                        <div className="h-5 bg-gradient-to-b from-purple-100 to-transparent rounded-b-3xl -mt-0.5"></div>
                      </div>
                    </div>
                    {renderHallGrid(hall2Rows)}
                    <div className="mt-2 sm:mt-3 flex items-center justify-center space-x-2 sm:space-x-3 flex-wrap gap-y-1">
                      <span className="text-[10px] sm:text-xs text-purple-600 bg-purple-50 border border-purple-200 px-2 sm:px-3 py-1 rounded-full">
                        <i className="fas fa-chair mr-1"></i>
                        {44 - PERMANENT_BLOCKED_SEATS.filter(s => s >= 44 && s <= 87).length - bookedSeats.filter(s => s >= 44 && s <= 87).length} उपलब्ध
                      </span>
                      {bookedSeats.filter(s => s >= 44 && s <= 87).length > 0 && (
                        <span className="text-[10px] sm:text-xs text-gray-500 bg-gray-50 border border-gray-200 px-2 sm:px-3 py-1 rounded-full">
                          <i className="fas fa-lock mr-1"></i>
                          {bookedSeats.filter(s => s >= 44 && s <= 87).length} बुक
                        </span>
                      )}
                    </div>
                  </div>

                  {/* LEGEND */}
                  <div className="mt-4 sm:mt-6 p-2.5 sm:p-3 bg-dark-50 border border-dark-200 rounded-2xl">
                    <p className="text-dark-400 text-[10px] font-bold uppercase tracking-wider text-center mb-2 sm:mb-3">
                      चिन्हांचा अर्थ
                    </p>
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 gap-y-2 text-[10px] sm:text-xs">
                      <div className="flex items-center space-x-1.5">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded border-2 border-dark-300 bg-white flex items-center justify-center text-[8px] sm:text-[9px] font-bold text-dark-600">1</div>
                        <span className="text-dark-600">उपलब्ध</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded border-2 border-green-500 bg-green-500 flex items-center justify-center">
                          <i className="fas fa-check text-white text-[7px] sm:text-[8px]"></i>
                        </div>
                        <span className="text-dark-600">निवडलेली</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded border-2 border-gray-300 bg-gray-300 flex items-center justify-center text-[8px] sm:text-[9px] font-bold text-gray-500">X</div>
                        <span className="text-dark-600">बुक केलेली</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded border-2 border-gray-400 bg-gray-400 opacity-60 flex items-center justify-center">
                          <i className="fas fa-ban text-gray-600 text-[7px] sm:text-[8px]"></i>
                        </div>
                        <span className="text-dark-600">राखीव</span>
                      </div>
                    </div>
                  </div>

                  {bookedSeats.length > 0 && (
                    <div className="mt-3 sm:mt-4 text-center">
                      <span className="inline-flex items-center space-x-1.5 bg-red-50 border border-red-200 text-red-700 text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full">
                        <i className="fas fa-lock text-[9px] sm:text-[10px]"></i>
                        <span>{bookedSeats.length} सीट या महिन्यात बुक झाल्या आहेत</span>
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="px-3 sm:px-6 py-3 sm:py-4 border-t border-dark-200 bg-dark-50 flex-shrink-0 rounded-b-3xl">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  {tempSelectedSeat ? (
                    <div className="flex items-center space-x-2">
                      <div className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full border flex-shrink-0 ${
                        tempSelectedSeat <= 43
                          ? 'bg-blue-50 border-blue-200 text-blue-600'
                          : 'bg-purple-50 border-purple-200 text-purple-600'
                      }`}>
                        {tempSelectedSeat <= 43 ? 'हॉल १' : 'हॉल २'}
                      </div>
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0 ${
                        tempSelectedSeat <= 43
                          ? 'bg-blue-500 shadow-blue-500/30'
                          : 'bg-purple-500 shadow-purple-500/30'
                      }`}>
                        <span className="text-white font-bold text-xs sm:text-sm">{tempSelectedSeat}</span>
                      </div>
                      <div className="text-dark-900 font-bold text-xs sm:text-sm truncate">
                        सीट {tempSelectedSeat} निवडली
                      </div>
                    </div>
                  ) : (
                    <p className="text-dark-400 text-xs sm:text-sm">
                      <i className="fas fa-hand-pointer mr-1"></i>कृपया एक सीट निवडा
                    </p>
                  )}
                </div>
                <div className="flex space-x-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={closeSeatModal}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-dark-600 bg-white border border-dark-300 hover:bg-dark-50 transition-all"
                  >
                    रद्द करा
                  </button>
                  <button
                    type="button"
                    onClick={confirmSeatSelection}
                    disabled={!tempSelectedSeat || seatsLoading}
                    className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition-all shadow-lg shadow-green-600/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center space-x-1 sm:space-x-2"
                  >
                    <i className="fas fa-check text-xs"></i>
                    <span>निश्चित करा</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUCCESS MODAL ==================== */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-dark-900/40 backdrop-blur-sm transition-opacity duration-300"
          style={{ opacity: modalAnimation ? 1 : 0 }}
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl p-5 sm:p-8 max-w-md w-full border border-dark-200 shadow-2xl transition-all duration-300"
            style={{
              transform: modalAnimation ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
              opacity: modalAnimation ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-green-600 text-2xl sm:text-3xl"></i>
                </div>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-dark-900 text-center mb-2 sm:mb-3">
              नोंदणी यशस्वी! 🎉
            </h3>
            <p className="text-dark-600 text-center text-sm sm:text-base mb-3 sm:mb-4">
              तुमची नोंदणी यशस्वीरित्या सबमिट झाली आहे.
            </p>
            <div className="border-t border-dark-200 my-3 sm:my-4"></div>
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
              <div className="flex items-start space-x-3">
                <i className="fas fa-info-circle text-primary-600 mt-0.5 sm:mt-1 flex-shrink-0"></i>
                <p className="text-xs sm:text-sm text-dark-700">
                  पेमेंट व्हेरिफाय झाल्यावर{' '}
                  <span className="text-primary-700 font-semibold">24 तासांच्या आत</span>{' '}
                  कन्फर्मेशन मिळेल.
                </p>
              </div>
            </div>
            <div className="bg-dark-50 border border-dark-200 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
              <h4 className="text-dark-900 font-bold text-xs sm:text-sm mb-2">
                <i className="fas fa-list-ol mr-2 text-primary-600"></i>पुढे काय होईल?
              </h4>
              <div className="space-y-2 text-xs text-dark-600">
                {[
                  { icon: 'fa-check', color: 'bg-green-100 text-green-600', text: 'नोंदणी फॉर्म सबमिट झाला' },
                  { icon: 'fa-clock', color: 'bg-amber-100 text-amber-600', text: 'पेमेंट व्हेरिफिकेशन (24 तास)' },
                  { icon: 'fa-phone', color: 'bg-primary-100 text-primary-600', text: 'फोन/WhatsApp वर कन्फर्मेशन' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <span className={`w-5 h-5 ${item.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <i className={`fas ${item.icon} text-[8px]`}></i>
                    </span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={closeModal}
                className="flex-1 bg-gradient-to-r from-primary-700 to-primary-600 text-white py-3 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base hover:from-primary-800 hover:to-primary-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-primary-600/20"
              >
                <i className="fas fa-thumbs-up"></i>
                <span>ठीक आहे</span>
              </button>
              <a
                href="https://wa.me/7887975427?text=नमस्कार! मी नुकतीच नोंदणी केली आहे."
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-green-50 border border-green-200 text-green-700 py-3 px-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base hover:bg-green-600 hover:text-white hover:border-green-600 transition-all duration-300 flex items-center justify-center space-x-2"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-dark-900/40 backdrop-blur-sm transition-opacity duration-300"
          style={{ opacity: qrModalAnimation ? 1 : 0 }}
          onClick={closeQRModal}
        >
          <div
            className="bg-white rounded-3xl p-5 sm:p-8 max-w-sm w-full border border-dark-200 shadow-2xl transition-all duration-300"
            style={{
              transform: qrModalAnimation ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
              opacity: qrModalAnimation ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <i className="fas fa-qrcode text-primary-600 text-xl sm:text-2xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-dark-900">QR कोड स्कॅन करा</h3>
              <p className="text-dark-500 text-xs sm:text-sm mt-1">GPay / PhonePe / Paytm वापरा</p>
            </div>
            <div className="bg-white border-2 border-dark-200 rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 flex items-center justify-center">
              <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-xl overflow-hidden">
                <img src={QR} alt="Payment QR Code" className="w-full h-full object-contain p-2" />
              </div>
            </div>
            <div className="bg-dark-50 rounded-xl p-2.5 sm:p-3 mb-3 sm:mb-4 border border-dark-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] sm:text-[11px] text-dark-400 uppercase tracking-wide font-medium">UPI ID</div>
                  <div className="text-dark-900 font-bold text-xs sm:text-sm">7887975427@ybl</div>
                </div>
                <button
                  type="button"
                  onClick={copyUPI}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all duration-300 ${
                    copySuccess ? 'bg-green-100 text-green-700' : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  <i className={`fas ${copySuccess ? 'fa-check' : 'fa-copy'} mr-1`}></i>
                  {copySuccess ? 'कॉपी झाली!' : 'कॉपी'}
                </button>
              </div>
            </div>
            {selectedSeat && (
              <div className={`border rounded-xl p-2.5 sm:p-3 mb-3 sm:mb-4 ${
                selectedSeat <= 43 ? 'bg-blue-50 border-blue-200' : 'bg-purple-50 border-purple-200'
              }`}>
                <div className={`font-semibold text-xs sm:text-sm flex items-center space-x-2 ${
                  selectedSeat <= 43 ? 'text-blue-800' : 'text-purple-800'
                }`}>
                  <i className="fas fa-chair"></i>
                  <span>सीट {selectedSeat} · {selectedSeat <= 43 ? 'हॉल १' : 'हॉल २'}</span>
                </div>
              </div>
            )}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 sm:p-3 mb-4 sm:mb-6">
              <div className="flex items-start space-x-2">
                <i className="fas fa-exclamation-triangle text-amber-600 mt-0.5 text-xs sm:text-sm flex-shrink-0"></i>
                <p className="text-amber-800 text-[10px] sm:text-xs leading-relaxed">
                  पेमेंट केल्यानंतर <span className="font-bold">स्क्रीनशॉट</span> घ्या आणि फॉर्ममध्ये अपलोड करा.
                </p>
              </div>
            </div>
            <button
              onClick={closeQRModal}
              className="w-full bg-gradient-to-r from-primary-700 to-primary-600 text-white py-3 rounded-xl font-bold text-sm sm:text-base hover:from-primary-800 hover:to-primary-700 transition-all duration-300 shadow-lg shadow-primary-600/20"
            >
              <i className="fas fa-check mr-2"></i>पेमेंट केले, पुढे जा
            </button>
          </div>
        </div>
      )}

      {/* ==================== WHATSAPP GROUP MODAL ==================== */}
      {showWhatsAppModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-dark-900/40 backdrop-blur-sm transition-opacity duration-300"
          style={{ opacity: whatsAppModalAnimation ? 1 : 0 }}
          onClick={closeWhatsAppModal}
        >
          <div
            className="bg-white rounded-3xl p-5 sm:p-8 max-w-sm w-full border border-dark-200 shadow-2xl transition-all duration-300"
            style={{
              transform: whatsAppModalAnimation ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
              opacity: whatsAppModalAnimation ? 1 : 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="text-center mb-5 sm:mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-green-200">
                <i className="fab fa-whatsapp text-green-600 text-2xl sm:text-3xl"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-dark-900">WhatsApp ग्रुप जॉईन करा</h3>
              <p className="text-dark-500 text-xs sm:text-sm mt-1.5">
                तुमच्या गटाचा ग्रुप निवडा आणि जॉईन करा
              </p>
            </div>

            {/* Info */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-5 sm:mb-6">
              <div className="flex items-start space-x-2">
                <i className="fas fa-info-circle text-green-600 mt-0.5 flex-shrink-0 text-sm"></i>
                <p className="text-green-800 text-[11px] sm:text-xs leading-relaxed">
                  नोंदणी केलेल्या सदस्यांसाठी हे ग्रुप आहेत.
                  अपडेट्स, सूचना आणि महत्त्वाची माहिती इथे मिळेल.
                </p>
              </div>
            </div>

            {/* Group Buttons */}
            <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
              {/* Boys Group */}
              <a
                href={WHATSAPP_GROUPS.boys}
                target="_blank"
                rel="noreferrer"
                onClick={closeWhatsAppModal}
                className="flex items-center space-x-4 w-full p-4 sm:p-5 bg-blue-50 border-2 border-blue-200 rounded-2xl hover:bg-blue-100 hover:border-blue-400 transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0 group-hover:scale-105 transition-transform">
                  <i className="fas fa-mars text-white text-xl sm:text-2xl"></i>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="text-blue-900 font-bold text-sm sm:text-base">मुलांचा ग्रुप</div>
                  <div className="text-blue-600 text-[10px] sm:text-xs mt-0.5">Boys WhatsApp Group</div>
                  <div className="flex items-center space-x-1 mt-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] sm:text-xs text-green-600 font-medium">Active Group</span>
                  </div>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 transition-colors">
                  <i className="fas fa-arrow-right text-blue-500 text-xs group-hover:text-white transition-colors"></i>
                </div>
              </a>

              {/* Girls Group */}
              <a
                href={WHATSAPP_GROUPS.girls}
                target="_blank"
                rel="noreferrer"
                onClick={closeWhatsAppModal}
                className="flex items-center space-x-4 w-full p-4 sm:p-5 bg-pink-50 border-2 border-pink-200 rounded-2xl hover:bg-pink-100 hover:border-pink-400 transition-all duration-300 group shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30 flex-shrink-0 group-hover:scale-105 transition-transform">
                  <i className="fas fa-venus text-white text-xl sm:text-2xl"></i>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="text-pink-900 font-bold text-sm sm:text-base">मुलींचा ग्रुप</div>
                  <div className="text-pink-600 text-[10px] sm:text-xs mt-0.5">Girls WhatsApp Group</div>
                  <div className="flex items-center space-x-1 mt-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] sm:text-xs text-green-600 font-medium">Active Group</span>
                  </div>
                </div>
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-pink-500 transition-colors">
                  <i className="fas fa-arrow-right text-pink-500 text-xs group-hover:text-white transition-colors"></i>
                </div>
              </a>
            </div>

            {/* Close Button */}
            <button
              onClick={closeWhatsAppModal}
              className="w-full py-3 rounded-xl font-bold text-sm sm:text-base text-dark-600 bg-dark-100 hover:bg-dark-200 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <i className="fas fa-times text-sm"></i>
              <span>बंद करा</span>
            </button>
          </div>
        </div>
      )}

      {/* ==================== BOOKING SECTION ==================== */}
      <section
        id="booking"
        className="py-12 sm:py-16 lg:py-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #faf9f8 0%, #e9ecef 30%, #f1f3f5 60%, #f8f9fa 100%)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary-200/30 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-accent/10 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-[600px] h-72 sm:h-[600px] bg-primary-100/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6">
              <i className="fas fa-calendar-check text-green-600 text-sm"></i>
              <span className="text-green-700 text-xs sm:text-sm font-semibold">आत्ताच नोंदणी करा</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark-900 mb-4 sm:mb-6">
              तुमची जागा <span className="gradient-gold">आरक्षित करा</span>
            </h2>
            <p className="text-dark-600 text-sm sm:text-base lg:text-lg px-2">
              खालील फॉर्म भरा, सीट निवडा, पेमेंट करा आणि तुमचे स्थान कन्फर्म करा!
            </p>
          </div>

          <div className="grid lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12">
            {/* ============ FORM ============ */}
            <div className="lg:col-span-4 glass-light rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 shadow-xl shadow-dark-900/5">
              <h3 className="text-xl sm:text-2xl font-bold text-dark-900 mb-6 sm:mb-8">
                <i className="fas fa-edit text-primary-600 mr-2"></i>नोंदणी फॉर्म
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-dark-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      पूर्ण नाव <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      minLength={2}
                      maxLength={100}
                      placeholder="तुमचे पूर्ण नाव"
                      className="w-full bg-white border border-dark-300 text-dark-900 px-4 sm:px-5 py-3 sm:py-4 rounded-xl placeholder-dark-400 focus:border-primary-500 focus:outline-none transition-all shadow-sm text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      मोबाईल नंबर <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      pattern="[0-9+\s\-]{10,15}"
                      title="कृपया वैध मोबाईल नंबर टाका"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-white border border-dark-300 text-dark-900 px-4 sm:px-5 py-3 sm:py-4 rounded-xl placeholder-dark-400 focus:border-primary-500 focus:outline-none transition-all shadow-sm text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Email & Seat Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-dark-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">ईमेल</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="example@gmail.com"
                      className="w-full bg-white border border-dark-300 text-dark-900 px-4 sm:px-5 py-3 sm:py-4 rounded-xl placeholder-dark-400 focus:border-primary-500 focus:outline-none transition-all shadow-sm text-sm sm:text-base"
                    />
                  </div>

                  {/* SEAT SELECTION BUTTON */}
                  <div>
                    <label className="block text-dark-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      सीट निवडा <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={openSeatModal}
                      className={`w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl font-medium text-left transition-all shadow-sm border-2 flex items-center justify-between group
                        ${selectedSeat
                          ? selectedSeat <= 43
                            ? 'bg-blue-50 border-blue-300 text-blue-800 hover:border-blue-400'
                            : 'bg-purple-50 border-purple-300 text-purple-800 hover:border-purple-400'
                          : 'bg-white border-dark-300 text-dark-400 hover:border-primary-400 hover:bg-primary-50'
                        }`}
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                        {selectedSeat ? (
                          <>
                            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shadow-md flex-shrink-0 ${
                              selectedSeat <= 43 ? 'bg-blue-500 shadow-blue-500/20' : 'bg-purple-500 shadow-purple-500/20'
                            }`}>
                              <span className="text-white font-bold text-xs sm:text-sm">{selectedSeat}</span>
                            </div>
                            <div className="min-w-0">
                              <div className={`font-bold text-xs sm:text-sm ${selectedSeat <= 43 ? 'text-blue-800' : 'text-purple-800'}`}>
                                सीट नंबर {selectedSeat}
                              </div>
                              <div className={`text-[10px] sm:text-xs ${selectedSeat <= 43 ? 'text-blue-500' : 'text-purple-500'}`}>
                                {selectedSeat <= 43 ? 'हॉल १' : 'हॉल २'}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-dark-100 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors flex-shrink-0">
                              {seatsLoading ? (
                                <i className="fas fa-spinner fa-spin text-dark-400 text-xs"></i>
                              ) : (
                                <i className="fas fa-chair text-dark-400 group-hover:text-primary-600 transition-colors text-sm"></i>
                              )}
                            </div>
                            <span className="group-hover:text-primary-600 transition-colors text-xs sm:text-sm truncate">
                              {seatsLoading ? 'सीट माहिती लोड होत आहे...' : 'सीट निवडण्यासाठी क्लिक करा'}
                            </span>
                          </>
                        )}
                      </div>
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ml-2 ${
                        selectedSeat
                          ? selectedSeat <= 43 ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                          : 'bg-dark-100 text-dark-400 group-hover:bg-primary-100 group-hover:text-primary-600'
                      }`}>
                        <i className={`fas ${selectedSeat ? 'fa-pen' : 'fa-arrow-right'} text-xs`}></i>
                      </div>
                    </button>

                    {!selectedSeat && !seatsLoading && (
                      <div className="mt-1.5 flex items-center flex-wrap gap-x-2 gap-y-1 text-[10px] sm:text-xs">
                        <span className="flex items-center space-x-1 text-blue-500">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full inline-block"></span>
                          <span>हॉल १: {43 - PERMANENT_BLOCKED_SEATS.filter(s => s <= 43).length - bookedSeats.filter(s => s >= 1 && s <= 43).length} उपलब्ध</span>
                        </span>
                        <span className="text-dark-300">·</span>
                        <span className="flex items-center space-x-1 text-purple-500">
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full inline-block"></span>
                          <span>हॉल २: {44 - PERMANENT_BLOCKED_SEATS.filter(s => s >= 44).length - bookedSeats.filter(s => s >= 44 && s <= 87).length} उपलब्ध</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Shift & Purpose */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-dark-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      शिफ्ट निवडा <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="shift"
                      required
                      className="w-full bg-white border border-dark-300 text-dark-900 px-4 sm:px-5 py-3 sm:py-4 rounded-xl focus:border-primary-500 focus:outline-none transition-all appearance-none cursor-pointer shadow-sm text-sm sm:text-base"
                    >
                      <option value="">शिफ्ट निवडा</option>
                      <option value="सकाळची शिफ्ट (6AM-11PM)">सकाळची शिफ्ट (6AM-11PM)</option>
                      <option value="दुपारची शिफ्ट (6PM-11AM)">दुपारची शिफ्ट (6PM-11AM)</option>
                      <option value="पूर्ण दिवस (24/7)">पूर्ण दिवस (24/7)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-dark-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                      अभ्यासाचा उद्देश
                    </label>
                    <input
                      type="text"
                      name="purpose"
                      maxLength={200}
                      placeholder="उदा: MPSC, UPSC, JEE..."
                      className="w-full bg-white border border-dark-300 text-dark-900 px-4 sm:px-5 py-3 sm:py-4 rounded-xl placeholder-dark-400 focus:border-primary-500 focus:outline-none transition-all shadow-sm text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* PAYMENT SECTION */}
                <div className="border-t border-dark-200 pt-5 sm:pt-6">
                  <h4 className="text-base sm:text-lg font-bold text-dark-900 mb-4 flex items-center">
                    <i className="fas fa-credit-card text-primary-600 mr-2"></i>पेमेंट माहिती
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* QR Code */}
                    <div className="bg-white border border-dark-200 rounded-2xl p-4 sm:p-5 shadow-sm">
                      <div className="text-center">
                        <div className="text-dark-700 font-semibold text-xs sm:text-sm mb-2 sm:mb-3">
                          <i className="fas fa-qrcode text-primary-600 mr-1"></i> QR कोड स्कॅन करा
                        </div>
                        <div
                          className="w-32 h-32 sm:w-40 sm:h-40 mx-auto bg-white border-2 border-dark-200 rounded-xl overflow-hidden mb-2 sm:mb-3 cursor-pointer hover:border-primary-400 transition-colors"
                          onClick={openQRModal}
                        >
                          <img src={QR} alt="Payment QR" className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="bg-dark-50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 mb-2 sm:mb-3 border border-dark-200">
                          <div className="text-[9px] sm:text-[10px] text-dark-400 uppercase tracking-wider mb-0.5">UPI ID</div>
                          <div className="text-dark-900 font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 sm:space-x-2">
                            <span>7887975427@ybl</span>
                            <button
                              type="button"
                              onClick={copyUPI}
                              className={`transition-colors flex-shrink-0 ${copySuccess ? 'text-green-600' : 'text-primary-500 hover:text-primary-700'}`}
                            >
                              <i className={`fas ${copySuccess ? 'fa-check' : 'fa-copy'} text-xs`}></i>
                            </button>
                          </div>
                        </div>
                        {selectedSeat && (
                          <div className={`border rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 ${
                            selectedSeat <= 43 ? 'bg-blue-50 border-blue-200' : 'bg-purple-50 border-purple-200'
                          }`}>
                            <div className={`font-bold text-xs sm:text-sm ${selectedSeat <= 43 ? 'text-blue-700' : 'text-purple-700'}`}>
                              <i className="fas fa-chair mr-1"></i>
                              सीट {selectedSeat} · {selectedSeat <= 43 ? 'हॉल १' : 'हॉल २'}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Payment Screenshot */}
                    <div>
                      <label className="block text-dark-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                        <i className="fas fa-camera mr-1.5 sm:mr-2 text-green-600"></i>
                        पेमेंट स्क्रीनशॉट अपलोड करा <span className="text-red-500">*</span>
                      </label>
                      {!paymentScreenshot ? (
                        <label className="flex flex-col items-center justify-center w-full h-44 sm:h-52 border-2 border-dashed border-green-300 rounded-xl cursor-pointer bg-green-50/50 hover:bg-green-50 hover:border-green-400 transition-all duration-300">
                          <div className="flex flex-col items-center justify-center py-4">
                            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-green-100 rounded-full flex items-center justify-center mb-2 sm:mb-3">
                              <i className="fas fa-cloud-upload-alt text-green-600 text-lg sm:text-2xl"></i>
                            </div>
                            <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-dark-600 text-center px-2">
                              <span className="font-semibold text-green-600">क्लिक करा</span> किंवा ड्रॅग करा
                            </p>
                            <p className="text-[10px] sm:text-xs text-dark-400 text-center">पेमेंट केल्यानंतरचा स्क्रीनशॉट</p>
                            <p className="text-[9px] sm:text-[10px] text-dark-400 mt-1">PNG, JPG (Max. 5MB)</p>
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
                        <div className="relative border border-green-200 rounded-xl p-3 bg-white shadow-sm min-h-[6rem]">
                          <div className="flex items-center space-x-2 sm:space-x-3 w-full">
                            <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 border border-dark-200 shadow-sm">
                              <img src={paymentPreview} alt="Payment Screenshot" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-dark-900 font-medium truncate text-xs sm:text-sm">{paymentScreenshot.name}</p>
                              <p className="text-dark-500 text-[10px] sm:text-xs">{(paymentScreenshot.size / 1024 / 1024).toFixed(2)} MB</p>
                              <div className="flex items-center mt-1 sm:mt-1.5">
                                <i className="fas fa-check-circle text-green-500 text-xs sm:text-sm mr-1.5 sm:mr-2"></i>
                                <span className="text-green-600 text-[10px] sm:text-xs font-medium">अपलोड तयार</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={removePaymentScreenshot}
                              className="w-8 h-8 sm:w-9 sm:h-9 bg-red-50 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-300 group border border-red-200 hover:border-red-500 flex-shrink-0"
                            >
                              <i className="fas fa-times text-red-500 group-hover:text-white text-xs sm:text-sm"></i>
                            </button>
                          </div>
                        </div>
                      )}
                      <div className="mt-2 sm:mt-3 bg-amber-50 border border-amber-200 rounded-lg p-2 sm:p-2.5">
                        <div className="flex items-start space-x-1.5 sm:space-x-2">
                          <i className="fas fa-lightbulb text-amber-500 mt-0.5 text-[10px] sm:text-xs flex-shrink-0"></i>
                          <p className="text-amber-800 text-[10px] sm:text-[11px] leading-relaxed">
                            GPay, PhonePe, Paytm किंवा बँक अ‍ॅप वरून पेमेंट करा. यशस्वी पेमेंटचा{' '}
                            <span className="font-bold">स्क्रीनशॉट</span> अपलोड करा.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ID Upload */}
                <div>
                  <label className="block text-dark-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                    <i className="fas fa-id-card mr-1.5 sm:mr-2 text-primary-600"></i>ओळखपत्र अपलोड करा
                    (आधार/पॅन कार्ड) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    {!selectedFile ? (
                      <label className="flex flex-col items-center justify-center w-full h-28 sm:h-32 border-2 border-dashed border-red-200 rounded-xl cursor-pointer bg-red-50/30 hover:bg-primary-50 hover:border-primary-400 transition-all duration-300">
                        <div className="flex flex-col items-center justify-center py-3 sm:py-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center mb-1.5 sm:mb-2">
                            <i className="fas fa-cloud-upload-alt text-primary-600 text-lg sm:text-xl"></i>
                          </div>
                          <p className="mb-1 text-xs sm:text-sm text-dark-600 text-center px-2">
                            <span className="font-semibold text-primary-600">क्लिक करा</span> किंवा ड्रॅग करा
                          </p>
                          <p className="text-[10px] sm:text-xs text-dark-500">PNG, JPG किंवा PDF (कमाल 5MB)</p>
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
                      <div className="relative border border-dark-200 rounded-xl p-3 sm:p-4 bg-white shadow-sm">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          {filePreview ? (
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 border border-dark-200 shadow-sm">
                              <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 border border-red-100">
                              <i className="fas fa-file-pdf text-red-500 text-xl sm:text-2xl"></i>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-dark-900 font-medium truncate text-xs sm:text-sm">{selectedFile.name}</p>
                            <p className="text-dark-500 text-[10px] sm:text-xs">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB / 5MB</p>
                            <div className="flex items-center mt-1">
                              <i className="fas fa-check-circle text-green-500 text-xs mr-1 sm:mr-1.5"></i>
                              <span className="text-green-600 text-[10px] sm:text-xs font-medium">तयार आहे</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="w-8 h-8 sm:w-9 sm:h-9 bg-red-50 hover:bg-red-500 rounded-full flex items-center justify-center transition-all duration-300 group border border-red-200 hover:border-red-500 flex-shrink-0"
                          >
                            <i className="fas fa-times text-red-500 group-hover:text-white text-xs sm:text-sm"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-dark-700 text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">अतिरिक्त संदेश</label>
                  <textarea
                    name="message"
                    rows="2"
                    maxLength={500}
                    placeholder="काही विशेष गरज असल्यास इथे लिहा..."
                    className="w-full bg-white border border-dark-300 text-dark-900 px-4 sm:px-5 py-3 sm:py-4 rounded-xl placeholder-dark-400 focus:border-primary-500 focus:outline-none transition-all resize-none shadow-sm text-sm sm:text-base"
                  ></textarea>
                </div>

                {/* Progress Bar */}
                {isSubmitting && uploadProgress > 0 && (
                  <div className="space-y-2 animate-fade-in">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-dark-600 font-medium flex items-center space-x-1.5 sm:space-x-2">
                        <i className="fas fa-spinner fa-spin text-primary-500"></i>
                        <span className="truncate">{uploadStatus || 'प्रोसेसिंग...'}</span>
                      </span>
                      <span className="text-primary-600 font-bold flex-shrink-0 ml-2">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-dark-200 rounded-full h-2.5 sm:h-3 overflow-hidden">
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
                    <div className="flex justify-between text-[9px] sm:text-[10px] text-dark-400 px-0.5">
                      <span className={uploadProgress >= 10 ? 'text-primary-600 font-medium' : ''}>फॉर्म</span>
                      <span className={uploadProgress >= 30 ? 'text-primary-600 font-medium' : ''}>ओळखपत्र</span>
                      <span className={uploadProgress >= 60 ? 'text-primary-600 font-medium' : ''}>पेमेंट</span>
                      <span className={uploadProgress >= 85 ? 'text-primary-600 font-medium' : ''}>सबमिट</span>
                      <span className={uploadProgress >= 100 ? 'text-green-600 font-bold' : ''}>पूर्ण ✓</span>
                    </div>
                  </div>
                )}



                {/* ==================== WHATSAPP GROUP CTA (After Submit Button) ==================== */}
                <div className="glass-light rounded-2xl border border-green-200 shadow-sm overflow-hidden">
                  <button
                    type="button"
                    onClick={openWhatsAppModal}
                    className="w-full p-4 sm:p-5 lg:p-4 hover:bg-green-50 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      {/* Icon with badge */}
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                          <i className="fas fa-users text-white text-lg sm:text-xl"></i>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow border border-green-100">
                          <i className="fab fa-whatsapp text-green-500 text-[10px]"></i>
                        </div>
                      </div>

                      <div className="flex-1 text-left min-w-0">
                        <div className="text-dark-900 font-bold text-sm sm:text-base group-hover:text-green-700 transition-colors">
                          अग्निपंख अभ्यासिका WhatsApp ग्रुप जॉईन करा
                        </div>
                        <div className="flex items-center space-x-1.5 mt-1.5 flex-wrap gap-y-1">
                          <span className="inline-flex items-center space-x-1 bg-blue-100 text-blue-700 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <i className="fas fa-mars text-[8px]"></i>
                            <span>मुलांचा ग्रुप</span>
                          </span>
                          <span className="inline-flex items-center space-x-1 bg-pink-100 text-pink-700 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full">
                            <i className="fas fa-venus text-[8px]"></i>
                            <span>मुलींचा ग्रुप</span>
                          </span>
                        </div>
                      </div>

                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-colors">
                        <i className="fas fa-chevron-right text-green-600 text-xs group-hover:text-white transition-colors"></i>
                      </div>
                    </div>
                  </button>
                </div>


                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-premium w-full bg-gradient-to-r from-primary-700 to-primary-600 text-white py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-primary-800 hover:to-primary-700 transition-all duration-300 shadow-xl shadow-primary-600/25 flex items-center justify-center space-x-2 sm:space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      <span className="text-sm sm:text-base">
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

                <p className="text-center text-dark-400 text-[10px] sm:text-[11px] flex items-center justify-center space-x-1">
                  <i className="fas fa-lock text-green-500"></i>
                  <span>तुमचा डेटा सुरक्षित आहे.</span>
                </p>
                
              </form>
            </div>

            {/* ============ RIGHT SIDEBAR ============ */}
            <div id="contact" className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Contact Info */}
              <div className="glass-light rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl shadow-dark-900/5">
                <h3 className="text-xl sm:text-2xl font-bold text-dark-900 mb-4 sm:mb-6">
                  <i className="fas fa-address-card text-primary-600 mr-2"></i>संपर्क माहिती
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <i className="fas fa-map-marker-alt text-primary-600 text-lg sm:text-xl"></i>
                    </div>
                    <div>
                      <div className="text-dark-900 font-bold text-sm sm:text-base">पत्ता</div>
                      <div className="text-dark-600 text-xs sm:text-sm mt-1">
                        फोरप्राईड कॉम्प्लेक्स, जळोची रोड, सूर्यनगरी, M.I.D.C.
                        <br />बारामती - 413102
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <i className="fas fa-phone-alt text-green-600 text-lg sm:text-xl"></i>
                    </div>
                    <div>
                      <div className="text-dark-900 font-bold text-sm sm:text-base">फोन नंबर</div>
                      <div className="text-dark-600 text-xs sm:text-sm mt-1">
                        <a href="tel:+918208730007" className="hover:text-primary-600 transition-colors">+91 8208730007</a>
                        <br />
                        <a href="tel:+917887975427" className="hover:text-primary-600 transition-colors">+91 7887975427</a>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <i className="fas fa-envelope text-orange-600 text-lg sm:text-xl"></i>
                    </div>
                    <div className="min-w-0">
                      <div className="text-dark-900 font-bold text-sm sm:text-base">ईमेल</div>
                      <div className="text-dark-600 text-xs sm:text-sm mt-1">
                        <a href="mailto:agnipankhabhyasika2022@gmail.com" className="hover:text-primary-600 transition-colors break-all">
                          agnipankhabhyasika2022@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="glass-light rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl shadow-dark-900/5">
                <h3 className="text-lg sm:text-xl font-bold text-dark-900 mb-3 sm:mb-4">
                  <i className="fas fa-shield-alt text-green-600 mr-2"></i>पेमेंट पद्धती
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    { name: 'Google Pay', icon: 'fab fa-google-pay', color: 'text-blue-600 bg-blue-50' },
                    { name: 'PhonePe', icon: 'fas fa-mobile-alt', color: 'text-purple-600 bg-purple-50' },
                    { name: 'Paytm', icon: 'fas fa-wallet', color: 'text-cyan-600 bg-cyan-50' },
                    { name: 'Bank Transfer', icon: 'fas fa-university', color: 'text-dark-600 bg-dark-100' },
                  ].map((method, i) => (
                    <div key={i} className="flex items-center space-x-3 p-2 sm:p-2.5 rounded-xl hover:bg-dark-50 transition-colors">
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${method.color}`}>
                        <i className={method.icon}></i>
                      </div>
                      <span className="text-dark-700 font-medium text-xs sm:text-sm">{method.name}</span>
                      <i className="fas fa-check-circle text-green-500 text-xs ml-auto"></i>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="glass-light rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl shadow-dark-900/5">
                <h3 className="text-lg sm:text-xl font-bold text-dark-900 mb-3 sm:mb-4">सोशल मीडिया</h3>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  <a href="#" className="w-full h-12 sm:h-14 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 group shadow-sm">
                    <i className="fab fa-facebook-f text-blue-600 text-lg sm:text-xl group-hover:text-white"></i>
                  </a>
                  <a href="#" className="w-full h-12 sm:h-14 bg-pink-50 border border-pink-100 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 hover:border-pink-500 transition-all duration-300 group shadow-sm">
                    <i className="fab fa-instagram text-pink-600 text-lg sm:text-xl group-hover:text-white"></i>
                  </a>
                  <a href="https://wa.me/7887975427" target="_blank" className="w-full h-12 sm:h-14 bg-green-50 border border-green-100 rounded-xl flex items-center justify-center hover:bg-green-600 hover:border-green-600 transition-all duration-300 group shadow-sm">
                    <i className="fab fa-whatsapp text-green-600 text-lg sm:text-xl group-hover:text-white"></i>
                  </a>
                  <a href="#" className="w-full h-12 sm:h-14 bg-red-50 border border-red-100 rounded-xl flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300 group shadow-sm">
                    <i className="fab fa-youtube text-red-600 text-lg sm:text-xl group-hover:text-white"></i>
                  </a>
                </div>
              </div>

              {/* ==================== WHATSAPP CTA (Direct Contact Only) ==================== */}
              <div className="glass-light rounded-2xl sm:rounded-3xl border border-green-200 shadow-xl shadow-dark-900/5 overflow-hidden">
                <a
                  href="https://wa.me/7887975427?text=नमस्कार! मला अभ्यासिकेबद्दल माहिती हवी आहे."
                  target="_blank"
                  rel="noreferrer"
                  className="block p-4 sm:p-6 hover:bg-green-50 transition-all duration-300 group"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 flex-shrink-0">
                      <i className="fab fa-whatsapp text-white text-xl sm:text-2xl"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-dark-900 font-bold text-sm sm:text-base group-hover:text-green-700 transition-colors">
                        WhatsApp वर संपर्क करा
                      </div>
                      <div className="text-dark-500 text-xs sm:text-sm">त्वरित उत्तर मिळवा</div>
                    </div>
                    <i className="fas fa-arrow-right text-green-600 group-hover:translate-x-2 transition-transform flex-shrink-0"></i>
                  </div>
                </a>
              </div>

              {/* Map */}
              <div className="glass-light rounded-2xl sm:rounded-3xl overflow-hidden border border-dark-200 shadow-xl shadow-dark-900/5">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-dark-200 flex items-center space-x-2 sm:space-x-3 bg-white/80">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-primary-600 text-sm"></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-dark-900 font-bold text-xs sm:text-sm">आमचे स्थान</div>
                    <div className="text-dark-500 text-[10px] sm:text-xs">Google Maps वर पहा</div>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/77prjdqwB2sqofyZ6"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] sm:text-xs text-primary-600 hover:text-primary-800 transition-colors flex items-center space-x-1 font-medium flex-shrink-0"
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
                    href="https://maps.app.goo.gl/77prjdqwB2sqofyZ6"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-3 right-3 bg-white text-dark-900 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold shadow-lg border border-dark-200 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300 flex items-center space-x-1"
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