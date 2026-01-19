import React, { useState, useEffect, useRef } from 'react';
import { COURSE_MODULES, FINAL_QUIZ, POLICY_CPO, POLICY_PASTOR } from './constants';
import { ContentItem } from './types';

const GBCLogo = ({ className = "w-64 h-auto" }: { className?: string }) => (
  <svg viewBox="0 0 400 120" className={className} xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(40, 65)">
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="0" y1="-52" x2="0" y2="-62" />
        <line x1="-12" y1="-48" x2="-20" y2="-56" />
        <line x1="12" y1="-48" x2="20" y2="-56" />
        <line x1="-18" y1="-38" x2="-28" y2="-38" />
        <line x1="18" y1="-38" x2="28" y2="-38" />
      </g>
      <path 
        d="M 0,-45 C -5,-35 -8,-30 -8,-30 L -25,-30 C -28,-30 -28,-25 -25,-25 L -6,-25 L -6, 45 C -6, 50 6, 50 6, 45 L 6, -25 L 25, -25 C 28, -25 28, -30 25, -30 L 8, -30 C 8,-30 5,-35 0,-45 Z" 
        fill="currentColor" 
      />
    </g>
    <g transform="translate(100, 60)">
      <text x="0" y="0" fontFamily="Arial, sans-serif" fontSize="48" fontWeight="bold" fill="currentColor" style={{ letterSpacing: '1px' }}>GERMISTON</text>
      <text x="2" y="40" fontFamily="Arial, sans-serif" fontSize="34" fontWeight="normal" fill="currentColor" style={{ letterSpacing: '6px' }}>BAPTIST</text>
    </g>
  </svg>
);

const ModuleIcon = ({ path }: { path: string }) => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 text-green-700 mb-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const Modal = ({ title, content, onClose }: { title: string, content: string, onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
    <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
      <div className="bg-green-700 p-6 flex justify-between items-center text-white">
        <h3 className="text-xl font-bold font-serif">{title}</h3>
        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <div className="p-8">
        <div className="text-green-800 font-bold text-xs uppercase tracking-widest mb-4">Detailed Policy Note</div>
        <p className="text-slate-700 text-lg leading-relaxed">{content}</p>
        <button onClick={onClose} className="mt-8 w-full py-4 bg-green-700 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-green-800 transition-all shadow-lg">Got it</button>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [activeExtraInfo, setActiveExtraInfo] = useState<ContentItem | null>(null);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Derived state declared at the top to prevent ReferenceError in effects
  const currentModule = COURSE_MODULES[currentModuleIndex];
  const progress = ((currentModuleIndex + 1) / COURSE_MODULES.length) * 100;
  const isPassed = quizScore === FINAL_QUIZ.length;

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const femaleVoice = voices.find(voice =>
          /female/i.test(voice.name) ||
          /zira/i.test(voice.name) ||
          /samantha/i.test(voice.name) ||
          /google uk english female/i.test(voice.name)
        );
        voiceRef.current = femaleVoice || voices.find(v => /en/i.test(v.lang)) || voices[0];
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (hasStarted && !isQuizStarted && currentModule.narrationText) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentModule.narrationText);
      if (voiceRef.current) {
        utterance.voice = voiceRef.current;
        utterance.lang = voiceRef.current.lang;
        utterance.rate = 0.95; 
        utterance.pitch = 1.1; 
      }
      window.speechSynthesis.speak(utterance);
    }
  }, [currentModuleIndex, hasStarted, isQuizStarted, currentModule.narrationText]);

  useEffect(() => {
    if (isFinished && isPassed) {
      const message = "Well done, you have completed the training, if you are going to be working with children here at Germiston Baptist Church, there are a few more hurdles to clear, namely register clearance at the police station, and passing the Child Protection Test. Thank you for coming alongside us and protecting the next generation, to Know, to Love and to obey God in a safe and cared-for environment.";
      const utterance = new SpeechSynthesisUtterance(message);
      if (voiceRef.current) {
        utterance.voice = voiceRef.current;
        utterance.lang = voiceRef.current.lang;
        utterance.rate = 0.95;
        utterance.pitch = 1.1;
      }
      window.speechSynthesis.speak(utterance);
    }
  }, [isFinished, isPassed]);

  const startCourse = () => {
    setHasStarted(true);
  };

  const handleNext = () => {
    if (currentModuleIndex < COURSE_MODULES.length - 1) {
      setCurrentModuleIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setIsQuizStarted(true);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleAnswerSelection = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === FINAL_QUIZ[currentQuestionIndex].correctIndex) {
      setQuizScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (currentQuestionIndex < FINAL_QUIZ.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setIsFinished(true);
      window.scrollTo(0, 0);
    }
  };

  const resetCourse = () => {
    window.speechSynthesis.cancel();
    setCurrentModuleIndex(0);
    setIsQuizStarted(false);
    setQuizScore(0);
    setCurrentQuestionIndex(0);
    setIsFinished(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setHasStarted(true);
  };

  const exitApp = () => {
    window.speechSynthesis.cancel();
    if (window.confirm("Training completed. Would you like to exit?")) {
      window.close();
      setTimeout(() => {
        window.location.href = "about:blank";
      }, 500);
    }
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-lime-400 p-4">
        <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-2xl border border-white/20">
          <div className="flex justify-center mb-8">
            <GBCLogo className="w-80 h-auto text-green-700" />
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-6 font-serif uppercase tracking-tight">Child Protection Policy training</h1>
          <p className="text-slate-600 text-lg mb-10 leading-relaxed">
            Welcome to the interactive training. This self-contained course is designed to prepare you for ministry involving children at Germiston Baptist Church.
          </p>
          <button 
            onClick={startCourse}
            className="px-12 py-5 bg-[#15803d] text-white rounded-2xl font-bold text-xl hover:bg-[#166534] transition-all shadow-xl shadow-green-900/30 transform hover:scale-105"
          >
            Start Training
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 md:px-8 max-w-5xl mx-auto bg-lime-400 transition-colors duration-500">
      <header className="w-full text-center mb-6">
        <div className="flex flex-col items-center gap-2">
           <GBCLogo className="w-64 h-auto text-green-700" />
        </div>
        <p className="text-green-900 uppercase tracking-widest text-xs font-black mt-2">Child Protection Policy Training</p>
      </header>

      {!isFinished && (
        <div className="w-full bg-green-900/20 h-3 rounded-full mb-8 overflow-hidden shadow-inner max-w-4xl">
          <div 
            className="bg-green-700 h-full transition-all duration-700 ease-out" 
            style={{ width: isQuizStarted ? `${((currentQuestionIndex + 1) / FINAL_QUIZ.length) * 100}%` : `${progress}%` }}
          />
        </div>
      )}

      <main className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col transition-all max-w-4xl">
        {!isFinished ? (
          <>
            {!isQuizStarted ? (
              <div className="p-8 flex flex-col items-center text-center">
                <ModuleIcon path={currentModule.imageUrl} />
                <span className="text-green-700 font-bold text-sm mb-1 uppercase tracking-widest">Module {currentModuleIndex + 1}</span>
                <h2 className="text-3xl font-bold mb-6 text-slate-800 leading-tight">{currentModule.title}</h2>
                
                {/* Teacher's Briefing Box */}
                <div className="w-full bg-green-50 p-6 rounded-2xl border-l-8 border-green-700 text-left mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
                   <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-green-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                      <span className="text-green-800 font-black text-xs uppercase tracking-widest">Teacher's Briefing</span>
                   </div>
                   <p className="text-green-900 text-lg italic leading-relaxed">
                     "{currentModule.narrationText}"
                   </p>
                </div>

                <div className="w-full text-left bg-lime-50/50 p-6 rounded-2xl border border-lime-100 mb-8">
                  <p className="text-base text-green-700 font-black mb-4 uppercase tracking-tighter opacity-80">Tip: Click items with the info icon for details</p>
                  <ul className="space-y-4">
                    {currentModule.content.map((item, i) => (
                      <li 
                        key={i} 
                        onClick={() => item.extraInfo && setActiveExtraInfo(item)}
                        className={`flex gap-4 text-slate-700 text-lg leading-relaxed group p-3 rounded-xl transition-all ${item.extraInfo ? 'cursor-pointer hover:bg-white hover:shadow-sm' : ''}`}
                      >
                        <span className="text-green-600 mt-1 flex-shrink-0 bg-white shadow-sm rounded-full p-1 group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </span>
                        <div className="flex-1 flex justify-between items-start gap-2">
                          <span>{item.text}</span>
                          {item.extraInfo && (
                            <span className="text-green-700 opacity-40 group-hover:opacity-100 transition-opacity">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                  <span className="text-green-700 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"/></svg>
                    Final Assessment
                  </span>
                  <span className="text-slate-400 font-bold text-sm">Question {currentQuestionIndex + 1} of {FINAL_QUIZ.length}</span>
                </div>
                <h2 className="text-2xl font-bold mb-8 text-slate-800 text-center leading-tight">{FINAL_QUIZ[currentQuestionIndex].question}</h2>
                <div className="grid grid-cols-1 gap-4 mb-8">
                  {FINAL_QUIZ[currentQuestionIndex].options.map((option, idx) => {
                    let btnClass = "w-full p-5 text-left border-2 rounded-2xl transition-all font-bold text-lg flex justify-between items-center shadow-sm ";
                    if (selectedAnswer === null) {
                      btnClass += "border-slate-100 hover:border-green-500 hover:bg-lime-50 hover:shadow-md";
                    } else {
                      if (idx === FINAL_QUIZ[currentQuestionIndex].correctIndex) {
                        btnClass += "border-green-500 bg-lime-50 text-green-700 shadow-inner";
                      } else if (idx === selectedAnswer) {
                        btnClass += "border-red-500 bg-red-50 text-red-700";
                      } else {
                        btnClass += "border-slate-50 opacity-40 grayscale";
                      }
                    }

                    return (
                      <button 
                        key={idx} 
                        onClick={() => handleAnswerSelection(idx)}
                        className={btnClass}
                        disabled={selectedAnswer !== null}
                      >
                        {option}
                        {selectedAnswer !== null && idx === FINAL_QUIZ[currentQuestionIndex].correctIndex && (
                          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        )}
                      </button>
                    );
                  })}
                </div>

                {showExplanation && (
                  <div className="p-6 bg-lime-50 rounded-2xl border border-lime-100 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <p className="text-green-900 text-lg italic">
                      <span className="font-black uppercase text-sm tracking-tighter not-italic mr-2">Policy Note:</span> {FINAL_QUIZ[currentQuestionIndex].explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="bg-slate-50 border-t border-slate-100 p-6 flex justify-between items-center mt-auto">
              {!isQuizStarted ? (
                <>
                  <button onClick={handlePrev} disabled={currentModuleIndex === 0} className="px-8 py-3 text-slate-500 font-black uppercase tracking-widest disabled:opacity-20 hover:text-slate-800 transition-colors">Back</button>
                  <button onClick={handleNext} className="px-12 py-4 bg-green-700 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-green-800 transition-all shadow-xl shadow-green-900/30 transform hover:-translate-y-1">
                    {currentModuleIndex === COURSE_MODULES.length - 1 ? 'Start Assessment' : 'Next Module'}
                  </button>
                </>
              ) : (
                <div className="w-full flex justify-end">
                   <button onClick={handleNextQuestion} disabled={selectedAnswer === null} className="px-12 py-4 bg-green-700 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-green-800 transition-all shadow-xl shadow-green-900/30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1">
                    {currentQuestionIndex === FINAL_QUIZ.length - 1 ? 'Complete Assessment' : 'Next Question'}
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="p-16 text-center flex flex-col items-center">
            {isPassed ? (
              <>
                <div className="w-32 h-32 bg-lime-100 text-green-600 rounded-full flex items-center justify-center mb-10 shadow-lg animate-bounce">
                   <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h2 className="text-5xl font-black text-slate-800 mb-6">Training Passed!</h2>
                <p className="text-xl text-slate-600 mb-12 max-w-lg leading-relaxed text-center">
                  Well done, you have completed the training, if you are going to be working with children here at Germiston Baptist Church, there are a few more hurdles to clear, namely register clearance at the police station, and passing the Child Protection Test. Thank you for coming alongside us and protecting the next generation, to Know, to Love and to obey God in a safe and cared-for environment.
                </p>
              </>
            ) : (
              <>
                <div className="w-32 h-32 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-10 shadow-lg">
                   <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
                <h2 className="text-5xl font-black text-slate-800 mb-6">Action Required</h2>
                <p className="text-xl text-slate-600 mb-12 max-w-lg leading-relaxed text-center">A perfect score of 100% is required for safety training. Please review the key modules and try the assessment again.</p>
              </>
            )}
            <div className={`p-10 rounded-3xl border-4 w-full max-w-md mb-12 ${isPassed ? 'bg-lime-50 border-green-200 shadow-green-100 shadow-xl' : 'bg-red-50 border-red-200 shadow-red-100 shadow-xl'}`}>
               <div className="text-xs text-slate-400 uppercase tracking-widest font-black mb-4">Official Result</div>
               <div className={`text-7xl font-black mb-4 ${isPassed ? 'text-green-700' : 'text-red-700'}`}>{Math.round((quizScore / FINAL_QUIZ.length) * 100)}%</div>
               <p className="text-slate-500 font-bold tracking-tight uppercase">Accuracy: {quizScore} / {FINAL_QUIZ.length}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg justify-center">
              <button onClick={resetCourse} className="flex-1 px-8 py-3 border-4 border-slate-200 text-slate-500 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-50 transition-all hover:border-slate-300 active:scale-95">{isPassed ? 'Review Training' : 'Try Again'}</button>
              {isPassed && (
                <button onClick={exitApp} className="flex-1 px-8 py-3 bg-green-700 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-green-800 transition-all shadow-2xl shadow-green-900/40 active:scale-95 transform hover:-translate-y-1">Training Completed</button>
              )}
            </div>
          </div>
        )}
      </main>

      {activeExtraInfo && <Modal title={activeExtraInfo.text} content={activeExtraInfo.extraInfo || ""} onClose={() => setActiveExtraInfo(null)} />}

      <footer className="mt-12 text-green-900 text-xs text-center border-t border-green-900/20 pt-8 w-full max-w-lg">
        <p className="font-bold mb-1">&copy; 2024 Germiston Baptist Church. All Rights Reserved.</p>
        <p className="opacity-70 italic">Ensuring a ministry of integrity, safety, and transparency.</p>
        <p className="mt-4 font-black">CPO: {POLICY_CPO} | Pastor: {POLICY_PASTOR}</p>
      </footer>
    </div>
  );
};

export default App;